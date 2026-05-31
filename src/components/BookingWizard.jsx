import { useBooking } from '../context/BookingContext'
import Stepper from './Stepper'
import SelectDate from './SelectDate'
import SelectTable from './SelectTable'
import ContactDetails from './ContactDetails'
import Confirmation from './Confirmation'

export default function BookingWizard() {
  const { step } = useBooking()

  const steps = [<SelectDate />, <SelectTable />, <ContactDetails />, <Confirmation />]

  return (
    <section className="wizard">
      <Stepper />
      <div className="wizard__card">{steps[step]}</div>
    </section>
  )
}
