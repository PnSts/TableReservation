import { useState } from "react";
import FormField from "./formfield";
import { HashLink } from "react-router-hash-link";


const ReservationsFormContact = ({
        values,
        errors,
        touched,
        handleBlur,
        submitData,
}) => {

    const [lastname, setLastname] = useState("fdf");
    const [firstname, setFirstname] = useState("");
    const [mail, setMail] = useState("");
    const [phone, setPhone] = useState("");

    const isLastNameValid = () => lastname !== "";
    const isFirstNameValid = () => firstname !== "";
    const isMailValid = () => mail !== "";
    const isPhoneValid = () => phone !== "";

    const areAllFieldsValid = () =>
        isLastNameValid() && isFirstNameValid() && isMailValid() && isPhoneValid();

    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleFirstnameChange = (e) => setFirstname(e.target.value);
    const handleMailChange = (e) => setMail(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        submitData({ lastname, firstname, mail, phone });
    };

    return (
        <form onSubmit={handleFormSubmit} >
            <div className="form-grid">
            <FormField label="Last Name" htmlFor="reservation-lastname">
            <input
              type="text"
              name="lastname"
              id="reservation-lastname"
              onChange={handleLastnameChange}
              onBlur={handleBlur}
              value={values.lastname}
            />
            {errors.lastname && touched.lastname && <div className="error">{errors.lastname}</div>}
          </FormField>

          <FormField label="First Name" htmlFor="reservation-firstname">
            <input
              type="text"
              name="firstname"
              id="reservation-firstname"
              onChange={handleFirstnameChange}
              onBlur={handleBlur}
              value={values.firstname}
            />
            {errors.firstname && touched.firstname && <div className="error">{errors.firstname}</div>}
          </FormField>

          <FormField label="Email address" htmlFor="reservation-mail">
            <input
              type="email"
              name="mail"
              id="reservation-mail"
              onChange={handleMailChange}
              onBlur={handleBlur}
              value={values.mail}
            />
            {errors.mail && touched.mail && <div className="error">{errors.mail}</div>}
          </FormField>

          <FormField label="Phone Number" htmlFor="reservation-phone">
            <input
              type="text"
              pattern="9999999999"
              name="phone"
              id="reservation-phone"
              onChange={handlePhoneChange}
              onBlur={handleBlur}
              value={values.phone}
            />
            {errors.phone && touched.phone && <div className="error">{errors.phone}</div>}
          </FormField>
                
                <button className="button-primary button-back" type="button">
                    <HashLink to="/#home">Back</HashLink>
                </button>
                <button className="button-primary button-next" type="submit"
                    disabled={!areAllFieldsValid()}>Next
                </button>
            </div>
        </form>
    );
};

export default ReservationsFormContact;