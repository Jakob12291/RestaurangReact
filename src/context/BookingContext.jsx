import { createContext, useContext, useMemo, useState } from 'react'

const BookingContext = createContext(null)

export const STEPS = ['Tid & gäster', 'Välj bord', 'Dina uppgifter', 'Klart']

const initialData = {
  date: '',
  time: '',
  guests: 2,
  table: null, // valt bord-objekt { id, bordsnummer, kapacitet }
  name: '',
  phone: '',
  email: '',
}

export function BookingProvider({ children }) {
  const [step, setStep] = useState(0)
  const [data, setData] = useState(initialData)
  const [confirmation, setConfirmation] = useState(null)

  const value = useMemo(() => ({
    step,
    data,
    confirmation,
    updateData: (patch) => setData((d) => ({ ...d, ...patch })),
    next: () => setStep((s) => Math.min(s + 1, STEPS.length - 1)),
    back: () => setStep((s) => Math.max(s - 1, 0)),
    goToStep: (s) => setStep(s),
    setConfirmation,
    reset: () => {
      setData(initialData)
      setConfirmation(null)
      setStep(0)
    },
  }), [step, data, confirmation])

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking måste användas inom en BookingProvider')
  return ctx
}
