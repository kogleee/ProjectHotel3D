const ViewFind = async (cost = false, rating = false) => {
  let date = search.date.value;
  if (!date) {
    date = null;
  }
  let guest = search.guest.value;
  let find = await findHotel(date, guest, cost, rating);
  console.log(find);
  let favourite = await getFavourite();
  if (favourite == "Не авторизован") {
    let parent = document.querySelector(".hotel--view--elems");
    parent.innerHTML = "";
    for (let elem of find) {
      let icon = `<div class="add-favourite nonActive" data-hotelid="${elem.id}"><svg
      width="35"
      height="35"
      viewBox="0 0 35 35"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_1_200)">
        <path
          d="M34.9448 13.4756C34.8105 13.0624 34.4511 12.7629 34.0203 12.7055L23.2232 11.2663L18.5181 1.44258C18.3304 1.05061 17.9345 0.8013 17.5001 0.8013C17.0656 0.8013 16.6696 1.05068 16.482 1.44258L11.7767 11.2663L0.979779 12.7055C0.549047 12.7629 0.189545 13.0624 0.0552872 13.4756C-0.0789706 13.8888 0.0358048 14.3425 0.350531 14.6421L8.23948 22.1527L6.27175 32.8659C6.19334 33.2932 6.36704 33.7277 6.71855 33.9831C7.06992 34.2385 7.53681 34.2695 7.91908 34.0628L17.5 28.8808L27.0808 34.0628C27.2491 34.1538 27.4338 34.1987 27.6177 34.1987C27.8517 34.1987 28.0846 34.126 28.2814 33.9831C28.6329 33.7278 28.8067 33.2933 28.7282 32.8659L26.7604 22.1527L34.6495 14.6422C34.9642 14.3425 35.079 13.8888 34.9448 13.4756ZM24.7615 20.9384C24.4856 21.2011 24.3607 21.5853 24.4296 21.96L26.0818 30.9554L18.0371 26.6043C17.8695 26.5137 17.6848 26.4684 17.5001 26.4684C17.3153 26.4684 17.1304 26.5137 16.963 26.6043L8.91829 30.9554L10.5706 21.96C10.6394 21.5852 10.5146 21.2011 10.2387 20.9384L3.61449 14.632L12.6804 13.4237C13.0581 13.3733 13.3848 13.1359 13.5494 12.7923L17.5 4.54363L21.4508 12.7924C21.6154 13.1359 21.9421 13.3733 22.3199 13.4237L31.3858 14.6321L24.7615 20.9384Z"
          fill="black"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_200">
          <rect width="35" height="35" fill="white" />
        </clipPath>
      </defs>
    </svg>
    </div>`;
      parent.innerHTML += ` <div class="elem">
    <div class="elem--img">
    <img src="http://localhost:3000${elem.hotel_img}"> 
    </div>
    <div class="elem--main">
      <div class="elem--main--title">
        <div class="elem--main--text">
          <h2>${elem.name}</h2>
          <p>
            ${elem.description}
          </p>
        </div>
        <div class="elem--main--rating">
          <div class="rating">${+elem.average_rating}/10</div>
          
            ${icon}
          
        </div>
      </div>
      <div class="elem--main--bottom">
        <div class="elem--main--cost">
          <p>${elem.cost}₽ в день</p>
        </div>
        <div class="elem--main--button">
          <button class="button openHotel" data-hotelid="${
            elem.id
          }">Забронировать</button>
        </div>
      </div>
    </div>
  </div>`;
    }
  } else {
    let parent = document.querySelector(".hotel--view--elems");
    parent.innerHTML = "";
    for (let elem of find) {
      let icon = `<div class="add-favourite nonActive" data-hotelid="${elem.id}"><svg
    width="35"
    height="35"
    viewBox="0 0 35 35"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clip-path="url(#clip0_1_200)">
      <path
        d="M34.9448 13.4756C34.8105 13.0624 34.4511 12.7629 34.0203 12.7055L23.2232 11.2663L18.5181 1.44258C18.3304 1.05061 17.9345 0.8013 17.5001 0.8013C17.0656 0.8013 16.6696 1.05068 16.482 1.44258L11.7767 11.2663L0.979779 12.7055C0.549047 12.7629 0.189545 13.0624 0.0552872 13.4756C-0.0789706 13.8888 0.0358048 14.3425 0.350531 14.6421L8.23948 22.1527L6.27175 32.8659C6.19334 33.2932 6.36704 33.7277 6.71855 33.9831C7.06992 34.2385 7.53681 34.2695 7.91908 34.0628L17.5 28.8808L27.0808 34.0628C27.2491 34.1538 27.4338 34.1987 27.6177 34.1987C27.8517 34.1987 28.0846 34.126 28.2814 33.9831C28.6329 33.7278 28.8067 33.2933 28.7282 32.8659L26.7604 22.1527L34.6495 14.6422C34.9642 14.3425 35.079 13.8888 34.9448 13.4756ZM24.7615 20.9384C24.4856 21.2011 24.3607 21.5853 24.4296 21.96L26.0818 30.9554L18.0371 26.6043C17.8695 26.5137 17.6848 26.4684 17.5001 26.4684C17.3153 26.4684 17.1304 26.5137 16.963 26.6043L8.91829 30.9554L10.5706 21.96C10.6394 21.5852 10.5146 21.2011 10.2387 20.9384L3.61449 14.632L12.6804 13.4237C13.0581 13.3733 13.3848 13.1359 13.5494 12.7923L17.5 4.54363L21.4508 12.7924C21.6154 13.1359 21.9421 13.3733 22.3199 13.4237L31.3858 14.6321L24.7615 20.9384Z"
        fill="black"
      />
    </g>
    <defs>
      <clipPath id="clip0_1_200">
        <rect width="35" height="35" fill="white" />
      </clipPath>
    </defs>
  </svg>
  </div>`;
      for (let elems of favourite) {
        if (elem.name == elems.name) {
          icon = `<div class="add-favourite Active" data-hotelid="${elems.id}"><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M33.9463 13.0905C33.8158 12.6891 33.4666 12.3982 33.0482 12.3424L22.5597 10.9444L17.989 1.40128C17.8067 1.02057 17.4221 0.77832 17 0.77832C16.5778 0.77832 16.1933 1.02057 16.0109 1.40128L11.4402 10.9444L0.951784 12.3424C0.533359 12.3981 0.184129 12.6891 0.0537075 13.0905C-0.0767141 13.4918 0.0347817 13.9326 0.340516 14.2236L8.00411 21.5196L6.09261 31.9268C6.01638 32.342 6.18512 32.764 6.52664 33.0121C6.86804 33.2602 7.32153 33.2903 7.69293 33.0895L17.0001 28.0555L26.3072 33.0895C26.6783 33.2902 27.1319 33.2603 27.4735 33.0121C27.8151 32.764 27.9837 32.342 27.9076 31.9268L25.996 21.5197L33.6596 14.2237C33.9652 13.9327 34.0767 13.492 33.9463 13.0905Z" fill="black"/>
        </svg></div>`;
        }
      }

      parent.innerHTML += ` <div class="elem">
    <div class="elem--img">
    <img src="http://localhost:3000${elem.hotel_img}"> 
    </div>
    <div class="elem--main">
      <div class="elem--main--title">
        <div class="elem--main--text">
          <h2>${elem.name}</h2>
          <p>
            ${elem.description}
          </p>
        </div>
        <div class="elem--main--rating">
          <div class="rating">${+elem.average_rating}/10</div>
          
            ${icon}
          
        </div>
      </div>
      <div class="elem--main--bottom">
        <div class="elem--main--cost">
          <p>${elem.cost}₽ в день</p>
        </div>
        <div class="elem--main--button">
          <button class="button openHotel" data-hotelid="${
            elem.id
          }">Забронировать</button>
        </div>
      </div>
    </div>
  </div>`;
    }
  }

  let openHotel = document.querySelectorAll(".openHotel");
  for (elem of openHotel) {
    elem.addEventListener("click", (e) => {
      console.log(234);
      localStorage.setItem("hotelId", e.target.dataset.hotelid);
      window.location.href = "../hotelPage/index.html";
    });
  }
};

