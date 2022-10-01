// IDENTIFICADOR DE NUMEROS PRIMOS
/*
let n1 = parseInt(prompt("INTRODUCIR UN NÚMERO PARA VERIFICAR SI ES PRIMO:"));
let primo = true;
i = 0;

for (i = 2; i < n1; i++) {
  if (n1 % i == 0) {
    primo = false;
  }
}

if (isNaN(n1)) {
  alert("ERROR: DEBE INGRESAR UN NÚMERO - PULSE F5 PARA REINTENTAR");
} else if (n1 === 0 || n1 === 1) {
  alert(
    "El número " + n1 + " no es primo - Pulse F5 para ingresar otro número"
  );
} else if (primo == true) {
  alert("El número " + n1 + " es primo - Pulse F5 para ingresar otro número");
} else {
  alert(
    "El número " + n1 + " NO es primo - Pulse F5 para ingresar otro número"
  );
}
*/

//SIMULADOR DE E-COMMERCE

/*
let pedido = prompt(`Selecciona tus componentes o escribe 7 para finalizar: 
1.Motherboard-$20000
2.Procesador-$30000
3.Memoria ram-$10000
4.Placa de video-$120000
5.Fuente de alimentación-$15000
6.Gabinete-$5000
7.Finalizar`);

let precio = 0;
let total = 0;
let producto = "";
let productosSeleccionados = "";
let descuentoDiez = 0;


function descuento(valor) {
  descuentoDiez = valor - (valor * 10) / 100;
}

function seleccionProductos() {
  while (pedido != 7) {
    switch (pedido) {
      case "1":
        precio = 20000;
        producto = "Motherboard-$20000\n";
        break;
      case "2":
        precio = 30000;
        producto = "Procesador-$30000\n";
        break;
      case "3":
        precio = 10000;
        producto = "Memoria ram-$10000\n";
        break;
      case "4":
        precio = 120000;
        producto = "Placa de video-$120000\n";
        break;
      case "5":
        precio = 15000;
        producto = "Fuente de alimentación-$15000\n";
        break;
      case "6":
        precio = 5000;
        producto = "Gabinete-$5000\n";
        break;
      default:
        precio = 0;
        producto = "";
        alert("Seleccione una opción válida");
        break;
    }
    total += precio;
    productosSeleccionados += producto;
    pedido = prompt(`Selecciona tus componentes o escribe 7 para finalizar: 
1.Motherboard
2.Procesador
3.Memoria ram
4.Placa de video
5.Fuente de alimentación
6.Gabinete
7.Finalizar`);
  }

  if (total >= 150000) {
    descuento(`${total}`);
    alert(
      `Seleccionó los productos:\n${productosSeleccionados}Y el total de su pedido es de: $${total} pesos\nPor superar los $150000 se le aplica un descuento del %10 y el total final a pagar es $${descuentoDiez}`
    );
  } else {
    alert(
      `Seleccionó los productos:\n${productosSeleccionados}Y el total de su pedido es de: ${total} pesos`
    );
  }
}
seleccionProductos();
*/

//DESAFIO INCORPORAR ARRAYS Y PRIMERA ENTREGA PROYECTO FINAL

