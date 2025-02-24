import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import 'typeface-karla';
import 'typeface-markazi-text';
import './App.css';


function App() {
  return (
    <ChakraProvider>    
        <>
          <Header/>
          {/* <HeroSection />
          <SpecialsSection />
          <TestimonialsSection />
          <AboutSection /> */}
          <Footer/>
          {/* <Alert /> */}
        </>
    </ChakraProvider>
  );
}

export default App;