document.addEventListener("DOMContentLoaded", async (e) => {
  ViewFind();

  document.addEventListener("click", async (e) => {
    if (e.target.closest(".nonActive")) {
      e.preventDefault();
      let parentDiv = e.target.closest(".nonActive");
      let hotelId = parentDiv.dataset.hotelid;
      let add = await addFavourite(hotelId);
      console.log(add);
      if (add.message == "Не авторизован") {
        window.location.href = "../reg/index.html";
      }
      if (add) {
        let order = document.getElementById("order").value;
        console.log(order);
        if (order == "по цене") {
          ViewFind(true, false);
        } else {
          ViewFind(false, true);
        }
      }
    }
    if (e.target.closest(".Active")) {
      e.preventDefault();
      let parentDiv = e.target.closest(".Active");
      let hotelId = parentDiv.dataset.hotelid;
      let del = await delFavourite(hotelId);
      if (del.message == "Не авторизован") {
        window.location.href = "../reg/index.html";
      }
      if (del) {
        let order = document.getElementById("order").value;
        console.log(order);
        if (order == "по цене") {
          ViewFind(true, false);
        } else {
          ViewFind(false, true);
        }
      }
    }
  });
});
let search = document.getElementById("search");
search.addEventListener("submit", async (e) => {
  e.preventDefault();
  await ViewFind(false, true);
});

let sort = document.getElementById("sort");
sort.addEventListener("submit", async (e) => {
  e.preventDefault();
  let sortWord = sort.order.value;
  if (sortWord == "по цене") {
    await ViewFind(true, false);
  } else {
    await ViewFind(false, true);
  }
});

const findHotel = async (date, guest, rating = false, cost = false) => {
  "/find/:date?/:residentCount?";
  try {
    const response = await axios.post(
      "http://localhost:3000/api/hotel/find",
      null,
      {
        params: {
          date: date,
          residentCount: guest.split("")[0],
          rating: rating,
          cost: cost,
        },
      }
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const getHotel = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/hotel/showAll");
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const getFavourite = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/favourite/show",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    return err.response.data.message;
  }
};

const addFavourite = async (hotelId) => {
  try {
    const response = await axios.post(
      `http://localhost:3000/api/favourite/add`,
      null,
      {
        params: {
          hotel: hotelId,
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

const delFavourite = async (hotelId) => {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/favourite/delete`,
      {
        params: {
          hotel: hotelId,
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
