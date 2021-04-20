import styled from 'styled-components'
import { StaticProps } from './../../pages/[type]'
import { Header } from './Header'

const Main = styled.main`
  margin-right: var(--gutter);
  margin-left: var(--gutter);
`

export const Container = ({ title, data }: StaticProps) => {
  return (
    <Main>
      <table>
        <Header title={title} />
        <tbody>
          {data.map((words) => (
            <tr key={words}>
              {words.split(/, |=/).map((word, i) => (
                <td key={i}>{word}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Main>
  )
}
