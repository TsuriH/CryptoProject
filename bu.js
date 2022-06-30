// $(document).ready(function () {
//     $('.btn').css({ "width": "100px", "height": "25px", "color": "white", "background": "red", "border-radius": "5px" })
// });


const tableEl = document.getElementById('statisticsTable')
let contries = [];

 function showAllStates(){
    getAllStates();
    showTableWithData();
}
function getSpecContries(){
    const input = document.getElementById('');
    
}

function showTablesWithData(){
    const continents = contries.map(country => country.continents[0]);
    const cont = [...new Set(continents)];
    const contToShow = cont.map(continent=>{
        const amount = contries.filter(country=>country.continents[0]===continent).length;
        return {
            name: continent,
            amount
        }
    })
    console.log(continents);
    console.log(cont);
    const continentsTable = `<table>
                        <tr>
                            <th>Continents</th>
                            <th>Number Of Countries</th>
                        </tr>
                        ${cont.map(continent=>{
                            return `<tr>
                                <td>${continent.name}</td>
                                <td>${continent.amount}</td>
                            </tr>`
                        }).join("")}
                    </table>`;
    const countriesTable = `<table>
                        <tr>
                            <th>Country</th>
                            <th>Population</th>
                        </tr>
                        ${contries.map(contry=>{
                            return `<tr>
                                <td>${contry.name.common}</td>
                                <td>${contry.population}</td>
                            </tr>`
                        }).join("")}
                    </table>`;

    document.getElementById('continentsTable').innerHTML = continentsTable;
    document.getElementById('statisticsTable').innerHTML = countriesTable;
}

function stats(){
    const allPop = contries.reduce((prevpop, country) => prevpop+=country.population ,0)
    const countrisMedian = allPop/contries.length;

    const statsTable = `<table class='statsTable'>
                            <tr>
                                <th>Number Of Contries</td>
                                <th>Total Population</td>
                                <th>Population Median</td>
                            </tr>
                            <tr>
                                <td>${contries.length}</td>
                                <td>${allPop}</td>
                                <td>${countrisMedian}</td>
                            </tr>
                        </table>`;
    document.getElementById('stats').innerHTML = statsTable;

    console.log(allPop);
}
function getAllStates() {
    fetch('https://restcountries.com/v3.1/all')
    .then(res => res.json())
    .then(data =>{
         contries=data;
         stats();
         showTablesWithData();
    })
    .catch(error => console.error('Problem getting data', error))
}













<div class="search-bar">
<button id="all-countries" class="btn" onclick="showAllStates()">All</button>
<input type="text" id="search-box" placeholder="type country">
<button class="btn" id="exactSer">Exact search</button>
</div>
<div class="stats" id="stats"></div>
<div class="statisticsTable" id="continentsTable"></div>
<div class="statisticsTable" id="statisticsTable"></div>










let allCountriesSta;
let total
const tableEl = document.getElementById('table')
function getCountries() {
    fetch('https://restcountries.com/v3.1/israel')
        .then(res => res.json())
        .then(data => {
            allCountriesSta = data
            allCountryBasicInfo(allCountriesSta)
            createTableOfCountries(allCountriesSta)
            allContinents(allCountriesSta)

        })
}

function allCountryBasicInfo(arr) {
    const numberOfResidents = arr.reduce((totalPopulation, country) => { return country.population + totalPopulation }, 0)
    const table = `
    Numbers of Countries: ${arr.length}<br>
                   Numbers of Residents: ${numberOfResidents}<br>
                   Average of Residents per Country:
                   ${numberOfResidents / arr.length}
                    `
    tableEl.innerHTML = table
}

function createTableOfCountries(countries) {
    const table = `<table>
                        <tr>
                            <th>Country</th>
                            <th>Population</th>
                        </tr>
                        ${countries.map(country => {
        return `<tr>
                                <td>${country.name.common}</td>
                                <td>${country.population}</td>
                            </tr>`
    }).join("")}
                  </table>`
    tableEl.innerHTML += table
}

function allContinents(info) {
    const continents = info.map(country => country.continents[0])
    const filterContinents = [...new Set(continents)]
    const continentsStatis = filterContinents.map(continent => {
        const amount = info.filter(country => country.continents[0] === continent).length
        return {
            name: continent,
            amount: amount
        }
        
    })
  
    const tableContinentsTable = `<table>
                                      <tr>
                                            <th>Continent</th>
                                            <th>Number of Country</th>
                                      </tr>
                                      ${continentsStatis.map(item => {
                                          return `<tr>
                                                <td>${item.name}</td>
                                                <td>${item.amount}</td>
                                          </tr>`
                                      }).join('')}
                                </table>`
    console.log(continentsStatis);
    tableEl.innerHTML += tableContinentsTable

    
}