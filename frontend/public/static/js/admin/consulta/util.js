const popup=document.getElementById('popup')
const show=document.getElementById('btnShow')
const contenedorPopup=document.querySelector('#popup .contenedor-popup')

function mostrarPopup(){
    popup.style.display="flex"
}

function cerrarPopup(){
    popup.style.display="none"
}

popup.addEventListener("click",(event)=>{
    if(!contenedorPopup.contains(event.target)){
        cerrarPopup()
    }
})

show.addEventListener('click',()=>{
    mostrarPopup()
})
