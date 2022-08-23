'use strict';
import { dataproducts } from './products.js';

//console.log(dataproducts);
const addBtn = document.querySelector('.add');
const carcontainer = document.getElementById('modal-carrito');
const close = document.getElementById('close');
const contenedorProductos = document.getElementById('contendorProductos');
const contenedorCarrito = document.getElementById('carritoContenedor');
const bottonVaciarCar = document.getElementById('vaciarCarrito');
const countCarr = document.getElementById('countCarr');
const totalprice = document.getElementById('precioTotal');

let carr =[];
document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('carr')){
        carr = JSON.parse(localStorage.getItem('carr'))
        actCarr()
    }
});

addBtn.addEventListener('click', () => {
    carcontainer.style.display = "block";
});

close.addEventListener('click', () => {
    carcontainer.style.display = "none";
});


bottonVaciarCar.addEventListener('click', () =>{
    carr.length = 0;
    actCarr()
});

dataproducts.forEach((producto) => {
    let div = document.createElement('div')
    div.classList.add('producto')
    div.innerHTML += ` 
    <img src="${producto.url}" alt="" class="img-size">
    <h3 class="precio"> ${producto.Precio}</h3>
    <h4 class="categoria Hoodies">${producto.title}</h4>
    <button id="agregar${producto.id}" class="botton btn" > ADD </button> ` //Para los items o cartitas
    contenedorProductos.appendChild(div);

   let boton = document.getElementById(`agregar${producto.id}`) //Obtenemos el elemento y hacemos que ejecute la funcion
    boton.addEventListener('click', () => {
        addCarr(producto.id)
    })
});

const addCarr = (productId) => {
   // let cantidad ={};
    //localStorage.setItem('cantidad', JSON.stringify(cantidad))
    let exist = carr.some (prod => prod.id === productId)
    if(exist){
        let prod= carr.map(prod =>{
            if(prod.id === productId){
                prod.cantidad++
            }
        })
    } else{
    let item = dataproducts.find((product) => product.id === productId);//Trea el poducto de la propuedad id que coincida con la propiedad que reciba por parametro.
    carr.push(item);
    console.log(carr)
    }
    actCarr();
}


const deleteCarr = (productId) => {
    let item = carr.find((prod) => prod.id === productId); //encuentro el id del producto con find y luego buscamos el indice, hacemos un splice borramos la cantidad = 1
    let indice = carr.indexOf(item);
    carr.splice(indice,1);
    console.log(productId)
    actCarr();
}



const actCarr = () => {
    contenedorCarrito.innerHTML = ""; //Lo primero que hago es boorar luego lo lleno con la inf actulizada
    carr.forEach((product) => {
        let div = document.createElement ('div')
        div.className = ('productoEnCarrito') //debemos agregarla en el css por que no la hemos creado
        div.innerHTML +=`
        <p>${product.title}</p>
        <p> Precio: ${product.Precio}</p>
        <p> Cantidad: <span id="cantidad">${product.cantidad}</span></p>
        <button id="eliminar${product.id}" class="btn delete"><span class="material-symbols-outlined">
        delete</span></button>
        `
        contenedorCarrito.appendChild(div)

        localStorage.setItem('carr', JSON.stringify(carr));
        let delete1=document.getElementById(`eliminar${product.id}`) //Obtenemos el elemento y hacemos que ejecute la funcion
        delete1.addEventListener('click', () => {
        deleteCarr(product.id);
    });
    })


    console.log(carr);
    countCarr.innerText = carr.length;
    totalprice.innerText = carr.reduce((acc,prod) => acc + prod.cantidad * prod.Precio, 0)
}