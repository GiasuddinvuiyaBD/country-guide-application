'use strict';

const searchInputElm = document.querySelector('#search');
const submitBtnElm = document.querySelector('form');
const infoElm = document.querySelector('.info');


submitBtnElm.addEventListener('submit',(evt) => 
{
	evt.preventDefault()
	
	let countryName = searchInputElm.value;
	
	let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;

	// form validation 
	const isError = formValidate(countryName);
	if(!isError)
	{
		fetch(finalURL)
		.then((response) => response.json())
		.then((data) =>  
		{
			// getting data
			getDataFromAPI(data);
		});
	}
});

function formValidate(inputFeld)
{
	let isValidate = false;
	if(inputFeld === '')
	{
		isValidate = true;
	}
	return isValidate;
}
function getDataFromAPI(data) 
{

	const flag = data[0].flags.svg;
	let name = data[0].name.common;
	const citys = data[0].capital[0];
	const populations = data[0].population;
	const continents = data[0].continents[0];
	const currencies = Object.keys(data[0].currencies)[0];
	const language = Object.keys(data[0].languages)[0];

	
	// show item to ui 
	showItem(flag,name,citys,populations,continents,currencies,language)
}

function showItem(flag,name,citys,populations,continents,currencies,language)
{
	infoElm.innerHTML = `
			<div class="flag-desing">
					<div class="main-flag">
						<img src="${flag}" alt="flag is not found">
				        <h3>${name}</h3>
					</div>
				</div>
				<div class="moreInfo">
					<p>Capital : <span>${citys}</span></p>
					<p>Continent : <span>${continents}</span></p>
					<p>Population : <span>${populations}</span></p>
					<p>Currency : <span>${currencies}</span></p>
					<p>Common Languages : <span>${language}</span></p>
				</div>
			</div>
			`;
}
