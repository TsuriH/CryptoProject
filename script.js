
const main = document.querySelector('main')

let coins = []
let favoriteCoins = []
const searchResult = document.getElementById('inputPassword2')

getCoinsList()

function showSearchedCoin() {
    for(let i = 0; i < coins.length; i++) {
        if(coins[i].symbol === searchResult.value) {
            main.innerHTML = coinCard(coins[i], i)
            break
        }
    }

}


function showChosenContent(event) {
    const aLink = document.getElementsByClassName('nav-link')
    for (let element of aLink) {
        element.classList.remove('active')
    }

    event.target.classList.add('active')

    const target = event.target.id
    navigation()
    async function navigation() {
        main.innerHTML = ""
        if (target === "index") {
            await getCoinsList()
        } else {
            fetch(`${target}.html`)
                .then(res => res.text())
                .then(data => main.innerHTML = data)
        }
    }

}





function coinCard(_coin, index) {
    return `
        <div class="col-md-4 my-2">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title my-2">${_coin.symbol}</h5>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch" onchange="chooseCoin(event)" value="${_coin.id}">
                        </div>
                    </div>
                    <h6 class="card-subtitle mb-4 text-muted">${_coin.name}</h6>
                    <a href="#collapseExample" data-bs-toggle="collapse" data-bs-target="#${"coin" + index}" aria-expanded="false" class="btn btn-primary my-3" aria-controls="collapseExample" onclick="giveMeMoreInfo(event)" data-coin-id="${_coin.id}" >More info</a>

                    <div class="collapse" id="${"coin" + index}">
                        <div class="card card-body" id="body${_coin.id}">
                        </div>
                    </div>
                   
                </div> 
            </div>
        </div>
        
        
    `
}



async function fetcher(url){
    onBackdrop()

    try {
        let res = await fetch(url);
        let data = await res.json();
        offBackdrop()

        return data
    } catch (error) {
        alert("error")
        offBackdrop()

    }
}

async function getCoinsList() {
    const arr = await fetcher("https://api.coingecko.com/api/v3/coins/list")
    coins = arr
    console.log(arr[0])
    for (let index = 0; index < 100; index++) {
        main.innerHTML += coinCard(arr[index], index);

    }
}


async function giveMeMoreInfo(event) {

    const coinId = event.target.getAttribute("data-coin-id")

    const currentBody = document.querySelector(`#body${coinId}`)

    if (COINS_CACHE[coinId] && (new Date().getTime() < (new Date(COINS_CACHE[coinId].time).getTime() + 120000))) {

        currentBody.innerHTML = COINS_CACHE[coinId].html;

    } else {


        let data = await fetcher(`https://api.coingecko.com/api/v3/coins/${coinId}`)

        const prices = data.market_data.current_price

        const coinImage = data.image.small

        const html = `
    
        <div class="more-info-container">
    
          <img src="${coinImage}" /> 
          
          <span><b>USD</b>: ${prices.usd}</span>
          
          <span><b>ERO</b>: ${prices.eur}</span>
          
          <span><b>ILS</b>: ${prices.ils}</span>
    
        </div>
     `

        currentBody.innerHTML = html

        COINS_CACHE[coinId] = { html: html, time: new Date() }


    }


}




function onBackdrop() {
    //get the height off all the current body to a variable and after 
    
    document.body.style.overflow = "hidden"

    
    document.querySelector('.backdrop').style.display = "block"


}



function offBackdrop() {
    document.body.style.overflow = "auto"
    document.querySelector('.backdrop').style.display = "none"
}


function chooseCoinModal(event){
    const id = event.target.value

    const checked = event.target.checked

    const inputs = document.querySelectorAll(`[value="${id}"]`)


    for(const input of inputs){
        input.checked = checked
    }


    favoriteCoins = favoriteCoins.filter(coin => coin !== id)


    $('#myModal').modal('hide');
}




function chooseCoin(event) {
    
    const checked = event.target.checked
    const id = event.target.value

     if (checked) {
        favoriteCoins.push(id)
    } else {
        favoriteCoins = favoriteCoins.filter(coin => coin !== id)
    }
        
    if (favoriteCoins.length === 6) {
        favoriteCoins.pop()
        event.target.checked= false
        $("#myModal").modal('show');

        document.querySelector(".modal-body").innerHTML += favoriteCoins.map((coin) => {
            return `
        <div class="form-check form-switch">
        <input class="form-check-input" type="checkbox" checked="true" role="switch" onchange="chooseCoinModal(event)" value="${coin}">
        
        ${coin}
        </div>
        `
        }).join("")

    }

    console.log(favoriteCoins);

}



