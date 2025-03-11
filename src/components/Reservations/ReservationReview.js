import chicago1 from "../../assets/restaurant.jpg";
import { HashLink } from "react-router-hash-link";


const ReservationReview = ({
    booking,
    goToReview,
}) => {

    return (
        <div className="form-grid">
            <img className="reservation-photo" src={chicago1} alt="Little Lemon Restaurant" />
            <div>
                <h3>Reservation Details</h3>
                <div className="review-grid">
                    <label>Last name:</label><label className="review-table">{booking.bLastname}</label>
                    <label>First name:</label><label className="review-table">{booking.bFirstname}</label>
                    <label>Phone number:</label><label className="review-table">{booking.bPhone}</label>
                    <label>Email:</label><label className="review-table">{booking.bMail}</label>
                </div>
                <div className="review-grid table-info">
                    <label>Date:</label><label className="review-table">{booking.bDate}</label>
                    <label>Time:</label><label className="review-table">{booking.bTime}</label>
                    <label>Occasion:</label><label className="review-table">{booking.bOccasion}</label>
                    <label>Number of guests:</label><label className="review-table">{booking.bNumberOfGuests}</label>
                    <label>Additional info:</label><label className="review-table">{booking.bInfo}</label>
                </div>
                <div className="review-grid">
                    <HashLink className="button-primary button-back" onClick={() => goToReview(false)}>
                        Back
                    </HashLink>
                    <button className="button-primary button-next" aria-label="Submit the form" type="submit">
                        Confirm
                    </button>

                </div>
            </div>

        </div>

    );
};

export default ReservationReview;