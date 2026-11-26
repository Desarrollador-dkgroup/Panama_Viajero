import { useEffect, useMemo, useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'

import { getActivityIcon } from './activityIcons.js'

function SiteActivities({ site = null }) {
  const [activeActivity, setActiveActivity] = useState(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isImageVisible, setIsImageVisible] = useState(true)
  const [isChangingImage, setIsChangingImage] = useState(false)

  const activities = Array.isArray(site?.actividades) ? site.actividades : []
  const gallery = useMemo(() => {
    const images = Array.isArray(site?.gallery) ? site.gallery.filter(Boolean) : []
    if (images.length > 0) {
      return images
    }

    return site?.banner?.src ? [site.banner.src] : []
  }, [site?.banner?.src, site?.gallery])

  useEffect(() => {
    setActiveImageIndex(0)
    setIsImageVisible(true)
    setIsChangingImage(false)
  }, [gallery.length, site?.id])

  useEffect(() => {
    if (gallery.length <= 1) {
      return
    }

    const adjacentIndexes = [
      (activeImageIndex + 1) % gallery.length,
      (activeImageIndex - 1 + gallery.length) % gallery.length,
    ]

    adjacentIndexes.forEach((index) => {
      const image = new Image()
      image.src = gallery[index]
      image.decode?.().catch(() => {})
    })
  }, [activeImageIndex, gallery])

  const { leftColumnActivities, rightColumnActivities } = useMemo(() => {
    const left = []
    const right = []

    activities.forEach((activity, index) => {
      if (index % 2 === 0) {
        left.push(activity)
      } else {
        right.push(activity)
      }
    })

    return {
      leftColumnActivities: left,
      rightColumnActivities: right,
    }
  }, [activities])

  const currentImage = gallery[activeImageIndex] ?? site?.banner?.src ?? ''
  const totalImages = gallery.length

  const moveImage = async (direction) => {
    if (totalImages <= 1 || isChangingImage) {
      return
    }

    const nextIndex = (activeImageIndex + direction + totalImages) % totalImages
    const nextImage = new Image()
    nextImage.src = gallery[nextIndex]
    setIsChangingImage(true)

    try {
      await nextImage.decode()
    } catch {
      await new Promise((resolve) => {
        if (nextImage.complete) {
          resolve()
          return
        }

        nextImage.onload = resolve
        nextImage.onerror = resolve
      })
    }

    setIsImageVisible(false)
    await new Promise((resolve) => window.setTimeout(resolve, 180))
    setActiveImageIndex(nextIndex)

    window.requestAnimationFrame(() => {
      setIsImageVisible(true)
      setIsChangingImage(false)
    })
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-12">
      <div className="overflow-hidden rounded-[28px] border border-[#4D4C4C]/10 bg-[#FFFFFF]/85 shadow-[0_20px_55px_rgba(77,76,76,0.10)]">
        <div className="border-b border-[#4D4C4C]/10 px-6 py-4 sm:px-8 sm:py-5">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[#CD2E4C]">
            Experiencias
          </p>
          <h2 className="mt-2 font-secondary-italic text-3xl text-[#4D4C4C] sm:text-5xl">
            Lo que te espera
          </h2>
        </div>

        <div className="grid gap-0 md:grid-cols-[0.88fr_1.12fr]">
          <div className="flex justify-center rounded-bl-[28px] border-b border-[#4D4C4C]/10 bg-[#EBEBEB]/30 p-4 sm:p-5 md:block md:border-b-0 md:border-r">
            {totalImages > 0 ? (
              <article className="mx-auto flex h-full w-full max-w-md flex-col">
                <div className="relative overflow-hidden rounded-[22px] border border-[#4D4C4C]/10 bg-[#FFFFFF] shadow-[0_16px_34px_rgba(77,76,76,0.08)]">
                  <div
                    className={`relative h-44 w-full overflow-hidden sm:h-52 md:h-[275px] ${
                      isImageVisible ? 'opacity-100' : 'opacity-0'
                    } transition-[opacity,transform] duration-300 ease-out`}
                  >
                    <img
                      src={currentImage}
                      alt={site?.nombre ?? 'Galería del sitio'}
                      className="h-full w-full object-cover object-center transition-transform duration-500 ease-out"
                    />

                    <button
                      type="button"
                      onClick={() => moveImage(-1)}
                      disabled={isChangingImage}
                      aria-label="Imagen anterior"
                      className="cursor-pointer absolute left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-black/50"
                    >
                      <FiChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={() => moveImage(1)}
                      disabled={isChangingImage}
                      aria-label="Imagen siguiente"
                      className="cursor-pointer absolute right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-black/35 text-white backdrop-blur-sm transition duration-200 hover:scale-105 hover:bg-black/50"
                    >
                      <FiChevronRight className="h-5 w-5" />
                    </button>

                    <div className="absolute right-3 top-3 z-10 rounded-full bg-black/45 px-3 py-1 text-xs font-semibold tracking-[0.18em] text-white backdrop-blur-sm">
                      {activeImageIndex + 1} / {totalImages}
                    </div>
                  </div>
                </div>
                <div className="pt-5">
                  <div className="flex w-fit flex-col">
                    <h3 className="font-secondary text-2xl leading-tight text-[#4D4C4C] sm:text-4xl">
                      {site?.nombre ?? 'Sitio turístico'}
                    </h3>
                    <div className="h-[5px] w-[70%] bg-brand-red"></div>
                  </div>
                </div>
              </article>
            ) : null}
          </div>

          <div className="rounded-b-[28px] md:rounded-br-[28px] p-3 sm:p-4 md:p-5">
            <div className="mx-auto flex w-full max-w-2xl items-center justify-between gap-2 border-b border-[#4D4C4C]/10 pb-4">
              <div>
                <p className="text-md font-semibold uppercase tracking-[0.26em] text-[#4956A2]">
                  Catálogo
                </p>
                <p className="text-md text-[#4D4C4C]/75">
                  {activities.length} nuevas experiencias
                </p>
              </div>
              <div className="rounded-full border border-[#4D4C4C] bg-[#EBEBEB] px-4 py-2 text-sm font-semibold text-[#4D4C4C]">
                {activities.length}
              </div>
            </div>

            <div className="mx-auto mt-4 flex max-h-[350px] w-full max-w-2xl flex-col gap-3 overflow-y-auto overflow-x-hidden pr-2 md:flex-row [scrollbar-width:thin] [scrollbar-color:#4956A2_#EBEBEB]">
              <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
                {leftColumnActivities.map((actividad, index) => {
                  const { Icon } = getActivityIcon(actividad.nombre, actividad.icono)
                  const accent = index % 3 === 0 ? '#4956A2' : index % 3 === 1 ? '#CD2E4C' : '#4D4C4C'
                  const isOpen = activeActivity === actividad.nombre

                  return (
                    <button
                      key={actividad.nombre}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActiveActivity(isOpen ? null : actividad.nombre)}
                      className="group inline-flex w-full min-w-0 cursor-pointer flex-col rounded-[22px] border border-[#4D4C4C]/10 bg-[#FFFFFF] px-4 py-3 text-left transition duration-300 hover:-translate-y-[1px] hover:border-[#4956A2]/25 hover:bg-[#FBFBFB] hover:shadow-[0_10px_24px_rgba(77,76,76,0.08)]"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-secondary-italic leading-tight text-[#4D4C4C] sm:text-md">
                              {actividad.nombre}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-body text-sm leading-6 text-[#4D4C4C]/75">
                            {actividad.descripcion}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>

              <div className="flex w-full min-w-0 flex-1 flex-col gap-3">
                {rightColumnActivities.map((actividad, index) => {
                  const { Icon } = getActivityIcon(actividad.nombre, actividad.icono)
                  const accent = index % 3 === 0 ? '#4956A2' : index % 3 === 1 ? '#CD2E4C' : '#4D4C4C'
                  const isOpen = activeActivity === actividad.nombre

                  return (
                    <button
                      key={actividad.nombre}
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setActiveActivity(isOpen ? null : actividad.nombre)}
                      className="group inline-flex w-full min-w-0 cursor-pointer flex-col rounded-[22px] border border-[#4D4C4C]/10 bg-[#FFFFFF] px-4 py-3 text-left transition duration-300 hover:-translate-y-[1px] hover:border-[#4956A2]/25 hover:bg-[#FBFBFB] hover:shadow-[0_10px_24px_rgba(77,76,76,0.08)]"
                    >
                      <div className="flex items-center gap-2">
                        <div
                          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-white shadow-[0_10px_24px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105"
                          style={{ backgroundColor: accent }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <h4 className="font-secondary-italic leading-tight text-[#4D4C4C] sm:text-md">
                              {actividad.nombre}
                            </h4>
                          </div>
                        </div>
                      </div>

                      <div
                        className={`grid transition-all duration-300 ease-out ${
                          isOpen ? 'mt-3 grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                        }`}
                      >
                        <div className="overflow-hidden">
                          <p className="font-body text-sm leading-6 text-[#4D4C4C]/75">
                            {actividad.descripcion}
                          </p>
                        </div>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SiteActivities
