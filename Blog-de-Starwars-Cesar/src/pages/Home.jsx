import React, { useEffect, useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";
import Card from "../components/Card";

export const Home = () => {
  const { store, dispatch } = useGlobalReducer();
  const [loading, setLoading] = useState({
    people: true,
    planets: true,
    vehicles: true
  });

  useEffect(() => {
    if (store.people && store.people.length === 0) {
      fetch("https://swapi.py4e.com/api/people/")
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          dispatch({ type: "set_people", payload: data.results });
          setLoading((prev) => ({ ...prev, people: false }));
        })
        .catch((err) => {
          console.error("Error fetching people:", err);
          setLoading((prev) => ({ ...prev, people: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, people: false }));
    }

    if (store.planets && store.planets.length === 0) {
      fetch("https://swapi.py4e.com/api/planets/")
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          dispatch({ type: "set_planets", payload: data.results });
          setLoading((prev) => ({ ...prev, planets: false }));
        })
        .catch((err) => {
          console.error("Error fetching planets:", err);
          setLoading((prev) => ({ ...prev, planets: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, planets: false }));
    }

    if (store.vehicles && store.vehicles.length === 0) {
      fetch("https://swapi.py4e.com/api/vehicles/")
        .then((res) => {
          if (!res.ok) throw new Error("Network response was not ok");
          return res.json();
        })
        .then((data) => {
          dispatch({ type: "set_vehicles", payload: data.results });
          setLoading((prev) => ({ ...prev, vehicles: false }));
        })
        .catch((err) => {
          console.error("Error fetching vehicles:", err);
          setLoading((prev) => ({ ...prev, vehicles: false }));
        });
    } else {
      setLoading((prev) => ({ ...prev, vehicles: false }));
    }
  }, [dispatch, store.people, store.planets, store.vehicles]);

  const renderSection = (title, items, type, isSectionLoading) => {
    return (
      <div className="my-4">
        <h2 className="text-danger mb-4 fw-bold">{title}</h2>
        {isSectionLoading ? (
          <div className="d-flex align-items-center py-4">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : items && items.length > 0 ? (
          <div className="scroll-container py-2">
            {items.map((item) => (
              <Card key={item.url} item={item} type={type} />
            ))}
          </div>
        ) : (
          <div className="text-muted py-2">No items found.</div>
        )}
      </div>
    );
  };

  return (
    <div className="container">
      {renderSection("Characters", store.people, "people", loading.people)}
      {renderSection("Planets", store.planets, "planets", loading.planets)}
      {renderSection("Vehicles", store.vehicles, "vehicles", loading.vehicles)}
    </div>
  );
};

export default Home;