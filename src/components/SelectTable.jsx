import { useCallback, useEffect, useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { getAvailableTables } from '../services/api'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

export default function SelectTable() {
  const { data, updateData, next, back } = useBooking()
  const [tables, setTables] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(data.table?.id ?? null)

  const fetchTables = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await getAvailableTables({
        date: data.date,
        time: data.time,
        guests: data.guests,
      })
      setTables(result)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [data.date, data.time, data.guests])

  useEffect(() => {
    fetchTables()
  }, [fetchTables])

  function choose(table) {
    setSelectedId(table.id)
    updateData({ table })
  }

  function handleNext() {
    const table = tables.find((t) => t.id === selectedId)
    if (table) {
      updateData({ table })
      next()
    }
  }

  return (
    <div className="step">
      <h2 className="step__title">Välj ditt bord</h2>
      <p className="step__lead">
        Lediga bord {new Date(`${data.date}T${data.time}`).toLocaleDateString('sv-SE')} kl. {data.time} för {data.guests} gäster.
      </p>

      {loading && <Spinner text="Söker lediga bord…" />}

      {!loading && error && <ErrorMessage message={error} onRetry={fetchTables} />}

      {!loading && !error && tables.length === 0 && (
        <div className="empty">
          <div className="empty__icon">🕯️</div>
          <p>Inga lediga bord för vald tid.</p>
          <button className="btn btn--ghost" onClick={back}>Välj en annan tid</button>
        </div>
      )}

      {!loading && !error && tables.length > 0 && (
        <>
          <div className="table-grid">
            {tables.map((t) => (
              <button
                key={t.id}
                type="button"
                className={`table-card ${selectedId === t.id ? 'table-card--active' : ''}`}
                onClick={() => choose(t)}
              >
                <div className="table-card__icon">🍽️</div>
                <div className="table-card__no">Bord {t.bordsnummer}</div>
                <div className="table-card__cap">Upp till {t.kapacitet} gäster</div>
                {selectedId === t.id && <div className="table-card__check">✓ Vald</div>}
              </button>
            ))}
          </div>

          <div className="step__actions">
            <button type="button" className="btn btn--ghost" onClick={back}>← Tillbaka</button>
            <button type="button" className="btn btn--primary" onClick={handleNext} disabled={!selectedId}>
              Fortsätt →
            </button>
          </div>
        </>
      )}
    </div>
  )
}
