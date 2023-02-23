import axios from 'axios';

console.log('Hallo daar!');

async function getCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        console.log(result.data);
        console.log(result.data[0].name);
        console.log(result.data[0].population);
        const printingCountries = document.getElementById('show_countries');
        printingCountries.innerHTML =
            `
           <li class="${allocateColor(result.data[0].region)}" > <img src="${result.data[0].flag}" class ="flag-country" alt="flag-country">  ${result.data[0].name} </li> 
           <p> Has a population of ${result.data[0].population}</p>
          
            `
        } catch (e) {
            console.error(e);
        }
    }


async function finalCountries() {
    try {
        const result = await axios.get('https://restcountries.com/v2/all');
        //maak een schone Array
        const cleanCountryData = result.data;
        //sorteer op populatie
        const countriesSorted = cleanCountryData.sort((a , b) => {
            return a.population - b.population
        })
        // Ga langs met map methode
        const mappingCountries = countriesSorted.map((country, index) => {
            return `<li class="${allocateColor(countriesSorted[index].region)}" > <img src="${countriesSorted[index].flag}" class ="flag-country" alt="flag-country">  ${countriesSorted[index].name} </li> 
           <p> Has a population of: ${countriesSorted[index].population} people </p>
            `
            })
           const makePretty = mappingCountries.join("<br>")
           const printingCountries = document.getElementById('show_countries');
           printingCountries.innerHTML = makePretty;
        }
    catch (e) {
        console.error(e);
    }

}
finalCountries();


//return String color
function allocateColor (region) {
    switch (region) {
        case "Europe":
            return "yellow-country";
            break;
        case"Americas":
            return "green-country"
            break;
        case "Asia":
            return "red-country";
            break;
        case "Oceania":
            return "purple-country";
            break;
        case "Africa":
            return "blue-country";
            break;
        default:
            return "grey-country";
            break;
    }
}


    async function getNetherlands() {
        try {
            const result = await axios.get('https://restcountries.com/v2/name/Netherlands');
            const cleanNetherlands = result.data[0];
            console.log(cleanNetherlands.name);
            console.log(cleanNetherlands.population);
            const printingNetherlands = document.getElementById('search-countries');
            printingNetherlands.innerHTML =
                `
                <img src="${cleanNetherlands.flag}" class ="flag-country-netherlands" alt="flag-country">  ${cleanNetherlands.name} </li> 
                <p> Has a population of ${cleanNetherlands.population}</p>
                `
            } catch (e) {
              console.error(e);
        }
        console.log(getNetherlands());
    }

    getNetherlands();

function getValuta (country) {


}











