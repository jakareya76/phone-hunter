const loadPhone = async () => {
  const url = "https://openapi.programming-hero.com/api/phones?search=iphone";

  const res = await fetch(url);
  const data = await res.json();

  const phones = data.data;
  displayPhones(phones);
};

const displayPhones = (phones) => {
  const phoneContainer = document.getElementById("phone-container");

  phones.forEach((phone) => {
    const phoneCard = document.createElement("div");
    phoneCard.classList.add(
      "card",
      "w-96",
      "bg-base-100",
      "shadow-xl",
      "p-5",
      "border-2"
    );

    console.log(phone);

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

loadPhone();
