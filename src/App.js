import './App.css';
import Header from './Component/Header_Footer/Header';
import Footer from './Component/Header_Footer/Footer';
import About from './Component/About_Contact/About';
import Contact from './Component/About_Contact/Contact';
import Home from './Component/Home/Home';
import Booking_Form from './Component/Form/Booking_Form';


function App() {
  return (
    <div className="App">
      <Header />
      <Home />
      <Footer />
      {/* <Booking_Form/> */}

    </div>
  );
}

export default App;
