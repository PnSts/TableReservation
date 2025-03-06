import "./reservations.css";
import ReservationsFormDetails from "./ReservationsFormDetails";
import ReservationsFormContact from "./ReservationsFormContact";

const Reservations = () => {
  return (
    <section className="reservations container grid">
      <div className="reservations-header">
        <h2>Reserve a table</h2>
        <ul className="reservations-navbar">
          <li className="active">Table Details</li>
          <li>Contact Info</li>
          <li>Review</li>
        </ul>
      </div>
      <div className="reservations-main">
        <ReservationsFormDetails/>
      </div>
    </section>
  );
};

export default Reservations;