
let carritoDeCompras = []

//objeto const

// class Producto {
//     constructor(id, producto, imgSrc, descripcion, precio) {
//         this.id = id
//         this.producto = producto
//         this.imgSrc = imgSrc
//         this.descripcion = descripcion
//         this.precio = precio
//     }
// }

//     const producto1 = new Producto (001, 'wrap palta pollo', ' https://www.casafe.org/wp-content/uploads/2017/03/foto-wrap-pollo-verduras.jpg ','pollo palta lechuga tomate', 1000)
//     const producto2 = new Producto (002, 'ensalada mediterranea','https://static8.depositphotos.com/1000339/1004/i/950/depositphotos_10047390-stock-photo-chicken-salad.jpg','Rucula, cherry, queso brie, aceitunas', 900)
//     const producto3 = new Producto (003, 'baguette Americana','https://www.unileverfoodsolutions.com.co/dam/global-ufs/mcos/nola/colombia/calcmenu/recipes/CO-recipes/sandwiches/sandwich-de-queso-fundido/main-header.jpg', 'pan baguette, cheddar, carne desmenuzada, panceta y barbacoa', 800)


let productos = []


const cardContainerQuery = document.querySelector("#cardContainer")
const cardCTA = document.querySelector('.cardCTA')

//carrito

const carritoContainer = document.querySelector('.carritoContainer')


// fin carrito
const renderizarProductos = (arrayProductos) =>{
    cardContainerQuery.innerHTML = ""
    arrayProductos.forEach ((producto)=> {
        const nuevoDiv = document.createElement("div")
        nuevoDiv.innerHTML= `
        <h3 class="cardTitle">${producto.producto}</h3>
        <img src="${producto.imgSrc}" class="cardImg">
        <p class="cardDesc">${producto.descripcion}</p>
        <span class="cardPrice">$${producto.precio}</span>
        <button class="butonCTA" data-id="${producto.producto}">Agregar al carrito</button>`
        nuevoDiv.className = "card"
        cardContainerQuery.append(nuevoDiv)
    })
    
}



const buscarProducto = () => {
    
    const query = searchBar.value.toLowerCase()
    const arrayResultados = productos.filter((comida)=> comida.producto.includes(query))
    renderizarProductos(arrayResultados);
}

// evento click

// const botonClick = document.querySelector ('#botonClick')
// ;

// const mostrarMensaje = () => {
//     console.log('Confirmaste la compra');
//     alert ('Confirmaste la compra')
// }

// botonClick.addEventListener ('click', mostrarMensaje)


//buscador

const searchBar = document.querySelector('#searchBar')
const searchButton = document.querySelector('#searchButton')

/*evento buscador*/

searchButton.addEventListener('click', buscarProducto)
searchBar.addEventListener('input', buscarProducto)


//funcion agrear producto
const butonCTA = document.querySelectorAll('.butonCTA')

const agregarProductoAlCarrito = (e)=> {
    const producto = e.target.getAttribute("data-id")
    carritoDeCompras.push(producto)
    localStorage.setItem("carritoDeCompras", JSON.stringify(carritoDeCompras))
    const carritoDeComprasGuardado = JSON.parse(localStorage.getItem("carritoDeCompras")) 
    console.log(carritoDeComprasGuardado);
}

butonCTA.forEach((boton)=>{
    boton.addEventListener('click', agregarProductoAlCarrito)
})

//fetch informacion 

const getAllProducts = async () => {
    const response = await fetch('../json/productos.json')
    const data = await response.json() 
    productos = data
    renderizarProductos(productos)
}

//ejecucion

getAllProducts()


//Boton sweet alert

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })

  document.querySelector('#botonConfirmar').addEventListener ('click', ()=> {
    Swal.fire({
        title: 'Deseas confirmar la compra?',
        text: "No podras revertir si confirmas!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, confirmar compra!'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Compra confirmada!',
            'Tu orden esta en proceso!',
            'success'
          )
        }
      })
 })


 //Botón Tostify

 document.querySelector('.butonCTA').addEventListener ('click', ()=> {
    Toastify({
       text: "Agregaste tu producto exitosamente ",
       duration: 4000,
    //    destination: "https://www.ole.com.ar/messi/",
       newWindow: true,
       close: true,
       gravity: "top", // `top` or `bottom`
       position: "right", // `left`, `center` or `right`
       stopOnFocus: true, // Prevents dismissing of toast on hover
       style: {
         background: "linear-gradient(to right, #00b09b, #96c93d)",
       },
       onClick: function(){} // Callback after click
     }).showToast();
   })

