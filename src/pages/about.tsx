import Layout from '@components/Layout'
import styled from 'styled-components'

const Main = styled.main`
  --color: #fff;

  padding: 2rem;
  padding-top: 0.5rem;
  color: var(--color);
  font-size: var(--h2);
`

const P = styled.p`
  margin-top: 2rem;
`

const A = styled.a`
  color: var(--third-color);
`

const AboutPage = () => (
  <Layout title="About" banner="london">
    <Main className="main-vocabulary" role="main">
      <P>
        Este es un sitio en dónde puedes repasar vocabulario ordenado por
        categorías, ya sea verbos regulares, irregulares, comidas, colores,
        deportes, profesiones, etc.
      </P>
      <P>
        Gran parte de este vocabulario es gracias a 123-ingles y sus cursos.
        Puedes visitar su sitio{' '}
        <A href="https://123-ingles.com/" target="_blank" rel="noreferrer">
          Aquí
        </A>
      </P>
      <P>
        No sólo puedes leer el vocabulario, también puedes escucharlo gracias a
        una <em>web API</em>. Sólo haz click en el ícono de la parte inferior
        del título.
      </P>
    </Main>
  </Layout>
)

export default AboutPage
