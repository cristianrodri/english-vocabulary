export const Logo = () => {
  return (
    <span
      style={{
        padding: '2rem',
        color: 'var(--primary-color)',
        fontSize: '1.3rem',
        letterSpacing: '0.3rem',
        fontWeight: '700'
      }}
    >
      ENG
      <span
        className="second-word"
        style={{
          fontSize: '1.5rem',
          color: 'var(--third-color)',
          borderBottom: '2px solid',
          letterSpacing: 'normal'
        }}
      >
        VOC
      </span>
    </span>
  )
}