/*
class producto {
  constructor(id, componente, nombre, precio) {
    this.id = id;
    this.componente = componente;
    this.nombre = nombre;
    this.precio = Number(precio);
  }
}

const p1 = new producto(1, "Motherboard", "Asus B450", 20000);
const p2 = new producto(2, "Procesador", "Ryzen 5600x", 50000);
const p3 = new producto(3, "Memoria ram", "G-Skill Trident Z 16gb", 25000);
const p4 = new producto(4, "Disco rígido", "NVMe Samsung 970 evo 1TB", 45000);
const p5 = new producto(5, "Placa de video", "Asus RTX 3080ti", 330000);

const productos = [];

productos.push(p1);
productos.push(p2);
productos.push(p3);
productos.push(p4);
productos.push(p5);

const carrito = [];

function addToCart() {
  let productoId = Number(
    prompt(`Selecciona tus componentes o escribe 6 para continuar: 
1: Motherboard, Asus B450, $20000
2: Procesador, Ryzen 5600x, $50000
3: Memoria ram, G-Skill Trident Z 16gb", $25000
4: Disco rígido, NVMe Samsung 970 evo 1TB, $45000
5: Placa de video, Asus RTX 3080ti, $330000
6. Continuar`)
  );

  while (productoId != 6) {
    let cantidad = Number(prompt("Seleccione la cantidad"));
    let check = carrito.some((product) => product.id === productoId);
    if (check == true) {
      let producto = productos.find((product) => product.id === productoId);
      producto.cantidad += cantidad;
      producto.total = producto.precio * producto.cantidad;
    } else {
      let producto = productos.find((product) => product.id === productoId);
      producto.cantidad = cantidad;
      producto.total = producto.precio * cantidad;
      carrito.push(producto);
    }

    productoId = Number(
      prompt(`Selecciona tus componentes o escribe 6 para continuar: 
1: Motherboard, Asus B450, $20000
2: Procesador, Ryzen 5600x, $50000
3: Memoria ram, G-Skill Trident Z 16gb", $25000
4: Disco rígido, NVMe Samsung 970 evo 1TB, $45000
5: Placa de video, Asus RTX 3080ti, $330000
6. Continuar`)
    );
  }

  let eleccion = Number(
    prompt(`seleccione: 
1. Si desea ir al carro y ver el total
2. Si desea agregar mas productos a su carro
3. Si desea VACIAR el carro y volver a elegir
4. Si desea salir de la página`)
  );

  if (eleccion == 1) {
    console.log(carrito);
    calcularTotal(carrito);
    console.log(`Su total va a ser: $${calcularTotal(carrito)}`);
    finalizarCompra();
  } else if (eleccion == 2) {
    addToCart();
  } else if (eleccion == 3) {
    carrito.splice(0, carrito.length);
    console.log(carrito);
    addToCart();
  } else if (eleccion == 4) {
    alert("Gracias por visitarnos");
  }
}
addToCart();

function calcularTotal(carrito) {
  let total = 0;
  carrito.forEach((producto) => {
    total += producto.total;
  });
  return total;
}

function finalizarCompra() {
  let compra = prompt(`Presione 1 para finalizar compra
Presione cualquier tecla para seguir comprando`);
  if (compra == 1) {
    alert("Muchas gracias por su compra");
  } else {
    addToCart();
  }
}
*/

//DESAFIO DOM

/*

class producto {
  constructor(id, componente, img, nombre, precio) {
    this.id = id;
    this.componente = componente;
    this.img = img;
    this.nombre = nombre;
    this.precio = Number(precio);
  }
}

const p1 = new producto(
  1,
  "Motherboard",
  "img/motherboard.png",
  "Asus B450",
  20000
);
const p2 = new producto(
  2,
  "Procesador",
  "img/procesador.png",
  "Ryzen 5600x",
  50000
);
const p3 = new producto(
  3,
  "Memoria ram",
  "img/ram.png",
  "G-Skill Trident Z 16gb",
  25000
);
const p4 = new producto(
  4,
  "Disco rígido",
  "img/ssd.png",
  "NVMe Samsung 970 evo 1TB",
  45000
);
const p5 = new producto(
  5,
  "Placa de video",
  "img/placa-video.png",
  "Asus RTX 3080ti",
  330000
);

const productos = [];

productos.push(p1, p2, p3, p4, p5);

const mostrarProductos = (productos) => {
  const seccionProductos = document.getElementById("seccion-productos");
  productos.forEach((producto) => {
    const card = document.createElement("card");
    card.innerHTML += `<div class="card" style="width: 18rem;">
    <img src="${producto.img}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${producto.componente} ${producto.nombre}</h5>
      <p class="card-text">$${producto.precio}</p>
      <a href="#" class="btn btn-primary" id="button${producto.id}">SUMAR AL CARRITO</a>
    </div>
  </div>`;
    seccionProductos.appendChild(card);

    const button = document.getElementById(`button${producto.id}`);
    button.addEventListener("click", () => {
      addToCart(`${producto.id}`);
      alert(`Agregaste ${producto.nombre}`);
    });
  });
};

mostrarProductos(productos);

const carrito = [];

function addToCart(productoId) {
  const carritoContainer = document.querySelector("#carrito");

  let check = carrito.some((product) => product.id === productoId);
  if (check == true) {
    let producto = productos.find((product) => product.id === productoId);
    producto.cantidad += cantidad;
    producto.total = producto.precio * producto.cantidad;
  } else {
    let producto = productos.find((product) => product.id === productoId);
    producto.cantidad = cantidad;
    producto.total = producto.precio * cantidad;
    carrito.push(producto);

    let div = document.createElement("div");
    div.innerHTML += `<p>${producto.nombre} ${producto.cantidad}<br></p>`;
    carritoContainer.appendChild(div);
  }
}

*/

