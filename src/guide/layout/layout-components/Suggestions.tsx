import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { provinceMedia } from '../../destinations/destinations-pages/provinceMedia.js'

const provinceDescriptions: Record<string, string> = {
  'bocas-del-toro': 'Islas caribeñas, cultura y aventuras frente al mar.',
  chiriqui: 'Montañas, café de altura y experiencias de naturaleza.',
  cocle: 'Playas, montañas y tradiciones en el corazón de Panamá.',
  'rivera-pacifica': 'Playas, surf y espectaculares atardeceres.',
  colon: 'Historia caribeña, fortalezas y paisajes tropicales.',
  darien: 'Naturaleza, cultura indígena y aventura.',
  herrera: 'Folclore, gastronomía y tradiciones panameñas.',
  'los-santos': 'Cultura, playas y tradiciones que celebran Panamá.',
  panama: 'Ciudad, historia y experiencias para descubrir.',
  'panama-oeste': 'Playas, montañas y escapadas cerca de la ciudad.',
  veraguas: 'Bosques, costas y aventura en cada recorrido.',
  'comarca-guna-yala': 'Islas paradisíacas de aguas cristalinas.',
}

function getRandomItems(items, limit) {
  const shuffled = [...items]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]]
  }

  return shuffled.slice(0, limit)
}

function Suggestions() {
  const navigate = useNavigate()
  const suggestions = useMemo(() => {
    const riveraPacifica = provinceMedia.find((province) => province.id === 'rivera-pacifica')
    const others = provinceMedia.filter((province) => province.banner && province.id !== 'rivera-pacifica')
    const randomOthers = getRandomItems(others, 2)
    return riveraPacifica ? [riveraPacifica, ...randomOthers] : randomOthers
  }, [])

  return (
  // Se cambió px-4 por pt-16 para balancear el padding top y bottom con pb-16
  <section className="w-full pt-15 pb-16  px-4 bg-gradient-to-r from-[#4956A2] to-[#CD2E4C]">
    
    {/* CORRECCIÓN AQUÍ: Se agregó mx-auto y w-full para que el límite de 6xl funcione centrado */}
    <div className="mx-auto w-full max-w-6xl">
      
      {/* Se quitó text-center innecesario ya que tus textos van a la izquierda */}
      <div className="mb-8">
        <h2 className="font-main text-left text-3xl text-brand-white md:text-5xl">
          Encuentra tu próximo destino
        </h2>
        <p className="font-body-italic mt-3 max-w-2xl text-left text-brand-white md:text-lg">
          Descubre algunos de los lugares más increíbles de Panamá y comienza a planificar tu próxima aventura.
        </p>
      </div>

      {/* Grid o Flex: Para las tarjetas eliminamos mx-auto innecesario aquí porque el padre ya está centrado */}
      <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-8">
        {suggestions.map((province) => (
          <button
            key={province.id}
            type="button"
            aria-label={`Explorar ${province.nombre}`}
            onClick={() => navigate(`${province.path}#video`, { state: { breadcrumbSourceLabel: 'Sugerencias' } })}
            className="group flex w-full max-w-md cursor-pointer flex-col items-center md:w-[355px]"
          >
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-soft transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.20)]">
              <img
                src={province.poster}
                alt={province.nombre}
                loading="lazy"
                decoding="async"
                className="h-[116%] w-full object-cover object-top"
              />
              <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/0" />
            </div>
            <div className="mt-3 w-full overflow-hidden text-center">
              <span className="inline-block font-secondary text-xl md:text-3xl text-brand-white transition-all duration-300 ease-out">
                {province.nombre}
              </span>
              <p className="mt-[-2px] font-body text-sm leading-5 text-brand-white/90 md:text-sm">
                {provinceDescriptions[province.id] || 'Descubre paisajes y experiencias únicas en Panamá.'}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
    
  </section>
)
}

export default Suggestions
