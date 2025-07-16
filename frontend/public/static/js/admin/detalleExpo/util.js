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
        const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/detalleExportaciones/api");
        const detalleExport = await respuesta.json();

        tablaBody.innerHTML = "";

        detalleExport.forEach(detalle => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <tr>
                    <td>${detalle.idContenedor}</td>
                    <td>${detalle.idPais}</td>
                    <td>${detalle.fechaLlegada}</td>
                    <td>${detalle.estado}</td>
                    <td>
                        <button type="button" class="btnAccion btnShow" data-id="${detalle.id}">
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

                try {
                    const respuesta = await fetch(`http://localhost:1000/sombreroPanama/admin/detalleExportaciones/api/${id}`);
                    const detalleExport = await respuesta.json();
                    const fecha=new Date().getFullYear()
                    popup.innerHTML = `
                        <!--*  popoupdinámico -->
                        <div class="contenedor-popup">
                            <h2>Visualizador a detalle</h2>
                            <div class="part fechaRegistro">
                                <!--*  diámico -->
                                <span id="fecha_registro">${fecha}</span>
                            </div>

                            <div class="part info">
                                <label for="lbIdContenedor">ID Contenedor: </label>
                                <!--*  diámico -->
                                <span id="id_contenedor">${detalleExport.idContenedor}</span>
                            </div>

                            <div class="part paisDestino">
                                <label for="lbPaisDestino">País destino: </label>
                                <!--*  diámico -->
                                <p id="pais_destino">Desde <span id="pais_desde">${detalleExport.idPais}</span> Hasta <span id="pais_hasta">${detalleExport.idPais}</span></p>
                            </div>
                            
                            <div class="part moneda">
                                <label for="lbMoneda">Moneda a usar: </label>
                                <!--*  diámico -->
                                <span id="moneda_usar">${detalleExport.idMoneda}</span>
                                
                                <label for="lbFlete">Valor flete: </label>
                                <!--*  diámico -->
                                <span id="valor_flete">${detalleExport.valorFlete}</span>
                            </div>
                            
                            <div class="part plazoTiempo">
                                <label for="lb">Fecha: </label>
                                <!--*  diámico -->
                                <p id="plazo_tiempo">Salida <span id="plazo_salida">${detalleExport.fechaSalida}</span> Llegada <span id="pais_llegada">${detalleExport.fechaLlegada}</span></p>
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
        console.error("Error al cargar detalleExport:", error);
        tablaBody.innerHTML = `<tr><td colspan="6">Error al cargar datos</td></tr>`;
    }
});

