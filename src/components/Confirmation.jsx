import { useBooking } from '../context/BookingContext'

export default function Confirmation() {
  const { data, confirmation, reset } = useBooking()

  const datumText = new Date(`${data.date}T${data.time}`).toLocaleDateString('sv-SE', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  return (
    <div className="step step--center">
      <div className="success-check">✓</div>
      <h2 className="step__title">Tack, {data.name.split(' ')[0]}!</h2>
      <p className="step__lead">Din bokning är bekräftad. Vi ser fram emot ditt besök.</p>

      <div className="receipt">
        <div className="receipt__row"><span>Bokningsnummer</span><strong>#{confirmation?.id ?? '—'}</strong></div>
        <div className="receipt__row"><span>Datum</span><strong>{datumText}</strong></div>
        <div className="receipt__row"><span>Tid</span><strong>{data.time}</strong></div>
        <div className="receipt__row"><span>Bord</span><strong>Bord {data.table?.bordsnummer}</strong></div>
        <div className="receipt__row"><span>Antal gäster</span><strong>{data.guests}</strong></div>
        <div className="receipt__row"><span>Namn</span><strong>{data.name}</strong></div>
        <div className="receipt__row"><span>Telefon</span><strong>{data.phone}</strong></div>
      </div>

      <p className="muted small">En bokning gäller i 2 timmar från starttiden.</p>

      <button className="btn btn--primary" onClick={reset}>Gör en ny bokning</button>
    </div>
  )
}
