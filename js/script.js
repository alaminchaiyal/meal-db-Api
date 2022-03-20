const card = document.getElementById('card');
const p = document.getElementById('error');
const spinner = document.getElementById('spinner');
const fetchData = () => {
	const searchField = document.getElementById('search-field');
	const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchField.value}`;
	if (searchField.value == '') {
		p.textContent = 'Please type food name!';
		card.textContent = '';
	} else {
		fetch(url)
			.then(res => res.json())
			.then(data => displayFood(data.meals))
		searchField.value = '';
		p.textContent = ' ';

	}
	spinner.textContent = '';
}
const displayFood = (items) => {
	if (items == null) {
		p.textContent = 'This item is not available. Please search in different name!';
		card.textContent = '';
	} else {
		card.textContent = '';
		p.textContent = ' ';
		for (const item of items) {
			const div = document.createElement('div');
			div.classList.add('col');
			div.innerHTML = `
			<div class = "card">
				<img src="${item.strMealThumb}" class="card-img-top img-fluid" alt="...">
				<div class="card-body">
					  <h5 class="card-title">${item.strMeal}</h5>
					  <p class="card-text">${item.strInstructions.slice(0, 200)}</p>
					  <p class="card-text"><a href="${item.strYoutube}" target="_blank">See More</a></p>
				</div>
			</div>
			`
			card.appendChild(div);
		}
	}
}
document.getElementById('search-btn').addEventListener('click', () => {
	spinner.innerHTML = `
	<div class="d-flex justify-content-center">
  		<div class="spinner-border" role="status">
    		<span class="visually-hidden">Loading...</span>
  		</div>
	</div>
	`;
	card.textContent = '';
	const displayData = setTimeout(fetchData, 1000);
	displayData;
})

