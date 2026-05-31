export default function ErrorMessage({ message, onRetry }) {
  if (!message) return null
  return (
    <div className="alert alert--error" role="alert">
      <span className="alert__icon">⚠️</span>
      <span className="alert__text">{message}</span>
      {onRetry && (
        <button type="button" className="alert__retry" onClick={onRetry}>
          Försök igen
        </button>
      )}
    </div>
  )
}
