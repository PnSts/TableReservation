import "./reservations.css";
import { useState, useReducer } from "react";
import { fetchAPI, submitAPI } from "../../utils/mockAPI";
import { useNavigate } from "react-router-dom";
import ReservationsFormDetails from "./ReservationsFormDetails";
import ReservationReview from "./ReservationReview";
import React from "react";

const minimumDate = new Date().toISOString().split("T")[0];

const occasions = ["Birthday", "Anniversary", "Engagement", "Other"];

const updateTimes = (availableTimes, date) => {
  const response = fetchAPI(new Date(date));
  return response.length !== 0 ? response : availableTimes;
};

const initializeTimes = (initialAvailableTimes) => [
  ...initialAvailableTimes,
  ...fetchAPI(new Date()),
];


const ReservationsHome = () => {

  const [reviewReservation, setReviewReservation] = useState(false);

  const goToReview = (toReview) => {
    setReviewReservation(toReview);
  };

  const [availableTimes, dispatchOnDateChange] = useReducer(
    updateTimes,
    [],
    initializeTimes
  );

  const [booking, setBooking] = useState({
    bDate: minimumDate,
    bTime: availableTimes[0],
    bNumberOfGuests: 1,
    bOccasion: occasions[0],
    bInfo: "",
    bLastname: "",
    bFirstname: "",
    bMail: "",
    bPhone: "",
  });

  const navigate = useNavigate();


  
  const submitData = (formData) => {
    const response = submitAPI(formData);
    if (response) navigate("/confirmation");
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    
  const formattedData = {
    date: booking.bDate,
    time: booking.bTime,
    guests: booking.bNumberOfGuests,
    occasion: booking.bOccasion,
    info: booking.bInfo,
    lastName: booking.bLastname,
    firstName: booking.bFirstname,
    email: booking.bMail,
    phone: booking.bPhone,
  };

    submitData(formattedData);
};

  return (
    <section className="reservations container grid">
      <div className="reservations-header">
        <h2>Reserve a table</h2>
        <ul className="reservations-navbar">
          <li className={!reviewReservation ? "active" : ""}>Table Details</li>
          <li className={!reviewReservation ? "" : "active"}>Review</li>
        </ul>
      </div>
      <div className="reservations-main">
      <form onSubmit={handleFormSubmit}>
        {!reviewReservation ?
          <ReservationsFormDetails
            booking={booking}
            occasions={occasions}
            setBooking={setBooking}
            goToReview={goToReview}
            availableTimes={availableTimes}
            dispatchOnDateChange={dispatchOnDateChange} /> :
          <ReservationReview
            booking={booking}
            goToReview={goToReview}
            availableTimes={availableTimes}/>}
      </form>
      </div>
    </section>
  );
};

export default ReservationsHome;