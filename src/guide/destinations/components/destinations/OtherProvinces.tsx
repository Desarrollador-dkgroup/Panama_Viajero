import { useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { provinceMedia } from '../../destinations-pages/provinceMedia.js';

function getRandomItems(items, limit) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled.slice(0, limit);
}

function AleatorySuggestions() {
    const navigate = useNavigate();
    const location = useLocation();
    const breadcrumbSourceLabel = 'Destinos';
    // Tres destinos al azar entre los que tienen imagen de portada.
    const suggestions = useMemo(
        () => getRandomItems(provinceMedia.filter((province) => province.poster), 3),
        [],
    );

    return (
        <section className="mx-auto w-full max-w-7xl px-4 mt-30">
            <div className="mb-8 flex flex-col items-end md:mr-18">
                <h2 className="font-main md:text-2xl text-5xl text-brand-white/95 md:text-5xl"
                style={{  textShadow: '0 0 6px rgba(0, 0, 0, 0.5)'}}>
                    Otros destinos
                </h2>
                <p className="font-secondary-italic text-right  mt-3 max-w-3xl text-brand-white/95 md:text-lg text-lg"
                style={{  textShadow: '0 0 6px rgba(0, 0, 0, 0.5)'}}>
                    Más allá del horizonte hay un lugar esperando cambiar tu forma de ver el mundo
                </p>
            </div>
            <div className="mx-auto flex max-w-6xl flex-wrap justify-center gap-4 md:justify-start md:gap-8">
                {suggestions.map((province) => (
                    <button
                        key={province.id}
                        type="button"
                        aria-label={`Explorar ${province.nombre}`}
                        onClick={() => navigate(`${province.path}#video`)}
                        className="group flex w-full max-w-md cursor-pointer flex-col items-center md:w-[355px]"
                    >
                        <div
                            className="relative aspect-[16/9] w-full overflow-hidden rounded-lg bg-brand-soft
                            transition-all duration-300 group-hover:scale-105
                            group-hover:shadow-[0_10px_30px_rgba(0,0,0,0.20)]"
                        >
                            <img
                                src={province.poster}
                                alt={province.nombre}
                                loading="lazy"
                                decoding="async"
                                className="h-[116%] w-full object-cover object-top"
                            />
                            <div className="absolute inset-0 bg-black/20 transition-all duration-300 group-hover:bg-black/0" />
                        </div>
                        <div className="mt-1 md:mt-4 w-full overflow-hidden text-center">
                            <span
                                className="leading-tight inline-block font-secondary-italic text-2xl md:text-3xl 
                                text-brand-white/95 transition-all duration-300 ease-out group-hover:scale-105"
                                style={{  textShadow: '0 0 6px rgba(0, 0, 0, 0.5)'}}
                            >
                                {province.nombre}
                            </span>
                        </div>
                    </button>
                ))}
            </div>
        </section>
    );
}

export default AleatorySuggestions;
