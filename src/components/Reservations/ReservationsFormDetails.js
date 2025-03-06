import { useState } from "react";
import FormField from "./formfield";
import { HashLink } from "react-router-hash-link";

const availableTimes = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];

const ReservationsFormDetails = ({
    dispatchOnDateChange,
    submitData,
}) => {
    const minimumDate = new Date().toISOString().split("T")[0];

    const defaultTime = availableTimes[0];

    const minimumNumberOfGuests = 1;
    const maximumNumberOfGuests = 10;

    const occasions = ["Birthday", "Anniversary", "Engagement", "Other"];

    const invalidDateErrorMessage = "Please choose a valid date";
    const invalidTimeErrorMessage = "Please choose a valid time";
    const invalidOccasionErrorMessage = "Please choose a valid occasion";
    const invalidNumberOfGuestsErrorMessage = "Please enter a number between 1 and 10";

    const [date, setDate] = useState(minimumDate);
    const [time, setTime] = useState(defaultTime);
    const [numberOfGuests, setNumberGuests] = useState(minimumNumberOfGuests);
    const [occasion, setOccasion] = useState(occasions[0]);

    const isDateValid = () => date !== "";
    const isTimeValid = () => time !== "";
    const isNumberOfGuestsValid = () => numberOfGuests !== "";
    const isOccasionValid = () => occasion !== "";

    const areAllFieldsValid = () =>
        isDateValid() && isTimeValid() && isNumberOfGuestsValid() && isOccasionValid();

    const handleDateChange = (e) => {
        setDate(e.target.value);
        dispatchOnDateChange(e.target.value);
    };

    const handleTimeChange = (e) => setTime(e.target.value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitData({ date, time, numberOfGuests, occasion });
    };

    return (
        <form onSubmit={handleFormSubmit} >
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
                        name="reservation-date"
                        min={minimumDate}
                        value={date}
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
                            name="reservation-time"
                            value={time}
                            required={true}
                            onChange={handleTimeChange}
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
                        name="reservation-number-guests"
                        value={numberOfGuests}
                        min={minimumNumberOfGuests}
                        max={maximumNumberOfGuests}
                        required={true}
                        onChange={(e) => setNumberGuests(e.target.value)}
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
                            name="reservation-occasion"
                            value={occasion}
                            required={true}
                            onChange={(e) => setOccasion(e.target.value)}
                        >
                            {occasions.map((occasion) => (
                                <option data-testid="reservation-occasion-option" key={occasion}>
                                    {occasion}
                                </option>
                            ))}
                        </select>
                    </div>
                </FormField>
                <button className="button-primary button-back" type="button">
                    <HashLink to="/#home">Back</HashLink>
                </button>
                <button className="button-primary button-next" type="button"
                    disabled={!areAllFieldsValid()}><HashLink to="/reservationsContact">Next</HashLink>
                </button>
            </div>
        </form>
    );
};

export default ReservationsFormDetails;