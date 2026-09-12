import type { ReactElement } from 'react'
import './ContextSection.css'

type IconName = 'truck' | 'leaf' | 'refresh' | 'drop'

interface ContextItem {
  icon: IconName
  titulo: string
  texto: string
}

const DEFAULT_ITEMS: ContextItem[] = [
  {
    icon: 'truck',
    titulo: 'Envío en 24–48 horas',
    texto: 'A toda la república, con seguimiento en tiempo real.',
  },
  {
    icon: 'leaf',
    titulo: 'Fórmulas veganas',
    texto: 'Cruelty-free: ningún producto se prueba en animales.',
  },
  {
    icon: 'refresh',
    titulo: 'Devoluciones sin preguntas',
    texto: 'Tienes 30 días para cambiar de opinión.',
  },
  {
    icon: 'drop',
    titulo: 'Un tono para cada piel',
    texto: 'Más de 40 variantes de tono por línea de producto.',
  },
]

const ICONS: Record<IconName, ReactElement> = {
  truck: (
    <path d="M2 6.5h11v9H2v-9Zm11 3h4.2l2.8 3v3h-7v-6Z M6 18.2a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Zm10.5 0a1.7 1.7 0 1 0 0-3.4 1.7 1.7 0 0 0 0 3.4Z" />
  ),
  leaf: <path d="M4 20c0-7.5 5.5-14 14-14 0 7.5-5.5 14-14 14Zm0 0c2-3 4.5-5.4 8-7.2" />,
  refresh: <path d="M4 12a8 8 0 0 1 13.7-5.6M20 12a8 8 0 0 1-13.7 5.6M17 4v4h-4M7 20v-4h4" />,
  drop: <path d="M12 3.5c3.5 4.3 6 7.9 6 11a6 6 0 1 1-12 0c0-3.1 2.5-6.7 6-11Z" />,
}

/** Íconos con trazo 1.5px sobre grilla 24px, al estilo Phosphor Regular (sección 7). */
function Icon({ name }: { name: IconName }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {ICONS[name]}
    </svg>
  )
}

/**
 * Franja "Encuentra tu tono ideal": va entre el hero y el catálogo
 * (main). Tarjetas en Superficie con borde Línea y radio 20px, según
 * el tratamiento de tarjetas del manual (10.1). Recibe items por
 * props para que el resto del equipo pueda cambiar el contenido sin
 * tocar el componente.
 */
export default function ContextSection({ items = DEFAULT_ITEMS }: { items?: ContextItem[] }) {
  return (
    <section className="context" aria-label="Por qué comprar en Nuvé">
      <div className="context__inner container">
        {items.map((item) => (
          <article className="context__card" key={item.titulo}>
            <span className="context__icon">
              <Icon name={item.icon} />
            </span>
            <h3 className="context__titulo">{item.titulo}</h3>
            <p className="context__texto">{item.texto}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
