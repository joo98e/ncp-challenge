/* global $ */

window.addEventListener("load", function () {});

async function handleClickRequestLogin() {
  try {
    const email = $(`input[name="login_email"]`);
    const password = $(`input[name="login_password"]`);

    const requestBody = {
      email: email.val(),
      password: password.val(),
    };

    const response = await (
      await fetch("/api/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })
    ).json();

    if (response.ok) {
      window.location.href = "/";
    }

    if (!response.ok) {
      alert(response.errorMsg);
    }
  } catch (e) {
    console.log(e);
    alert("로그인이 실패했습니다.");
  }
}
