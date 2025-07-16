document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector("form");
    const inputCedula = document.getElementById("txtCedula");
    const inputPassword = document.getElementById("txtPassword");

    form.addEventListener("submit", (e) => {
        const cedula = inputCedula.value.trim();
        const password = inputPassword.value.trim();

        let errores = [];

        if (!/^\d{10}$/.test(cedula)) {
            errores.push("La cédula debe tener exactamente 10 dígitos.");
        }

        if (password.length === 0) {
            errores.push("La contraseña no puede estar vacía.");
        }

        if (errores.length > 0) {
            e.preventDefault(); // evita que se envíe el formulario
            alert(errores.join("\n"));
        }
    });
});
