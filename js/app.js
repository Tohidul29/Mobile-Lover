const allMobiles = () =>{
    const searchPhone = document.getElementById('user-input');
    searchPhoneValue = searchPhone.value;
    searchPhone.value = '';

    //here I use to show alert messages:
    const alertMsg = document.getElementById('alert-part');
    alertMsg.textContent = '';
    if(searchPhoneValue == ''){
        alertMsg.innerHTML = `
            <h5 class='text-danger text-center'>Sorry, No search result found!!! because search box is empty.</h5>
        `;
    }
    else{
        const url = `https://openapi.programming-hero.com/api/phones?search=${searchPhoneValue}`;
        fetch(url)
        .then(response => response.json())
        .then(data =>{
            if(data.data[0] == undefined){
                alertMsg.innerHTML = `
                <h5 class='text-danger text-center'>Sorry, there have no device like this name!!!</h5>
            `;
            }
            else{
                showSearchingMobiles(data.data);
            }
        })
    }
}

const showSearchingMobiles = (mobiles) => {
    const showMobiles = document.getElementById('mobiles-container');
    showMobiles.textContent = '';
    let mobilesArray = mobiles.slice(0, 20);
    if(mobiles.length > 20){
        mobilesArray.forEach( mobile => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col m-4">
                <div class="card mx-auto text-center p-2">
                    <img class="w-50 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${mobile.phone_name}</h3>
                        <h5 class="card-title">${mobile.brand}</h5>
                        <button onclick="singleDeviceDetails('${mobile.slug}')" type="button" class="card-title mt-3 btn col-6 btn-primary">Details</button>
                    </div>
                </div>
            </div>
            `;
            showMobiles.appendChild(div);
        })
    }
    else{
        mobiles.forEach(mobile => {
            const div = document.createElement('div');
            div.innerHTML = `
            <div class="col m-4">
                <div class="card mx-auto text-center p-2">
                    <img class="w-50 mx-auto" src="${mobile.image}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <h3 class="card-title">${mobile.phone_name}</h3>
                        <h5 class="card-title">${mobile.brand}</h5>
                        <button onclick="singleDeviceDetails('${mobile.slug}')" type="button" class="card-title mt-3 btn col-6 btn-primary">Details</button>
                    </div>
                </div>
            </div>
            `;
            showMobiles.appendChild(div);
        })
    }
}

const singleDeviceDetails = (mobileSlug) => {
    const url = `https://openapi.programming-hero.com/api/phone/${mobileSlug}`;
    fetch(url)
    .then(response => response.json())
    .then(data => showDeviceDetails(data))
};

const showDeviceDetails = (deviceInfo) => {
    console.log(deviceInfo)
    const deviceDetailContainer = document.getElementById('device-details');
    //that's for those devices who's don't have any other features details:
    if(!deviceInfo.data.others){
        deviceDetailContainer.innerHTML = `
        <div class="card mb-3 w-100 mx-auto p-4">
            <img src="${deviceInfo.data.image}" class="card-img-top w-25 mx-auto" alt="...">
            <div class="card-body text-center mt-3">
                <h2 class"card-title">Device: ${deviceInfo.data.name}</h2>
                <h3 class="card-title">Release Date: ${deviceInfo.data.releaseDate}</h3>
                <h4 class="card-title mt-4">Main Feature: <h5>${deviceInfo.data.mainFeatures.storage}</h5></h4>
                <h4 class="card-title mt-4">Sensors: <h5>${deviceInfo.data.mainFeatures.sensors}</h5></h4>
                <h4 class="card-title mt-4">Other Features: 
                    <h3 class="card-title"><span class="text-primary">Sorry, we don't added other features yet!!!</span></h3>
                </h4>
            </div>
        </div>
        `;
    }
    //that's for those devices who don't have release date:
    else if(deviceInfo.data.releaseDate == ''){
        deviceDetailContainer.innerHTML = `
        <div class="card mb-3 w-100 mx-auto p-4">
            <img src="${deviceInfo.data.image}" class="card-img-top w-25 mx-auto" alt="...">
            <div class="card-body text-center mt-3">
                <h2 class"card-title">Device: ${deviceInfo.data.name}</h2>
                <h3 class="card-title">Release Date: <span class="text-primary">Release date not found!!!</span></h3>
                <h4 class="card-title mt-4">Main Feature: <h5>${deviceInfo.data.mainFeatures.storage}</h5></h4>
                <h4 class="card-title mt-4">Sensors: <h5>${deviceInfo.data.mainFeatures.sensors}</h5></h4>
                <h4 class="card-title mt-4">Other Features: 
                    <h5><span class="fw-bold">WLAN: </span> ${deviceInfo.data.others.WLAN}</h5> 
                    <h5><span class="fw-bold">Bluetooth: </span> ${deviceInfo.data.others.Bluetooth}</h5> 
                    <h5><span class="fw-bold">GPS:</span> ${deviceInfo.data.others.GPS}</h5> 
                </h4>
            </div>
        </div>
        `;
    }
    //if get all the datas from url then it will go this following way on my device detail part:
    else{
        deviceDetailContainer.innerHTML = `
        <div class="card mb-3 w-100 mx-auto p-4">
            <img src="${deviceInfo.data.image}" class="card-img-top w-25 mx-auto" alt="...">
            <div class="card-body text-center mt-3">
                <h2 class"card-title">Device: ${deviceInfo.data.name}</h2>
                <h3 class="card-title">Release Date: ${deviceInfo.data.releaseDate}</h3>
                <h4 class="card-title mt-4">Main Feature: <h5>${deviceInfo.data.mainFeatures.storage}</h5></h4>
                <h4 class="card-title mt-4">Sensors: <h5>${deviceInfo.data.mainFeatures.sensors}</h5></h4>
                <h4 class="card-title mt-4">Other Features: 
                    <h5><span class="fw-bold">WLAN: </span> ${deviceInfo.data.others.WLAN}</h5> 
                    <h5><span class="fw-bold">Bluetooth: </span> ${deviceInfo.data.others.Bluetooth}</h5> 
                    <h5><span class="fw-bold">GPS:</span> ${deviceInfo.data.others.GPS}</h5> 
                </h4>
            </div>
        </div>
        `;
    }
};