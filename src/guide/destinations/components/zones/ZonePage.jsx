import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import Menu from '../../../components/menu/Menu.jsx'
import ButtomBanner from '../../../components/bottombanner/Bottombanner.jsx'
import ZoneVideo from './ZoneVideo.jsx'
import ProvinceTargetsGrid from '../destinations/ProvinceTargetsGrid.jsx'
import OtherProvinces from '../destinations/OtherProvinces.tsx'
import BreadcrumbNav from '../destinations/BreadcrumbNav.jsx'
import Activities from '../destinations/Activities.jsx'
import SelectedActivitiesBar from '../destinations/SelectedActivitiesBar.jsx'
import { zoneRegistry } from '../../destinations-pages/zoneRegistry.js'
import { siteRegistry } from '../../destinations-pages/siteRegistry.js'
import { provincias as chiriquiProvincias } from '../../destinations-pages/chiriqui/ChiriquiData.js'
import { provincias as colonProvincias } from '../../destinations-pages/colon/ColonData.js'
import { provincias as cocleProvincias } from '../../destinations-pages/cocle/CocleData.js'
import { provincias as panamaProvincias } from '../../destinations-pages/panama/PanamaData.js'
import { provincias as panamaOesteProvincias } from '../../destinations-pages/panama-oeste/PanamaOesteData.js'
import { provincias as veraguasProvincias } from '../../destinations-pages/veraguas/VeraguasData.js'
import { usePublishedSites } from '../../context/publishedSitesStore.js'

const provinceDataRegistry = {
  chiriqui: chiriquiProvincias[0],
  colon: colonProvincias[0],
  cocle: cocleProvincias[0],
  panama: panamaProvincias[0],
  'panama-oeste': panamaOesteProvincias[0],
  veraguas: veraguasProvincias[0],
}

function normalizeActivity(activity = '') {
  return String(activity)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
}

