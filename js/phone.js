const loadPhone = async (searchText='samsung', clickedShowAll) =>{
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, clickedShowAll);
    console.log(phones)
    // it returns an empty array while searchText is meaningless word
}

const displayPhones = (phones, clickedShowAll) =>{
    // console.log(phones);
    const phoneContainer = document.getElementById('phone-container')

    // clear phone container cards before adding new cards
    phoneContainer.textContent = ''


    // showing not found div 
    const notFound = document.getElementById('not-found');
    if(phones.length === 0){
        console.log('nai mamma');
        notFound.classList.remove('hidden')
    }else{
        notFound.classList.add('hidden');
    }
    
    // display show all button if there are more than 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !clickedShowAll){
        showAllContainer.classList.remove('hidden');
        
    }
    else{
        showAllContainer.classList.add('hidden');
    }
    
    // console.log(phones.length)
    // display only first 12 phone if not show All
    if(!clickedShowAll){
        phones = phones.slice(0,12);
    }
    phones.forEach( phone => {
        // console.log(phone)
        const phoneCard = document.createElement('div');
        phoneCard.classList.add('card-style')
        phoneCard.innerHTML = `
                    <figure class="px-10 pt-10">
                      <img src="${phone.image}" class="mx-auto"/>
                    </figure>
                    <div class="card-body items-center text-center">
                      <h2 class="card-title">${phone.phone_name}</h2>
                      <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
                        </div>
                    </div>
        `;
        phoneContainer.appendChild(phoneCard);
    })

    // hide loading spinner
    toggleLoadingSpinner(false);
}


const handleSearch = (clickedShowAll) => {     // clickedShowAll = true
    toggleLoadingSpinner(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    loadPhone(searchText,clickedShowAll);
}

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden')
    }else{
        loadingSpinner.classList.add('hidden');
    }
}

const handleShowAll = () =>{
    handleSearch(true)
}

const handleShowDetails = async (id) =>{        //id= phone.slug
    console.log('clicked show details', id)
    // load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    console.log(data);
    const phone = data.data;
    handlePhoneDetails(phone)
    console.log(phone)
}

const handlePhoneDetails = (phone) =>{
    show_detail_modal.showModal()
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="" class="mt-5"/>
        <div class="mt-3">
        <p><span class="font-bold">Storage: </span>${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size: </span>${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset: </span>${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory: </span>${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">Release data: </span>${phone?.releaseDate}</p>
        <p><span class="font-bold">Brand: </span>${phone?.brand}</p>
        <p><span class="font-bold">GPS: </span>${phone?.others?.GPS || 'NO GPS available'}</p>
        <p><span class="font-bold">GPS: </span>${phone?.others?.GPS ? phone.others.GPS : 'NO GPS available'}</p>
        </div>
    `;
}

loadPhone();