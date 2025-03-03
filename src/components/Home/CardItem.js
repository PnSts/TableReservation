import { faMotorcycle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { HashLink } from "react-router-hash-link";

const CardItem = ({ item }) => {
  return (
    <article className="meal-card">
      <div className="meal-card-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="meal-card-header">
        <h3>{item.name}</h3>
        <span>{item.price}</span>
      </div>
      <div className="meal-card-body-footer">
        <p>{item.description}</p>
        <HashLink to="/orderOnline">
          Order a delivery <FontAwesomeIcon icon={faMotorcycle} />
        </HashLink>
      </div>
    </article>
  );
};

export default CardItem;