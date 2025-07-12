const urlParams=new URLSearchParams(window.location.search)
const tipo=urlParams.get('type')


if (tipo==='addProducto') {
    document.getElementById('h2Titulo').innerHTML=`Agregar un nuevo Producto`
    document.getElementById('wrapperFormulario').innerHTML=
        `
            <style>
                .contenedorHeader .hero-logo span{
                    left: 11.5px;
                }
            </style>
            <h3>Formulario</h3>
            <form action="/producto" method="post">
                <div class="contenedor-form-generico">
                    <div class="part tipoSombrero">
                        <label for="txtTipoSomb">Tipo de Sombrero: </label>
                        <input type="text" name="tipoSombrero" id="txtTipoSomb"
                            placeholder="Tipo..." maxlength="25"
                            required>
                    </div>

                    <div class="part talla">
                        <label for="cmbTalla">Talla: </label>
                        <select name="talla" id="cmbTalla">
                            <!--? dinámico -->
                            <option selected value="0"> -- Seleccionar -- </option>
                        </select>
                    </div>

                    <div class="part color">
                        <label for="cmbColor">Color: </label>
                        <select name="color" id="cmbColor">
                            <!--? dinámico -->
                            <option selected value="0"> -- | -- </option>
                        </select>
                        <div class="ejemploColor"></div>
                    </div>

                    <div class="part precio">
                        <label for="txtPrecio">Precio: </label>
                        <input type="text" name="precio" id="txtPrecio"
                            placeholder="Precio..." required>
                    </div>

                    <div class="part boton">
                        <!--* din+amicooo ttulo dinámico  -->
                        <button type="submit" id="btnDinamicoAddOrEdit">Agregar nuevo</button>
                        <button type="button" onclick="window.location.href='../productos.html'">Cancelar</button>
                    <!--? Ruta Test -->
                    </div>
                </div>
            </form>
        `
}else if(tipo==='editProducto'){
    document.getElementById('h2Titulo').innerHTML=`Modificar un Producto`
    document.getElementById('wrapperFormulario').innerHTML=
        `
            <style>
                .contenedorHeader .hero-logo h2{
                    font-size: 3em;
                }

                .contenedorHeader .hero-logo span{
                    left: 5px;
                }
            </style>
            <h3>Formulario</h3>
            <form action="/producto" method="post">
                <div class="contenedor-form-generico">
                    <div class="part tipoSombrero">
                        <label for="txtTipoSomb">Tipo de Sombrero: </label>
                        <input type="text" name="tipoSombrero" id="txtTipoSomb"
                            placeholder="Tipo..." maxlength="25"
                            required>
                    </div>

                    <div class="part talla">
                        <label for="cmbTalla">Talla: </label>
                        <select name="talla" id="cmbTalla">
                            <!--? dinámico -->
                            <option selected value="0"> -- Seleccionar -- </option>
                        </select>
                    </div>

                    <div class="part color">
                        <label for="cmbColor">Color: </label>
                        <select name="color" id="cmbColor">
                            <!--? dinámico -->
                            <option selected value="0"> -- | -- </option>
                        </select>
                        <div class="ejemploColor"></div>
                    </div>

                    <div class="part precio">
                        <label for="txtPrecio">Precio: </label>
                        <input type="text" name="precio" id="txtPrecio"
                            placeholder="Precio..." required>
                    </div>

                    <div class="part boton">
                        <!--* din+amicooo ttulo dinámico  -->
                        <button type="submit" id="btnDinamicoAddOrEdit" class="btnDinamicoEdit">Modificar</button>
                        <button type="button" onclick="window.location.href='../productos.html'">Cancelar</button>
                    <!--? Ruta Test -->
                    </div>
                </div>
            </form>
        `
}else if(tipo==='addConsulta'){
    document.getElementById('h2Titulo').innerHTML=`Agregar nueva Consulta`
    document.getElementById('wrapperFormulario').innerHTML=
        `
            <h3>Consulta</h3>
            <form action="/consulta" method="post">
                <div class="contenedor-form-generico">
                    <div class="part info">
                        <label for="lbCedula">Cédula: </label>
                        <!--*  diámico -->
                        <span id="cedula_usuario"></span>
                    </div>

                    <div class="part nombre">
                        <label for="lbNombre">Nombre: </label>
                        <!--*  diámico -->
                        <span id="nombre_usuario"></span>
                    </div>

                    <div class="part categoria">
                        <label for="cmbCategoria">Categoría: </label>
                        <select name="categoria" id="cmbCategoria">
                            <!--? dinámico -->
                            <option selected value="0"> -- Seleccionar -- </option>
                        </select>
                        <button id="btnAddCategoria" type="button">+</button>
                    </div>

                    <div class="part consultaDescripcion">
                        <label for="txaDescripcion">Consulta: </label>
                        <textarea name="consultaDescripcion" id="txaDescripcion" required></textarea>
                    </div>

                    <div class="part boton">
                        <!--* din+amicooo ttulo dinámico  -->
                        <button type="submit" id="btnDinamicoAddOrEdit">Agregar nuevo</button>
                        <button type="button" onclick="window.location.href='../productos.html'">Cancelar</button>
                    <!--? Ruta Test -->
                    </div>
                </div>
            </form>
        `
    const contenedorPopup=document.querySelector('#popup .contenedor-popup')

    function mostrarPopup(){
        popup.style.display="flex"
    }

    function cerrarPopup(){
        popup.style.display="none"
    }

    document.querySelector('#popup').addEventListener("click",(event)=>{
        // event.preventDefault()
        if(!contenedorPopup.contains(event.target)){
            cerrarPopup()
        }
    })

    document.querySelector('#btnCancelar').addEventListener("click",()=>{
        cerrarPopup()
    })

    document.querySelector('#btnAddCategoria').addEventListener("click",()=>{
        mostrarPopup()
    })
}else{
    document.getElementById('wrapperFormulario').innerHTML=
        `
            <div class="notFound">
                <h2>A dónde vas...?</h2>
                <p>No deberías estar aquí, RETÍRATE!</p>
            </div>
        `
}

