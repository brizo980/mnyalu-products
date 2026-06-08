// 1. PRODUCT DATA - Comprehensive Catalog

const products = [

    // --- PERSONAL CARE ---

    {

        id: 1,

        name: "Hand Wash",

        category: "Personal Care",

        description: "Gentle hand wash that cleanses without drying. Perfect for daily use.",

        image: "assets/Gold Liquid Hand Wash.jpg",

        variants: [{ size: "500 ml", price: 15000 }]

    },

    {

        id: 2,

        name: "Leave-in Hair Conditioner",

        category: "Personal Care",

        description: "Lightweight conditioner for daily hair care. No rinse needed.",

        image: "assets/Leave-in Hair Conditioner.jpg",

        variants: [{ size: "500 grams", price: 25000 }]

    },

    {

        id: 3,

        name: "Shower Gel",

        category: "Personal Care",

        description: "Premium shower gel with natural ingredients. Leaves skin refreshed.",

        image: "assets/Gold Shower gel.jpg",

        variants: [{ size: "500 ml", price: 15000 }]

    },

    {

        id: 4,

        name: "Shampoo",

        category: "Personal Care",

        description: "Nourishing shampoo for all hair types. Leaves hair smooth and shiny.",

        image: "assets/Gold Shampoo.jpg",

        variants: [{ size: "500 ml", price: 15000 }]

    },

    {

        id: 5,

        name: "Body Lotion",

        category: "Personal Care",

        description: "Lightweight body lotion that hydrates skin all day. Non-greasy formula.",

        image: "assets/Gold Body Lotion.jpg",

        variants: [{ size: "500 grams", price: 25000 }]

    },

    {

        id: 13,

        name: "Hair Steaming",

        category: "Personal Care",

        description: "Deep conditioning treatment for hair care. Steam and nourish your hair.",

        image: "assets/Natural Hair Steaming.jpg",

        variants: [{ size: "500 grams", price: 20000 }]

    },

    {

        id: 10,

        name: "Body Cream",

        category: "Personal Care",

        description: "Rich and moisturizing body cream with a luxurious feel. Absorbs quickly.",

        image: "assets/Body Cream.jpg",

        variants: [{ size: "500 grams", price: 25000 }]

    },

    // --- HOUSEHOLD CLEANING ---

    {

        id: 6,

        name: "Toilet Cleaner",

        category: "Household Cleaning",

        description: "Powerful toilet cleaner that removes stains and kills germs. Fresh scent.",

        image: "assets/Toilet Cleaner.jpg",

        variants: [{ size: "750 ml", price: 9000 }]

    },

    {

        id: 7,

        name: "Glass Cleaner",

        category: "Household Cleaning",

        description: "Streak-free glass cleaner for windows and mirrors. Crystal clear shine.",

        image: "assets/Glass Cleaner.jpg",

        variants: [{ size: "500 ml", price: 11000 }]

    },

    {

        id: 8,

        name: "Dish Wash",

        category: "Household Cleaning",

        description: "Effective dish wash that cuts through grease. Gentle on hands.",

        image: "assets/Dishwashing Liquid.jpg",

        variants: [

            { size: "5 litres", price: 12000 },

            { size: "1 litre", price: 3000 }

        ]

    },

    {

        id: 14,

        name: "Disinfectant",

        category: "Household Cleaning",

        description: "Powerful disinfectant kills 99.9% germs. Perfect for all surfaces.",

        image: "assets/All Purpose Disinfectant.jpg",

        variants: [{ size: "5 litres", price: 13000 }]

    },

    {

        id: 9,

        name: "Bleach",

        category: "Household Cleaning",

        description: "Strong bleach for whites and colored fabrics. Powerful stain removal.",

        image: "assets/Power Bleach.jpg",

        variants: [

            { size: "5 litres", price: 15000 },

            { size: "1 litre", price: 4000 }

        ]

    },

    {

        id: 11,

        name: "Sanitizer",

        category: "Household Cleaning",

        description: "Quick-drying hand sanitizer with moisturizers. 99% effective.",

        image: "assets/Hand Sanitizer.jpeg",

        variants: [{ size: "500 ml", price: 10000 }]

    },

    {

        id: 12,

        name: "Multipurpose Cleaner",

        category: "Household Cleaning",

        description: "Versatile cleaner for all surfaces. Leaves everything sparkling clean.",

        image: "assets/Multipurpose Cleaner.jpg",

        variants: [{ size: "5 litres", price: 12000 }]

    }

];



