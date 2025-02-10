document.addEventListener('DOMContentLoaded', () =>{
    const productContainer = document.getElementById("productContainer");
    const openModalBtn = document.getElementById('open-modal');
    const qrCodeModal = document.getElementById('qr-code-modal');
    const closeModal = document.getElementById('close-modal');
    const modalList = document.getElementById('modal-cart-list');
    const totalText = document.getElementById('modal-total-price');

    let cardsuhrob = [];

    fetch('https://fakestoreapi.com/products?limit=10')
    .then(res => res.json())
    .then(data => {
        Products(data);
    });

    function Products(products){
        productContainer.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.classList.add('product-card');
            card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <h3>${product.title}</h3>
            <p>${product.description.slice(0, 50)}...</p>
            <p><strong>💲 ${product.price}</strong></p>
            <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add To Cart</button>
        `;
            productContainer.appendChild(card);
        });
    }

    window.addToCart = function (id, title, price){
        cardsuhrob.push({id , title, price});
        alert(`Siz '${title}' mahsulotini savatga qo'shdingiz.`)
    };

    openModalBtn.addEventListener('click', () =>{
        if(cardsuhrob.length === 0){
            return alert("Savat bo'sh")
        }

        modalList.innerHTML = '';
        let total = 0;

        cardsuhrob.forEach(item =>{
            total += item.price;
            const listItem = document.createElement("li");
            listItem.textContent = `${item.title} - $${item.price}`;
            modalList.appendChild(listItem);
        });
        totalText.textContent = `Umumiy summa: $${Math.floor(total * 100) / 100}`;
        qrCodeModal.style.display = 'block'; //

    });
    closeModal.addEventListener('click', () => {
        qrCodeModal.style.display = 'none';
    });

    window.addEventListener('click', (e) =>{
        if(e.target === qrCodeModal){
            qrCodeModal.style.display = 'none'
        }
    });
});