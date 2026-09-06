
const products = [
  {id:1, name:"Leather Tote - Tan", price:450, category:"tote", image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400"},
  {id:2, name:"GG Marmont Mini", price:1290, category:"crossbody", image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"},
  {id:3, name:"Chain Shoulder Bag", price:980, category:"shoulder", image:"https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400"},
  {id:4, name:"Mini Velvet Clutch", price:320, category:"clutch", image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400"}
];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('featured-grid');
  const count = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const total = document.getElementById('cart-total');
  const itemsDiv = document.getElementById('cart-items');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');

  function renderGrid(){
    if(!grid) return;
    let list = currentFilter==='all' ? products : products.filter(p=>p.category===currentFilter);
    grid.innerHTML = list.map(p=>`
      <article class="bg-white rounded-xl shadow p-4 flex flex-col">
        <img src="${p.image}" alt="${p.name} - luxury bag for retail shop" class="h-48 w-full object-cover rounded-lg mb-3">
        <h3 class="font-bold text-sm">${p.name}</h3>
        <p class="text-xs text-gray-500 capitalize">${p.category} bag</p>
        <div class="product-actions mt-4">
          <span class="font-bold">$${p.price}</span>
          <button data-id="${p.id}" class="add-btn bg-black text-white px-4 py-2 rounded-lg text-xs">Add to Cart</button>
        </div>
      </article>`).join('');
    grid.querySelectorAll('.add-btn').forEach(b=>b.addEventListener('click',()=>addToCart(parseInt(b.dataset.id))));
  }

  function addToCart(id){
    let prod = products.find(p=>p.id===id);
    let item = cart.find(i=>i.id===id);
    if(item) item.qty++; else cart.push({...prod, qty:1});
    save();
  }
  function save(){
    localStorage.setItem('cart', JSON.stringify(cart));
    let totalQty = cart.reduce((s,i)=>s+i.qty,0);
    let totalPrice = cart.reduce((s,i)=>s+i.price*i.qty,0);
    if(count) count.textContent = totalQty;
    if(drawerCount) drawerCount.textContent = totalQty;
    if(total) total.textContent = '$'+totalPrice;
    if(itemsDiv){
      itemsDiv.innerHTML = cart.length ? cart.map(i=>`
        <div class="flex gap-3 mb-4 border-b pb-3">
          <img src="${i.image}" alt="${i.name}" class="w-16 h-16 rounded object-cover">
          <div class="flex-1"><p class="text-sm font-bold">${i.name}</p><p class="text-xs">$${i.price} x ${i.qty}</p>
          <button data-id="${i.id}" class="remove-btn text-red-500 text-xs">Remove</button></div>
        </div>`).join('') : '<p class="text-gray-400 text-center">Cart empty</p>';
      itemsDiv.querySelectorAll('.remove-btn').forEach(b=>b.addEventListener('click',()=>{cart=cart.filter(x=>x.id!=b.dataset.id); save();}));
    }
  }
  function openCart(){drawer.classList.remove('translate-x-full'); overlay.classList.remove('hidden');}
  function closeCart(){drawer.classList.add('translate-x-full'); overlay.classList.add('hidden');}

  document.getElementById('cart-btn')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  document.addEventListener('keydown', e=>{if(e.key==='Escape') closeCart();});
  document.getElementById('checkout-btn')?.addEventListener('click', ()=>{alert('Order placed - Total: '+total.textContent); cart=[]; save(); closeCart();});

  document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>{
      b.classList.remove('bg-black','text-white','active');
      b.classList.add('bg-white','border','text-gray-600'); // <-- ADD THIS
    });
    btn.classList.remove('bg-white','border','text-gray-600'); // <-- ADD THIS
    btn.classList.add('bg-black','text-white','active');
    currentFilter = btn.dataset.filter;
    renderGrid();
  });
});
  

  // FAQ Accordion
  document.querySelectorAll('.faq-btn').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const content = btn.nextElementSibling;
      content.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', !content.classList.contains('hidden'));
    });
  });

  renderGrid(); save();
});
