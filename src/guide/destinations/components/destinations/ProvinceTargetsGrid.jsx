import { useNavigate } from 'react-router-dom'
import SmartVideo from '../../../components/video/SmartVideo.jsx'

function resolveTargetRoute(target) {
  if (target.type === 'zone') {
    const zoneId = encodeURIComponent(target.zoneId ?? target.id)
    const provinceId = target.provinceId ? `?province=${encodeURIComponent(target.provinceId)}` : ''
    return `/zonas/${zoneId}${provinceId}`
  }
  return `/sitios/${encodeURIComponent(target.siteId ?? target.id)}`
}

function getTargetDescription(target) {
  return (
    target?.previewDescripcion ||
    target?.description ||
    target?.descripcion ||
    target?.subdescripcion ||
    target?.texto ||
    target?.frase ||
    target?.previewText ||
    ''
  )
}

function normalizeActivity(activity = '') {
  return activity
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function normalizeActivitySelection(selection = []) {
  const items = Array.isArray(selection) ? selection : selection ? [selection] : []
  return items.map((activity) => normalizeActivity(typeof activity === 'string' ? activity : '')).filter(Boolean)
}

function ProvinceTargetsGrid({
  title = 'Sitios turísticos',
  targets = [],
  fallbackPoster,
  mode = 'sites-only',
  provinceId,
  provinceLabel,
  zoneLabel,
  selectedActivities = [],
  selectedActivity = null,
  breadcrumbSourceLabel = 'Mapa',
}) {
  const navigate = useNavigate()
  const selectionSource =
    Array.isArray(selectedActivities) && selectedActivities.length > 0 ? selectedActivities : selectedActivity
  const selectedActivityKeys = new Set(normalizeActivitySelection(selectionSource))
  const visibleTargets =
    mode === 'sites-only' && selectedActivityKeys.size > 0
      ? targets.filter((target) => {
          const targetActivities = Array.isArray(target.activities) ? target.activities : []
          return targetActivities.some((activity) => {
            const activityKey = normalizeActivity(typeof activity === 'string' ? activity : activity?.nombre ?? '')
            return (
              activityKey &&
              [...selectedActivityKeys].some(
                (selectedActivityKey) =>
                  activityKey === selectedActivityKey ||
                  activityKey.includes(selectedActivityKey) ||
                  selectedActivityKey.includes(activityKey),
              )
            )
          })
        })
      : targets

  return (
    <div className="flex flex-col gap-5 mt-10">
      <h1
        className="font-main flex justify-center text-3xl font-bold text-brand-white/95 md:pb-4 md:text-6xl"
        style={{ textShadow: '0 0 6px rgba(0, 0, 0, 0.9)' }}
      >
        {title}
      </h1>

      <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-6 px-4 sm:px-0">
        {visibleTargets.map((target) => {
          const isVideo = target.type === 'video'
          const resolvedTarget =
            provinceId && target.type === 'zone' && !target.provinceId
              ? { ...target, provinceId }
              : target
          const route = resolveTargetRoute(resolvedTarget)
          const description = getTargetDescription(target)
          const nextState = {
            breadcrumbSourceLabel,
            breadcrumbProvinceLabel: provinceLabel,
            breadcrumbZoneLabel: target.type === 'zone' ? target.nombre : zoneLabel,
            breadcrumbZoneId: target.type === 'zone' ? target.zoneId ?? target.id : target.zoneId,
          }

          return (
            <button
              key={target.id}
              type="button"
              aria-label={`Ver informacion de ${target.nombre}`}
              onClick={() => navigate(route, { state: nextState })}
              className={`flex cursor-pointer flex-col overflow-hidden rounded-xl text-left shadow-xl transition hover:-translate-y-1 ${
                mode === 'zones-only' || mode === 'mixed' ? 'basis-[300px] grow' : 'w-full max-w-[340px]'
              } ${mode === 'zones-only' || mode === 'mixed' ? 'bg-transparent' : 'bg-brand-white'}`}
            >
              <div className="group relative aspect-[16/9] w-full overflow-hidden bg-brand-soft">
                {isVideo ? (
                  <SmartVideo
                    src={target.imagen}
                    className="h-[116%] w-full object-cover object-top"
                    autoPlay
                    poster={target.poster || fallbackPoster}
                    preload="none"
                  />
                ) : (
                  <img
                    src={target.imagen}
                    alt={target.nombre}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                )}

                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20" />

                {mode === 'sites-only' && <div className="absolute inset-0 bg-black/8 transition-all duration-300 group-hover:bg-black/0" />}

                {(mode === 'zones-only' || mode === 'mixed') && (
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <div className="rounded-[28px] bg-gradient-to-t from-black/85 via-black/55 to-transparent p-6">
                      <h3 className="font-secondary-italic text-3xl font-bold text-brand-white md:text-4xl">
                        {target.nombre}
                      </h3>
                      <p className="font-body mt-2 text-sm leading-6 text-brand-white/90">
                        {description || 'Zona'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {mode === 'sites-only' && (
                <div className="flex flex-1 flex-col bg-brand-white p-5">
                  <h3 className="font-secondary-italic mt-2 text-2xl text-brand-blue/95">
                    {target.nombre}
                  </h3>

                  {description && (
                    <p className="font-body mt-3 text-sm leading-6 text-black">
                      {description}
                    </p>
                  )}

                  {target.ubicacion && (
                    <p className="font-secondary-italic mt-auto pt-4 text-sm text-brand-red/95">
                      {target.ubicacion}
                    </p>
                  )}
                </div>
              )}
            </button>
          )
        })}

        {mode === 'sites-only' && selectedActivityKeys.size > 0 && visibleTargets.length === 0 ? (
          <div className="w-full rounded-2xl border border-white/15 bg-black/20 px-6 py-10 text-center text-brand-white/90 backdrop-blur-sm">
            No hay sitios que coincidan con la actividad seleccionada.
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ProvinceTargetsGrid
