document.addEventListener("DOMContentLoaded", async () => {
    const tablaBody = document.querySelector("tbody");

    try {
        const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/productos/api");
        const productos = await respuesta.json();

        tablaBody.innerHTML = "";

        productos.forEach(producto => {
            const fila = document.createElement("tr");

            fila.innerHTML = `
                <td>${producto.tipo}</td>
                <td>${producto.color}</td>
                <td>${producto.precio_unitario}</td>
                <td>${producto.descripcion}</td>
                <td>${producto.activo ? "Sí" : "No"}</td>
                <td>
                    <button type="button" class="btnAccion btnDelete" data-id="${producto.id}">
                        <span><img src="/img/icon/delete-icon.webp" alt="borrar"></span>
                    </button>
                    <button type="button" class="btnAccion btnEdit" onclick="window.location.href='http://localhost:1000/sombreroPanama/admin/formulario?type=editProducto&id=${producto.id_sombrero}'">
                        <span><img src="/img/icon/edit-icon.webp" alt="editar"></span>
                    </button>
                </td>
            `;

            tablaBody.appendChild(fila);
        });

        document.querySelectorAll(".btnDelete").forEach(boton => {
            boton.addEventListener("click", async () => {
            const id = boton.getAttribute("data-id");

            if (!confirm("¿Estás seguro de que deseas eliminar este producto?")) return;

            try {
                const respuesta = await fetch(
                    `http://localhost:1000/sombreroPanama/admin/productos/api/${id}`,
                    {
                    method: "DELETE"
                    }
                );

                const texto = await respuesta.text();
                console.log("Respuesta del servidor:", texto);
                if (texto.includes("a foreign key constraint fails")) {
                    alert("Este producto no puede eliminarse porque está vinculado a una exportación.");
                }



                if (respuesta.ok) {
                    alert("Producto eliminado correctamente");
                    location.reload(); // recarga la tabla
                } else {
                    alert("No se pudo eliminar el producto");
                }
            } catch (error) {
                console.error("Error al eliminar:", error);
                alert("Error del servidor");
            }
            });
        });

    } catch (error) {
        console.error("Error al cargar productos:", error);
        tablaBody.innerHTML = `<tr><td colspan="6">Error al cargar datos</td></tr>`;
    }
});



