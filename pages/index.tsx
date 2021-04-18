import Layout from '../components/Layout'
import Image from 'next/image'

const IndexPage = () => (
  <Layout title="home" banner="london">
    <Image src="/irregular-verbs.jpg" width={300} height={300} />
  </Layout>
)

export default IndexPage
