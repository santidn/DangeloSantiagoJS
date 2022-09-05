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
