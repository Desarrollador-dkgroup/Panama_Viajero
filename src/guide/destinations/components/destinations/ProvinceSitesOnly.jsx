import ProvinceTargetsGrid from './ProvinceTargetsGrid.jsx'
import { siteRegistry } from '../../destinations-pages/siteRegistry.js'
import { usePublishedSites } from '../../context/publishedSitesStore.js'

function ProvinceSitesOnly({
  provinceData,
  title = 'Sitios Turísticos',
  selectedActivities = [],
  breadcrumbSourceLabel = 'Mapa',
  provinceLabel,
  breadcrumbProvincePath,
  zoneLabel,
}) {
  const { sites: publishedSites } = usePublishedSites()
  const provinceId = provinceData?.id ?? ''
  const directSiteIds = provinceData?.directSiteIds ?? []

  const belongsToProvince = (site) =>
    site?.provinceId === provinceId ||
    site?.provinceIds?.includes(provinceId) ||
    site?.sharedProvinceIds?.includes(provinceId)

  const fallbackSiteIds =
    directSiteIds.length > 0
      ? directSiteIds
      : Object.values(siteRegistry)
          .filter((site) => belongsToProvince(site))
          .map((site) => site.id)

  const staticSites = fallbackSiteIds
    .map((siteId) => siteRegistry[siteId])
    .filter(Boolean)
  const dynamicSites = publishedSites.filter((site) => belongsToProvince(site))
  const mergedSites = Array.from(
    new Map(
      [...staticSites, ...dynamicSites].map((site) => [site.id, site]),
    ).values(),
  )
  const targets = mergedSites
    .map((site) => ({
      id: site.id,
      nombre: site.nombre,
      descripcion: site.previewDescripcion || site.descripcion || '',
      imagen: site.banner?.src || site.thumbnail || site.src,
      ubicacion: site.previewUbicacion || site.ubicacion,
      activities: site.actividades ?? [],
      type: 'site',
      siteId: site.id,
    }))

  return (
    <ProvinceTargetsGrid
      title={title}
      targets={targets}
      fallbackPoster={provinceData.banner?.poster || provinceData.imagenProvincia?.src}
      mode="sites-only"
      provinceId={provinceData.id}
      selectedActivities={selectedActivities}
      breadcrumbSourceLabel={breadcrumbSourceLabel}
      provinceLabel={provinceLabel || provinceData?.nombre}
      breadcrumbProvincePath={breadcrumbProvincePath}
      zoneLabel={zoneLabel}
    />
  )
}

export default ProvinceSitesOnly
