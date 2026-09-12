import TopBar from './components/TopBar.jsx'
import ContextSection from './components/ContextSection.jsx'
import './App.css'

export default function App() {
  return (
    <div className="app">
      <TopBar cartCount={2} />

      {/* TODO (equipo): Hero real — imagen/promo destacada */}
      <section className="stub stub--hero">
        <span>Hero — pendiente</span>
      </section>

      <div className="app__body container">
        {/* TODO (equipo): Sidebar de filtros/categorías */}
        <aside className="stub stub--sidebar">Sidebar — pendiente</aside>

        <div className="app__content">
          <ContextSection />

          {/* TODO (equipo): Main — catálogo consultando el backend GraphQL */}
          <main className="stub stub--main">Main / catálogo — pendiente</main>
        </div>
      </div>

      {/* TODO (equipo): Footer */}
      <footer className="stub stub--footer">Footer — pendiente</footer>
    </div>
  )
}
