const socket = io();

const productList = document.getElementById("productList");
const addForm = document.getElementById("productForm");
const deleteForm = document.getElementById("deleteForm");

//Recibir productos mediante sockets
socket.on("getAllProducts", (data) => {
  productList.innerHTML = "";

  data.forEach((prod) => {
    const div = document.createElement("div");

    div.innerHTML = `
      <div class="card m-1 py-2 px-4" style="width: 18rem;">
        <h3>${prod.title}</h3>
        <p>ID: ${prod.id}</p>
        <p>Descripción: ${prod.description}</p>
        <p>Precio: ${prod.price}</p>
      </div>
    `;

    productList.appendChild(div);
  });
});

//Agregar un producto
addForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const price = document.getElementById("price").value;
  const description = document.getElementById("description").value;

  await fetch("/realtimeproducts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title, price, description }),
  });

  addForm.reset();
});

//Eliminar un productos
deleteForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const id = document.getElementById("id").value;

  await fetch("/realtimeproducts", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id }),
  });

  deleteForm.reset();
});
