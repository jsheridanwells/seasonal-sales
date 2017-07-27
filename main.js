let productCards = Array.from(document.querySelectorAll('.product-card'));
let seasonSelector = document.getElementById('season-selector');
let productsData = [];
let departmentsData = [];
let season = '';

let xhr1 = new XMLHttpRequest();
xhr1.addEventListener('load', function () {
	productsData.push(JSON.parse(xhr1.responseText));
	showProducts()

});

let xhr2 = new XMLHttpRequest();
xhr2.addEventListener('load', function () {
	departmentsData.push(JSON.parse(xhr2.responseText));
});

xhr1.open('GET', 'products.json');
xhr2.open('GET', 'departments.json');
xhr1.send();
xhr2.send();

function showProducts() {
	for(let i = 0; i < productCards.length; i++) {
		productCards[i].innerHTML = `
			<p><strong>${productsData[0].products[i].name}</strong></p>
			<p class="${productsData[0].products[i].category_id}">${productsData[0].products[i].price}</p>
			<p>${getDepartment(i)}</p>
		`;
	}
}
function getDepartment(num) {
	if (productsData[0].products[num].category_id === 1) {
		return 'Apparel';
	} else if (productsData[0].products[num].category_id === 2) {
		return 'Furniture';
	} else if (productsData[0].products[num].category_id === 3) {
		return 'Household';
	}
}

function updatePrice(arr, index) {
	for(let i = 0; i < arr.length; i++) {
		let price = arr[i].innerText;
		let discounted = price - (price * departmentsData[0].categories[index].discount);
		arr[i].innerText = discounted.toFixed(2);
	}
}

seasonSelector.addEventListener('change', () => {
	season = seasonSelector.value;
	if (season === 'Autumn') {
		updatePrice(document.getElementsByClassName('1'), 0);
	} else if (season === 'Winter') {
		updatePrice(document.getElementsByClassName('2'), 1);
	} else if (season === 'Spring') {
		updatePrice(document.getElementsByClassName('3'), 2);
	}
});

//status - prices are being discounted on change,
//have to find a way to reset other prices to original