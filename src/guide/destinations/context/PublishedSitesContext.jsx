import { useEffect, useMemo, useState } from 'react'
import { fetchPublishedSites } from './publishedSitesSource.js'
import { PublishedSitesContext } from './publishedSitesStore.js'

// Carga una vez los sitios publicados (Supabase, administrados en pv_admin) y los comparte.
export function PublishedSitesProvider({ children }) {
  const [sites, setSites] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchPublishedSites(controller.signal)
      .then((publishedSites) => {
        setSites(publishedSites)
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

  const sitesById = useMemo(
    () => Object.fromEntries(sites.map((site) => [site.id, site])),
    [sites],
  )

  const value = useMemo(
    () => ({ sites, sitesById, loading, error }),
    [sites, sitesById, loading, error],
  )

  return (
    <PublishedSitesContext.Provider value={value}>
      {children}
    </PublishedSitesContext.Provider>
  )
}
