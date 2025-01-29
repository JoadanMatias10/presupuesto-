"use strict";
var _a, _b;
class Transaccion {
    constructor(id, monto, descripcion, tipo) {
        this.id = id;
        this.monto = monto;
        this.descripcion = descripcion;
        this.tipo = tipo;
    }
}
let transacciones = [];
let balance = 0;
const montoInput = document.getElementById("monto");
const descripcionInput = document.getElementById("descripcion");
const balanceElement = document.getElementById("balance");
const listaTransacciones = document.getElementById("lista-transacciones");
(_a = document.getElementById("agregar-ingreso")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => agregarTransaccion("ingreso"));
(_b = document.getElementById("agregar-gasto")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => agregarTransaccion("gasto"));
function agregarTransaccion(tipo) {
    const monto = parseFloat(montoInput.value);
    const descripcion = descripcionInput.value.trim();
    if (isNaN(monto) || monto <= 0) {
        alert("El monto debe ser un número positivo.");
        return;
    }
    if (descripcion === "") {
        alert("La descripción no puede estar vacía.");
        return;
    }
    const nuevaTransaccion = new Transaccion(Date.now(), monto, descripcion, tipo);
    transacciones.push(nuevaTransaccion);
    actualizarBalance();
    mostrarTransacciones();
    limpiarFormulario();
}
function actualizarBalance() {
    const totalIngresos = transacciones
        .filter(t => t.tipo === "ingreso")
        .reduce((acc, t) => acc + t.monto, 0);
    const totalGastos = transacciones
        .filter(t => t.tipo === "gasto")
        .reduce((acc, t) => acc + t.monto, 0);
    balance = totalIngresos - totalGastos;
    balanceElement.textContent = balance.toFixed(2);
}
function mostrarTransacciones() {
    listaTransacciones.innerHTML = "";
    transacciones.forEach(transaccion => {
        const li = document.createElement("li");
        li.className = transaccion.tipo === "ingreso" ? "ingreso-item" : "gasto-item";
        li.textContent = `${transaccion.descripcion}: ${transaccion.monto} $`;
        listaTransacciones.appendChild(li);
    });
}
function limpiarFormulario() {
    montoInput.value = "";
    descripcionInput.value = "";
}
