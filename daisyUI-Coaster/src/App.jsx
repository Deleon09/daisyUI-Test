//import HeroBatman from './components/HeroBatman';
import HeroImages from './components/HeroImages';
import NavBar from './components/NavBar';
import SearchBar from './components/SearchBar';
import { ImagesProvider } from './context/images/ImagesContext';

function App() {

  return (
    <ImagesProvider>
      <NavBar />
      {/* <HeroBatman />  */}
      <HeroImages />
      <SearchBar />
    </ImagesProvider>
  )
}

export default App
