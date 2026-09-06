const products = [
  {id:1, name:"Leather Tote - Tan", price:450, category:"tote", image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400"},
  {id:2, name:"Quilted Chain Crossbody", price:895, category:"crossbody", image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400"},
  {id:3, name:"GG Marmont Mini - Black", price:1290, category:"crossbody", image:"https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400"},
  {id:4, name:"Marmont Shoulder Bag", price:1590, category:"shoulder", image:"https://images.unsplash.com/photo-1559563458-527698bf5295?w=400"},
  {id:5, name:"Mini Velvet Clutch", price:320, category:"clutch", image:"https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=400"},
  {id:6, name:"Structured Tote - Black", price:520, category:"tote", image:"https://images.unsplash.com/photo-1591561954557-26941169b49e?w=400"},
  {id:7, name:"Chain Shoulder Bag", price:980, category:"shoulder", image:"https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=400"},
  {id:8, name:"GG Clutch With Chain", price:750, category:"clutch", image:"https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=400"}
];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentFilter = 'all';

document.addEventListener('DOMContentLoaded', ()=>{
  const grid = document.getElementById('product-grid');
  const count = document.getElementById('cart-count');
  const drawerCount = document.getElementById('drawer-count');
  const total = document.getElementById('cart-total');
  const itemsDiv = document.getElementById('cart-items');
  const drawer = document.getElementById('cart-drawer');
  const overlay = document.getElementById('cart-overlay');

  function render(){
    let list = currentFilter==='all' ? products : products.filter(p=>p.category===currentFilter);
    grid.innerHTML = list.map(p=>`
      <article class="bg-white rounded-xl shadow p-4 flex flex-col">
        <img src="${p.image}" alt="${p.name} - ${p.category} luxury bag image" class="h-48 w-full object-cover rounded-lg mb-3">
        <h3 class="font-bold text-sm">${p.name}</h3>
        <p class="text-xs text-gray-500 capitalize">${p.category}</p>
        <div class="product-actions mt-auto pt-4">
          <span class="font-bold">$${p.price}</span>
          <button data-id="${p.id}" class="add-btn bg-black text-white px-4 py-2 rounded-lg text-xs">Add to Cart</button>
        </div>
      </article>`).join('');
    grid.querySelectorAll('.add-btn').forEach(b=>b.addEventListener('click',()=>{let id=parseInt(b.dataset.id); let prod=products.find(x=>x.id===id); let it=cart.find(x=>x.id===id); if(it) it.qty++; else cart.push({...prod,qty:1}); save(); openCart();}));
  }

  function save(){
    localStorage.setItem('cart', JSON.stringify(cart));
    let qty = cart.reduce((s,i)=>s+i.qty,0);
    let price = cart.reduce((s,i)=>s+i.price*i.qty,0);
    count.textContent=qty; drawerCount.textContent=qty; total.textContent='$'+price;
    itemsDiv.innerHTML = cart.length ? 
        cart.map(i=>`<div class="flex gap-3 mb-4 border-b pb-3"><img src="${i.image}" alt="${i.name}" class="w-16 h-16 rounded object-cover">
        <div class="flex-1"><p class="text-sm font-bold">${i.name}</p>
        <p class="text-xs">$${i.price} x ${i.qty}</p>
        <div class="flex gap-2 mt-1"><button data-id="${i.id}" class="dec border px-2 rounded">-</button>
        <span class="text-xs">${i.qty}</span>
        <button data-id="${i.id}" class="inc border px-2 rounded">+</button>
        <button data-id="${i.id}" class="rem text-red-500 text-xs ml-2">Remove</button></div></div></div>`).join('') : 
        '<p class="text-gray-400 text-center">Cart empty</p>';
    itemsDiv.querySelectorAll('.inc').forEach(b=>b.addEventListener('click',()=>{let it=cart.find(x=>x.id==b.dataset.id); it.qty++; save();}));
    itemsDiv.querySelectorAll('.dec').forEach(b=>b.addEventListener('click',()=>{let it=cart.find(x=>x.id==b.dataset.id); it.qty--; 
     if(it.qty<=0) cart=cart.filter(x=>x.id!=b.dataset.id);
     save();}));
    itemsDiv.querySelectorAll('.rem').forEach(b=>b.addEventListener('click',()=>{cart=cart.filter(x=>x.id!=b.dataset.id); save();}));
  }

  function openCart(){drawer.classList.remove('translate-x-full'); overlay.classList.remove('hidden');}
  function closeCart(){drawer.classList.add('translate-x-full'); overlay.classList.add('hidden');}
  document.getElementById('cart-btn').addEventListener('click', openCart);
  document.getElementById('close-cart').addEventListener('click', closeCart);
  overlay.addEventListener('click', closeCart);
  document.getElementById('checkout-btn').addEventListener('click', ()=>{if(!cart.length) return alert('Cart empty');
        alert('Order placed! Total '+total.textContent); 
         cart=[]; save(); closeCart();});

 document.querySelectorAll('.filter-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.filter-btn').forEach(b=>{
      b.classList.remove('bg-black','text-white');
      b.classList.add('bg-white','border');
    });
    btn.classList.remove('bg-white','border');
    btn.classList.add('bg-black','text-white');
    currentFilter=btn.dataset.filter;
    render();
  });
});
  render(); save();
});