// 2DA ENTREGA PROYECTO FINAL

class Producto {
  constructor(id, componente, img, nombre, precio) {
    this.id = id;
    this.componente = componente;
    this.img = img;
    this.nombre = nombre;
    this.precio = Number(precio);
  }
}

class ProductoEnCarrito {
  constructor(prod) {
    this.producto = prod;
    this.cantidad = 1;
  }
}

const p1 = new Producto(
  1,
  "Motherboard",
  "img/motherboard.png",
  "Asus B450",
  20000
);
const p2 = new Producto(
  2,
  "Procesador",
  "img/procesador.png",
  "Ryzen 5600x",
  50000
);
const p3 = new Producto(
  3,
  "Memoria ram",
  "img/ram.png",
  "G-Skill Trident Z 16gb",
  25000
);
const p4 = new Producto(
  4,
  "Disco rígido",
  "img/ssd.png",
  "NVMe Samsung 970 evo 1TB",
  45000
);
const p5 = new Producto(
  5,
  "Placa de video",
  "img/placa-video.png",
  "Asus RTX 3080ti",
  330000
);

const productos = [];

productos.push(p1, p2, p3, p4, p5);

//DECLARO ARRAY DE CARRITO VACIO

let carrito = [];

//MOSTRAR PRODUCTOS EN HTML

const mostrarProductos = (productos) => {
  const seccionProductos = document.getElementById("seccion-productos");
  productos.forEach((producto) => {
    const card = document.createElement("card");
    card.innerHTML += `<div class="card" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top" alt="...">
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
  section.innerHTML += `<h5>Productos en carrito</h5>`
  let total = 0;
  carrito.forEach((p) => {
    total += p.producto.precio * p.cantidad;
    section.innerHTML += `
        <div>
            <p>${p.cantidad} x ${p.producto.nombre}: $${
      p.producto.precio * p.cantidad
    }</p>
            <button class="btn btn-success" onclick="sumarUnoAProducto(${
              p.producto.id
            })">+</button>
            <button class="btn btn-danger" onclick="restarUnoAProducto(${
              p.producto.id
            })">-</button>
        </div>
        `;
    addLocalStorage();
    
  });

  section.innerHTML += `<p>Total: $${total}</p>`;
  section.innerHTML += `<a class="btn btn-danger" id="buttonVaciar">vaciar carrito</a>`;

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
  p.cantidad += 1;
}

//FUNCION PARA QUITAR UNA UNIDAD DE PRODUCTO

function subtract(p) {
  if (p.cantidad == 0) {
    return;
  }
  p.cantidad -= 1;
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
  carrito = JSON.parse(itemBack);
  mostrarCarrito();
}
