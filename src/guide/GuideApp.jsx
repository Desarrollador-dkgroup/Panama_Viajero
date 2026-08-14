import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import DeferredSection from './layout/layout-components/DeferredSection.jsx'
import Menu from './components/menu/Menu.jsx'
import './App.css'
import Logo from './img_test/LogoRectangular.svg'
import CountdownModal from './layout/layout-components/counter/Counter.jsx'
import { PublishedSitesProvider } from './destinations/context/PublishedSitesContext.jsx'

const AboutUs = lazy(() => import('./layout/layout-components/about-us/AboutUs.jsx'))
const Map = lazy(() => import('./layout/layout-components/map/DinamicMap.jsx'))
const Suggestions = lazy(() => import('./layout/layout-components/Suggestions.tsx'))
const SiteInfo = lazy(() => import('./destinations/components/sites/SiteInfo.jsx'))
const ZonePage = lazy(() => import('./destinations/components/zones/ZonePage.jsx'))
const Preregister = lazy(() => import('./layout/layout-components/preregister/Preregister.jsx'))
const RegistrerFlotante = lazy(() => import('./layout/layout-components/counter/RegistrerFlotante.jsx'))
const BottomBanner = lazy(() => import('./components/bottombanner/Bottombanner.jsx'))
const BannerLayout = lazy(() => import('./layout/layout-components/banner/BannerLayout.jsx'))
const BocasDelToro = lazy(() => import('./destinations/destinations-pages/bocas-del-toro/BocasDelToro.jsx'))
const Chiriqui = lazy(() => import('./destinations/destinations-pages/chiriqui/Chiriqui.jsx'))
const Cocle = lazy(() => import('./destinations/destinations-pages/cocle/Cocle.jsx'))
const Colon = lazy(() => import('./destinations/destinations-pages/colon/Colon.jsx'))
const Darien = lazy(() => import('./destinations/destinations-pages/darien/Darien.jsx'))
const Herrera = lazy(() => import('./destinations/destinations-pages/herrera/Herrera.jsx'))
const LosSantos = lazy(() => import('./destinations/destinations-pages/los-santos/LosSantos.jsx'))
const Panama = lazy(() => import('./destinations/destinations-pages/panama/Panama.jsx'))
const PanamaOeste = lazy(() => import('./destinations/destinations-pages/panama-oeste/PanamaOeste.jsx'))
const Veraguas = lazy(() => import('./destinations/destinations-pages/veraguas/Veraguas.jsx'))
const GunaYala = lazy(() => import('./destinations/destinations-pages/comarca-guna-yala/GunaYala.jsx'))
const RiveraPacifica = lazy(() => import('./destinations/destinations-pages/rivera-pacifica/RiveraPacifica.jsx'))

const HOME_SECTION_HASHES = new Set(['#home', '#us', '#map', '#preregister'])

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-soft px-6 text-center text-brand-charcoal">
      <p className="text-sm uppercase tracking-[0.2em]">Cargando provincia...</p>
    </div>
  )
}

function SectionFallback({ className = '' }) {
  return <div aria-hidden="true" className={className} />
}

