import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div>
      <h1>Halaman Tentang</h1>
      <p>Adham Baskara</p>
      <p>2341720199</p>
      <p>Teknik Informatika</p>
    </div>
  )
}