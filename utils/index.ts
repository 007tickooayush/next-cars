// //X const axios = require('axios');
// const url = 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?model=corolla';

import { CarsProps, FilterProps } from "@/types";

// const options = {
//   method: 'GET',
// //X   url: 'https://cars-by-api-ninjas.p.rapidapi.com/v1/cars',
// //X   params: {model: 'corolla'},
//   headers: {
//     'X-RapidAPI-Key': 'b63a73c60emsh39af99377ce4cddp14b1f3jsnd9e3e270c75e',
//     'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
//   }
// };

// try {
// 	// const response = await axios.request(options);
//     const response = await fetch(url,options)
// 	console.log(response.data);
// } catch (error) {
// 	console.error(error);
// }

export async function fetchCars(filters: FilterProps) {
	const headers = {
		'X-RapidAPI-Key': process.env.X_RAPID_API_KEY || "",
		'X-RapidAPI-Host': 'cars-by-api-ninjas.p.rapidapi.com'
	}

	const { manufacturer, model, year, fuel, limit } = filters

	const response = await fetch(`https://cars-by-api-ninjas.p.rapidapi.com/v1/cars?manufacturer=${manufacturer}&year=${year}&model=${model}&fuel_type=${fuel}&limit=${limit}`, {
		headers: headers
	});

	const result = await response.json();

	return result;
}

export const calculateCarRent = (city_mpg: number, year: number) => {
	const basePricePerDay = 50; // Base rental price per day in dollars
	const mileageFactor = 0.1; // Additional rate per mile driven
	const ageFactor = 0.05; // Additional rate per year of vehicle age

	// Calculate additional rate based on mileage and age
	const mileageRate = city_mpg * mileageFactor;
	const ageRate = (new Date().getFullYear() - year) * ageFactor;

	// Calculate total rental rate per day
	const rentalRatePerDay = basePricePerDay + mileageRate + ageRate;

	return rentalRatePerDay.toFixed(0);
};
export const generateCarImageUrl = (car: CarsProps, angle?: string) => {
	// https://www.imagin.studio/car-image-api
	// to generate car images 

	const url = new URL('http://cdn.imagin.studio/getimage');

	const { make, year, model } = car;

	// require key for getting images of different angles
	url.searchParams.append('customer', process.env.IMAGIN_API_KEY || '');
	url.searchParams.append('make', make);
	url.searchParams.append('model', model.split(' ')[0]);
	url.searchParams.append('zoomType', 'fullscreen');
	url.searchParams.append('modelYear', `${year}`);
	url.searchParams.append('angle', `${angle}`);

	return `${url}`;
}


export const updateSearchParams = (type: string, value: string) => {
	const searchParams = new URLSearchParams(window.location.search);
	searchParams.set(type, value);
	const newPathName = `${window.location.pathname}?${searchParams.toString()}`;
	return newPathName;
}