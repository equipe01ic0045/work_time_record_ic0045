import '@/styles/globals.css'
import { LayoutGroup } from 'framer-motion'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LayoutGroup>
      <Component {...pageProps} />
    </LayoutGroup>
  )
}
