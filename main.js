let productCards = Array.from(document.querySelectorAll('.product-card'));
let seasonSelector = document.getElementById('season-selector');
let productsData = [];
let departmentsData = [];
let season = '';

let xhr1 = new XMLHttpRequest();    //pull products data and show
xhr1.addEventListener('load', function () {
	if (xhr1.status === 200) {
		productsData.push(JSON.parse(xhr1.responseText));
		showProducts();
	} else {
		console.log("xhr1 not successful");
	}

});

let xhr2 = new XMLHttpRequest();    //pull departments and discounts data
xhr2.addEventListener('load', function () {
	if (xhr2.status === 200) {
		departmentsData.push(JSON.parse(xhr2.responseText));
	} else {
		console.log("xhr2 not successful");
	}
});

xhr1.open('GET', 'products.json');
xhr2.open('GET', 'departments.json');
xhr1.send();
xhr2.send();

//post all product data to the page
function showProducts() {
	for(let i = 0; i < productCards.length; i++) {
		productCards[i].innerHTML = `
			<p><strong>${productsData[0].products[i].name}</strong></p>
			<p class="${productsData[0].products[i].category_id} prices	">${productsData[0].products[i].price}</p>
			<p>${getDepartment(i)}</p>
		`;
	}
}

//assign department ID to all products within showProducts() function
function getDepartment(num) {
	if (productsData[0].products[num].category_id === 1) {
		return 'Apparel';
	} else if (productsData[0].products[num].category_id === 2) {
		return 'Furniture';
	} else if (productsData[0].products[num].category_id === 3) {
		return 'Household';
	}
}

// reset all prices to original and update prices to show discounts depending on the seasons
function updatePrice(arr, index) {
	showProducts();
	for(let i = 0; i < arr.length; i++) {
		let price = arr[i].innerText;
		let discounted = price - (price * departmentsData[0].categories[index].discount);
		arr[i].innerText = discounted.toFixed(2);
	}
}

//bind updatePrice() to season selector
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