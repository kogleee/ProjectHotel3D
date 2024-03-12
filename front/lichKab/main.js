const viewReservation = async () => {
  let reserv = await getReservation();
  if (reserv.message == "Не авторизован") {
    window.location.href = "../reg/index.html";
  }
  console.log(reserv);
  let content = document.querySelector(".option-content");
  content.innerHTML = "";
  for (elem of reserv) {
    let startDate = formatDate(elem.start_date);
    let endDate = formatDate(elem.end_date);

    content.innerHTML += `
      <div class="elem">
      <div class="elem--img"><img src="http://localhost:3000${elem.hotel_img}"></div>
      <div class="elem--main">
        <div class="elem--main--title">
          <div class="elem--main--text">
            <h2>${elem.name}</h2>
            <p class="date-start">Дата начала: ${startDate}</p>
            <p class="date-end">Дата окончания: ${endDate}</p>
          </div>
        </div>
        <div class="elem--main--bottom">
          <div class="elem--main--cost">
            <p>${elem.cost}₽ в день</p>
          </div>
          <div class="buttons">
                     <div>
                    <p  class="delete"  data-hotel="${elem.hotel_id}">Отменить бронь</p>
                  </div>
                 
                  </div>
        </div>
      </div>
    </div>
      `;
  }
};

document.addEventListener("DOMContentLoaded", async (e) => {
  await viewReservation();

  let deleteBtn = document.querySelector(".delete");
  deleteBtn.addEventListener("click", async (e) => {
    console.log(123);
    let hotelId = deleteBtn.dataset.hotel;
    let delRes = await delReservation(hotelId);
    if (delRes) {
      await viewReservation();
    }
  });
});

function formatDate(dateString) {
  const date = new Date(dateString);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Прибавляем 1, так как месяцы в JavaScript начинаются с 0
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}
const getReservation = async () => {
  try {
    const response = await axios.get(
      "http://localhost:3000/api/reservation/show",
      {
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

const delReservation = async (hotel) => {
  try {
    const response = await axios.delete(
      "http://localhost:3000/api/reservation/delete",
      {
        params: {
          hotel: hotel,
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
