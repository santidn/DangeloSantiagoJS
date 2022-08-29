// IDENTIFICADOR DE NUMEROS PRIMOS

let n1 = parseInt(prompt("INTRODUCIR UN NÚMERO PARA VERIFICAR SI ES PRIMO:"));
let primo = true;
// i = 0;

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
