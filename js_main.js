document.addEventListener('DOMContentLoaded', () => {

//mobile
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (mobileMenuBtn && mobileMenu) {
  mobileMenuBtn.addEventListener('click', () => {
  const isOpen = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
  mobileMenuBtn.setAttribute('aria-expanded', !isOpen);
    mobileMenu.classList.toggle('hidden');
 });
    }

    // dark/light mode
    const themeToggle = document.getElementById('theme-toggle');
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            document.documentElement.classList.toggle('dark');
            
            if (document.documentElement.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // accordion for index page
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
      
      header.addEventListener('click', () => {
      
        const content = header.nextElementSibling;
        
        const icon = header.querySelector('.icon');

        
        
        if (content) {
        
          content.classList.toggle('hidden');
          
        }
        
        if (icon) {
        
          icon.classList.toggle('rotate-180');
          
        }
        
      });
    });

    
  // cart count 
  
  const cartButtons = document.querySelectorAll('.add-to-cart');
  
  const cartCount = document.getElementById('cart-count');
  
  let count = 0;

  
  
  cartButtons.forEach(btn => {
  
    btn.addEventListener('click', () => {
    
      count++;
      
      if (cartCount) {
      
        cartCount.textContent = count;
        
      }
      
      btn.textContent = "Added!";
      
      setTimeout(() => {
      
        btn.textContent = "Add to Cart";
        
      }, 1000);
      
    });
    });
});
