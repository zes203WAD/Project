document.addEventListener('DOMContentLoaded', () => {
    
  const form = document.getElementById('contact-form');
  
  if (!form) return;

  
  form.addEventListener('submit', (e) => {
  
    e.preventDefault();
        
    
    const nameInput = document.getElementById('user-name');
    
    const emailInput = document.getElementById('user-email');
    
    const nameError = document.getElementById('name-error');
    
    const emailError = document.getElementById('email-error');
    
    const successBanner = document.getElementById('form-success-banner');

    
    let isValid = true;
    
    const emailRegEx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    
    
    nameError.classList.add('hidden');
    
    emailError.classList.add('hidden');
    
    successBanner.classList.add('hidden');

    
    
    if (nameInput.value.trim().length < 2) {
    
      nameError.textContent = "Full name must be at least 2 characters long.";
      
      nameError.classList.remove('hidden');
            isValid = false;
        }

   
    if (!emailRegEx.test(emailInput.value.trim())) {
    
      emailError.textContent = "Please enter a valid email address structure.";
      
      emailError.classList.remove('hidden');
      
      isValid = false;
      
    }

    
    if (isValid) {
    
      successBanner.textContent = "Thank you! Your validation telemetry payload has been dispatched.";
      
      successBanner.classList.remove('hidden');
      
      form.reset();
      
    }
    
  });
});