function GuideHome() {
  const location = useLocation()
  const [showCountdown, setShowCountdown] = useState(
    () => !HOME_SECTION_HASHES.has(location.hash),
  )
  const [showRegisterFlot, setShowRegisterFlot] = useState(false)

  const homeRef = useRef(null)
  const preregisterRef = useRef(null)
  const mapRef = useRef(null)
  const usRef = useRef(null)

  const menuOffset = 0
  const sectionOffsets = {
    '#home': 0,
    '#us': 30,
    '#map': 30,
    '#suggestions': -100,
    '#preregister': -100,
  }

  const scrollToSection = (ref, hash) => {
    setShowCountdown(false)
    setShowRegisterFlot(false)
    const target = ref.current
    if (!target) return
    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      menuOffset +
      (sectionOffsets[hash] ?? 0)
    window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: 'smooth' })
  }

  const scrollToHome = () => scrollToSection(homeRef, '#home')
  const scrollToMap = () => scrollToSection(mapRef, '#map')
  const scrollToPreregister = () => scrollToSection(preregisterRef, '#preregister')
  const scrollToUs = () => scrollToSection(usRef, '#us')
  const openRegisterFlot = () => {
    setShowCountdown(false)
    setShowRegisterFlot(true)
  }


  useEffect(() => {
    const sectionRefs = {
      '#home': homeRef,
      '#us': usRef,
      '#map': mapRef,
      '#preregister': preregisterRef,
    }

    const targetRef = sectionRefs[location.hash]
    if (!targetRef) return

    setShowCountdown(false)

    let cancelled = false
    const frame1 = requestAnimationFrame(() => {
      const frame2 = requestAnimationFrame(() => {
        if (cancelled) return

        const target = targetRef.current
        if (!target) return

        const top =
          target.getBoundingClientRect().top +
          window.scrollY -
          menuOffset +
          (sectionOffsets[location.hash] ?? 0)
        window.scrollTo({ top: Math.max(top, 0), left: 0, behavior: 'smooth' })
      })

      if (cancelled) cancelAnimationFrame(frame2)
    })

    return () => {
      cancelled = true
      cancelAnimationFrame(frame1)
    }
  }, [location.hash])

  return (
    <div className="relative bg-brand-soft text-brand-charcoal">
      {showCountdown && (
        <Suspense fallback={null}>
          <CountdownModal
            onClose={() => setShowCountdown(false)}
            onPreregister={openRegisterFlot}
          />
          
        </Suspense>
      )}

      {showRegisterFlot && (
        <Suspense fallback={null}>
          <RegistrerFlotante onClose={() => setShowRegisterFlot(false)} />
        </Suspense>
      )}

      <div
        className="fixed top-0 z-[200] w-full"
      >
        <Menu
          autoHideOnScroll
          onLogoClick={scrollToHome}
          onPreregisterClick={scrollToPreregister}
          onMapClick={scrollToMap}
          onUsClick={scrollToUs}
        />
      </div>

      <section id="home" ref={homeRef} className="relative">
        <BannerLayout />
        <div className="absolute inset-0 z-20 mr-2 mb-2 flex items-end justify-start md:mr-5 md:mb-4">
          <img
            src={Logo}
            alt="Logo"
            fetchPriority="high"
            decoding="async"
            className="mb-3 ml-5 md:mb-15 md:ml-25 h-10 md:h-35 opacity-95 w-auto max-w-full drop-shadow-[0_5px_5px_rgba(0,0,0,0.45)] md:mb-none  md:drop-shadow-[0_5px_5px_rgba(0,0,0,0.45)] duration-400 hover:scale-103"
          />
        </div>
      </section>

      <section id="us" ref={usRef} className="">
        <DeferredSection fallback={<SectionFallback className="min-h-[320px]" />}>
          <Suspense fallback={<SectionFallback className="min-h-[320px]" />}>
            <AboutUs />
          </Suspense>
        </DeferredSection>
      </section>

      <section id="map" ref={mapRef} className='max-w-full'>
        
          <Suspense fallback={<SectionFallback className="min-h-[560px]" />}>
            <Map />
          </Suspense>
        
      </section>

      <section id="suggestions"  className="mt-[-50px]">
        <Suspense fallback={<SectionFallback className="min-h-[480px]" />}>
            <Suggestions />
          </Suspense>
      </section>

      <section id="preregister" ref={preregisterRef} className="">
        <Suspense fallback={<SectionFallback className="min-h-[440px]" />}>
            <Preregister />
          </Suspense>
      </section>

      <DeferredSection fallback={<SectionFallback className="min-h-[120px]" />} rootMargin="200px">
        <Suspense fallback={<SectionFallback className="min-h-[120px]" />}>
          <div className="relative z-10 shadow">
            <BottomBanner onLogoClick={scrollToHome} />
          </div>
        </Suspense>
      </DeferredSection>
    </div>
  )
}

function GuideApp() {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && HOME_SECTION_HASHES.has(location.hash)) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.hash, location.pathname])

  return (
    <PublishedSitesProvider>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<GuideHome />} />
          <Route path="/provincias/bocas-del-toro" element={<BocasDelToro />} />
          <Route path="/provincias/chiriqui" element={<Chiriqui />} />
          <Route path="/provincias/cocle" element={<Cocle />} />
          <Route path="/provincias/colon" element={<Colon />} />
          <Route path="/provincias/darien" element={<Darien />} />
          <Route path="/provincias/herrera" element={<Herrera />} />
          <Route path="/provincias/los-santos" element={<LosSantos />} />
          <Route path="/provincias/panama" element={<Panama />} />
          <Route path="/provincias/panama-oeste" element={<PanamaOeste />} />
          <Route path="/provincias/veraguas" element={<Veraguas />} />
          <Route path="/provincias/comarca-guna-yala" element={<GunaYala />} />
          <Route path="/rivera-pacifica" element={<RiveraPacifica />} />
          <Route path="/sitios/:siteId" element={<SiteInfo />} />
          <Route path="/zonas/:zoneId" element={<ZonePage />} />
        </Routes>
      </Suspense>
    </PublishedSitesProvider>
  )
}

export default GuideApp
