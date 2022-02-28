const allMobiles = () =>{
    const searchPhone = document.getElementById('user-input');
    searchPhoneValue = searchPhone.value;
    searchPhone.value = '';
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhoneValue}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showSearchingMobiles(data.data))
}

const showSearchingMobiles = (mobiles) => {
    console.log(mobiles)
    const showMobiles = document.getElementById('mobiles-container');
    showMobiles.textContent = '';
    mobiles.forEach( mobile => {
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col m-4">
            <div class="card mx-auto text-center p-2">
                <img class="w-50 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h3 class="card-title">${mobile.phone_name}</h3>
                    <h5 class="card-title">${mobile.brand}</h5>
                    <button type="button" class="card-title mt-3 btn col-6 btn-outline-primary">Device Details</button>
                </div>
            </div>
        </div>
        `;
        showMobiles.appendChild(div);
    })
}