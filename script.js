document.getElementById('registrationForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);
  let userInfo = "";

  for (const [key, value] of formData.entries()) {
    userInfo += `${key}: ${value}\n`;
  }

  alert("Registered Successfully\n\n" + userInfo);

  console.log("User Input:");
  console.log(userInfo);

  this.reset();
});
