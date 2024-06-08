// for Headers

let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.navbar');

menu.onclick = () =>{
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
}

// for window scroll

window.onscroll = () =>{
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');

    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}

window.onload = () =>{
    if(window.scrollY > 0){
        document.querySelector('.header').classList.add('active');
    }else{
        document.querySelector('.header').classList.remove('active');
    }
}


 // Function to initialize the map
 function initMap(latitude, longitude) {
    // Create a new map centered around the provided coordinates
    const map = L.map('map').setView([latitude, longitude], 10); // Set initial zoom level here

    // Add a tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);
    
    // Add a marker at the provided coordinates
    L.marker([latitude, longitude]).addTo(map);
}

// Function to handle form submission
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get the value of the input field
    const cityName = document.getElementById("searchQuery").value;

    // Use OpenStreetMap Nominatim API for geocoding
    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`)
    .then(response => response.json())
    .then(data => {
        if (data.length > 0) {
            // Extract latitude and longitude from the result
            const latitude = parseFloat(data[0].lat);
            const longitude = parseFloat(data[0].lon);

            // Initialize the map with the obtained coordinates
            initMap(latitude, longitude);
        } else {
            alert("No results found for the provided city name.");
        }
    })
    .catch(error => {
        console.error('Error fetching geocode data:', error);
        alert("An error occurred while fetching data. Please try again later.");
    });
});