import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

export const Single = () => {
  const { type, theId } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const [imgSrc, setImgSrc] = useState(
    `https://raw.githubusercontent.com/breatheco-de/swapi-images/master/public/images/${type}/${theId}.jpg`
  );

  useEffect(() => {
    setLoading(true);
    fetch(`https://swapi.py4e.com/api/${type}/${theId}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Could not fetch details");
        return res.json();
      })
      .then((detailData) => {
        setData(detailData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching detail data:", err);
        setLoading(false);
      });
  }, [type, theId]);

  const handleImgError = () => {
    setImgSrc("https://starwars-visualguide.com/assets/img/placeholder.jpg");
  };

  if (loading) {
    return (
      <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading details...</span>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container text-center py-5">
        <h2 className="text-danger">Details Not Found</h2>
        <p className="text-muted">The record could not be retrieved from the database.</p>
        <Link to="/" className="btn btn-primary mt-3">
          Back Home
        </Link>
      </div>
    );
  }

  const description = `${data.name} is a renowned ${type === "people" ? "character" : type === "planets" ? "planet" : "vehicle"} in the Star Wars universe. This entity features unique characteristics documented in the database, representing a piece of the galaxy's rich history and lore.`;

  return (
    <div className="container my-5">
      <div className="row align-items-center mb-5">
        <div className="col-md-6 col-lg-4 text-center">
          <img
            src={imgSrc}
            alt={data.name}
            className="img-fluid rounded border shadow-sm"
            onError={handleImgError}
            style={{ maxHeight: "350px", objectFit: "cover" }}
          />
        </div>
        <div className="col-md-6 col-lg-8 text-center text-md-start mt-4 mt-md-0">
          <h1 className="fw-bold display-5">{data.name}</h1>
          <p className="text-muted leading-relaxed" style={{ fontSize: "1.1rem" }}>
            {description}
          </p>
        </div>
      </div>

      <hr className="text-danger border-2" />

      <div className="row text-center text-danger fw-bold g-3 my-4">
        {type === "people" && (
          <>
            <div className="col-6 col-md-2">
              <div>Name</div>
              <div className="text-dark fw-normal mt-1">{data.name}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Birth Year</div>
              <div className="text-dark fw-normal mt-1">{data.birth_year}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Gender</div>
              <div className="text-dark fw-normal mt-1">{data.gender}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Height</div>
              <div className="text-dark fw-normal mt-1">{data.height}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Skin Color</div>
              <div className="text-dark fw-normal mt-1">{data.skin_color}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Eye Color</div>
              <div className="text-dark fw-normal mt-1">{data.eye_color}</div>
            </div>
          </>
        )}

        {type === "planets" && (
          <>
            <div className="col-6 col-md-2">
              <div>Name</div>
              <div className="text-dark fw-normal mt-1">{data.name}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Climate</div>
              <div className="text-dark fw-normal mt-1">{data.climate}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Terrain</div>
              <div className="text-dark fw-normal mt-1">{data.terrain}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Population</div>
              <div className="text-dark fw-normal mt-1">{data.population}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Orbital Period</div>
              <div className="text-dark fw-normal mt-1">{data.orbital_period}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Diameter</div>
              <div className="text-dark fw-normal mt-1">{data.diameter}</div>
            </div>
          </>
        )}

        {type === "vehicles" && (
          <>
            <div className="col-6 col-md-2">
              <div>Name</div>
              <div className="text-dark fw-normal mt-1">{data.name}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Model</div>
              <div className="text-dark fw-normal mt-1">{data.model}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Class</div>
              <div className="text-dark fw-normal mt-1">{data.vehicle_class}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Cost</div>
              <div className="text-dark fw-normal mt-1">{data.cost_in_credits}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Crew</div>
              <div className="text-dark fw-normal mt-1">{data.crew}</div>
            </div>
            <div className="col-6 col-md-2">
              <div>Passengers</div>
              <div className="text-dark fw-normal mt-1">{data.passengers}</div>
            </div>
          </>
        )}
      </div>

      <div className="text-center mt-5">
        <Link to="/" className="btn btn-primary px-4 py-2">
          Back Home
        </Link>
      </div>
    </div>
  );
};

export default Single;
