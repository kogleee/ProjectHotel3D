const view = async () => {
  let virtual = document.querySelector(".virtual");
  let container = document.querySelector(".container");

  let data = await getHotel();

  for (elem of data) {
    if (elem.id == localStorage.getItem("hotelId")) {
      container.innerHTML = `<div class="main--info">
              <h2>${elem.name}</h2>
              <p>${elem.large_description}</p>
            </div>
            <div class="main--rating">
              <h2>Рейтинг</h2>
              <p class="curRate">${+elem.average_rating}/10</p>
              <div class="setRating">
                <select name="rating" id="rating">
                  <option value="1">1/10</option>
                  <option value="2">2/10</option>
                  <option value="3">3/10</option>
                  <option value="4">4/10</option>
                  <option value="5">5/10</option>
                  <option value="6">6/10</option>
                  <option value="7">7/10</option>
                  <option value="8">8/10</option>
                  <option value="9">9/10</option>
                  <option value="10">10/10</option>
                </select>
                <p id="setRating">Поставить оценку</p>
              </div>
            </div>`;
      virtual.innerHTML = `<iframe
            width="100%"
            height="100%"
            frameborder="0"
            allowfullscreen="true"
            webkitallowfullscreen="true"
            mozallowfullscreen="true"
            overflow="hidden"
            src="http://localhost:3000/${elem.panorama_img}"
          ></iframe>`;
    }
  }
  let rating = document.querySelector("#rating");
  let setRating = document.querySelector("#setRating");
  console.log(rating, rating.value);
  setRating.addEventListener("click", async (e) => {
    e.preventDefault();
    let rate = await createRating(
      localStorage.getItem("hotelId"),
      rating.value
    );
    if (rate.message == "Не авторизован") {
      window.location.href = "../reg/index.html";
    }
    view();
  });

  let reservation = document.getElementById("reservation");
  reservation.addEventListener("submit", async (e) => {
    e.preventDefault();
    let startDate = reservation.startDate.value;
    let endDate = reservation.endDate.value;
    let resCount = reservation.resCount.value;
    let crReserv = await createReservation(
      localStorage.getItem("hotelId"),
      startDate,
      endDate,
      resCount
    );
    if (crReserv.message == "Не авторизован") {
      window.location.href = "../reg/index.html";
    } else {
      alert("Успешно забронированно");
    }
  });
};

document.addEventListener("DOMContentLoaded", async (e) => {
  await view();
});

const getHotel = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/hotel/showAll");
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const createReservation = async (hotel, start, end, count) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/reservation/add",
      null,
      {
        params: {
          hotel: hotel,
          start: start,
          end: end,
          count: count,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
    return err.response.data;
  }
};

const createRating = async (hotel, rating) => {
  console.log(hotel, rating);
  try {
    const response = await axios.post(
      "http://localhost:3000/api/hotel/rating",
      null,
      {
        params: {
          hotel: hotel,
          rating: rating,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
    return err.response.data;
  }
};
