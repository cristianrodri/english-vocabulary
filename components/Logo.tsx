export const Logo = () => {
  return (
    <>
      <span className="container">
        ENG <span className="second-word">VOC</span>
      </span>
      <style jsx>{`
        .container {
          color: var(--primary-color);
          font-size: 1.3rem;
          letter-spacing: 0.3rem;
          font-weight: 700;
        }
        .second-word {
          font-size: 1.5rem;
          color: var(--third-color);
          border-bottom: 2px solid;
          letter-spacing: normal;
        }
      `}</style>
    </>
  )
}