let cart = [];



// 2. RENDERING ENGINE

function renderProducts(filter = "All") {
    const mainGrid = document.getElementById('product-grid');
    const pcGrid = document.getElementById('personal-care-grid');
    const hhGrid = document.getElementById('household-grid');

    const createCard = (product) => {
        const defaultPrice = product.variants[0].price;
        return `
            <div class="product-card">
                <img src="${product.image}" alt="${product.name}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="desc">${product.description}</p>
                    <select class="variant-select" onchange="updatePrice(this, ${product.id})">
                        ${product.variants.map(v => `<option value="${v.price}">${v.size} - ${v.price.toLocaleString()} Tsh</option>`).join('')}
                    </select>
                    <div class="price-row">
                        <span class="price" id="price-${product.id}">${defaultPrice.toLocaleString()} Tsh</span>
                        <span class="per-unit">per unit</span>
                    </div>
                    <div class="quantity-controls">
                        <button class="qty-btn" onclick="changeQty(${product.id}, -1); return false;">-</button>
                        <input type="text" id="qty-${product.id}" value="1" min="1" readonly onclick="this.select()">
                        <button class="qty-btn" onclick="changeQty(${product.id}, 1); return false;">+</button>
                    </div>
                    <button class="add-btn" onclick="addToCart(${product.id})">🛒 Add</button>
                </div>
            </div>`;
    };

    if (mainGrid) {
        const filtered = filter === "All" ? products : products.filter(p => p.category === filter);
        mainGrid.innerHTML = filtered.map(p => createCard(p)).join('');
    }

    if (pcGrid && hhGrid) {
        pcGrid.innerHTML = products.filter(p => p.category === "Personal Care").slice(0, 4).map(p => createCard(p)).join('');
        hhGrid.innerHTML = products.filter(p => p.category === "Household Cleaning").slice(0, 4).map(p => createCard(p)).join('');
    }
}



// 3. LOGIC FUNCTIONS

function updatePrice(selectElement, productId) {

    const priceDisplay = document.getElementById(`price-${productId}`);

    const selectedPrice = parseInt(selectElement.value);

    priceDisplay.innerText = `${selectedPrice.toLocaleString()} Tsh`;

}



function changeQty(productId, amount) {
    const input = document.getElementById(`qty-${productId}`);
    let currentVal = parseInt(input.value) || 1;

    const newVal = currentVal + amount;
    if (newVal >= 1) {
        input.value = newVal;
    }
}



function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const qtyInput = document.getElementById(`qty-${productId}`);
    const qty = parseInt(qtyInput.value) || 1;

    const select = qtyInput.closest('.product-info').querySelector('.variant-select');
    const price = parseInt(select.value);
    const size = select.options[select.selectedIndex].text.split(' - ')[0];

    const item = {
        id: productId,
        name: `${product.name} (${size})`,
        price: price,
        quantity: qty
    };

    const existingItem = cart.find(i => i.name === item.name);

    if (existingItem) {
        existingItem.quantity += qty;
    } else {
        cart.push(item);
    }

    updateCartUI();
    document.getElementById('cart-sidebar').classList.add('active');

    // Reset quantity to 1 after adding to cart
    qtyInput.value = 1;
}



function updateCartUI() {

    const count = document.getElementById('cart-count');

    const container = document.getElementById('cart-items-container');

    const totalAmount = document.getElementById('cart-total-amount');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    

    count.innerText = totalItems;

    totalAmount.innerText = `${totalPrice.toLocaleString()} Tsh`;



    if (cart.length === 0) {

        container.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';

    } else {

        container.innerHTML = cart.map((item, index) => `

            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px; border-bottom: 1px solid #eee; padding-bottom: 10px;">

                <div>

                    <h4 style="margin: 0;">${item.name}</h4>

                    <p style="margin: 5px 0; color: #666;">${item.quantity} x ${item.price.toLocaleString()} Tsh</p>

                </div>

                <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #d32f2f; cursor: pointer; font-size: 1.2rem;">&times;</button>

            </div>`).join('');

    }

}



function removeFromCart(index) {

    cart.splice(index, 1);

    updateCartUI();

}



