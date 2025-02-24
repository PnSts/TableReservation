import { ChakraProvider } from "@chakra-ui/react";
import Header from "./components/Header";


function App() {
  return (
    <ChakraProvider>    
        <main>
          <Header/>
          {/* <HeroSection />
          <SpecialsSection />
          <TestimonialsSection />
          <AboutSection /> */}
          {/* <Footer /> */}
          {/* <Alert /> */}
          </main>
    </ChakraProvider>
  );
}

export default App;
