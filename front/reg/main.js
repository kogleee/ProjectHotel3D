let login = document.getElementById("login");

login.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = login.logEmail.value;
  let password = login.logPassword.value;
  let resp = await loginUser({ email, password });
  if (resp) {
    localStorage.setItem("token", resp.token);
    window.location.href = "../mainPage/index.html";
  }
});

let register = document.getElementById("registration");

register.addEventListener("submit", async (e) => {
  e.preventDefault();
  let email = register.email.value;
  let phone = register.phone.value;
  let first_name = register.firstName.value;
  let second_name = register.secondName.value;
  let password = register.password.value;
  let second_password = register.secondPassword.value;

  let data = await regUser({
    email,
    phone,
    first_name,
    second_name,
    password,
    second_password,
  });
  if (data) {
    localStorage.setItem("token", data);
    window.location.href = "../mainPage/index.html";
  }
});

const loginUser = async (User) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/login",
      User
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};

const regUser = async (newUser) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/user/reg",
      newUser
    );
    return response.data;
  } catch (err) {
    alert(err.response.data.message);
  }
};
