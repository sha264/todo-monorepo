import '@/styles/globals.css'
import { NextPage } from 'next'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { useState } from 'react'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <div className="app-container">
      {/* Render the page component with its props */}
      <Component {...pageProps} />
    </div>
  )
}

export default MyApp
