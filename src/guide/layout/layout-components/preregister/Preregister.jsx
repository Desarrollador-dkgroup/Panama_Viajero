import { useState } from "react";
import politicaDePrivacidadPdf from "../../../Politica-de-privacidad.pdf";

const PREREGISTRATION_API_URL = import.meta.env.VITE_PREREGISTRATION_API_URL ?? "";

const initialForm = {
    fullName: "",
    phone: "",
    email: "",
    acceptedPrivacyPolicy: false,
};

function IconBase({ children, className = "" }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className={className}
        >
            {children}
        </svg>
    );
}

function UserIcon({ className = "" }) {
    return (
        <IconBase className={className}>
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </IconBase>
    );
}

function PhoneIcon({ className = "" }) {
    return (
        <IconBase className={className}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.8 19.8 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72l.34 2.74a2 2 0 0 1-.57 1.72L7.1 9.9a16 16 0 0 0 7 7l1.72-1.78a2 2 0 0 1 1.72-.57l2.74.34A2 2 0 0 1 22 16.92Z" />
        </IconBase>
    );
}

function MailIcon({ className = "" }) {
    return (
        <IconBase className={className}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
        </IconBase>
    );
}

function Preregister({ onViewSite = null }) {
    const [form, setForm] = useState(initialForm);
    const [status, setStatus] = useState({
        loading: false,
        error: "",
        success: "",
    });

    function handleChange(event) {
        const { name, value, type, checked } = event.target;

        setForm((current) => ({
            ...current,
            [name]: type === "checkbox" ? checked : value,
        }));
    }

    async function handleSubmit(event) {
        event.preventDefault();
        setStatus({ loading: true, error: "", success: "" });

        if (!PREREGISTRATION_API_URL) {
            setStatus({
                loading: false,
                error: "Falta configurar VITE_PREREGISTRATION_API_URL",
                success: "",
            });
            return;
        }

        try {
            const response = await fetch(PREREGISTRATION_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    fullName: form.fullName,
                    phone: form.phone,
                    email: form.email,
                    acceptedPrivacyPolicy: form.acceptedPrivacyPolicy,
                }),
            });

            const result = await response.json().catch(() => null);

            if (!response.ok || !result?.ok) {
                throw new Error(result?.error || "No se pudo completar el registro");
            }

            setForm(initialForm);
            setStatus({
                loading: false,
                error: "",
                success: "Registro enviado correctamente.",
            });
        } catch (error) {
            setStatus({
                loading: false,
                error:
                    error instanceof Error
                        ? error.message
                        : "Ocurrio un error inesperado",
                success: "",
            });
        }
    }

    return (
        <div className="max-w-full md:p-30">
            <div className="mx-auto max-w-4xl rounded-xl border border-brand-blue/15 bg-brand-white p-8 shadow-[0_18px_45px_rgba(77,76,76,0.15)]">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="border-b border-brand-soft pb-4">
                        <div className="flex flex-col items-start md:items-end">
                            {/* Desktop */}
                            <div className="hidden md:flex items-baseline gap-2">
                                <span className="font-body text-xl text-brand-charcoal/90">
                                    Regístrate y comienza tu
                                </span>

                                <span className="font-main text-3xl font-bold text-brand-red">
                                    próxima aventura.
                                </span>
                            </div>

                            {/* Mobile */}
                            <div className="flex flex-col md:hidden leading-tight">
                                <span className="font-body text-xl text-brand-charcoal/90">
                                    Regístrate y comienza tu
                                </span>

                                <div className="flex items-baseline gap-2">
                                    <span className="font-main text-3xl font-bold text-brand-red">
                                        próxima aventura.
                                    </span>
                                </div>
                            </div>

                            <span className="text-end font-body text-sm text-brand-charcoal/90 ">
                                Participa para ganar una estadía para 2 personas y sé uno de los
                                primeros en descubrir experiencias, destinos y promociones exclusivas de Panamá Viajero.
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <div className="relative">
                            <UserIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-blue" />
                            <input
                                type="text"
                                name="fullName"
                                value={form.fullName}
                                onChange={handleChange}
                                placeholder="Nombre completo"
                                required
                                className="font-body w-full rounded-lg border-2 border-brand-soft p-3 pl-10 text-brand-charcoal outline-brand-blue transition placeholder:text-brand-charcoal/75 focus:border-brand-blue hover:border-brand-blue/90"
                            />
                        </div>

                        <div className="relative">
                            <PhoneIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-blue" />
                            <input
                                type="tel"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                placeholder="Celular"
                                required
                                className="font-body w-full rounded-lg border-2 border-brand-soft p-3 pl-10 text-brand-charcoal outline-brand-blue transition placeholder:text-brand-charcoal/75 focus:border-brand-blue hover:border-brand-blue/90"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col gap-4 md:flex-row">
                            <div className="relative flex-1">
                                <MailIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-brand-blue" />
                                <input
                                    type="email"
                                    name="email"
                                    value={form.email}
                                    onChange={handleChange}
                                    placeholder="Correo electrónico"
                                    required
                                    className="font-body w-full rounded-lg border-2 border-brand-soft p-3 pl-10 text-brand-charcoal outline-brand-blue transition placeholder:text-brand-charcoal/75 focus:border-brand-blue hover:border-brand-blue/90"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={status.loading}
                                className="font-secondary cursor-pointer rounded-lg bg-brand-red px-8 py-3 text-brand-white transition-colors hover:bg-brand-blue disabled:cursor-not-allowed disabled:opacity-70"
                            >
                                {status.loading ? "Registrando..." : "Quiero registrarme"}
                            </button>
                        </div>

                        <div className="flex items-start text-sm text-brand-charcoal/90 justify-between">
                            <div className="flex gap-2">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    name="acceptedPrivacyPolicy"
                                    checked={form.acceptedPrivacyPolicy}
                                    onChange={handleChange}
                                    required
                                    className="h-4 w-4 cursor-pointer accent-brand-blue"
                                />
                                <label htmlFor="terms" className="font-body">
                                    He leido y acepto la{" "}
                                    <a
                                        href={politicaDePrivacidadPdf}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="cursor-pointer underline hover:text-brand-blue"
                                    >
                                        politica de privacidad
                                    </a>
                                </label>
                            </div>
                            <div className="text-end">
                                <p>Registro gratuito</p>
                                <p>Sin tarjetas de crédito</p>
                            </div>
                        </div>


                        {status.error ? (
                            <p className="font-body text-sm text-brand-red">{status.error}</p>
                        ) : null}

                        {status.success ? (
                            <div className="flex flex-col gap-3">
                                <p className="font-body text-base font-semibold text-brand-red md:text-lg">
                                    {status.success}
                                </p>

                                {typeof onViewSite === "function" ? (
                                    <button
                                        type="button"
                                        onClick={onViewSite}
                                        className="w-full cursor-pointer rounded-full bg-gradient-to-r from-[#5864c7] to-[#cd2e4c] px-6 py-3 text-sm font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-2xl active:scale-100 sm:w-fit"
                                    >
                                        Ver sitio
                                    </button>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Preregister;
