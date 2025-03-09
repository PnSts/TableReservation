import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./components/Home/Home";
import ReservationsHome from "./components/Reservations/ReservationsHome";
// import ConfirmedReservation from "./components/pages/Reservations/confirmedReservation";
// import NotFound from "./components/pages/NotFound/NotFound";
// import { ChakraProvider } from "@chakra-ui/react";
import 'typeface-karla';
import 'typeface-markazi-text';
import './App.css';


function App() {
  return (
    
      <>

        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reservations" element={<ReservationsHome />} />
            {/* <Route
              path="/confirmedReservation"
              element={<ConfirmedReservation />}
            /> */}
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Layout>
      </>

  );
}

export default App;
