
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
  section.innerHTML += `<a class="btn btn-danger" id="buttonVaciar">Vaciar carrito</a>`;
  section.innerHTML += `<a class="btn btn-success ms-1" id="comprar">Comprar</a>`;

  const buttonV = document.querySelector("#buttonVaciar");
  buttonV.addEventListener("click", () => {
    vaciarCarrito();
    addLocalStorage();
  });

  const buttonF = document.getElementById("comprar");
  const formulario = document.getElementById("formulario");

  buttonF.addEventListener("click", () => {
    if (carrito.length === 0) {
      Swal.fire({
        title: "Su Carrito esta Vacio",
        icon: "warning",
      });
      return;
    }

    formulario.classList.remove("d-none");
    window.scrollTo({ top: 200000 });
  });

  formulario.addEventListener("submit", ev => {
    ev.preventDefault();

    const data = new FormData(formulario);

    const nombre = data.get("nombre");
    const apellido = data.get("apellido");
    const direccion = data.get("direccion");

    if (carrito.length === 0) {
      Swal.fire({
        title: "Su Carrito esta Vacio",
        icon: "warning",
      });
      return;
    }
    Swal.fire({
        title: `Seguro/a ${nombre} ${apellido} que quiere Finalizar su Compra?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si estoy seguro!'
    }).then((result) => {
        if (result.isConfirmed) {
            vaciarCarrito();
            addLocalStorage();
            Swal.fire(
            `Muchas Gracias ${nombre} ${apellido} por realizar su Compra`,
            `El pedido llegará en el transcurso de los próximos 10 días a la siguiente dirección: ${direccion}`,
            'success'
            );
            formulario.classList.add("d-none");
            formulario.reset();
        }
    })
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