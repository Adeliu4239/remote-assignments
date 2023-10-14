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

    const response = await axios.post("http://35.74.134.49:3000/users", {
      headers: {
        "Content-Type": "application/json",
        "Request-Date": formattedDate,
        "Access-Control-Allow-Origin": "*",
      },
      data: JSON.stringify({ username, email, password }),
    });

    const data = response.data;
    console.log(data);
    if (data.error) {
      if (data.error.code === 409) {
        alert("Email already exists");
      } else {
        alert("An error occurred");
      }
    } else {
      const { id, name, email } = data;
      alert(`ID: ${id}\nName: ${name}\nEmail: ${email}`);
    }
  } catch (error) {
    console.error("Error:", error);
  }
}
