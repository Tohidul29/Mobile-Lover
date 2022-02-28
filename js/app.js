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
    // console.log(mobiles)
    for(const mobile of mobiles){
        const showMobiles = document.getElementById('mobiles-container');
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="col">
            <div class="card mx-auto text-center">
                <img class="w-25 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${mobile.phone_name}</h5>
                </div>
            </div>
        </div>
        `;
        showMobiles.appendChild(div);
    }
}