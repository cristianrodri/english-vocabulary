export const Logo = () => {
  return (
    <>
      <span className="container">
        ENG<span className="second-word">VOC</span>
      </span>
      <style jsx>{`
        .container {
          position: absolute;
          top: 0;
          left: 0;
          padding: 2rem;
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
