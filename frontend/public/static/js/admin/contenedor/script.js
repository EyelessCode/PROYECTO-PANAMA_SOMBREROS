document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("tbody");

    try {
        const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/contenedores/api");
        const contenedores = await respuesta.json();

        tablaBody.innerHTML = "";

        contenedores.forEach(contenedor => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${contenedor.codigo}</td>
                <td>${contenedor.pesoMax}</td>
                <td>${contenedor.capacidadMax}</td>
                <td>OK</td>
                <td>${contenedor.descripcion}</td>
            `;

            tablaBody.appendChild(fila);
        });


    } catch (error) {
        console.error("Error al cargar contenedores:", error);
        tablaBody.innerHTML = `<tr><td colspan="6">Error al cargar datos</td></tr>`;
    }
});



