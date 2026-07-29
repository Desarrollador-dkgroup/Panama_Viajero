import SmartVideo from '../../../components/video/SmartVideo.jsx';
import BreadcrumbNav from './BreadcrumbNav.jsx'

function ProvinceVideo({ provinceData, videoSrc, fixedBackground = false, breadcrumbItems = [] }) {
    const banner = provinceData.banner || {};
    const source = videoSrc || banner.src;

    const mediaClassName = fixedBackground
        ? 'h-full w-full object-cover object-top'
        : 'h-screen w-full object-cover object-top';

    const media = (
        <SmartVideo
            src={source}
            webmSrc={banner.webmSrc}
            fallbackSrc={banner.fallbackSrc}
            className={mediaClassName}
            autoPlay
            poster={banner.poster}
            preload="none"
            eager
        />
    );

    if (fixedBackground) {
        return (
            <section id="video" className="relative min-h-screen overflow-hidden">
                <div className="pointer-events-none fixed inset-0 -z-10 bg-brand-charcoal">
                    {media}
                </div>
                <div className="relative z-10 flex min-h-screen items-start px-4 md:items-center">
                    <div className="mt-24 w-full max-w-md md:mt-0 md:ml-15">
                        <BreadcrumbNav items={breadcrumbItems} className="mb-3 mt-0" />
                        <div className="rounded-xl border border-white/10 bg-black/15 p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                        <h1
                            className="font-main text-6xl font-bold brightness-150 text-brand-white md:pb-4 md:text-6xl"
                        >
                            {provinceData.nombre}
                        </h1>
                        <p className="font-body text-lg leading-7 text-brand-white/90">
                            {provinceData.descripcionCorta}
                        </p>
                        </div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section id="video">
            <div className="relative z-0">
                {media}
                <div className="absolute inset-0 z-10 flex items-start bg-gradient-to-r from-brand-charcoal/70 via-brand-charcoal/35 to-transparent px-4 md:items-center">
                    <div className="mt-24 w-full max-w-md md:mt-0 md:ml-15">
                        <BreadcrumbNav items={breadcrumbItems} className="mb-3 mt-0" />
                        <div className="rounded-xl border border-white/15 bg-black/35 p-8 shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-md">
                        <h1 className="font-main text-6xl font-bold brightness-150 text-brand-white md:pb-4 md:text-6xl"
                        >
                            {provinceData.nombre}
                        </h1>
                        <p className="font-body text-lg leading-7 text-brand-white/90">
                            {provinceData.descripcionCorta}
                        </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ProvinceVideo;
