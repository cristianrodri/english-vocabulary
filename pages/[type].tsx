import { GetStaticProps } from 'next'

export async function getStaticPaths() {
  return {
    paths: [
      { params: { type: 'pikoro' } } // See the "paths" section below
    ],
    fallback: false // See the "fallback" section below
  }
}

interface Props {
  item: string
}

const VocabularyType = ({ item }: Props) => {
  return <div>hello {item}</div>
}

export const getStaticProps: GetStaticProps<
  Props,
  { type: string; reached: string }
> = async context => {
  console.log(context.params)
  return { props: { item: context.params?.type as string } }
}

export default VocabularyType
