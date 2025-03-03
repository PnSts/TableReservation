import { HashLink } from "react-router-hash-link";
import heroPhoto from "../../assets/restauranfood.jpg";


const HeroSection = () => {
  return (
    <section className="hero-back">
      <div className="hero">
      <div className="container grid">
        <div className="hero-information">
          <h1>Little Lemon</h1>
          <h2>Chicago</h2>
          <p>
            We are a family owned Mediterranean restaurant, focused on
            traditional recipes served with a modern twist.
          </p>
          <HashLink className="button-primary" to="/reservations">
            Reserve a table
          </HashLink>
        </div>
        <img
          className="hero-photo"
          src={heroPhoto}
          alt="Little Lemon Restaurant"
        />
      </div>
      </div>
    </section>
  );
};
export default HeroSection;
