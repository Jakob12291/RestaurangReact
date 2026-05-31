import { STEPS, useBooking } from '../context/BookingContext'

export default function Stepper() {
  const { step } = useBooking()
  const progress = (step / (STEPS.length - 1)) * 100

  return (
    <div className="stepper" aria-label="Bokningssteg">
      <div className="stepper__track">
        <div className="stepper__fill" style={{ width: `${progress}%` }} />
        {STEPS.map((label, i) => {
          const state = i < step ? 'done' : i === step ? 'active' : 'upcoming'
          return (
            <div key={label} className={`stepper__item stepper__item--${state}`}>
              <div className="stepper__dot">{i < step ? '✓' : i + 1}</div>
              <span className="stepper__label">{label}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
