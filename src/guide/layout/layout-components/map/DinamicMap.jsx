import { useNavigate } from 'react-router-dom'
import { useRef, useState } from 'react'
import BocasContainer from './containersMap/ContBocas.jsx'
import ChiriContainer from './containersMap/ContChiriqui.jsx'
import VeraguasContainer from './containersMap/ContVeraguas.jsx'
import CocleContainer from './containersMap/ContCocle.jsx'
import HerreraContainer from './containersMap/ContHerrera.jsx'
import PanamaContainer from './containersMap/ContPanama.jsx'
import ColonContainer from './containersMap/ContColon.jsx'
import GunaYalaContainer from './containersMap/ContGunaYala.jsx'
import DarienContainer from './containersMap/ContDarien.jsx'

import {
  Vera1Container20,
  bocasContainers,
  chiriContainers,
  colonContainers,
  cocleContainers,
  darienContainers,
  externalProvinceDecorations,
  Herrera1Container,
  gunaYalaContainers,
  panamaContainers,
  provinces,
} from './containersPositions.jsx'

function Map() {
  const [activeProvince, setActiveProvince] = useState(null)
  const mapRef = useRef(null)
  const navigate = useNavigate()
  const activeScale = 1.1

  return (
    <div className="mx-auto flex max-w-full flex-col items-center pt-10 pb-25 text-center md:pt-20">
      <div className="w-full max-w-6xl rounded-xl">
        <div className="mb-10 flex flex-col text-center">
          <label className="font-secondary-italic text-3xl text-brand-red">¡Descubre el Panamá que nadie te muestra!</label>
        </div>

        <div ref={mapRef} className="relative mb-6 aspect-[1025/424]">
          {bocasContainers.map((container) => {
            const ContainerComponent = BocasContainer

            return (
              <ContainerComponent
                key={container.id}
                className={container.className}
                bgClassName={container.bgClassName}
                style={container.style}
                onMouseEnter={() => setActiveProvince('bocas-del-toro')}
                onMouseLeave={() => setActiveProvince(null)}
                onClick={() => navigate('/provincias/bocas-del-toro#video')}
              />
            )
          })}

          {chiriContainers.map((container) => {
            const ContainerComponent = ChiriContainer

            return (
              <ContainerComponent
                key={container.id}
                className={container.className}
                bgClassName={container.bgClassName}
                style={container.style}
                onMouseEnter={() => setActiveProvince('chiriqui')}
                onMouseLeave={() => setActiveProvince(null)}
                onClick={() => navigate('/provincias/chiriqui#video')}
              />
            )
          })}

          {Vera1Container20.map((container) => (
            <VeraguasContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('veraguas')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/veraguas#video')}
            />
          ))}

          {Herrera1Container.map((container) => (
            <HerreraContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('herrera')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/herrera#video')}
            />
          ))}

          {cocleContainers.map((container) => (
            <CocleContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('cocle')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/cocle#video')}
            />
          ))}

          {colonContainers.map((container) => (
            <ColonContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('colon')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/colon#video')}
            />
          ))}

          {gunaYalaContainers.map((container) => (
            <GunaYalaContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('guna-yala')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/comarca-guna-yala#video')}
            />
          ))}

          {darienContainers.map((container) => (
            <DarienContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('darien')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/darien#video')}
            />
          ))}

          {panamaContainers.map((container) => (
            <PanamaContainer
              key={container.id}
              className={container.className}
              bgClassName={container.bgClassName}
              style={container.style}
              onMouseEnter={() => setActiveProvince('panama')}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate('/provincias/panama#video')}
            />
          ))}

          {externalProvinceDecorations.map((item) => {
            const LineComponent = item.lineComponent
            return (
              <div
                key={`${item.hoverKey}-line`}
                className="pointer-events-none absolute z-0"
                style={{
                  top: item.lineTop,
                  left: item.lineLeft,
                  width: item.lineWidth,
                }}
              >
                <LineComponent className="h-auto w-full" />
              </div>
            )
          })}

          {provinces.map((province) => (
            <div
              key={province.hoverKey}
              className="pointer-events-none absolute transition duration-300 ease-out drop-shadow-[0_3px_2px_rgba(77,76,76,0.50)]"
              style={{
                top: province.top,
                left: province.left,
                width: province.width,
                zIndex: activeProvince === province.hoverKey ? 50 : (province.zIndex ?? 1),
                transform: activeProvince === province.hoverKey ? `scale(${activeScale})` : 'scale(1)',
                transformOrigin: 'center center',
              }}
            >
              <province.component
                className="pointer-events-auto h-auto w-full"
                onMouseEnter={() => setActiveProvince(province.hoverKey)}
                onMouseLeave={() => setActiveProvince(null)}
                onClick={() => navigate(province.to)}
              />
            </div>
          ))}

          {externalProvinceDecorations.map((item) => (
            <button
              key={`${item.hoverKey}-button`}
              type="button"
              className="font-secondary absolute z-[60] cursor-pointer whitespace-nowrap bg-transparent leading-none tracking-wide transition-transform duration-300 text-[0.50rem] md:text-[0.85rem]"
              style={{
                top: item.buttonTop,
                left: item.buttonLeft,
                color: item.color,
                transform: activeProvince === item.hoverKey ? `scale(${activeScale})` : 'scale(1)',
              }}
              onMouseEnter={() => setActiveProvince(item.hoverKey)}
              onMouseLeave={() => setActiveProvince(null)}
              onClick={() => navigate(item.to)}
            >
              {item.hoverKey === 'guna-yala' ? (
                <>
                  <span className="block text-center leading-tight md:hidden">
                    Guna Yala
                    <span className="block">San Blas</span>
                  </span>
                  <span className="hidden md:inline">{item.alt}</span>
                </>
              ) : (
                item.alt
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Map
