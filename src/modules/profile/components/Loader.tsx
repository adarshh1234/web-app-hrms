export function Loader({ text = 'Loading...' }: { text?: string }) {
  return (
    <div className="loader-container">
      <div className="loader-spinner" />
      {text && <span className="loader-text">{text}</span>}
    </div>
  )
}
