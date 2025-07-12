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

document.querySelectorAll('.btnShow').forEach(boton => {
    boton.addEventListener('click',()=>{
        mostrarPopup()
    })
})
