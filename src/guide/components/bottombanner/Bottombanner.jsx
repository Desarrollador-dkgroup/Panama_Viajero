import { FaInstagram, FaTiktok, FaFacebook } from "react-icons/fa6";
import LogoCircular from "../../img_test/LogoRectangular.svg";
import politicaDePrivacidadPdf from '../../Politica-de-privacidad.pdf';

function BottomBanner({ onLogoClick }) {
    return (
        <footer className="relative z-20 bg-brand-blue text-brand-white shadow-[0_-12px_30px_rgba(77,76,76,0.15)]">
            <div className="mx-auto max-w-7xl px-6 py-5 md:py-5">
                
                {/* SECCIÓN PRINCIPAL: Logo, Slogan y Redes */}
                <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:items-center md:justify-between pb-5">
                    
                    {/* Logo y Slogan */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left gap-5">
                        <button 
                            className="group cursor-pointer focus:outline-none" 
                            onClick={onLogoClick}
                            aria-label="Ir al inicio"
                        >
                            <img 
                                src={LogoCircular} 
                                alt="Logo IEPA"     
                                className="h-18 w-auto transition-transform duration-300 group-hover:scale-105" 
                            />
                        </button>
                        <div>
                            <h1 className="font-body  text-2xl text-white">¡Descubre el Panamá que nadie te muestra!</h1>
                        </div>
                        
                    </div>
                    
                    {/* Redes Sociales */}
                    <div className="flex flex-col items-center md:items-end gap-4">
                        <h2 className="font-body text-sm font-semibold uppercase tracking-wider text-brand-white/80">
                            ¡Síguenos en nuestras redes!
                        </h2>
                        <div className="flex gap-4">
                            {/* Instagram */}
                            <a href="https://www.instagram.com/panamaviajero.app/" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-white/20 bg-brand-white/5 text-brand-white transition-all duration-300 hover:scale-110 hover:border-brand-white hover:bg-brand-white hover:text-brand-blue"
                            >
                                <FaInstagram size={22}/>
                            </a>
                            {/* Tiktok */}
                            <a href="https://www.tiktok.com/@panamaviajero.app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-white/20 bg-brand-white/5 text-brand-white transition-all duration-300 hover:scale-110 hover:border-brand-white hover:bg-brand-white hover:text-brand-blue"
                            >
                                <FaTiktok size={20}/>
                            </a>
                            {/* Facebook */}
                            <a href="https://www.facebook.com/profile.php?id=61581250713824" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="flex h-11 w-11 items-center justify-center rounded-full border border-brand-white/20 bg-brand-white/5 text-brand-white transition-all duration-300 hover:scale-110 hover:border-brand-white hover:bg-brand-white hover:text-brand-blue"
                            >
                                <FaFacebook size={22} />
                            </a>
                        </div>
                    </div>
                </div>

                {/* Línea Divisoria */}
                <hr className="border-brand-white/15" />
                
                {/* SECCIÓN INFERIOR: Copyright, Legal y Créditos */}
                <div className="pt-5 flex flex-col lg:flex-row items-center justify-between gap-6 font-body text-xs md:text-sm text-brand-white/70 text-center lg:text-left">
                    
                    {/* Copyright y Enlaces Legales */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
                        <div>
                            © {new Date().getFullYear()} <span className="font-semibold text-brand-white">Panamá Viajero</span>.
                        </div>
                        <span className="hidden md:inline text-brand-white/30">•</span>
                        <div className="flex gap-4">
                            <a href={politicaDePrivacidadPdf} 
                            target="_blank"
                            rel="noreferrer" 
                            className="hover:text-brand-white transition">
                                Política de Privacidad
                            </a>
                        </div>
                    </div>

                    {/* Créditos y Contacto */}
                    <div className="flex flex-wrap justify-center gap-x-2 gap-y-1">
                        <span>Desarrollado por <span className="text-brand-white">Davis Marketing</span></span>
                        <span className="hidden md:inline text-brand-white/30">|</span>
                        <span>Contacto: 
                            <a href="mailto:hola@panamaviajero.app" className="text-brand-white hover:text-brand-white/80 transition ml-1">
                                hola@panamaviajero.app
                            </a>
                        </span>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default BottomBanner;
