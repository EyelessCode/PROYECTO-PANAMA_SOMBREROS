document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formProducto");
    const form2 = document.getElementById("formConsulta");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // evita recargar la página
        const tipo=document.getElementById("cmbTipo").value
        const talla=document.getElementById("cmbTalla").value
        const color=document.getElementById("cmbColor").value

        console.log(tipo);
        // Crear objeto con datos del formulario
        const producto = {
            idTipo: tipo,
            idTalla: talla,
            idColor: color,
            precioUnitario: parseFloat(document.getElementById("txtPrecio").value)
        };



        try {
            const respuesta = await fetch("http://localhost:1000/sombreroPanama/admin/productos/api", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(producto)
            });
            console.log(producto);

            if (respuesta.ok) {
                alert("Producto agregado correctamente");
                form.reset(); // limpiar formulario
                // opcional: redirigir o actualizar tabla
            } else {
                const errorData = await respuesta.json();
                alert("Error: " + (errorData.message || "Error desconocido"));
            }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al conectar con el servidor");
        }
    });

    form2.addEventListener("submit", async (event) => {
        event.preventDefault(); // evita recargar la página

        const categoria=document.getElementById("cmbCategoria").value
        const descripcion=document.getElementById("txaDescripcion").value
        console.log(tipo);
        // Crear objeto con datos del formulario

        const consulta = {
            idAdmin: idAdmin++,
            tipoConsulta: categoria,
            resultado: descripcion,
        };
        try {
        const soli = await fetch("http://localhost:1000/sombreroPanama/admin/consultas/api", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(consulta)
        });
        console.log(consulta);

        if (soli.ok) {
            alert("Consulta agregado correctamente");
            form.reset(); // limpiar formulario
            // opcional: redirigir o actualizar tabla
        } else {
            const errorData = await soli.json();
            alert("Error: " + (errorData.message || "Error desconocido"));
        }
        } catch (error) {
            console.error("Error al enviar el formulario:", error);
            alert("Error al conectar con el servidor");
        }
    })}
);
