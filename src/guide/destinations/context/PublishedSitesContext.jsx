import { useEffect, useMemo, useState } from 'react'
import { PublishedSitesContext } from './publishedSitesStore.js'

const defaultApiBaseUrl = 'https://panama-viajero-api.desarrollo-dkgroup.workers.dev'
const apiBaseUrl = (
  import.meta.env.VITE_API_BASE_URL || defaultApiBaseUrl
).replace(/\/$/, '')

function resolveMediaUrl(path) {
  if (!path) return ''
  if (/^https?:\/\//i.test(path)) return path
  return `${apiBaseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

function mapPublishedSite(site) {
  const bannerImage = site.images?.find((image) => image.imageType === 'banner')
  const orderedImages = [...(site.images || [])].sort((first, second) => {
    if (first.imageType !== second.imageType) {
      return first.imageType === 'banner' ? -1 : 1
    }
    return first.sortOrder - second.sortOrder
  })
  const gallery = orderedImages.map((image) => resolveMediaUrl(image.url))
  const bannerSource = resolveMediaUrl(bannerImage?.url) || gallery[0] || ''
  const provinceIds = [
    site.province.slug,
    ...(site.isPacificRiviera ? ['rivera-pacifica'] : []),
  ]

  return {
    id: site.slug,
    apiId: site.id,
    source: 'api',
    provinceId: site.province.slug,
    provinceIds,
    sharedProvinceIds: provinceIds,
    zoneId: site.zone?.replaceAll('_', '-') || null,
    nombre: site.name,
    descripcion: site.description,
    previewDescripcion: site.previewDescription,
    previewUbicacion: site.location,
    ubicacion: site.mapUrl,
    banner: {
      src: bannerSource,
      alt: `Banner de ${site.name}`,
    },
    gallery,
    actividades: (site.activities || []).map((activity) => ({
      nombre: activity.name,
      descripcion: activity.description || '',
      icono: activity.iconKey,
    })),
  }
}

export function PublishedSitesProvider({ children }) {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetch(`${apiBaseUrl}/api/v1/public/sites`, {
      signal: controller.signal,
    })
      .then(async (response) => {
        const payload = await response.json().catch(() => null)
        if (!response.ok) {
          throw new Error(payload?.error || 'No se pudieron cargar los sitios')
        }
        return payload
      })
      .then((payload) => {
        setSites((payload.sites || []).map(mapPublishedSite))
        setError('')
      })
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') {
          setError('No se pudieron actualizar los sitios publicados.')
        }
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [])

  const sitesBySlug = useMemo(
    () => Object.fromEntries(sites.map((site) => [site.id, site])),
    [sites],
  )

  const value = useMemo(
    () => ({ sites, sitesBySlug, loading, error }),
    [sites, sitesBySlug, loading, error],
  )

  return (
    <PublishedSitesContext.Provider value={value}>
      {children}
    </PublishedSitesContext.Provider>
  )
}
