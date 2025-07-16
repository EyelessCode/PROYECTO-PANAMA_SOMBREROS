const popup = document.getElementById("popup");

function mostrarPopup() {
    popup.style.display = "flex";
}

function cerrarPopup() {
    popup.style.display = "none";
}

document.querySelector("#popup").addEventListener("click", (event) => {
    if (!event.target.closest(".contenedor-popup")) {
        cerrarPopup();
    }
});

document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("tbody");

    try {
        const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/consultas/api");
        const consultas = await respuesta.json();

        tablaBody.innerHTML = "";

        consultas.forEach(consulta => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <tr>
                    <td>${consulta.idAdmin}</td>
                    <td>${consulta.idAdmin}</td>
                    <td>${consulta.fechaConsulta}</td>
                    <td>${consulta.tipoConsulta}</td>
                    <td>
                        <button type="button" class="btnAccion btnShow" data-id="${consulta.id}">
                            <span>
                                <img src="/img/icon/show-icon.webp" alt="mostrar">
                            </span>
                        </button>
                    </td>
                </tr>
            `;
            tablaBody.appendChild(fila);

        document.querySelectorAll(".btnShow").forEach((boton) => {
            boton.addEventListener("click", async () => {
                const id = boton.getAttribute("data-id");
                const fecha=new Date().getFullYear()

                try {
                    const respuesta = await fetch(`http://localhost:1000/sombreroPanama/admin/consultas/api/${id}`);
                    const consulta = await respuesta.json();

                    popup.innerHTML = `
                    <div class="contenedor-popup">
                        <h2>Visualizador a detalle</h2>
                        <div class="part fechaConsulta">
                            <span id="fecha_consulta">${fecha}</span>
                        </div>
                        <div class="part info">
                            <label>Cédula: </label>
                            <span id="cedula_usuario">${consulta.idAdmin}</span>
                        </div>
                        <div class="part nombre">
                            <label>Nombre: </label>
                            <span id="nombre_usuario">${consulta.idAdmin}</span>
                        </div>
                        <div class="part correo">
                            <label>Correo: </label>
                            <span id="correo_usuario">${consulta.idAdmin}</span>
                        </div>
                        <div class="part categoria">
                            <label>Categoría: </label>
                            <span id="categoria_usuario">${consulta.tipoConsulta}</span>
                        </div>
                        <div class="part consultaDescripcion">
                            <label>Consulta: </label>
                            <textarea id="txaDescripcion" readonly>${consulta.resultado}</textarea>
                        </div>
                    </div>
                `;

                    mostrarPopup();
                } catch (error) {
                    console.error("Error al obtener los detalles de la consulta:", error);
                    alert("Error al cargar los detalles");
                }
            });
        });

        });

    } catch (error) {
        console.error("Error al cargar consultas:", error);
        tablaBody.innerHTML = `<tr><td colspan="6">Error al cargar datos</td></tr>`;
    }
});

