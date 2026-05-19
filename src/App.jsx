import Nav from './components/Nav'
import About from './components/About'
import Work from './components/Work'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <Nav />
      <main>
        <About />
        <Work />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
