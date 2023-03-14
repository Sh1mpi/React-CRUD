import {Route, Routes} from 'react-router-dom'
import { Navigition } from './components/Navigition';
import { AboutPage } from './pages/AboutPage';
import { ProductPage } from './pages/ProductsPage';

function App() {
  return (
    <>
    <Navigition/>
    <Routes>
      <Route path='/' element={<ProductPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
    </Routes>
    </>
  )
}

export default App;
