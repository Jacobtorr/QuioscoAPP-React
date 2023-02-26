import '../styles/globals.css'
import { QuioscoProvider } from 'quiscoapp/context/QuioscoProvider'

export default function App({ Component, pageProps }) {
  return (
    <QuioscoProvider>
      <Component {...pageProps} />
    </QuioscoProvider>
  )
}
