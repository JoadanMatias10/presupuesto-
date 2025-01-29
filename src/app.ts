type TipoTransaccion = "ingreso" | "gasto";

class Transaccion {
    constructor(
        public id: number,
        public monto: number,
        public descripcion: string,
        public tipo: TipoTransaccion
    ) {}
}

let transacciones: Transaccion[] = [];
let balance = 0;

const montoInput = document.getElementById("monto") as HTMLInputElement;
const descripcionInput = document.getElementById("descripcion") as HTMLInputElement;
const balanceElement = document.getElementById("balance") as HTMLSpanElement;
const listaTransacciones = document.getElementById("lista-transacciones") as HTMLUListElement;

document.getElementById("agregar-ingreso")?.addEventListener("click", () => agregarTransaccion("ingreso"));
document.getElementById("agregar-gasto")?.addEventListener("click", () => agregarTransaccion("gasto"));

function agregarTransaccion(tipo: TipoTransaccion) {
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