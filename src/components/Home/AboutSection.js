import chicago1 from "../../assets/restaurant.jpg";
import chicago2 from "../../assets/Mario-and-Adrian-B.jpg";

const AboutSection = () => {
  return (
    <section className="container grid about" id="about">
      <div className="about-description">
        <h2>Little Lemon</h2>
        <h3 id="town">Chicago</h3>
        <p>
        Little Lemon is a charming neighborhood bistro thatserves simple food and 
        classic cocktails in a lively but casual environment. 
        The restaurant features a locally-sourced menu with daily specials.
        </p>
      </div>
      <div className="about-restaurant">
        <img src={chicago1} alt="Chicago Restaurant" />
        <img src={chicago2} alt="Chefs Mario and Adrian" />
      </div>
    </section>
  );
};

export default AboutSection;

