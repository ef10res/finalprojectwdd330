const file = './data/races.json';

async function getRacesData() {
    const response = await fetch(file);
    const data = await response.json();
    createSelect(data.races);
}

getRacesData();

const createSelect = races => {
    const selectElement = document.querySelector("#raceSel");
    if (!selectElement) {
        console.error("Select element with ID 'raceSel' not found.");
        return;
    }
    races.forEach(race => {
        let item = document.createElement("option");
        item.innerHTML = `${race.name}`;
        selectElement.appendChild(item);
    });
};
