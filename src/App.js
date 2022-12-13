import './App.css';
import Header from './Component/Header_Footer/Header';
import Footer from './Component/Header_Footer/Footer';
import About from './Component/About_Contact/About';
import Contact from './Component/About_Contact/Contact';
import Home from './Component/Home/Home';


function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />

    </div>
  );
}

export default App;
