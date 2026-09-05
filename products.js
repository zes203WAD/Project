// products.js 
document.addEventListener('DOMContentLoaded', () => {
    
    const products = [
        { id: 1, name: "GG Marmont Mini - Black", price: 1290, category: "crossbody", image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
        { id: 2, name: "Quilted Chain Crossbody", price: 895, category: "crossbody", image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400" },
        { id: 3, name: "Leather Tote - Tan", price: 450, category: "tote", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" },
        { id: 4, name: "Marmont Shoulder Bag", price: 1590, category: "shoulder", image: "https://images.unsplash.com/photo-1559563458-527698bf5295?w=400" },
        { id: 5, name: "Mini Velvet Clutch", price: 320, category: "clutch", image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400" },
        { id: 6, name: "Structured Tote - Black", price: 520, category: "tote", image: "https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400" },
        { id: 7, name: "Chain Shoulder Bag", price: 980, category: "shoulder", image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400" },
        { id: 8, name: "GG Clutch With Chain", price: 750, category: "clutch", image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400" }
    ];

    let cart = JSON.parse(localStorage.getItem('pro-retail-cart')) || [];
    let currentFilter = 'all';

    const grid = document.getElementById('product-grid');
    const filterBtns = document.querySelectorAll('.filter-btn');
    const cartBtn = document.getElementById('cart-btn');
    const closeCartBtn = document.getElementById('close-cart');
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const drawerCount = document.getElementById('drawer-count');
    const cartTotal = document.getElementById('cart-total');

    if (!grid) return;

    function renderProducts() {
        grid.innerHTML = '';
        let filtered = currentFilter === 'all' ? products : products.filter(p => p.category === currentFilter);

        filtered.forEach(product => {
            const card = document.createElement('div');
            card.className = 'bg-white rounded-xl shadow hover:shadow-lg transition p-4 flex flex-col';
            card.innerHTML = `
                <img src="${product.image}" alt="${product.name}" class="h-48 w-full object-cover rounded-lg mb-4">
                <h3 class="font-bold text-sm">${product.name}</h3>
                <p class="text-gray-500 text-xs capitalize mt-1">${product.category} bag</p>
                <div class="flex justify-between items-center mt-auto pt-4">
                    <span class="font-bold">$${product.price}</span>
                    <button data-id="${product.id}" class="add-btn bg-black text-white px-4 py-2 rounded-lg text-xs hover:bg-gray-800">Add to Cart</button>
                </div>
            `;
            grid.appendChild(card);
        });

        document.querySelectorAll('.add-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                addToCart(parseInt(e.target.dataset.id));
            });
        });
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => {
                b.classList.remove('bg-black', 'text-white');
                b.classList.add('bg-white', 'border');
            });
            btn.classList.remove('bg-white', 'border');
            btn.classList.add('bg-black', 'text-white');
            currentFilter = btn.dataset.filter;
            renderProducts();
        });
    });

    function addToCart(id) {
        const product = products.find(p => p.id === id);
        const existing = cart.find(i => i.id === id);
        if (existing) existing.qty += 1;
        else cart.push({ ...product, qty: 1 });
        syncCart();
        openCart();
    }

    function removeFromCart(id) {
        cart = cart.filter(item => item.id !== id);
        syncCart();
    }

    function updateQty(id, change) {
        const item = cart.find(i => i.id === id);
        if (!item) return;
        item.qty += change;
        if (item.qty <= 0) removeFromCart(id);
        else syncCart();
    }

    function syncCart() {
        localStorage.setItem('pro-retail-cart', JSON.stringify(cart));
        const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
        if (cartCount) cartCount.textContent = totalItems;
        if (drawerCount) drawerCount.textContent = totalItems;
        const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
        if (cartTotal) cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
        renderCartItems();
    }

    function renderCartItems() {
        if (!cartItemsDiv) return;
        if (cart.length === 0) {
            cartItemsDiv.innerHTML = '<p class="text-gray-400 text-center mt-20">Your cart is empty</p>';
            return;
        }
        cartItemsDiv.innerHTML = '';
        cart.forEach(item => {
            const div = document.createElement('div');
            div.className = 'flex gap-3 border-b pb-4';
            div.innerHTML = `
                <img src="${item.image}" class="w-16 h-16 object-cover rounded">
                <div class="flex-1">
                    <h4 class="font-bold text-xs">${item.name}</h4>
                    <p class="text-gray-500 text-xs">$${item.price}</p>
                    <div class="flex items-center gap-2 mt-2">
                        <button class="qty-minus border px-2 rounded" data-id="${item.id}">-</button>
                        <span class="text-xs">${item.qty}</span>
                        <button class="qty-plus border px-2 rounded" data-id="${item.id}">+</button>
                        <button class="remove-btn text-red-500 text-xs ml-3" data-id="${item.id}">Remove</button>
                    </div>
                </div>
            `;
            cartItemsDiv.appendChild(div);
        });
        cartItemsDiv.querySelectorAll('.qty-minus').forEach(btn => {
            btn.addEventListener('click', () => updateQty(parseInt(btn.dataset.id), -1));
        });
        cartItemsDiv.querySelectorAll('.qty-plus').forEach(btn => {
            btn.addEventListener('click', () => updateQty(parseInt(btn.dataset.id), 1));
        });
        cartItemsDiv.querySelectorAll('.remove-btn').forEach(btn => {
            btn.addEventListener('click', () => removeFromCart(parseInt(btn.dataset.id)));
        });
    }

    function openCart() {
        drawer.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
    }
    function closeCart() {
        drawer.classList.add('translate-x-full');
        overlay.classList.add('hidden');
    }

    if (cartBtn) cartBtn.addEventListener('click', openCart);
    if (closeCartBtn) closeCartBtn.addEventListener('click', closeCart);
    if (overlay) overlay.addEventListener('click', closeCart);

    document.getElementById('checkout-btn')?.addEventListener('click', () => {
        if (cart.length === 0) return alert('Cart is empty');
        alert('Order placed! Total: ' + cartTotal.textContent);
        cart = [];
        syncCart();
        closeCart();
    });

    renderProducts();
    syncCart();
});
