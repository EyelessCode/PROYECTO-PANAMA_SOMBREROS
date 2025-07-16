document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("tbody");

    try {
        const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/clientes/api");
        const clientes = await respuesta.json();

        tablaBody.innerHTML = "";

        clientes.forEach(cliente => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${cliente.cedula}</td>
                <td>${cliente.nombre}</td>
                <td>${cliente.correo}</td>
                <td>${cliente.rol}</td>
                <td>
                    <button type="button" class="btnAccion btnDelete" data-id="${cliente.id}">
                        <span>
                            <img src="/img/icon/delete-icon.webp" alt="borrar">
                        </span>
                    </button>
                </td>
            `;

            tablaBody.appendChild(fila);
        });

        document.querySelectorAll(".btnDelete").forEach(boton => {
            boton.addEventListener("click", async () => {
            const id = boton.getAttribute("data-id");
            console.log("ID a eliminar:", id);

            if (!confirm("¿Estás seguro de que deseas eliminar este usuario?")) return;

            try {
                const respuesta = await fetch(
                    `http://localhost:1000/sombreroPanama/admin/clientes/api/${id}`,
                    {
                    method: "DELETE"
                    }
                );

                const texto = await respuesta.text();
                console.log("Respuesta del servidor:", texto);
                if (texto.includes("a foreign key constraint fails")) {
                    alert("Este usuario no puede eliminarse porque está vinculado a consultas fundamentales.");
                }


                if (respuesta.ok) {
                    alert("cliente eliminado correctamente");
                    location.reload(); // recarga la tabla
                } else {
                    alert("No se pudo eliminar el cliente");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error del servidor");
            }
            });
        });

    } catch (error) {
        console.error("Error al cargar clientes:", error);
        tablaBody.innerHTML = `<tr><td colspan="6">Error al cargar datos</td></tr>`;
    }
});



