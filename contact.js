let cart = JSON.parse(localStorage.getItem('cart')) || [];
document.addEventListener('DOMContentLoaded', ()=>{
const count = document.getElementById('cart-count');
const drawerCount = document.getElementById('drawer-count');
const total = document.getElementById('cart-total');
const itemsDiv = document.getElementById('cart-items');
const drawer = document.getElementById('cart-drawer');
const overlay = document.getElementById('cart-overlay');

function save(){
    localStorage.setItem('cart', JSON.stringify(cart));
    let qty = cart.reduce((s,i)=>s+i.qty,0);
    let price = cart.reduce((s,i)=>s+i.price*i.qty,0);
    if(count) count.textContent=qty; 
    if(drawerCount) drawerCount.textContent=qty; 
    if(total) total.textContent='$'+price;
    if(itemsDiv){
      itemsDiv.innerHTML = cart.length ? cart.map(i=>`<div class="flex gap-3 mb-3 border-b pb-3"><img src="${i.image}" alt="${i.name}" class="w-12 h-12 rounded object-cover"><div><p class="text-sm font-bold">${i.name}</p><p class="text-xs">$${i.price} x ${i.qty}</p></div></div>`).join('') : '<p class="text-gray-400 text-center">Cart empty</p>';
    }
  }
  function openCart(){ if(drawer) drawer.classList.remove('translate-x-full'); if(overlay) overlay.classList.remove('hidden');}
  function closeCart(){ if(drawer) drawer.classList.add('translate-x-full'); if(overlay) overlay.classList.add('hidden');}
  
  document.getElementById('cart-btn')?.addEventListener('click', openCart);
  document.getElementById('close-cart')?.addEventListener('click', closeCart);
  overlay?.addEventListener('click', closeCart);
  save();

  // Form validation - REQUIRED 3.3 - only runs on contact page
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = document.getElementById('user-name');
      const email = document.getElementById('user-email');
      const nameError = document.getElementById('name-error');
      const emailError = document.getElementById('email-error');
      const banner = document.getElementById('form-success-banner');
      let valid = true;
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      
      nameError?.classList.add('hidden'); 
      emailError?.classList.add('hidden'); 
      banner?.classList.add('hidden');
      name?.classList.remove('border-red-500'); 
      email?.classList.remove('border-red-500');

      if(name.value.trim().length < 2){ 
        nameError.textContent='Name must be at least 2 characters'; 
        nameError.classList.remove('hidden'); 
        name.classList.add('border-red-500'); 
        valid=false; 
      }
      if(!re.test(email.value.trim())){ 
        emailError.textContent='Enter valid email e.g. cihe@student.com'; 
        emailError.classList.remove('hidden'); 
        email.classList.add('border-red-500'); 
        valid=false; 
      }

      if(valid){
        banner.textContent='Thank you! Message sent successfully.';
        banner.className='mb-4 p-4 bg-green-50 border border-green-200 rounded-xl text-green-800 text-center';
        banner.classList.remove('hidden');
        form.reset();
        setTimeout(()=>banner.classList.add('hidden'),4000);
      }
    });
  }
});
