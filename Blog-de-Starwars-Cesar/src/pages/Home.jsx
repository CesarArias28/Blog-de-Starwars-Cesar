import React from "react";
import Carousel from "../components/Carousel"; 
export const Home = () => {

	return (
		<div className="container mt-5">
			<h3 className="text-danger my-4 fw-bold">People</h3>

					<div className="d-flex flex-nowrap overflow-auto pb-3">
				{/* Aquí es donde usarás un .map() para iterar tus cartas.
				    Por ahora, vamos a poner algunas cartas estáticas como ejemplo para ver el diseño visual. */}
				<Carousel name="Luke Skywalker" details={[{label: "Gender", value: "male"}, {label: "Hair Color", value: "blond"}, {label: "Eye Color", value: "blue"}]} />
				<Carousel name="C-3PO" details={[{label: "Gender", value: "n/a"}, {label: "Height", value: "167 cm"}]} />
				<Carousel name="R2-D2" details={[{label: "Gender", value: "n/a"}, {label: "Height", value: "96 cm"}]} />
				<Carousel name="Darth Vader" details={[{label: "Gender", value: "male"}, {label: "Hair Color", value: "n/a"}, {label: "Eye Color", value: "yellow"}]} />
			</div>
		</div>
	);
};