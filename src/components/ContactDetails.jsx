import { useState } from 'react'
import { useBooking } from '../context/BookingContext'
import { createBooking } from '../services/api'
import Spinner from './Spinner'
import ErrorMessage from './ErrorMessage'

export default function ContactDetails() {
  const { data, updateData, next, back, setConfirmation } = useBooking()
  const [local, setLocal] = useState({
    name: data.name || '',
    phone: data.phone || '',
    email: data.email || '',
  })
  const [errors, setErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  function validate() {
    const e = {}
    if (!local.name.trim()) e.name = 'Ange ditt namn'
    if (!local.phone.trim()) e.phone = 'Ange ditt telefonnummer'
    if (local.email && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(local.email)) e.email = 'Ange en giltig e-postadress'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev) {
    ev.preventDefault()
    if (!validate()) return
    updateData(local)
    setSubmitting(true)
    setSubmitError('')
    try {
      const booking = await createBooking({
        bordId: data.table.id,
        date: data.date,
        time: data.time,
        guests: data.guests,
        name: local.name.trim(),
        phone: local.phone.trim(),
        email: local.email.trim(),
      })
      setConfirmation(booking)
      next()
    } catch (err) {
      setSubmitError(err.message)
    } finally {
      setSubmitting(false)
    }
  }

  if (submitting) return <Spinner text="Skickar din bokning…" />

  return (
    <form className="step" onSubmit={handleSubmit} noValidate>
      <h2 className="step__title">Dina uppgifter</h2>
      <p className="step__lead">Sista steget – fyll i dina kontaktuppgifter.</p>

      <div className="summary-pill">
        <span>🍽️ Bord {data.table?.bordsnummer}</span>
        <span>📅 {new Date(`${data.date}T${data.time}`).toLocaleDateString('sv-SE')}</span>
        <span>🕒 {data.time}</span>
        <span>👥 {data.guests} gäster</span>
      </div>

      {submitError && <ErrorMessage message={submitError} />}

      <div className="field">
        <label htmlFor="name">Namn</label>
        <input
          id="name"
          type="text"
          value={local.name}
          placeholder="För- och efternamn"
          onChange={(e) => setLocal({ ...local, name: e.target.value })}
          className={errors.name ? 'invalid' : ''}
        />
        {errors.name && <span className="field__error">{errors.name}</span>}
      </div>

      <div className="field-grid">
        <div className="field">
          <label htmlFor="phone">Telefon</label>
          <input
            id="phone"
            type="tel"
            value={local.phone}
            placeholder="070-123 45 67"
            onChange={(e) => setLocal({ ...local, phone: e.target.value })}
            className={errors.phone ? 'invalid' : ''}
          />
          {errors.phone && <span className="field__error">{errors.phone}</span>}
        </div>

        <div className="field">
          <label htmlFor="email">E-post <span className="muted">(valfritt)</span></label>
          <input
            id="email"
            type="email"
            value={local.email}
            placeholder="namn@exempel.se"
            onChange={(e) => setLocal({ ...local, email: e.target.value })}
            className={errors.email ? 'invalid' : ''}
          />
          {errors.email && <span className="field__error">{errors.email}</span>}
        </div>
      </div>

      <div className="step__actions">
        <button type="button" className="btn btn--ghost" onClick={back}>← Tillbaka</button>
        <button type="submit" className="btn btn--primary">Bekräfta bokning</button>
      </div>
    </form>
  )
}
