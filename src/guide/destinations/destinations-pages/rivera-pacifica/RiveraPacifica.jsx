import { useEffect } from 'react'
import { FiMapPin } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'
import ProvinceSitesOnly from '../../components/destinations/ProvinceSitesOnly.jsx'
import Menu from '../../../components/menu/Menu.jsx'
import BottomBanner from '../../../components/bottombanner/Bottombanner.jsx'
import OtherProvinces from '../../components/destinations/OtherProvinces.tsx'
import BreadcrumbNav from '../../components/destinations/BreadcrumbNav.jsx'
import { provinceMedia } from '../provinceMedia.js'

const riveraPacificaProvince = {
  id: 'rivera-pacifica',
  nombre: 'Riviera Pacífica',
  banner: {
    tipo: 'image',
    src: '/images/destinations/rivera-pacifica/bg-rivera-pacifica.webp',
    alt: 'Vista de Riviera Pacífica',
    poster: '/images/destinations/rivera-pacifica/bg-rivera-pacifica.webp',
  },
  descripcionCorta:
    'Un corredor costero compartido entre Coclé y Panamá Oeste, con playas extensas, olas consistentes y paisajes pensados para surf, descanso y recorridos de litoral.',
  directSiteIds: [],
  displayMode: 'sites-only',
}

function RiveraPacifica() {
  const navigate = useNavigate()
  const breadcrumbSourceLabel = 'Destinos'
  const breadcrumbSourceTo = '/#map'

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [])

  return (
    <div className="relative isolate text-brand-charcoal">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <img
          src={riveraPacificaProvince.banner.src}
          alt={riveraPacificaProvince.banner.alt}
          className="h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/25" />
      </div>

      <div className="fixed top-0 z-30 w-full">
        <Menu
          autoHideOnScroll
          onLogoClick={() => navigate('/#home')}
          onUsClick={() => navigate('/#us')}
          onMapClick={() => navigate('/#map')}
          onSuggestionsClick={() => navigate('/#suggestions')}
          onPreregisterClick={() => navigate('/#preregister')}
        />
      </div>

      <section className="relative min-h-screen overflow-hidden">
        <div className="relative z-10 flex min-h-screen items-center px-4 md:px-10">
          <div className="w-full max-w-md text-white">
            <BreadcrumbNav
              items={[
                { label: breadcrumbSourceLabel, to: breadcrumbSourceTo },
                { label: 'Riviera Pacífica' },
              ]}
              className="mb-3 mt-0"
            />
            <div className="rounded-xl border border-white/10 bg-black/15 p-8 text-start shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <h1 className="font-main text-5xl md:text-7xl">Riviera Pacífica</h1>
              <div className="flex items-center gap-1 text-[#f1f1f1e6]/85">
                <FiMapPin className="h-4 w-4 " />
                <p className="mt-1 text-sm font-secondary leading-6">Costas de Coclé y Panamá Oeste</p>
              </div>
              <p className="mt-5 text-lg leading-8 text-brand-white/90">
                {riveraPacificaProvince.descripcionCorta}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 -mt-10 pt-10 text-brand-white">
        <div className="mx-auto max-w-6xl px-4 md:px-10">
          <ProvinceSitesOnly
            provinceData={riveraPacificaProvince}
            title="Lugares Turísticos"
            breadcrumbProvincePath="/rivera-pacifica"
          />
          <OtherProvinces provincias={provinceMedia} />
        </div>
      </section>

      <div className="relative z-20 mt-24">
        <BottomBanner onLogoClick={() => navigate('/#home')} />
      </div>
    </div>
  )
}

export default RiveraPacifica
