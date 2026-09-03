import { useEffect, useState } from 'react'
import { FiMenu } from 'react-icons/fi'
import LogoVertical from '../../img_test/LogoVertical.svg'
import LogoCuadrado from '../../img_test/LogoCuadrado.svg'

function IconBase({ children }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className="h-[15px] w-[15px]"
    >
      {children}
    </svg>
  )
}

function UsersIcon(props) {
  return (
    <span {...props}>
      <IconBase>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </IconBase>
    </span>
  )
}

function MapPinIcon(props) {
  return (
    <span {...props}>
      <IconBase>
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </IconBase>
    </span>
  )
}


function ClipboardPenIcon(props) {
  return (
    <span {...props}>
      <IconBase>
        <path d="M9 5h6" />
        <path d="M9 3h6a2 2 0 0 1 2 2v1H7V5a2 2 0 0 1 2-2Z" />
        <path d="M7 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h5" />
        <path d="M18 8h.01" />
        <path d="M14 20h7" />
        <path d="m17.5 12.5 2 2L14 20l-2.5.5L12 18z" />
      </IconBase>
    </span>
  )
}

function Menu({
  onLogoClick,
  onPreregisterClick,
  onMapClick,
  onUsClick,
  hideMobileMenu = false,
}) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const closeMenu = () => setIsOpen(false)
  const goToRegister = () => {
    closeMenu()
    onPreregisterClick?.()
  }
  const goToHome = () => {
    closeMenu()
    onLogoClick?.()
  }
  const goToMap = () => {
    closeMenu()
    onMapClick?.()
  }
  const goToUs = () => {
    closeMenu()
    onUsClick?.()
  }

  return (
    <div
      className="relative z-[100] bg-gradient-to-b from-brand-charcoal/80 pt-3 to-transparent pb-5 backdrop-blur-[1px]"
    >
      <div className="flex w-full items-center justify-between px-3  text-md text-brand-white md:pt-0 md:pl-10 md:pr-30">
        <button className="cursor-pointer transition hover:scale-110" onClick={goToHome}>
          <img src={LogoCuadrado} alt="Logo IEPA" className="h-12 w-auto max-w-full" />
        </button>

        <div className="hidden gap-8 font-secondary md:flex">
          <button
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-all ease-out hover:scale-105 hover:bg-brand-white/15 hover:text-brand-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            onClick={goToUs}
          >
            <UsersIcon className="text-brand-red opacity-0 transition-opacity group-hover:opacity-100" />
            <span>Nosotros</span>
          </button>
          <button
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-all ease-out hover:scale-105 hover:bg-brand-white/15 hover:text-brand-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            onClick={goToMap}
          >
            <MapPinIcon className="text-brand-red opacity-0 transition-opacity group-hover:opacity-100" />
            <span>Destinos</span>
          </button>
          <button
            className="group flex cursor-pointer items-center gap-2 rounded-full px-3 py-2 transition-all ease-out hover:scale-105 hover:bg-brand-white/15 hover:text-brand-white hover:shadow-[0_0_30px_rgba(255,255,255,0.15)]"
            onClick={goToRegister}
          >
            <ClipboardPenIcon className="text-brand-red opacity-0 transition-opacity group-hover:opacity-100" />
            <span>Registro</span>
          </button>
        </div>

        {!hideMobileMenu && (
          <button
            type="button"
            aria-label="Abrir menu"
            className="mr-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border 
            border-white/20 bg-brand-charcoal/70 text-brand-white shadow-[0_8px_24px_rgba(0,0,0,0.22)] 
            transition-all duration-300 ease-out hover:bg-brand-red hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <FiMenu className="h-6 w-6" aria-hidden="true" strokeWidth={2.5} />
          </button>
        )}

        <div className="hidden md:block" />

        {!hideMobileMenu && (
          <>
            <div
              className={`fixed inset-0 z-40 h-screen bg-black/50 transition-opacity duration-300 ${
                isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
              }`}
              onClick={closeMenu}
            />

            <div
              className={`fixed inset-y-0 right-0 z-50 h-screen w-2/3 bg-brand-charcoal text-brand-white shadow-2xl shadow-black/60 transition-transform duration-300 ease-in-out sm:w-1/2 ${
                isOpen ? 'translate-x-0' : 'translate-x-full'
              }`}
            >
              <div className="flex flex-col gap-8 py-6">
                <div className="flex flex-col items-center gap-3">
                  <button className="cursor-pointer transition hover:scale-110" onClick={goToHome}>
                    <img src={LogoVertical} alt="Logo IEPA" className="h-25 w-auto max-w-full" />
                  </button>
                </div>

                <div className="font-secondary ml-3 flex flex-col items-start gap-2.5">
                  <button className="font-secondary rounded-full px-4 py-2 transition-all duration-300 ease-out hover:bg-brand-white/10 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]" onClick={goToUs}>
                    Nosotros
                  </button>
                  <button className="font-secondary rounded-full px-4 py-2 transition-all duration-300 ease-out hover:bg-brand-white/10 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]" onClick={goToMap}>
                    Destinos
                  </button>
                  <button className="font-secondary rounded-full px-4 py-2 transition-all duration-300 ease-out hover:bg-brand-white/10 hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]" onClick={goToRegister}>
                    Registro
                  </button>
                </div>

                <div className="mt-15 flex justify-center">
                  <button
                    className="font-secondary rounded-lg bg-brand-red px-5 py-2 text-brand-white transition-all duration-300 ease-out hover:bg-brand-blue hover:shadow-[0_8px_24px_rgba(255,255,255,0.12)]"
                    onClick={goToRegister}
                  >
                    Registrarme
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Menu
