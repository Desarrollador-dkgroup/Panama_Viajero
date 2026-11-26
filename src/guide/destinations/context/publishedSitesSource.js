// Sitios publicados de la guía, leídos de Supabase: la misma base que administra pv_admin y
// que usa la página oficial. La clave publicable solo permite leer (RLS); por eso puede ir
// en el navegador. Las variables VITE_ permiten cambiarlas sin tocar el código.
const SUPABASE_URL = (
  import.meta.env.VITE_SUPABASE_URL || 'https://qqhcsacdffdxcbkzgulk.supabase.co'
).replace(/\/$/, '')
const SUPABASE_PUBLISHABLE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
  || 'sb_publishable_wYVKGoDrTCBnG06wNSPOgg_4CPVPiES'

const SITE_FIELDS = [
  'id', 'slug', 'name', 'description', 'short_description', 'province_id', 'region_id',
  'zone_id', 'maps_embed_url',
  'tourist_site_photos(storage_path,position)',
  'tourist_site_activities(name,description,icon_key,position)',
].join(',')

// «Bocas del Toro» → «bocas-del-toro», el formato de provincias y zonas de la guía.
function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

// Las fotos del catálogo inicial son rutas del bucket `catalog-photos`; las del panel, URL.
function photoUrl(path) {
  if (/^https?:\/\//i.test(path)) return path
  return `${SUPABASE_URL}/storage/v1/object/public/catalog-photos/${path}`
}

const byPosition = (first, second) => first.position - second.position

// Convierte una fila de Supabase al formato que usan los componentes de la guía.
function mapSite(row) {
  const regionName = row.region_id || row.province_id || ''
  const provinceId = regionName ? slugify(regionName) : ''
  const gallery = [...(row.tourist_site_photos || [])]
    .sort(byPosition)
    .map((photo) => photoUrl(photo.storage_path))

  return {
    id: row.slug,
    slug: row.slug,
    provinceId,
    provinceIds: provinceId ? [provinceId] : [],
    sharedProvinceIds: provinceId ? [provinceId] : [],
    zoneId: row.zone_id ? slugify(row.zone_id) : null,
    nombre: row.name,
    descripcion: row.description,
    previewDescripcion: row.short_description || row.description,
    previewUbicacion: regionName ? `${row.name}, ${regionName}` : row.name,
    ubicacion: row.maps_embed_url || '',
    banner: { src: gallery[0] || '', alt: `Banner de ${row.name}` },
    gallery,
    actividades: [...(row.tourist_site_activities || [])]
      .sort(byPosition)
      .map((activity) => ({
        nombre: activity.name,
        descripcion: activity.description || '',
        icono: activity.icon_key || null,
      })),
  }
}

export async function fetchPublishedSites(signal) {
  const query = new URLSearchParams({
    select: SITE_FIELDS,
    is_test_placeholder: 'eq.false',
    order: 'sort_order.asc,name.asc',
  })
  const response = await fetch(`${SUPABASE_URL}/rest/v1/tourist_sites?${query}`, {
    signal,
    headers: { apikey: SUPABASE_PUBLISHABLE_KEY },
  })
  const payload = await response.json().catch(() => null)
  if (!response.ok || !Array.isArray(payload)) {
    throw new Error('No se pudieron cargar los sitios')
  }
  return payload.map(mapSite)
}
