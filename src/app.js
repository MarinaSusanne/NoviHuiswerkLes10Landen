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


/////////////////////// OPDRACHT 2/////////////////////////////////////////////

// sla de referentie naar het formulier op en plaats er een submit-event listener op
const searchForm = document.getElementById('search-form');
//koppel eventListener eraan. Als submit wordt getriggerd dan wordt de functie searchCountry uitgvoerd
searchForm.addEventListener('submit', searchCountry );

const printCountry = document.getElementById('search-result');
const errorMessageBox = document.getElementById('error-message');

// maak functie search country. Wanneer event object wordt aangemaakt wordt parameter meegegeven
function searchCountry(e){
   //voorkom standaard actie, dus dat de pagina ververst
    e.preventDefault();
    //koppel searchValue aan html element om de waarde op te halen. IK SNAP DEZE STAP NIET!
    const searchValue = document.getElementById("search-value");
   //ingevoerde waarde wordt in de fetchdata methode toegevoegd
    fetchData(searchValue.value);
    //legen van het invoerveld
    searchValue.value = '';
}


//hierboven heette het searchValue.value en heet vanaf nu country
async function fetchData (country){
    //Hiermee weet ik dat na elke zoekopdracht de printing leeg wordt gemaakt
    printCountry.innerHTML = ``;
    errorMessageBox.innerHTML = ``;

    try{
        //backticks for string interpolation
        const result = await axios.get(`https://restcountries.com/v2/name/${country}`)
        const chosenCountry = result.data[0];
        printCountry.innerHTML = `
        <article class="search-result-box">
        <span class="flag-title-container">
        <img src="${chosenCountry.flag}" alt="flag-country" class="flag-individual-country">
        <h2> ${chosenCountry.name}</h2>
        </span> 
        <p>${chosenCountry.name} is situated in ${chosenCountry.subregion}. It has a population of ${chosenCountry.population} people. </p>
        <p> The capital is ${chosenCountry.capital}  ${currencyCreator(chosenCountry.currencies)} ${languageCreator(chosenCountry.languages)} </p>
        </article>
    `
    } catch(e){
        console.error(e);
        errorMessageBox.innerHTML = `
       <p class="error-message">${name} Land bestaat niet. Probeer het nogmaals.</p>
       `
    }
}

//Genereren van een valuta string
function currencyCreator (currencies) {
    let output = 'and you can pay with ' ;
  if(currencies.length === 2){
    return output + `${currencies[0].name} and ${currencies[1].name}`;
    }
else {
    return output + `${currencies[0].name}`
 }
}

function languageCreator (languages) {
    let languagesArray = languages.map((language) => {
        return language.name;
    })
    if (languagesArray.length > 2) {
        const lastTwoLanguages = languagesArray.slice(-2);
        const firstLanguages = languagesArray.slice(0, -2);
        return `${firstLanguages.join(", ")} , ${lastTwoLanguages.join(" and ")}`
    } else {
        return `${languages.join("and")}.`
    }
}








