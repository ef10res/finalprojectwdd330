const button = document.querySelector("#info");
const dialogBox = document.querySelector("#dialogBox");
const closeButton = document.querySelector("#closeButton");
const div = document.querySelector("#sydney");

button.addEventListener("click", () => {
    dialogBox.showModal();
    loadPlaceData();
});

closeButton.addEventListener("click", () => {
    dialogBox.close();
});

const geoKey = "AIzaSyArQnKaWafb0p5h2fy8TC40FFrdvNWw8q0"

async function loadPlaceData() {
    const service = new google.maps.places.PlacesService(document.createElement('div'));

    const searchRequest = {
        query: 'Sydney Opera House',
        fields: ['place_id'],
    };

    try {
        const searchData = await new Promise((resolve, reject) => {
            service.findPlaceFromQuery(searchRequest, (results, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) resolve(results);
                else reject(status);
            });
        });

        const placeId = searchData[0].place_id;

        // get details using the placeId
        const detailsRequest = {
            placeId: placeId,
            fields: ['name', 'formatted_address', 'geometry', 'rating', 'user_ratings_total', 'website', 'formatted_phone_number']
        };

        const place = await new Promise((resolve, reject) => {
            service.getDetails(detailsRequest, (result, status) => {
                if (status === google.maps.places.PlacesServiceStatus.OK) resolve(result);
                else reject(status);
            });
        });

        const attributes = {
            name: place.name,
            address: place.formatted_address,
            lat: place.geometry.location.lat(), // Note: lat and lng are functions in the SDK
            lng: place.geometry.location.lng(),
            rating: place.rating,
            totalRatings: place.user_ratings_total,
            website: place.website,
            phone: place.formatted_phone_number
        };

        document.getElementById("place-info").innerHTML = `
      <h2>${attributes.name}</h2>
      <p><strong>Address:</strong> ${attributes.address}</p>
      <p><strong>Rating:</strong> ${attributes.rating}</p>
      <p><strong>Total Ratings:</strong> ${attributes.totalRatings}</p>
      <p><strong>Phone:</strong> ${attributes.phone || "N/A"}</p>
      <p><strong>Website:</strong> 
        <a href="${attributes.website}" target="_blank">Visit</a>
      </p>
    `;

        // create map
        const map = new google.maps.Map(document.getElementById("map"), {
            center: { lat: attributes.lat, lng: attributes.lng },
            zoom: 16,
        });

        // marker
        new google.maps.Marker({
            position: { lat: attributes.lat, lng: attributes.lng },
            map: map,
        });

        // fix map rendering inside modal
        setTimeout(() => {
            google.maps.event.trigger(map, "resize");
            map.setCenter({ lat: attributes.lat, lng: attributes.lng });
        }, 300);

    } catch (error) {
        console.error("Places Service failed:", error);
    }
}