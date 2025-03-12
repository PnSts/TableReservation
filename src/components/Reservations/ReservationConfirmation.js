import chef from "../../assets/restaurant chef B.jpg";
import { HashLink } from "react-router-hash-link";


const ReservationConfirmation = () => {

    return (
        <div className="container confirmed-reservation">
            <h1>Your Reservation has been completed! </h1>
            <h3>Can' t wait to meet and serve you our delicious menu!</h3>
            <img className="reservation-photo" src={chef} alt="Little Lemon Restaurant" />
            <h2>Just use your name... and leave everything to us!</h2>
            <HashLink className="button-primary button-back" to="/#home">
                Home
            </HashLink>
        </div>
    );
};

export default ReservationConfirmation;

