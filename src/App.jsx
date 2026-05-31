import { BookingProvider } from './context/BookingContext'
import BookingWizard from './components/BookingWizard'

export default function App() {
  return (
    <BookingProvider>
      <div className="page">
        <header className="topbar">
          <div className="brand">
            <span className="brand__mark">SB</span>
            <span className="brand__name">Smakbordet</span>
          </div>
          <a className="topbar__link" href="tel:+46812345678">08-123 45 67</a>
        </header>

        <main className="hero">
          <div className="hero__intro">
            <p className="eyebrow">Boka bord</p>
            <h1>Boka ditt bord</h1>
            <p className="hero__lead">
              Reservera en plats hos oss på några sekunder – välj tid, bord och fyll i dina uppgifter.
            </p>
          </div>

          <BookingWizard />
        </main>

        <footer className="footer">
          <p>© {new Date().getFullYear()} Smakbordet · Storgatan 1, Stockholm</p>
        </footer>
      </div>
    </BookingProvider>
  )
}
