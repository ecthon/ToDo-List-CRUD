import '../src/styles/globals.css';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ToDo } from './components/ToDo';

function App() {
  return (
    <>
      <Header />
      <ToDo />
      <Footer />
    </>
  )
}

export default App
