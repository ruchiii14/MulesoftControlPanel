

function insertPurchase() {
    const productName = document.getElementById('producto').value;
    const units = document.getElementById('units').value;
    const price = document.getElementById('price').value;

    const mulesoftEndpoint = 'http://localhost:8081/databasePost';

    const purchaseData = {
        bbddtable: "compra",
        id_producto: productName,
        units: units,
        price: price
    };

    // Make a POST request 
    fetch(mulesoftEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseData),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to insert purchase data');
        }
        return response.json(); // Parsear la respuesta como JSON
    })
    .then(data => {
        console.log('Server Response:', data);

        // Verificar si la inserción se realizó correctamente
        if (data && data.affectedRows > 0) {
            // Inserción exitosa
            console.log('Purchase data inserted successfully:', data);
            // Aquí puedes mostrar la notificación al usuario usando SweetAlert2 o cualquier otra biblioteca que prefieras
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Purchase data inserted successfully!',
                timer: 3000,
                showConfirmButton: false
            });
        } else {
            // Inserción fallida
            console.error('Failed to insert purchase data:', data);
        }
    })
    .catch(error => {
        console.error('Error inserting purchase data:', error.message);
    });
}


// Función para cargar dinámicamente las opciones del <select>
function cargarOpcionesProductos() {
    fetch('http://localhost:8081/databaseGet', {
        method: 'GET'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        const select = document.getElementById('producto');
        data.forEach(producto => {
            const option = document.createElement('option');
            option.value = producto.id_producto;
            option.textContent = producto.nombre;
            select.appendChild(option);
        });
    })
    .catch(error => {
        console.error('Error fetching data:', error);
    });
}


// Function to insert sale data
function insertSale() {

}


function publishTweet() {
    const tweetContent = document.getElementById('tweetContent').value;
    
    // Data to be sent in the request body
    const data = {
        tweetContent: tweetContent
    };

    // Options for the fetch request
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    // Make the fetch request to the specified URL
    fetch('http://localhost:8081/twitterPost', options)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(responseData => {
            console.log('Tweet published successfully:', responseData);
        })
        .catch(error => {
            console.error('Error publishing tweet:', error);
        });
}

// Populate latest tweets
const tweetContainer = document.getElementById('tweetContainer');
tweets.forEach(tweet => {
    const tweetElement = document.createElement('p');
    tweetElement.textContent = tweet;
    tweetContainer.appendChild(tweetElement);
});

function populateTopSellingProducts() {
    // Clear existing list items
    const topSellingList = document.getElementById('topSellingList');
    topSellingList.innerHTML = '';

    // Fetch top selling products from the server using the endpoint http://localhost:8081/api/get3 with 'top' parameter
    fetch('http://localhost:8081/get3?category=top')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(topSellingProducts => {
            // Iterate through the received top selling products and add them to the list
            topSellingProducts.forEach(product => {
                const productItem = document.createElement('li');
                productItem.textContent = product;
                topSellingList.appendChild(productItem);
            });
        })
        .catch(error => {
            console.error('Error fetching top selling products:', error);
        });
}


// Fetch least selling products from the server using the endpoint http://localhost:8081/api/get3 with 'least' parameter
fetch('http://localhost:8081/api/get3?category=least')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(leastSellingProducts => {
        // Iterate through the received least selling products and add them to the list
        leastSellingProducts.forEach(product => {
            const productItem = document.createElement('li'); // elemento <li> (elemento de lista) 
            productItem.textContent = product;
            leastSellingList.appendChild(productItem);
        });
    })
    .catch(error => {
        console.error('Error fetching least selling products:', error);
    });


// Fetch low stock information from the server using the endpoint http://localhost:8081/api/lowstock
fetch('http://localhost:8081/api/lowstock')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
   .then(lowStockData => {
        // Imprimir los datos recibidos por pantalla con un bucle
        for (const item of lowStockData) {
            console.log(`Producto: ${item.product} - Stock: ${item.stock}`);
        }
    })
    .catch(error => {
        console.error('Error fetching low stock information:', error);
    });