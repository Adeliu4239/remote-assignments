async function signup(event) {
  event.preventDefault();
  try {
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    const currentDateTime = new Date();

    const formattedDate = currentDateTime.toUTCString().replace("GMT", "GMT");

    console.log(formattedDate);
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);

    const headers = {
      "Content-Type": "application/json",
      "Request-Date": formattedDate,
    };

    const requestBody = {
      name: username,
      email,
      password,
    };

    console.log(requestBody);
    const response = await axios.post("http://35.74.134.49:3000/users", requestBody, {
      headers,
    });
    console.log(response);
    if (response.status === 200) {
      const { id, name, email } = response.data.data.user;
      alert(`ID: ${id}\nName: ${name}\nEmail: ${email}`);
    } 
  } catch (error) {
    console.error("Error:", error.response);
    alert(error.response.data.error? error.response.data.error : "Something went wrong");
  }
}
