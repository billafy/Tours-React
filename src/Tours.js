import React, { useState, useEffect } from "react";
import "./tours.css";

const url = "https://course-api.com/react-tours-project";

document.title = "Tours";

const Tours = () => {
	const [isLoading, setIsLoading] = useState(true);
	const [isError, setIsError] = useState(false);
	const [tours, setTours] = useState([]);

	const removeTourItem = (id) => {
		const newTours = tours.filter((tour) => tour.id !== id);
		setTours(newTours);
	};

	useEffect(() => {
		fetch(url)
			.then((response) => {
				if (response.status <= 299 && response.status >= 200)
					return response.json();
				setIsLoading(false);
				setIsError(true);
			})
			.then((tours) => {
				setIsLoading(false);
				setTours(tours);
				console.log(tours);
			})
			.catch((error) => {
				setIsLoading(false);
				setIsError(true);
			});
	}, []);

	if (isLoading)
		return (
			<div className="container">
				<h1>
					Loading <div className="loader"></div>
				</h1>
			</div>
		);
	else if (isError)
		return (
			<div className="container">
				<h3>Error loading content</h3>
			</div>
		);
	else
		return (
			<div className="container">
				<h1>Our Tours</h1>
				{tours.map((tour) => {
					return (
						<section key={tour.id} className="tour">
							<img src={tour.image} alt={tour.name} />
							<h3>{tour.name}</h3>
							<span>${tour.price}</span>
							<p>{tour.info}</p>
							<button	type="button" onClick={() => removeTourItem(tour.id)}>
								Not Interested
							</button>
						</section>
					);
				})}
			</div>
		);
};

export default Tours;
