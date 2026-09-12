import { useState, type FormEvent } from 'react'
import './TopBar.css'

const CATEGORIAS = ['Catálogo', 'Tonos']

interface TopBarProps {
  cartCount?: number
  onSearch?: (query: string) => void
  categorias?: string[]
}

/** Isotipo simplificado: trazo curvo + destello, tal como lo describe el manual (3.1). */
function Isotipo() {
  return (
    <svg width="26" height="26" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <circle cx="10" cy="7" r="1.4" fill="var(--beige)" />
      <circle cx="14.5" cy="6.2" r="0.7" fill="var(--beige)" />
      <path
        d="M9 12a9 9 0 1 0 14 7.2"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}

function IconSearch() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <line x1="21" y1="21" x2="15.5" y2="15.5" strokeLinecap="round" />
    </svg>
  )
}

function IconHeart() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path
        d="M12 20s-7.5-4.6-9.8-9.2C.7 7.5 2.3 4 5.9 3.4c2-.3 3.9.6 5.1 2.3 1.2-1.7 3.1-2.6 5.1-2.3 3.6.6 5.2 4.1 3.7 7.4C19.5 15.4 12 20 12 20Z"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconUser() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <circle cx="12" cy="8" r="3.5" />
      <path d="M4.5 20c1.4-3.6 4.4-5.5 7.5-5.5s6.1 1.9 7.5 5.5" strokeLinecap="round" />
    </svg>
  )
}

function IconBag() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <path d="M6.5 8.5h11l.9 11.5a1.5 1.5 0 0 1-1.5 1.6H7.1a1.5 1.5 0 0 1-1.5-1.6l.9-11.5Z" strokeLinejoin="round" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" strokeLinecap="round" />
    </svg>
  )
}

/**
 * TopBar del home, siguiendo el Manual de Identidad Nuvé (10.1):
 * encabezado en Ciruela con lockup reverso. Carrito, favoritos y
 * perfil van solo con ícono (7.3); Catálogo y Tonos llevan texto.
 */
export default function TopBar({ cartCount = 0, onSearch = () => {}, categorias = CATEGORIAS }: TopBarProps) {
  const [query, setQuery] = useState('')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    onSearch(query.trim())
  }

  return (
    <header className="topbar">
      <div className="topbar__inner container">
        <a className="topbar__logo" href="#home">
          <Isotipo />
          <span className="topbar__wordmark">
            Nuvé
            <span className="topbar__tagline">Maquillaje y belleza</span>
          </span>
        </a>

        <nav className="topbar__nav" aria-label="Categorías">
          {categorias.map((cat) => (
            <a key={cat} className="topbar__link" href={`#${cat.toLowerCase()}`}>
              {cat}
            </a>
          ))}
        </nav>

        <div className="topbar__actions">
          <form className="topbar__search" onSubmit={handleSubmit} role="search">
            <IconSearch />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Encuentra tu tono"
              aria-label="Buscar productos"
            />
          </form>

          <button className="topbar__icon-btn" type="button" aria-label="Favoritos">
            <IconHeart />
          </button>

          <button className="topbar__icon-btn" type="button" aria-label="Mi cuenta">
            <IconUser />
          </button>

          <button className="topbar__icon-btn" type="button" aria-label="Carrito">
            <IconBag />
            {cartCount > 0 && <span className="topbar__badge">{cartCount}</span>}
          </button>
        </div>
      </div>
    </header>
  )
}
