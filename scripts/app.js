const loadPhone = async (searchText = "iphone", isShowAll) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();

  const phones = data.data;

  displayPhones(phones, isShowAll);
};

const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12 && !isShowAll) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  if (!isShowAll) {
    phones = phones.splice(0, 12);
  }

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList.add("card", "w-96", "bg-base-100", "p-5", "border-2");

    phoneCard.innerHTML = `
    <figure>
        <img
        src="${phone.image}"
        alt="${phone.slug}"
        class="mt-8"
        />
    </figure>
    <div class="card-body text-center">
        <h2 class="text-3xl font-bold">${phone.phone_name}</h2>
        <p class="mb-4">There are many variations of passages of available, but the majority have suffered</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}')" class="btn btn-primary w-full text-xl text-white bg-[#0D6EFD] border-none">Show Details</button>
        </div>
    </div>
    `;

    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

// Handle Search Button
const handleSearch = (isShowAll) => {
  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhone(searchText, isShowAll);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

const handleShowAll = () => {
  handleSearch(true);
};

const handleShowDetail = async (id) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );

  const data = await res.json();

  const phone = data.data;

  showPhoneDetails(phone);
};

const showPhoneDetails = (phone) => {
  const showDetailContainer = document.getElementById("show-detail-container");
  showDetailContainer.innerHTML = `
      <img src="${phone.image}" alt="modal-img" />
      <h2 class="text-2xl font-bold mt-2">${phone.name}</h2>
      <div class="text-left space-y-3">
        <p><span class="font-bold">Storage: </span>${
          phone?.mainFeatures?.storage
        }</p>
        <p><span class="font-bold">GPS: </span>${
          phone.others?.GPS || "No GPS available"
        }</p>
        <p><span class="font-bold">USB: </span>${
          phone.others?.USB || "No USB available"
        }</p>
        <p><span class="font-bold">Bluetooth: </span>${
          phone.others?.Bluetooth || "No Bluetooth available"
        }</p>
        <p><span class="font-bold">WLAN: </span>${
          phone.others?.WLAN || "No WLAN available"
        }</p>
      </div>


  `;

  show_modal.showModal();
  console.log(phone);
};

loadPhone();
