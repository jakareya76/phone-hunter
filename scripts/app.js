const loadPhone = async (searchText) => {
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

  const res = await fetch(url);
  const data = await res.json();

  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

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
};

// Handle Search Button
const handleSearch = () => {
  const phoneContainer = document.getElementById("phone-container");
  const searchField = document.getElementById("search-field");
  const searchText = searchField.value;

  phoneContainer.textContent = "";

  loadPhone(searchText);
};

loadPhone("iphone");