function toggleCart() {

    const sidebar = document.getElementById('cart-sidebar');

    if(sidebar) sidebar.classList.toggle('active');

}



function checkoutWhatsApp() {

    if (cart.length === 0) {

        alert("Your cart is empty!");

        return;

    }

    const phoneNumber = "255754362180"; 

    let message = "Hello MNYALU PRODUCTS! I would like to place an order:%0A%0A";

    cart.forEach((item, index) => {

        message += `${index + 1}. *${item.name}* x ${item.quantity} — ${item.price.toLocaleString()} Tsh%0A`;

    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    message += `%0A*Total Amount: ${total.toLocaleString()} Tsh*%0A%0APlease confirm my order.`;

    window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');

}



function handleContact(event) {

    event.preventDefault(); 

    const name = document.getElementById('cust-name').value;

    const email = document.getElementById('cust-email').value;

    alert(`Thank you, ${name}! Your message has been sent. We will contact you at ${email} shortly.`);

    document.getElementById('info-form').reset();

}



// --- LOGIN & DASHBOARD REDIRECTION LOGIC ---



function checkLogin() {

    const passInput = document.getElementById('admin-pass');

    

    // Updated password to mnyalu2019

    if (passInput && passInput.value === "mnyalu2019") {

        alert("Success! Entering Dashboard...");

        // Performs the redirect to your separate dashboard file

        window.location.href = "dashboard.html"; 

    } else {

        alert("Incorrect password. Please try again.");

        if(passInput) passInput.value = ""; 

    }

}



function togglePassword() {

    const passInput = document.getElementById('admin-pass');

    if (passInput) {

        passInput.type = passInput.type === "password" ? "text" : "password";

    }

}



// --- TRENDS CHART INITIALIZATION ---



function initTrendsChart() {

    const ctx = document.getElementById('trendsChart');

    if (!ctx) return;



    new Chart(ctx, {

        type: 'line',

        data: {

            labels: ['Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19', 'Jan 20'],

            datasets: [{

                label: 'Total Orders',

                data: [0, 0, 1, 0, 1, 0], // Matches screenshot order history

                borderColor: '#d32f2f', 

                backgroundColor: 'rgba(211, 47, 47, 0.1)',

                fill: true,

                tension: 0.4

            }]

        },

        options: {

            responsive: true,

            maintainAspectRatio: false,

            plugins: {

                legend: { display: false }

            },

            scales: {

                y: { beginAtZero: true, ticks: { stepSize: 1 } }

            }

        }

    });

}



window.onload = () => {
    if (document.getElementById('product-grid') || document.getElementById('personal-care-grid')) {
        renderProducts();
    }

    if (window.location.pathname.includes('dashboard.html')) {
        initTrendsChart();
    }
};

function sendResetEmail() {

    const emailInput = document.getElementById('reset-email');

    const formContent = document.getElementById('reset-form-content');

    const sentConfirmation = document.getElementById('sent-confirmation');

    const displayEmail = document.getElementById('display-email');



    const email = emailInput ? emailInput.value : "";



    if (email && email.includes("@")) {

        // Update the UI to show 'Sent' status

        displayEmail.innerText = email;

        formContent.style.display = 'none';

        sentConfirmation.style.display = 'block';

    } else {

        alert("Please enter a valid Gmail address.");

    }

}
// 3. ADMIN & PROTECTION LOGIC
function checkLogin() {
    const passInput = document.getElementById('admin-pass');
    
    // 1. Verify the password input exists and matches your secret password
    if (passInput && passInput.value === "mnyalu2019") {
        
        // 2. Save the login state so the dashboard knows you are authorized
        localStorage.setItem('isAdminLoggedIn', 'true');
        
        alert("Success! Entering Dashboard...");
        
        // 3. Redirect to your separate dashboard file
        window.location.href = "dashboard.html"; 
        
    } else {
        // Handle incorrect attempts
        alert("Incorrect password. Please try again.");
        if(passInput) passInput.value = ""; 
    }
}

/**
 * Security Gatekeeper: Run this on the dashboard to prevent 
 * unauthorized people from typing the URL directly.
 */
function protectDashboard() {
    const isDashboard = window.location.pathname.includes('dashboard.html');
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn') === 'true';
    
    if (isDashboard && !isLoggedIn) {
        window.location.href = "login.html"; // Kick out unauthorized users
    }
}