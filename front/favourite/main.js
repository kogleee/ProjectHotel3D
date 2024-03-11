const ViewHotel = async()=>{
  let favourite = await getFavourite();
    let parent = document.querySelector(".hotel--view--elems");
    parent.innerHTML = "";
    let icon
    for (let elems of favourite) {
      console.log(elems)
      icon = `<div class="add-favourite Active" data-hotelid="${elems.id}"><svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M33.9463 13.0905C33.8158 12.6891 33.4666 12.3982 33.0482 12.3424L22.5597 10.9444L17.989 1.40128C17.8067 1.02057 17.4221 0.77832 17 0.77832C16.5778 0.77832 16.1933 1.02057 16.0109 1.40128L11.4402 10.9444L0.951784 12.3424C0.533359 12.3981 0.184129 12.6891 0.0537075 13.0905C-0.0767141 13.4918 0.0347817 13.9326 0.340516 14.2236L8.00411 21.5196L6.09261 31.9268C6.01638 32.342 6.18512 32.764 6.52664 33.0121C6.86804 33.2602 7.32153 33.2903 7.69293 33.0895L17.0001 28.0555L26.3072 33.0895C26.6783 33.2902 27.1319 33.2603 27.4735 33.0121C27.8151 32.764 27.9837 32.342 27.9076 31.9268L25.996 21.5197L33.6596 14.2237C33.9652 13.9327 34.0767 13.492 33.9463 13.0905Z" fill="black"/>
      </svg></div>`;
      parent.innerHTML += ` <div class="elem">
    <div class="elem--img">
    <img src="http://localhost:3000${elems.hotel_img}"> 
    </div>
    <div class="elem--main">
      <div class="elem--main--title">
        <div class="elem--main--text">
          <h2>${elems.name}</h2>
          <p>
            ${elems.description}
          </p>
        </div>
        <div class="elem--main--rating">
          <div class="rating">${+elems.average_rating}/10</div>
          
            ${icon}
          
        </div>
      </div>
      <div class="elem--main--bottom">
        <div class="elem--main--cost">
          <p>${elems.cost}₽ в день</p>
        </div>
        <div class="elem--main--button">
          <button class="button">Забронировать</button>
        </div>
      </div>
    </div>
  </div>`;
  }
}

document.addEventListener("DOMContentLoaded", async(e)=>{
  ViewHotel()
    

  document.addEventListener("click", async (e) => {
    if (e.target.closest(".nonActive")) {
      let parentDiv = e.target.closest(".nonActive");
      let hotelId = parentDiv.dataset.hotelid;
      let add = await addFavourite(hotelId);
      if (add) {
        ViewHotel();
      }
    }
    if (e.target.closest(".Active")) {
      let parentDiv = e.target.closest(".Active");
      let hotelId = parentDiv.dataset.hotelid;
      let del = await delFavourite(hotelId);
      if (del) {
        ViewHotel();
      }
    }
  });

  
})



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
      alert(err.response.data.message);
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
    }
  };
  
  