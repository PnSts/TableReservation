import TestimonialCard from "./TestimonialCard"

const reviewers = [
  {
    fullName: "Adam",
    image:
      "https://images.unsplash.com/photo-1522556189639-b150ed9c4330?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 1],
    says: "Great restaurant!",
  },
  {
    fullName: "Nick",
    image:
      "https://images.unsplash.com/photo-1573497491765-dccce02b29df?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 0, 0],
    says: "I liked the pizza but the pasta wasn’t as I expected.",
  },
  {
    fullName: "Robin",
    image:
      "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 0.5, 0],
    says: "Very nice restaurant with great service! the menu was also great!",
  },
  {
    fullName: "Jessica",
    image:
      "https://images.unsplash.com/photo-1581714161666-dade083654ae?q=80&w=2786&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: [1, 1, 1, 1, 1],
    says: "I loved the menu!! I will came back soon...",
  },
];


const TestimonialsSection = () => {
  return (
    <section className="testimonials">
      <div className="container grid">
        <h2>Testimonials</h2>
        {reviewers.map((reviewer, index) => (
          <TestimonialCard key={index} reviewer={reviewer} />
        ))}
      </div>
    </section>
  );
};
export default TestimonialsSection;
