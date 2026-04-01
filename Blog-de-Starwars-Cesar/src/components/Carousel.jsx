import React, { useState, useEffect } from "react";
import React from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";



export function Carousel() {
    const [personajes, setPersonajes] = useState([])
    const { store, dispatch } = useGlobalReducer();

    async function getPersonajes() {

        const data = await response.json();


        dispatch({
            type: "set_people",
            payload: data.results
        });

        try {

            const response = await fetch('https://www.swapi.tech/api/people', { method: "GET" })
            const data = await response.json()
            setPersonajes(data.results)


        } catch (error) {

            console.error(error);

        }

    }

    useEffect(() => { getPersonajes(); }, []);


    return (
        <div className="d-flex flex-nowrap overflow-auto pb-3">
            {personajes.map((personaje) => (
                <div className="card mx-2 shadow-sm" style={{ minWidth: "18rem" }} key={personaje.uid}>
                    <img
                        src={`https://imgs.search.brave.com/gzKhZSDm6NYDRg0lNrvSmf6NqdwiPjEVdEjfnioCnh0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93YWxs/cGFwZXJzLmNvbS9p/bWFnZXMvaGQvc3Rh/ci13YXJzLXJvZ3Vl/LW9uZS04OXE5c3hl/YWtndWhleGRnLmpw/Zw`}
                        className="card-img-top"
                        alt={personaje.name}
                    />
                    <div className="card-body">
                        <h5 className="card-title fw-bold">{personaje.name}</h5>
                        <p className="card-text small text-muted">
                            Haz clic abajo para ver los detalles.
                        </p>
                        <div className="d-flex justify-content-between">
                            <button className="btn btn-outline-primary">Leer más</button>
                            <button className="btn btn-outline-warning">♥</button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Carousel;