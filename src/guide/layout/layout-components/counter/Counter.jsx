import { RxCross2 } from 'react-icons/rx'
import { useEffect } from 'react'
import VentanaEmergente from '../../../img_test/VEMERGENTE.svg'
import Logo from '../../../img_test/LogoRectangularNegro.svg'
import Playstore from '../../../img_test/Playstore.svg'
import Applestore from '../../../img_test/Applestore.svg'

const preloadedPopupImage = new Image()
preloadedPopupImage.src = VentanaEmergente

function CountdownModal({ onClose, onPreregister }) {
    useEffect(() => {
        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        return () => {
            document.body.style.overflow = previousOverflow
        }
    }, [])

    return (
        <div className="fixed inset-0 z-[500] flex md:items-center md:justify-center bg-[#081020]/70 px-4 py-2 backdrop-blur-md">
            <div className="relative w-full max-w-6xl overflow-hidden rounded-[30px] border border-white/20 shadow-[0_35px_120px_rgba(0,0,0,0.45)]">
                <div className="absolute inset-x-0 top-0 z-30 h-2 bg-gradient-to-r from-brand-red via-[#5864c7] to-brand-red" />

                <button
                    type="button"
                    onClick={onClose}
                    className="absolute right-4 top-4 z-40 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-black/10 bg-white/90 text-brand-charcoal shadow-[0_10px_28px_rgba(0,0,0,0.18)] backdrop-blur transition duration-200 hover:scale-105 hover:bg-white sm:right-5 sm:top-5 sm:h-11 sm:w-11"
                    aria-label="Cerrar ventana emergente"
                >
                    <RxCross2 className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                </button>

                <div className="grid h-full grid-rows-[auto_1fr] md:h-auto md:grid-cols-[1fr_0.95fr] md:grid-rows-none">
                    <div className="relative flex min-h-[400px] flex-col items-center justify-between overflow-hidden bg-[#f6f7ff] px-5 sm:min-h-[460px] sm:px-8 sm:pb-8 md:min-h-[620px] md:items-start md:px-10 md:pt-10">
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(88,100,199,0.16),transparent_36%),radial-gradient(circle_at_bottom_right,rgba(205,46,76,0.12),transparent_35%)]" />

                        <img
                            className="absolute left-5 top-5 z-20 h-10 w-auto sm:h-12 md:left-8 md:top-8 md:h-14"
                            src={Logo}
                            alt=""
                        />

                        <div className="relative z-10 flex md:w-full w-80 flex-1 items-center justify-center md:mb-0 md:mb-[-100px] mb-[-60px]">
                            <img
                                src={VentanaEmergente}
                                alt="Promoción"
                                loading="eager"
                                fetchPriority="high"
                                decoding="async"
                                className="w-400"
                            />
                        </div>

                        <div className="relative z-20 mt-[-15px] flex w-full flex-col items-start text-center md:text-left">
                            <h1 className="text-sm font-bold text-brand-blue">¡Espéralo pronto!</h1>
                            <h2 className="text-2xl font-secondary text-[#CD2E4C]">Octubre 2026</h2>
                            <div className="mt-[1px] w-45 border-1 border-brand-blue/50" />

                            <div className="mt-[-10px] ml-[-14px] flex items-center justify-center md:justify-start">
                                <img className="mr-[-15px] h-15 w-auto sm:h-13 md:h-20" src={Playstore} alt="Google Play" />
                                <img className="h-15 w-auto sm:h-13 md:h-20" src={Applestore} alt="App Store" />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-hidden bg-gradient-to-br from-[#141936] via-[#2c3568] to-[#5864c7] px-6 py-8 text-white sm:px-9 sm:py-10 md:flex md:flex-col md:justify-center md:px-11 md:py-14">
                        <div className="absolute -right-20 -top-20 h-52 w-52 rounded-full bg-white/10 blur-3xl" />
                        <div className="absolute -bottom-24 -left-20 h-64 w-64 rounded-full bg-brand-red/20 blur-3xl" />

                        <div className="relative z-10 mx-auto max-w-md text-center md:mx-0 md:text-left">
                            <h2 className="md:mt-6 font-secondary text-4xl leading-[0.95] sm:text-5xl md:text-[3.7rem] ">
                                Descubre el Panamá
                                <span className="block text-[#CD2E4C]">que nadie te</span>
                                <span className="block text-[#CD2E4C]">muestra</span>
                            </h2>

                            <p className="mx-auto mt-5 max-w-sm font-body text-sm leading-6 text-white/80 sm:text-base md:mx-0 hidden md:block">
                                Encuentra destinos, hospedajes, restaurantes, tours y experiencias para explorar Panamá desde una sola aplicación.
                            </p>

                            <div className="mt-2 flex flex-col items-center gap-4 md:mt-8 sm:flex-row sm:justify-center md:justify-start">
                                <button
                                    type="button"
                                    onClick={onPreregister}
                                    className="w-full cursor-pointer rounded-full bg-white px-7 py-3.5 text-sm font-bold text-brand-charcoal shadow-[0_14px_30px_rgba(0,0,0,0.22)] transition duration-200 hover:-translate-y-1 hover:bg-white/95 sm:w-auto"
                                >
                                    Empieza a explorar
                                </button>

                                <p className="max-w-[220px] font-body text-sm leading-5 text-white/80">
                                    y participa por una estadía para 2 personas.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CountdownModal
