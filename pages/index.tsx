import { Button, Card, Container, Rating, Typography } from '@mui/material'
import type { NextPage } from 'next'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { getData } from './api/bars'
import EuroIcon from '@mui/icons-material/Euro';
import Link from 'next/link'
import logo from '../public/logo.png'
import Script from 'next/script'

export const getServerSideProps: GetServerSideProps = async () => {
  const data = await getData()
  return { props: { data } }
}

interface itemTypes {
  id: number,
  name: string,
  address: string,
  rating: number,
  price: number,
  image: string
}

const Home: NextPage = ({ data }: any) => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Reviews for bars" />
        <link rel="icon" href="/favicon.ico" />
        <title>Bars</title>
        <meta name="google-signin-client_id" content="926100731368-6ibmc74vtav4tpit6mib7hrjlkd0mqq4.apps.googleusercontent.com" />
        <meta name="google-site-verification" content="guzVbsE_J17g5UK-EW12RSXE8lc_gATQmvSo4jd_gqo" />
      </Head>
      <div className='header'>
        <Container sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href='/'>
            <a className='logo'>
              <Image src={logo} alt='logo' layout='responsive'></Image>
            </a>
          </Link>
          <nav className='nav'>
            <Button variant='contained' color='primary'>Login</Button>
            <Button variant='contained' color='info'>Sign-up</Button>
            <div style={{ display: 'flex', alignItems: 'center' }} className="g-signin2" data-onsuccess="onSignIn" data-longtitle={true}>Login</div>
          </nav>

        </Container>

      </div>
      <Container sx={{ display: 'grid', gridTemplateColumns: { sm: '1fr', md: '1fr 1fr', lg: '1fr 1fr 1fr' }, gap: 3, p: 3 }}>
        {data.map((item: itemTypes) => {
          return (
            <Card key={item.id}>
              <Image className='barImage' src={item.image} alt={item.name} width='100%' height='100%' layout='responsive'></Image>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'space-between', padding: '15px' }}>
                <Typography variant='body1' fontWeight={500} fontSize={20}>{item.name}</Typography>
                <Typography variant='body1' fontSize={15} color='rgb(100, 100, 100)'>{item.address}</Typography>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '11px' }}>
                <Rating name="read-only" value={item.rating} precision={0.1} readOnly />
                <Rating sx={{ color: 'rgb(0, 182, 9)' }} icon={<EuroIcon fontSize='small' />} emptyIcon={<EuroIcon fontSize='small' />} name="read-only" value={item.price} precision={0.1} readOnly />
              </div>
            </Card>
          )
        })}
      </Container>
      <Script src="https://apis.google.com/js/platform.js" async defer></Script>
    </div>
  )
}

export default Home
