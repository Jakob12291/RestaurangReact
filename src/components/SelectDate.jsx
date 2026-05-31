import { useState } from 'react'
import { useBooking } from '../context/BookingContext'

const TIDER = ['12:00', '13:00', '14:00', '17:00', '18:00', '19:00', '20:00', '21:00']

function idag() {
  return new Date().toISOString().slice(0, 10)
}

export default function SelectDate() {
  const { data, updateData, next } = useBooking()
  const [local, setLocal] = useState({
    date: data.date || idag(),
    time: data.time || '',
    guests: data.guests || 2,
  })
  const [errors, setErrors] = useState({})

  function validate() {
    const e = {}
    if (!local.date) e.date = 'Välj ett datum'
    else if (local.date < idag()) e.date = 'Datumet kan inte vara i det förflutna'
    if (!local.time) e.time = 'Välj en tid'
    if (!local.guests || local.guests < 1) e.guests = 'Ange minst 1 gäst'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    // Nollställ valt bord om tiden ändrats sedan tidigare.
    updateData({ ...local, table: null })
    next()
  }

  return (
    <form className="step" onSubmit={handleSubmit} noValidate>
      <h2 className="step__title">När vill du komma?</h2>
      <p className="step__lead">Välj datum, tid och hur många ni är.</p>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="date">Datum</label>
          <input
            id="date"
            type="date"
            min={idag()}
            value={local.date}
            onChange={(e) => setLocal({ ...local, date: e.target.value })}
            className={errors.date ? 'invalid' : ''}
          />
          {errors.date && <span className="field__error">{errors.date}</span>}
        </div>

        <div className="field">
          <label htmlFor="guests">Antal gäster</label>
          <div className="stepper-input">
            <button type="button" onClick={() => setLocal({ ...local, guests: Math.max(1, local.guests - 1) })} aria-label="Färre gäster">−</button>
            <input
              id="guests"
              type="number"
              min="1"
              max="20"
              value={local.guests}
              onChange={(e) => setLocal({ ...local, guests: Number(e.target.value) })}
            />
            <button type="button" onClick={() => setLocal({ ...local, guests: Math.min(20, local.guests + 1) })} aria-label="Fler gäster">+</button>
          </div>
          {errors.guests && <span className="field__error">{errors.guests}</span>}
        </div>
      </div>

      <div className="field">
        <label>Tid</label>
        <div className="time-grid">
          {TIDER.map((t) => (
            <button
              type="button"
              key={t}
              className={`time-chip ${local.time === t ? 'time-chip--active' : ''}`}
              onClick={() => setLocal({ ...local, time: t })}
            >
              {t}
            </button>
          ))}
        </div>
        {errors.time && <span className="field__error">{errors.time}</span>}
      </div>

      <div className="step__actions">
        <span />
        <button type="submit" className="btn btn--primary">Visa lediga bord →</button>
      </div>
    </form>
  )
}
