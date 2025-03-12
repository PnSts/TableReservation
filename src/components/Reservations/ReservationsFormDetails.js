import { useState } from "react";
import FormField from "./Formfield";
import { HashLink } from "react-router-hash-link";



const ReservationsFormDetails = ({
    booking,
    occasions,
    setBooking,
    goToReview,
    dispatchOnDateChange,
    availableTimes,
}) => {

    const minimumDate = new Date().toISOString().split("T")[0];

    const minimumNumberOfGuests = 1;
    const maximumNumberOfGuests = 10;

    const invalidDateErrorMessage = "Please choose a valid date";
    const invalidTimeErrorMessage = "Please choose a valid time";
    const invalidOccasionErrorMessage = "Please choose a valid occasion";
    const invalidNumberOfGuestsErrorMessage = "Please enter a number between 1 and 10";
    const invalidFirstNameErrorMessage = "Please enter first name";
    const invalidLastNameErrorMessage = "Please enter last name";
    const invalidMailErrorMessage = "Please enter a valid email";
    const invalidPhoneErrorMessage = "Please enter a valid phone number";

    const [lastname, setLastname] = useState({ isTouched: false });
    const [firstname, setFirstname] = useState({ isTouched: false });
    const [mail, setMail] = useState({ isTouched: false });
    const [phone, setPhone] = useState({ isTouched: false });

    const isDateValid = () => booking.bDate !== "";
    const isTimeValid = () => booking.bTime !== "";
    const isNumberOfGuestsValid = () => booking.bNumberOfGuests !== "";
    const isOccasionValid = () => booking.bOccasion !== "";
    const isLastNameValid = () => booking.bLastname !== "";
    const isFirstNameValid = () => booking.bFirstname !== "";
    const isMailValid = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    const isPhoneValid = (phoneNumber) => {
        const phoneRegex = /^[0-9]{10}$/;
        return phoneRegex.test(phoneNumber);
    };

    const areAllFieldsValid = () => {
        return (
            isDateValid() && isTimeValid() &&
            isNumberOfGuestsValid() && isOccasionValid() &&
            isLastNameValid() && isFirstNameValid() &&
            isMailValid(booking.bMail) && isPhoneValid(booking.bPhone));
    };

    const handleDateChange = (e) => {
        handleChange(e);
        dispatchOnDateChange(e.target.value);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBooking((prevBooking) => ({
            ...prevBooking,
            [name]: value,
        }));
    };


    return (
        <section>
            <div className="form-grid">
                <FormField
                    label="Date"
                    htmlFor="reservation-date"
                    hasError={!isDateValid()}
                    errorMessage={invalidDateErrorMessage}
                >
                    <input
                        type="date"
                        id="reservation-date"
                        name="bDate"
                        min={minimumDate}
                        value={booking.bDate}
                        required={true}
                        onChange={handleDateChange}
                    />
                </FormField>
                <FormField
                    label="Time"
                    htmlFor="reservation-time"
                    hasError={!isTimeValid()}
                    errorMessage={invalidTimeErrorMessage}
                >
                    <div className="select-wrapper">
                        <select
                            id="reservation-time"
                            name="bTime"
                            value={booking.bTime}
                            required={true}
                            onChange={handleChange}
                        >
                            {availableTimes.map((times) => (
                                <option data-testid="reservation-time-option" key={times}>
                                    {times}
                                </option>
                            ))}
                        </select>
                    </div>
                </FormField>
                <FormField
                    label="Number of guests"
                    htmlFor="reservation-number-guests"
                    hasError={!isNumberOfGuestsValid()}
                    errorMessage={invalidNumberOfGuestsErrorMessage}
                >
                    <input
                        type="number"
                        id="reservation-number-guests"
                        name="bNumberOfGuests"
                        value={booking.bNumberOfGuests}
                        min={minimumNumberOfGuests}
                        max={maximumNumberOfGuests}
                        required={true}
                        onChange={handleChange}
                    />
                </FormField>
                <FormField
                    label="Occasion"
                    htmlFor="reservation-occasion"
                    hasError={!isOccasionValid()}
                    errorMessage={invalidOccasionErrorMessage}
                >
                    <div className="select-wrapper">
                        <select
                            id="reservation-occasion"
                            name="bOccasion"
                            value={booking.bOccasion}
                            required={true}
                            onChange={handleChange}
                        >
                            {occasions.map((occasion) => (
                                <option data-testid="reservation-occasion-option" key={occasion}>
                                    {occasion}
                                </option>
                            ))}
                        </select>
                    </div>
                </FormField>
            </div>
            <div id="textarea-info">
                <FormField label="Additional Info"
                    htmlFor="reservation-info">
                    <textarea
                        rows="3"
                        maxLength="200"
                        name="bInfo"
                        id="reservation-info"
                        onChange={handleChange}
                        value={booking.bInfo}
                    />
                </FormField>
            </div>

            <div className="form-grid">
                <FormField label="Last Name"
                    htmlFor="reservation-lastname"
                    hasError={lastname.isTouched && !isLastNameValid()}
                    errorMessage={invalidLastNameErrorMessage}>
                    <input
                        type="text"
                        name="bLastname"
                        id="reservation-lastname"
                        required={true}
                        onChange={handleChange}
                        onBlur={(e) => setLastname({ isTouched: true })}
                        value={booking.bLastname}
                    />
                </FormField>

                <FormField label="First Name"
                    htmlFor="reservation-firstname"
                    hasError={firstname.isTouched && !isFirstNameValid()}
                    errorMessage={invalidFirstNameErrorMessage}>
                    <input
                        type="text"
                        name="bFirstname"
                        id="reservation-firstname"
                        required={true}
                        onChange={handleChange}
                        onBlur={(e) => setFirstname({ isTouched: true })}
                        value={booking.bFirstname}
                    />
                </FormField>

                <FormField label="Email address"
                    htmlFor="reservation-mail"
                    hasError={mail.isTouched && !isMailValid(booking.bMail)}
                    errorMessage={invalidMailErrorMessage}>
                    <input
                        type="email"
                        name="bMail"
                        id="reservation-mail"
                        required={true}
                        onChange={handleChange}
                        onBlur={(e) => setMail({ isTouched: true })}
                        value={booking.bMail}
                    />
                </FormField>

                <FormField label="Phone Number"
                    htmlFor="reservation-phone"
                    hasError={phone.isTouched && !isPhoneValid(booking.bPhone)}
                    errorMessage={invalidPhoneErrorMessage}>
                    <input
                        type="text"
                        name="bPhone"
                        id="reservation-phone"
                        required={true}
                        onChange={handleChange}
                        onBlur={(e) => setPhone({ isTouched: true })}
                        value={booking.bPhone}
                    />
                </FormField>

                <HashLink className="button-primary button-back" to="/#home">
                    Back
                </HashLink>
                <HashLink data-testid="next"
                    className={`button-primary button-next ${!areAllFieldsValid() ? "disabled" : ""}`}
                    onClick={(e) => { (!areAllFieldsValid()) ? e.preventDefault() : goToReview(true); }}
                >
                    Next
                </HashLink>
            </div>
            </section>
    );
};

export default ReservationsFormDetails;