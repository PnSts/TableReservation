import { act } from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from 'react-router-dom';
import App from '../../App';
import ReservationsFormDetails from "./ReservationsFormDetails";
import ReservationReview from "./ReservationReview";
import ReservationsHome from "./ReservationsHome";

describe("Reservation form", () => {
  const availableTimes = ["17:00", "17:30"];
  const occasions = ["Birthday", "Anniversary", "Engagement", "Other"];
  const today = new Date().toISOString().split("T")[0];
  const dispatchOnDateChange = jest.fn();
  const goToReview = false;
  const booking = {
      bDate: today,
      bTime: availableTimes[0],
      bNumberOfGuests: 1,
      bOccasion: occasions[0],
      bInfo: "",
      bLastname: "",
      bFirstname: "",
      bMail: "",
      bPhone: "",
    };

  test("should correctly render all fields and their default values", async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const dateInput = screen.getByLabelText(/Date/);
    const timeSelect = screen.getByLabelText(/Time/);
    const timeOptions = await screen.findAllByTestId("reservation-time-option");
    const numberOfGuestsInput = screen.getByLabelText(/Number of guests/);
    const occasionSelect = screen.getByLabelText(/Occasion/);
    const occasionOptions = await screen.findAllByTestId("reservation-occasion-option");
    const infoInput = screen.getByLabelText(/Additional Info/);
    const lastnameInput = screen.getByLabelText(/Last Name/);
    const firstnameInput = screen.getByLabelText(/First Name/);
    const mailInput = screen.getByLabelText(/Email address/);
    const phoneInput = screen.getByLabelText(/Phone Number/);
    const nextButton = screen.getByTestId("next");

    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toHaveAttribute("type", "date");
    expect(dateInput).toHaveAttribute("id", "reservation-date");
    expect(dateInput).toHaveValue(today);

    expect(timeSelect).toBeInTheDocument();
    expect(timeSelect).toHaveAttribute("id", "reservation-time");
    expect(timeOptions.length).toBe(8);

    expect(numberOfGuestsInput).toBeInTheDocument();
    expect(numberOfGuestsInput).toHaveAttribute("id", "reservation-number-guests");
    expect(numberOfGuestsInput).toHaveAttribute("type", "number");
    expect(numberOfGuestsInput).toHaveValue(1);

    expect(occasionSelect).toBeInTheDocument();
    expect(occasionSelect).toHaveAttribute("id", "reservation-occasion");
    expect(occasionOptions.length).toBe(4);

    expect(infoInput).toBeInTheDocument();
    expect(infoInput).toHaveAttribute("id", "reservation-info");

    expect(lastnameInput).toBeInTheDocument();
    expect(lastnameInput).toHaveAttribute("type", "text");
    expect(lastnameInput).toHaveAttribute("id", "reservation-lastname");

    expect(firstnameInput).toBeInTheDocument();
    expect(firstnameInput).toHaveAttribute("type", "text");
    expect(firstnameInput).toHaveAttribute("id", "reservation-firstname");

    expect(mailInput).toBeInTheDocument();
    expect(mailInput).toHaveAttribute("type", "email");
    expect(mailInput).toHaveAttribute("id", "reservation-mail");

    expect(phoneInput).toBeInTheDocument();
    expect(phoneInput).toHaveAttribute("type", "text");
    expect(phoneInput).toHaveAttribute("id", "reservation-phone");

    expect(nextButton).toBeInTheDocument();
    expect(nextButton).toContainHTML("disabled");
  });

  test(`should display an error message and disable Next HashLink when last name field's value is empty`, async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const lastnameInput = screen.getByLabelText(/Last Name/);
    fireEvent.change(lastnameInput, { target: { value: "" } });
    fireEvent.blur(lastnameInput);
    const errorMessage = screen.getByTestId("error-message");
    const nextButton = screen.getByTestId("next");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Please enter last name"
    );
    expect(nextButton).toContainHTML("disabled");
  });

  test(`should display an error message and disable Next HashLink when first name field's value is empty`,async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const firstnameInput = screen.getByLabelText(/First Name/);
    fireEvent.change(firstnameInput, { target: { value: "" } });
    fireEvent.blur(firstnameInput);
    const errorMessage = screen.getByTestId("error-message");
    const nextButton = screen.getByTestId("next");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent(
      "Please enter first name"
    );
    expect(nextButton).toContainHTML("disabled");
  });

  test(`should display an error message and disable Next HashLink when email address field's value is not a valid address`, async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );
    const mailInput = screen.getByLabelText(/Email address/);
    fireEvent.change(mailInput, { target: { value: "aaa" } });
    fireEvent.blur(mailInput);
    const errorMessage = screen.getByTestId("error-message");
    const nextButton = screen.getByTestId("next");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Please enter a valid email");
    expect(nextButton).toContainHTML("disabled");
  });


  test(`should display an error message and disable Next HashLink when phone number field's value has not length of 10`, async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const phoneInput = screen.getByLabelText(/Phone Number/);
    fireEvent.change(phoneInput, { target: { value: "9999" } });
    fireEvent.blur(phoneInput);
    const errorMessage = screen.getByTestId("error-message");
    const nextButton = screen.getByTestId("next");

    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("Please enter a valid phone number");
    expect(nextButton).toContainHTML("disabled");
  });


  const timeFormat = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;

  test("should have one or more available reservation time options", async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const timeOptions = await screen.findAllByTestId("reservation-time-option");

    expect(timeOptions.length).toBeGreaterThanOrEqual(1);
    timeOptions.forEach((timeOption) =>
      expect(timeOption.value).toMatch(timeFormat)
    );
  });

  test("should update available reservation time options when changing reservation date", async () => {
    render(
      <MemoryRouter>
        <ReservationsHome />
      </MemoryRouter>
    );

    const reservationDate = "2025-03-15";
    const dateInput = screen.getByLabelText(/Date/);
    const initialTimeOptions = await screen.findAllByTestId(
      "reservation-time-option"
    );
    fireEvent.change(dateInput, { target: { value: reservationDate } });
    fireEvent.blur(dateInput);
    const updatedTimeOptions = await screen.findAllByTestId(
      "reservation-time-option"
    );

    expect(dateInput).toHaveValue(reservationDate);
    initialTimeOptions.forEach((timeOption) =>
      expect(timeOption.value).toMatch(timeFormat)
    );
    updatedTimeOptions.forEach((timeOption) =>
      expect(timeOption.value).toMatch(timeFormat)
    );
    expect(initialTimeOptions.length).not.toBe(updatedTimeOptions.length);
  });
});
