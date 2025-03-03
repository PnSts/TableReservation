import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io";

const TestimonialCard = ({ reviewer }) => {
  return (
    <article className="testimonial-card">
      <img src={reviewer.image} alt={reviewer.fullName} />
      <h4>{reviewer.fullName}</h4>
      <span>
        {reviewer.rating.map((ratingPoint, idx) =>
          ratingPoint === 1 ? (
            <IoMdStar key={idx} />
          ) : ratingPoint === 0.5 ? (
            <IoMdStarHalf key={idx} />
          ) : ratingPoint === 0 ? (
            <IoMdStarOutline key={idx} />
          ) : null
        )}
        <p>
          {reviewer.rating.reduce(
            (accumulator, currentValue) => accumulator + currentValue,
            0
          )} / 5
        </p>
      </span>
      <blockquote>
        <p>"{reviewer.says}"</p>
      </blockquote>
    </article>
  );
};

export default TestimonialCard;