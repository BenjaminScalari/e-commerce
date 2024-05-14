const BASE_URL = "https://striveschool-api.herokuapp.com/api/product/";
let products = [];

let param = new URLSearchParams(window.location.search);
let id = param.get("id");

window.onload = async () => {
  if (id) {
    const res = await fetch(BASE_URL + id, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2OTU0NjQsImV4cCI6MTcxNjkwNTA2NH0.KogKEK26zyQpnpyD63QhTxjyYaG1RmpuGka5Ks3pInA",
      },
    });
    const product = await res.json();
    document.querySelector("#name").value = product.name;
    document.querySelector("#description").value = product.description;
    document.querySelector("#imageUrl").value = product.imageUrl;
    document.querySelector("#brand").value = product.brand;
    document.querySelector("#price").value = product.price;
    document.querySelector(".btn-success").remove();
  } else {
    document.querySelector(".btn-danger").remove();
    document.querySelector(".btn-secondary").remove();
  }

  // Carica la lista dei prodotti
  getProducts();
};

const createNew = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };

  try {
    let res = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2OTU0NjQsImV4cCI6MTcxNjkwNTA2NH0.KogKEK26zyQpnpyD63QhTxjyYaG1RmpuGka5Ks3pInA",
      },
      body: JSON.stringify(product),
    });

    if (res.ok) {
      const data = await res.json();
      alert("Prodotto creato con successo: " + data.name);
      // Ricarica la lista dei prodotti dopo aver creato un nuovo prodotto
      getProducts();
    } else {
      throw new Error(
        "Errore durante la creazione del prodotto: " + res.status
      );
    }
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore durante la creazione del prodotto");
  }
};


const editProduct = async () => {
  const product = {
    name: document.querySelector("#name").value,
    description: document.querySelector("#description").value,
    brand: document.querySelector("#brand").value,
    imageUrl: document.querySelector("#imageUrl").value,
    price: document.querySelector("#price").value,
  };
  let res = await fetch(BASE_URL + id, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2OTU0NjQsImV4cCI6MTcxNjkwNTA2NH0.KogKEK26zyQpnpyD63QhTxjyYaG1RmpuGka5Ks3pInA",
    },
    body: JSON.stringify(product),
  });
  if (res.ok) {
    alert("Product created");
  }
};

const deleteProduct = async (productId) => {
  try {
    let res = await fetch(BASE_URL + productId, {
      method: "DELETE",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2MTI1NDEsImV4cCI6MTcxNjgyMjE0MX0.NNvzWa9HjnCo7Zrd4e_68dDKwgrti0voRAe3H03vapE",
      },
    });

    if (res.ok) {
      alert("Prodotto eliminato con successo");
      // Aggiorna la lista dei prodotti dopo l'eliminazione
      getProducts();
    } else {
      throw new Error("Errore durante l'eliminazione del prodotto: " + res.status);
    }
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore durante l'eliminazione del prodotto");
  }
};


// Funzione per ottenere e visualizzare l'elenco dei prodotti
const getProducts = async () => {
  try {
    const response = await fetch(BASE_URL, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2OTU0NjQsImV4cCI6MTcxNjkwNTA2NH0.KogKEK26zyQpnpyD63QhTxjyYaG1RmpuGka5Ks3pInA",
      },
    });
    if (response.ok) {
      products = await response.json();
      renderProducts();
    } else {
      throw new Error("Errore nel recuperare i prodotti: " + response.status);
    }
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore durante il recupero dei prodotti");
  }
};

// Funzione per renderizzare la lista dei prodotti
const renderProducts = () => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "";

  if (products.length > 0) {
    products.forEach((product) => {
      const productCard = document.createElement("div");
      productCard.classList.add("col-md-4", "mb-4");

      productCard.innerHTML = `
        <div class="card">
          <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
          <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Prezzo: ${product.price}</p>
            <button class="btn btn-primary">Dettagli</button>
            <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Elimina</button>
          </div>
        </div>
      `;

      // Aggiungi la card del prodotto alla lista dei prodotti
      productList.appendChild(productCard);
    });
  } else {
    const noProductMessage = document.createElement("p");
    noProductMessage.textContent = "Nessun prodotto disponibile al momento.";
    productList.appendChild(noProductMessage);
  }
};

async function handleImageUpload(event) {
  const file = event.target.files[0];

  // Verifica che sia stato selezionato un file
  if (!file) {
    alert("Nessun file selezionato");
    return;
  }

  // Crea un oggetto FormData e aggiungi il file
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      body: formData,
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQyMTE0MDU1NjIxYTAwMTVjMTVmMWIiLCJpYXQiOjE3MTU2OTU0NjQsImV4cCI6MTcxNjkwNTA2NH0.KogKEK26zyQpnpyD63QhTxjyYaG1RmpuGka5Ks3pInA",
      },
    });

    if (response.ok) {
      const data = await response.json();
      const imageUrl = data.imageUrl;
      // Aggiorna l'URL dell'immagine nell'input nascosto
      document.querySelector("#imageUrl").value = imageUrl;
      alert("Immagine caricata con successo!");
    } else {
      // Se la richiesta non va a buon fine, gestisci l'errore
      const errorMessage = await response.text();
      throw new Error(
        `Errore durante il caricamento dell'immagine: ${errorMessage}`
      );
    }
  } catch (error) {
    console.error(error);
    alert("Si è verificato un errore durante il caricamento dell'immagine");
  }
}
