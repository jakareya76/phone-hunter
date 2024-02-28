const loadPhone = async (searchText = "iphone") => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();

  const phones = data.data;

  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  phoneContainer.textContent = "";

  const showAllContainer = document.getElementById("show-all-container");

  if (phones.length > 12) {
    showAllContainer.classList.remove("hidden");
  } else {
    showAllContainer.classList.add("hidden");
  }

  phones = phones.splice(0, 12);

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
        <button class="btn btn-primary w-full text-xl text-white bg-[#0D6EFD] border-none">Show Details</button>
        </div>
    </div>
    `;

    phoneContainer.appendChild(phoneCard);
  });

  toggleLoadingSpinner(false);
};

// Handle Search Button
const handleSearch = () => {
  toggleLoadingSpinner(true);

  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  loadPhone(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");

  if (isLoading) {
    loadingSpinner.classList.remove("hidden");
  } else {
    loadingSpinner.classList.add("hidden");
  }
};

loadPhone();
