import React, { useState } from "react";
import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Card = ({ item, type }) => {
  const { store, dispatch } = useGlobalReducer();
  const id = item.url.split("/").filter(Boolean).pop();

  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/${type}/${id}.jpg`
  );

  const handleImgError = () => {
    setImgSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
  };

  const isFavorite = store.favorites.some(
    (fav) => fav.uid === id && fav.type === type
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      dispatch({
        type: "remove_favorite",
        payload: { uid: id, type }
      });
    } else {
      dispatch({
        type: "add_favorite",
        payload: { uid: id, name: item.name, type }
      });
    }
  };

  return (
    <div className="card entity-card shadow-sm border">
      <img
        src={imgSrc}
        className="card-img-top"
        alt={item.name}
        onError={handleImgError}
      />
      <div className="card-body d-flex flex-column justify-content-between">
        <div>
          <h5 className="card-title text-truncate fw-bold mb-3">{item.name}</h5>
          
          {type === "people" && (
            <div className="card-text small text-muted mb-4">
              <p className="m-0">Gender: {item.gender}</p>
              <p className="m-0">Hair Color: {item.hair_color}</p>
              <p className="m-0">Eye Color: {item.eye_color}</p>
            </div>
          )}

          {type === "planets" && (
            <div className="card-text small text-muted mb-4">
              <p className="m-0">Population: {item.population}</p>
              <p className="m-0">Terrain: {item.terrain}</p>
              <p className="m-0">Climate: {item.climate}</p>
            </div>
          )}

          {type === "vehicles" && (
            <div className="card-text small text-muted mb-4">
              <p className="m-0">Model: {item.model}</p>
              <p className="m-0">Cost: {item.cost_in_credits}</p>
              <p className="m-0">Passengers: {item.passengers}</p>
            </div>
          )}
        </div>

        <div className="d-flex justify-content-between align-items-center mt-2">
          <Link to={`/single/${type}/${id}`} className="btn btn-outline-primary btn-sm">
            Learn More
          </Link>
          <button
            onClick={toggleFavorite}
            className={`btn btn-sm ${isFavorite ? "btn-warning" : "btn-outline-warning"}`}
          >
            <i className={isFavorite ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
