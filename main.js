
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderFeatured(filter = 'all') {
  const grid = document.getElementById('featured-grid');
  if (!grid) return;
  
  let filtered = filter === 'all' ? products.slice(0,4) : products.filter(p => p.category === filter).slice(0,4);
  
  grid.innerHTML = filtered.map(p => `
    <div class="product-card">
      <div class="product-img"><img src="${p.image}" alt="${p.name}"></div>
      <div class="product-info">
        <h4>${p.name}</h4>
        <span class="category">${p.category} Bag</span>
        <div class="product-bottom">
          <strong>$${p.price}</strong>
          <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    </div>
  `).join('');
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.qty++; else cart.push({...product, qty: 1});
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI() {
  document.getElementById('cart-count').textContent = cart.reduce((s,i)=>s+i.qty,0);
  document.getElementById('cart-total').textContent = cart.reduce((s,i)=>s+i.price*i.qty,0);
  document.getElementById('cart-items').innerHTML = cart.map(i=>`<div class="cart-item"><span>${i.name} x${i.qty}</span><span>$${i.price*i.qty}</span></div>`).join('') || '<p style="padding:20px;color:#888;">Cart empty</p>';
}

function toggleCart() {
  document.getElementById('cart-drawer').classList.toggle('open');
}

// filter pills 
document.addEventListener('DOMContentLoaded', () => {
  renderFeatured();
  updateCartUI();
  document.querySelectorAll('.pill').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.pill').forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      renderFeatured(btn.dataset.filter);
    });
  });
});


const contactForm = document.getElementById('contact-form');
if(contactForm){
  contactForm.addEventListener('submit', function(e){
    e.preventDefault();
    document.getElementById('form-success-banner').style.display = 'block';
    this.reset();
    setTimeout(()=> {
      document.getElementById('form-success-banner').style.display = 'none';
    }, 3000);
  });
}
