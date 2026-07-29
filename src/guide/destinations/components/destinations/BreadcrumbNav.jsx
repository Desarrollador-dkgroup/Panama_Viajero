import { FiChevronRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'

function BreadcrumbNav({ items = [], className = '' }) {
  if (!items.length) return null

  return (
    <nav aria-label="Navegación" className={`mt-5 w-full max-w-full ${className}`}>
      <div className="inline-flex w-full max-w-full min-w-0 flex-wrap items-center gap-1 rounded-[10px] border border-white/15 bg-black/35 px-4 py-2 text-sm shadow-[0_12px_30px_rgba(0,0,0,0.22)] backdrop-blur-md">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const content = (
            <span
              className={
                isLast
                  ? 'font-semibold text-brand-white'
                  : 'font-medium text-brand-white/80 transition hover:text-brand-white'
              }
            >
              {item.label}
            </span>
          )

          return (
            <div key={`${item.label}-${index}`} className="inline-flex min-w-0 items-center gap-1">
              {index > 0 ? <FiChevronRight className="h-4 w-4 shrink-0 text-brand-white/55" /> : null}
              {item.to && !isLast ? (
                <Link to={item.to} className="min-w-0 rounded-full px-1">
                  {content}
                </Link>
              ) : (
                content
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

export default BreadcrumbNav
