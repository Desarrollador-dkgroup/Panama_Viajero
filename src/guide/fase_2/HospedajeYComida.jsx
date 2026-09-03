import { createPortal } from 'react-dom'
import { useMemo, useState } from 'react'
import { FiChevronRight, FiCoffee, FiHome, FiMapPin, FiTag, FiX } from 'react-icons/fi'
import hoteles from './hoteles.js'
import restaurantes from './restaurantes.js'
import ventanaEmergente from '../img_test/Emergente.svg'

function HospedajeYComida({ fallbackImage = '' }) {
  const [activeTab, setActiveTab] = useState('hoteles')
  const [isModalOpen, setIsModalOpen] = useState(false)

  const items = useMemo(() => {
    return activeTab === 'hoteles' ? hoteles : restaurantes
  }, [activeTab])

  const downloadUrl = 'LinkParaDescargar'

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12">
      <div className="overflow-hidden rounded-[32px] border border-white/20 bg-white/20 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
        <div className="px-6 pb-6 pt-7 sm:px-8 sm:pt-9">
          <p className="text-sm font-semibold uppercase tracking-[0.38em] text-white/80">
            Hospedaje y comida
          </p>

          <div className="flex items-center justify-between gap-8 text-white">
            <div>
              <h2 className="mt-4 max-w-3xl font-main text-4xl leading-[0.95] sm:text-6xl lg:text-[4.7rem]">
                ¿Dónde hospedarte
                <br />
                y comer?
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-8">
                Descubre las mejores opciones de alojamiento y restaurantes para disfrutar al máximo tu visita.
              </p>
            </div>

            <div className="relative h-60 w-60 shrink-0" style={{ perspective: '1000px' }}>
              <div
                className="absolute inset-0 transition-transform duration-700 ease-in-out"
                style={{
                  transform: activeTab === 'hoteles' ? 'rotateY(0deg)' : 'rotateY(180deg)',
                  transformStyle: 'preserve-3d',
                }}
              >
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backfaceVisibility: 'hidden' }}
                >
                  <FiHome className="block h-28 w-28 md:h-60 md:w-60" />
                </div>

                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    transform: 'rotateY(180deg)',
                    backfaceVisibility: 'hidden',
                  }}
                >
                  <FiCoffee className="block h-28 w-28 md:h-60 md:w-60" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setActiveTab('hoteles')}
              className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-base font-semibold transition cursor-pointer ${
                activeTab === 'hoteles'
                  ? 'bg-[#4956A2] text-white shadow-[0_12px_28px_rgba(73,86,162,0.26)]'
                  : 'border border-[#D8D9E0] bg-white text-[#4D4C4C] hover:bg-[#F6F7FB]'
              }`}
            >
              <FiHome className="h-4 w-4" />
              Alojamientos
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('restaurantes')}
              className={`inline-flex items-center gap-3 rounded-full px-5 py-3 text-base font-semibold transition cursor-pointer ${
                activeTab === 'restaurantes'
                  ? 'bg-[#4956A2] text-white shadow-[0_12px_28px_rgba(73,86,162,0.26)]'
                  : 'border border-[#D8D9E0] bg-white text-[#4D4C4C] hover:bg-[#F6F7FB]'
              }`}
            >
              <FiCoffee className="h-4 w-4" />
              Restaurantes
            </button>
          </div>
        </div>

        <div className="px-4 pb-8 sm:px-6 sm:pb-9">
          <div className="grid gap-6 lg:grid-cols-3">
            {items.map((item) => {
              const imageSrc = item.imagen || fallbackImage
              const label = activeTab === 'hoteles' ? 'Alojamiento' : 'Restaurante'
              const priceText = item.precio

              return (
                <article
                  key={item.nombre}
                  className="group overflow-hidden rounded-[28px] border border-[#E6E7EE] bg-white shadow-[0_16px_35px_rgba(77,76,76,0.10)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_42px_rgba(77,76,76,0.14)]"
                >
                  <div className="relative h-[235px] overflow-hidden">
                    <img
                      src={imageSrc}
                      alt={item.nombre}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/10 to-transparent" />
                    <div className="absolute left-4 top-4 rounded-full bg-[#4956A2] px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_20px_rgba(73,86,162,0.24)]">
                      {label}
                    </div>
                  </div>

                  <div className="flex flex-col px-5 pb-5 pt-5">
                    <h3 className="font-main text-3xl leading-tight text-[#474B53]">
                      {item.nombre}
                    </h3>
                    <p className="mt-[-7px] text-base font-medium text-[#70757F]">
                      {item.tipo}
                    </p>

                    <div className="mt-2 mb-4 h-px w-full bg-[#E6E7EE]" />

                    <div className="grid grid-cols-2 gap-3 text-[#4D4C4C]/80">
                      <div className="flex flex-col rounded-2xl bg-[#F7F8FC] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#4956A2] shadow-sm">
                            <FiTag className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-6">
                            <span className="block font-medium text-[#70757F]">Desde</span>
                          </p>
                        </div>
                        <span className="mt-2 block text-base font-semibold text-[#4A4F59]">
                          {priceText}
                        </span>
                      </div>

                      <div className="flex flex-col items-start gap-2 rounded-2xl bg-[#F7F8FC] px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-[#4956A2] shadow-sm">
                            <FiMapPin className="h-4 w-4" />
                          </div>
                          <p className="text-sm leading-6">
                            <span className="block font-medium text-[#4A4F59]">Cerca de</span>
                          </p>
                        </div>
                        <span className="ml-1 block text-base font-medium text-[#4A4F59]">
                          {item.ubicacion}
                        </span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setIsModalOpen(true)}
                      className="mt-4 inline-flex w-full items-center justify-center gap-3 rounded-[10px] bg-[#4956A2] py-3 text-lg font-semibold text-white transition duration-300 cursor-pointer hover:-translate-y-[1px] hover:bg-brand-red"
                    >
                      Ver detalles
                      <FiChevronRight className="h-4 w-4" />
                    </button>
                  </div>
                </article>
              )
            })}
          </div>
        </div>
      </div>

      {isModalOpen
        ? createPortal(
            <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 px-4 py-8 backdrop-blur-sm">
              <div className="relative w-full max-w-lg overflow-hidden rounded-[28px] bg-[#F8F8FB] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="cursor-pointer absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#4D4C4C] shadow-sm transition hover:bg-white"
                  aria-label="Cerrar ventana emergente"
                >
                  <FiX className="h-5 w-5" />
                </button>

                <div className="bg-[#F8F8FB] p-5 sm:p-6">
                  <img
                    src={ventanaEmergente}
                    alt="Descargar la app"
                    className="mx-auto w-full max-w-[360px] object-contain"
                  />
                </div>

                <div className="px-6 pb-6 sm:px-8 sm:pb-8">
                  <h3 className="font-main text-2xl text-[#45484F]">
                    Descarga la app
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-[#646873]">
                    Accede a más información y descarga la aplicación desde el enlace siguiente.
                  </p>

                  <a
                    href={downloadUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-5 inline-flex w-full items-center justify-center rounded-full bg-[#4956A2] px-5 py-3.5 text-base font-semibold text-white transition hover:bg-[#3f4a8d]"
                  >
                    Ir a descargar
                  </a>
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </section>
  )
}

export default HospedajeYComida
