class Producto {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    vender() {
        if (this.cantidad > 0) {
            this.cantidad -= 1;
            console.log(`Se vendió un/a ${this.nombre}`);
        } else {
            console.log(`No hay stock de ${this.nombre}`);
            alert(`No hay stock disponible de ${this.nombre}`);
        }
    }
}

const productos = [
    new Producto("consola", 249990, 4),
    new Producto("monitor", 59900, 5),
    new Producto("Pc", 359900, 3)
];

console.log(productos);

let carrito = [];
let precioTotal = 0;
let continuarComprando = true;

const mostrarProductos = () => {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = ""; // Limpiar la lista antes de volver a mostrar los productos

    productos.forEach((producto) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <p>${producto.nombre} - Precio: $${producto.precio}</p>
            <p>Cantidad disponible: ${producto.cantidad}</p>
            <button class="comprar-btn">Comprar</button>
        `;

        const comprarBtn = li.querySelector(".comprar-btn");
        comprarBtn.addEventListener("click", () => {
            agregarAlCarrito(producto);
            actualizarProductos(); // Actualizar el listado de productos en HTML
        });

        listaProductos.appendChild(li);
    });
};

const agregarAlCarrito = (producto) => {
    if (producto.cantidad > 0) {
        carrito.push(producto);
        producto.vender();
        precioTotal += producto.precio;
        actualizarCarrito();
        almacenarCarritoEnLocalStorage();
    } else {
        console.log(`No hay stock de ${producto.nombre}`);
        alert(`No hay stock disponible de ${producto.nombre}`);
    }
};

const actualizarCarrito = () => {
    const carritoElement = document.getElementById("carrito");
    carritoElement.innerHTML = "";

    carrito.forEach((producto) => {
        const li = document.createElement("li");
        li.textContent = `${producto.nombre} - Precio: $${producto.precio}`;
        carritoElement.appendChild(li);
    });

    const precioTotalElement = document.getElementById("precio-total");
    precioTotalElement.textContent = `Precio total: $${precioTotal}`;
};

const almacenarCarritoEnLocalStorage = () => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("precioTotal", precioTotal);
};

const cargarCarritoDesdeLocalStorage = () => {
    const carritoGuardado = localStorage.getItem("carrito");
    const precioTotalGuardado = localStorage.getItem("precioTotal");

    if (carritoGuardado && precioTotalGuardado) {
        carrito = JSON.parse(carritoGuardado);
        precioTotal = parseFloat(precioTotalGuardado);
        actualizarCarrito();
    }
};

cargarCarritoDesdeLocalStorage();

const finalizarCompraBtn = document.getElementById("finalizar-compra-btn");
finalizarCompraBtn.addEventListener("click", () => {
    carrito.forEach((producto) => {
        producto.cantidad += 1;
    });
    carrito = [];
    precioTotal = 0;
    actualizarCarrito();
    almacenarCarritoEnLocalStorage();
    alert("¡Compra finalizada! Gracias por su compra.");
});

const actualizarProductos = () => {
    const listaProductos = document.getElementById("lista-productos");
    listaProductos.innerHTML = ""; // Limpiar la lista antes de volver a mostrar los productos
    mostrarProductos(); // Volver a mostrar los productos actualizados en HTML
};

mostrarProductos();

// const respuesta = prompt("¿Desea seguir comprando? (si/no)");

// if (respuesta.toLowerCase() === "no") {
//     continuarComprando = false;
// }

console.log("Carrito de compras:");
carrito.forEach((producto) => {
    console.log(`${producto.nombre} - Precio: $${producto.precio}`);
});