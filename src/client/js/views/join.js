let requestLoading = false;

async function handleRequestJoinUser() {
  if (requestLoading) return;
  // TODO validation

  try {
    requestLoading = true;
    const usernameInput = document.querySelector(`input[name="username"]`);
    const emailInput = document.querySelector(`input[name="email"]`);
    const passwordInput = document.querySelector(`input[name="password"]`);
    const firstNameInput = document.querySelector(`input[name="firstName"]`);
    const lastNameInput = document.querySelector(`input[name="lastName"]`);

    // TODO Type def
    const requestBody = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
      firstName: firstNameInput.value,
      lastName: lastNameInput.value,
    };

    if (!usernameInput.value) {
      requestLoading = false;
      return alert(`please Enter Your username.`);
    }
    if (!emailInput.value) {
      requestLoading = false;
      return alert(`please Enter Your email.`);
    }
    if (!passwordInput.value) {
      requestLoading = false;
      return alert(`please Enter Your password.`);
    }

    const result = await (
      await fetch("/api/user/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
    ).json();

    if (result.user) {
      alert("회원가입되었습니다.");
      return (window.location.href = "/login");
    }
  } catch (e) {
    console.log(e);
  }

  requestLoading = false;
}
