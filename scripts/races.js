const file = './data/races.json';

async function getRacesData() {
    const response = await fetch(file);
    const data = await response.json();
    displayRaces(data.races);
}

getRacesData();

const raceList = document.getElementById("races-list");

const displayRaces = (races) => {
    races.forEach((race) => {
        let card = document.createElement('div');
        let title = document.createElement('h2');
        let img = document.createElement('img');
        let desc = document.createElement('p');
        let record = document.createElement('p');
        let runner = document.createElement('p');
        let runners = document.createElement('p');
        let inaug = document.createElement('p');
        let spec = document.createElement('p');

        title.textContent = `${race.name}`;
        desc.textContent = `${race.country}`;
        record.textContent = `Race Record: ${race.record}`;
        runner.textContent = `Runner: ${race.runner}`;
        runners.textContent = `Largest Field: ${race.people}`;
        inaug.textContent = `Inauguration: ${race.inauguration}`;
        spec.textContent = `Spectators: ${race.spectators}`;
        img.setAttribute('src', race.picture);
        img.setAttribute('alt', `${race.name} image`);
        img.setAttribute('loading', 'lazy');

        card.appendChild(title);
        card.appendChild(img);
        card.appendChild(desc);
        card.appendChild(record);
        card.appendChild(runner);
        card.appendChild(runners);
        card.appendChild(inaug);
        card.appendChild(spec);

        raceList.appendChild(card);
    })
};