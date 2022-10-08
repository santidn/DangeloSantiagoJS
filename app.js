// DESAFIO FETCH

class ProductoEnCarrito {
  constructor(prod) {
    this.producto = prod;
    this.cantidad = 1;
  }
}

async function fetchProductos() {
  const response = await fetch("./data.json");
  return await response.json();
}

let productos = [];

fetchProductos().then((producto) => {
  productos = producto;
  console.log(productos);
  mostrarProductos();
});

//DECLARO ARRAY DE CARRITO VACIO

let carrito = [];

//MOSTRAR PRODUCTOS EN HTML

const mostrarProductos = () => {
  const seccionProductos = document.getElementById("seccion-productos");
  productos.forEach((producto) => {
    const card = document.createElement("card");
    card.classList.add(
      "d-flex",
      "justify-content-center",
      "col-12",
      "col-md-6",
      "col-xl-2"
    );
    card.innerHTML += `<div class="card mt-3 text-center" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top"  alt="...">
        <div class="card-body">
        <h5 class="card-title">${producto.componente}: ${producto.nombre}</h5>
        <p class="card-text">$${producto.precio}</p>
        <a class="btn btn-primary" id="button${producto.id}">Agregar al Carrito</a>
        </div>
    </div>`;

    seccionProductos.appendChild(card);

    //EVENTO CLICK PARA CARGAR AL CARRITO CON CONDICION (SI EXISTE EN CARRITO SOLO CARGA + UNIDAD DE PRODUCTO SINO PUSHEA PRODUCTO A CARRITO)

    const button = document.getElementById(`button${producto.id}`);
    button.addEventListener("click", () => {
      const index = carrito.findIndex((p) => p.producto.id === producto.id);
      if (index !== -1) {
        const p = carrito[index];
        productoAdd(p);
        mostrarCarrito();
        addLocalStorage();
        return;
      }

      const newProduct = new ProductoEnCarrito(producto);
      carrito.push(newProduct);

      addLocalStorage();
      mostrarCarrito();
    });
  });
};

//FUNCIONES

//funcion para mostrar el carrito con totales parciales por producto - total general - boton para vaciar producto

function mostrarCarrito() {
  const section = document.getElementById("seccion-carrito");
  section.innerHTML = "";
  section.innerHTML += `<h5>Productos en carrito</h5>`;
  let total = 0;
  carrito.forEach((p) => {
    total += p.producto.precio * p.cantidad;
    section.innerHTML += `
        <div>
            <p>${p.cantidad} x ${p.producto.nombre}: $${
      p.producto.precio * p.cantidad
    }</p>
            <button class="btn btn-danger" onclick="restarUnoAProducto(${
            p.producto.id
            })">-</button>
            <button class="btn btn-success" onclick="sumarUnoAProducto(${
              p.producto.id
            })">+</button>
            </div>
        `;
    addLocalStorage();
  });

  section.innerHTML += `<p>Total: $${total}</p>`;
  section.innerHTML += `<a class="btn btn-danger ms-1" id="buttonVaciar">Vaciar carrito</a>`;
  section.innerHTML += `<a class="btn btn-success" id="finalizarCompra">Finalizar compra</a>`;

  const buttonFinalizar = document.querySelector("#finalizarCompra");
    buttonFinalizar.addEventListener("click", () => {
      if (carrito == 0) {
        Swal.fire({
          title: 'Debe agregar productos al carrito',
          icon: 'warning',
        })
      }else{
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: false,
    });

    swalWithBootstrapButtons
      .fire({
        title: "Esta seguro/a que desea finalizar?",
        text: "Presione si para continuar o no para agregar mas productos",
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          swalWithBootstrapButtons.fire(
            "Felicitaciones!",
            "Su compra fue procesada con exito",
            "success"
          );
          vaciarCarrito();
          addLocalStorage();
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Compra cancelada",
            "Puede continuar agregando productos",
            "info"
          );
        }
      });
    }
  });

  const buttonV = document.querySelector("#buttonVaciar");
  buttonV.addEventListener("click", () => {
    vaciarCarrito();
    addLocalStorage();
  });
}

//FUNCION VACIAR EL CARRITO DE COMPRA

function vaciarCarrito() {
  carrito = [];
  mostrarCarrito();
}

//FUNCION PARA AGREGAR UNA UNIDAD DE PRODUCTO

function productoAdd(p) {
  p.cantidad++;
}

//FUNCION PARA QUITAR UNA UNIDAD DE PRODUCTO

function subtract(p) {
  p.cantidad !== 0 && p.cantidad--;
}

// function subtract(p) {
//   if (p.cantidad == 0) {
//     return;
//   }
//   p.cantidad--;
// }

//FUNCION PARA AGREGAR UNIDAD CON BOTON SEGUN ID DE PRODUCTO

function sumarUnoAProducto(id) {
  const index = carrito.findIndex((p) => p.producto.id === id);
  const producto = carrito[index];

  productoAdd(producto);
  mostrarCarrito();
}

//FUNCION PARA QUITAR UNIDAD CON BOTON SEGUN ID DE PRODUCTO

function restarUnoAProducto(id) {
  const index = carrito.findIndex((p) => p.producto.id === id);
  const producto = carrito[index];

  subtract(producto);
  if (producto.cantidad == 0) {
    carrito = carrito.filter((p) => p.producto.id !== id);
  }

  mostrarCarrito();
}

mostrarCarrito();
mostrarProductos(productos);
getItemBack();

// Funcion para guardar en localStorage

function addLocalStorage() {
  const carritoStr = JSON.stringify(carrito);
  localStorage.setItem("carrito", carritoStr);
}

//Funcion para traer desde localStorage

function getItemBack() {
  const itemBack = localStorage.getItem("carrito");
  itemBack !== null && (carrito = JSON.parse(itemBack));
  mostrarCarrito();
}

// function getItemBack() {
//   const itemBack = localStorage.getItem("carrito");
//   if (itemBack !== null){
//     carrito = JSON.parse(itemBack);
//   }
//   mostrarCarrito();
// }