function ZonePage() {
  const { zoneId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const [scrollProgress, setScrollProgress] = useState(0)
  const [selectedActivities, setSelectedActivities] = useState([])
  const { sites: publishedSites } = usePublishedSites()
  const deferredSelectedActivities = useDeferredValue(selectedActivities)

  const decodedZoneId = zoneId ? decodeURIComponent(zoneId) : ''
  const zone = zoneRegistry[decodedZoneId] ?? zoneRegistry[zoneId] ?? null
  const searchProvinceId = new URLSearchParams(location.search).get('province')
  const provinceId = searchProvinceId || zone?.provinceId || zone?.provinceIds?.[0] || 'chiriqui'
  const provinceData = provinceDataRegistry[provinceId] ?? chiriquiProvincias[0]
  const breadcrumbSourceLabel = 'Destinos';
  const breadcrumbSourceTo = '/#map';
  const fallbackTarget =
    provinceData?.targets?.find((target) => target.zoneId === decodedZoneId || target.id === decodedZoneId) ?? null
  const safeHeading = zone?.nombre || fallbackTarget?.nombre || 'Zona'
  const safeDescription = zone?.descripcion || fallbackTarget?.descripcion || provinceData?.descripcionCorta || ''
  const sitios = useMemo(
    () => {
      const staticSites = (zone?.sitios || [])
        .map((id) => siteRegistry[id])
        .filter(Boolean)
      const dynamicSites = publishedSites.filter((site) => (
        site.provinceId === provinceId
        && site.zoneId === decodedZoneId
      ))

      return Array.from(
        new Map(
          [...staticSites, ...dynamicSites].map((site) => [site.id, site]),
        ).values(),
      )
    },
    [decodedZoneId, provinceId, publishedSites, zone],
  )
  const isColonZone = provinceId === 'colon'
  const zoneActivities = useMemo(
    () => [
      ...new Set(
        sitios
          .flatMap((site) => site.actividades || [])
          .map((activity) => (typeof activity === 'string' ? activity : activity?.nombre))
          .filter(Boolean),
      ),
    ],
    [sitios],
  )
  const zoneActivityData = useMemo(
    () => ({
      ...provinceData,
      actividades: zoneActivities,
      isActivityScopeComplete: true,
    }),
    [provinceData, zoneActivities],
  )

  const toggleSelectedActivity = (activity) => {
    setSelectedActivities((current) => {
      const activityKey = normalizeActivity(activity)
      const alreadySelected = current.some((item) => normalizeActivity(item) === activityKey)

      return alreadySelected
        ? current.filter((item) => normalizeActivity(item) !== activityKey)
        : [...current, activity]
    })
  }

  const removeSelectedActivity = (activityToRemove) => {
    const activityKey = normalizeActivity(activityToRemove)
    setSelectedActivities((current) =>
      current.filter((item) => normalizeActivity(item) !== activityKey),
    )
  }

  useEffect(() => {
    const onScroll = () => {
      const next = Math.min(window.scrollY / 320, 1)
      setScrollProgress(next)
    }

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!zone) {
    return (
      <main className="min-h-screen bg-brand-charcoal px-6 py-20 text-center text-brand-white">
        <h1 className="text-3xl font-bold">Zona no encontrada</h1>
        <p className="mt-4">{safeHeading}</p>
      </main>
    )
  }

  const toTarget = (s) => ({
    id: s.id,
    nombre: s.nombre,
    descripcion: s.previewDescripcion || s.descripcion || '',
    previewDescripcion: s.previewDescripcion || s.descripcion || '',
    imagen: s.imagen || s.banner?.src || s.thumbnail || s.src,
    ubicacion: s.previewUbicacion || s.ubicacion || `${provinceData.nombre}, ${s.nombre}`,
    activities: s.actividades || [],
    type: 'site',
    siteId: s.id,
    zoneId: decodedZoneId,
  })

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-brand-charcoal text-brand-white">
      <div className="fixed top-0 z-50 w-full">
        <Menu
          autoHideOnScroll
          onLogoClick={() => navigate('/#home')}
          onUsClick={() => navigate('/#us')}
          onMapClick={() => navigate('/#map')}
          onSuggestionsClick={() => navigate('/#suggestions')}
          onPreregisterClick={() => navigate('/#preregister')}
        />
      </div>

      <section id="video" className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none fixed inset-0 bg-brand-charcoal">
          <ZoneVideo provinceData={provinceData} zone={zone} fixedBackground scrollProgress={scrollProgress} />
        </div>
        <div className="relative z-10 flex min-h-screen items-start px-4 md:items-center max-w-lg">
          <div className="mt-24 w-full max-w-md md:mt-0 md:ml-10">
            <BreadcrumbNav
              items={[
                { label: breadcrumbSourceLabel, to: breadcrumbSourceTo },
                { label: provinceData.nombre, to: `/provincias/${provinceId}` },
                { label: safeHeading },
              ]}
              className="mb-3 mt-0"
            />
            <div className="rounded-xl border border-white/10 bg-black/15 p-8 text-start shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-sm">
            <h1 className="font-main text-5xl font-bold text-brand-white brightness-150 md:text-6xl">
              {safeHeading}
            </h1>
            <p className="mt-4 font-body text-lg leading-7 text-brand-white/90">{safeDescription}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10">
        {isColonZone && (
          <>
            <Activities
              provinceData={zoneActivityData}
              selectedActivities={selectedActivities}
              onActivitySelect={toggleSelectedActivity}
            />
            <SelectedActivitiesBar
              selectedActivities={selectedActivities}
              onRemoveActivity={removeSelectedActivity}
              onClearAll={() => setSelectedActivities([])}
            />
          </>
        )}

        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <div className="flex flex-col gap-12">
            <ProvinceTargetsGrid
              title="Lugares turísticos"
              targets={sitios.map(toTarget)}
              fallbackPoster={provinceData.banner?.poster || provinceData.imagenProvincia?.src}
              mode="sites-only"
              breadcrumbSourceLabel={breadcrumbSourceLabel}
              provinceLabel={provinceData.nombre}
              zoneLabel={safeHeading}
              selectedActivities={isColonZone ? deferredSelectedActivities : []}
            />
          </div>

          <OtherProvinces />

          {!sitios.length && (
            <div className="py-10 text-center text-brand-white/90">
              <h2 className="text-2xl font-bold">{safeHeading}</h2>
              <p className="mt-3">No hay sitios cargados para esta zona.</p>
            </div>
          )}
        </div>
      </section>

      <div className="relative z-20 mt-24">
        <ButtomBanner onLogoClick={() => navigate('/#home')} />
      </div>
    </main>
  )
}

export default ZonePage
