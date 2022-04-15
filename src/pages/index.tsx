import { GetStaticProps } from 'next'
import Head from 'next/head'

import { stripe } from '../services/stripe'

import { SubscribeButton } from '../components/SubscribeButton'
import styles from './home.module.scss'

interface HomeProps{
  product: {
    priceID: string,
    amount: number,
  }
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contenContainer}>
        <section className={styles.hero}>
          <span>👏Hey, Welcome</span>
          <h1>News about the <span>React</span> world</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceID={product.priceID}/>
        </section>
        <img src="/images/avatar.svg" alt="Girl codding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KocH4Ic61TYA3tWJQTEUevc')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-us', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  }

  return {
    props:{
      product
    },
    revalidate: 60 * 60 * 24 //24 hours
  }
}