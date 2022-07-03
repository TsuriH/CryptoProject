

function coinCard(_coin) {
    return `
        <div class="col-md-4 my-2">
            <div class="card">
                <div class="card-body">
                    <div class="d-flex justify-content-between">
                        <h5 class="card-title my-2">${_coin.symbol}</h5>
                        <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" role="switch">
                        </div>
                    </div>
                    <h6 class="card-subtitle mb-4 text-muted">${_coin.name}</h6>
                    <a href="#collapseExample" data-bs-toggle="collapse" data-bs-target=#${_coin.id} aria-expanded="false" class="btn btn-primary my-3" aria-controls="collapseExample">More info</a>
                    <div class="collapse" id=${_coin.id}>
                    <div class="card card-body" id="aaa">
              
                    </div>
                    </div>
                   
                </div> 
            </div>
        </div>
        
        
    `
}
async function getCoinsList() {
    let res = await fetch("https://api.coingecko.com/api/v3/coins/list");
    let arr = await res.json();
    for (let index = 0; index < 100; index++) {
        document.querySelector('main').innerHTML += coinCard(arr[index +1000]);
        
    }
    
}
getCoinsList();

 function coinMoreInfo(coinName) {
     fetch(`https://api.coingecko.com/api/v3/coins/${coinName}`)
    .then(res => res.json())
    .then(data => {
        return `king`
    })
    
   
    
 
}


