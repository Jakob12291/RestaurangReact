export default function Spinner({ text = 'Laddar…' }) {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <div className="spinner__circle" />
      <p className="spinner__text">{text}</p>
    </div>
  )
}
