# Project Royale Carry
A responsive e-commerce website build for Web Application Development Module  
Live Demo: https://zes203wad.github.io/Project/contact.html
Responsive prototype of a high-end handbag online retailer. This is an HTML, CSS, Tailwind and vanilla JS app built.

### What I Built
ROYALE CARRY has 3 pages - Home, Shop and Contact. Used header/footer on all pages. It has product filtering, search, cart drawer and contact form with validation.

### Tech Used
- HTML5, CSS3, Tailwind CSS
- Vanilla JavaScript
- CSS Grid (4 cols desktop / 2 tablet / 1 mobile)
- Navbar, footer and filters using Flexbox
A localStorage object for the shopping cart (fake database).
- Deploy to GitHub Pages

### How Cart Works
Since it is not a database, I've used localStorage:
To store it, use `localStorage.setItem('cart', JSON.stringify(cart))` and to load it back use `JSON.parse(localStorage.getItem('cart'))`. When refreshing, cart maintains the same value. It is possible to view it in F12 > Application > Local Storage.

The issue I encountered and how I resolved it.
The first problem that I had was responsiveness. There were issues with the grid breaking on mobile and the header overflowing. I used `grid-cols-1 md:grid-cols-2 lg:grid-cols-4` to make the columns, added `flex-wrap` to header and added hamburger menu for mobile. Tested everything in the Chrome DevTools.

### Accessibility
All images have alt text, all semantic tags (header, nav, main, footer), all inputs are labelled, proper order of H1>H2>H3, added Escape to close cart, added aria-labels and aria-expanded to FAQ.

### How to Run
visit live: https://zes203WAD.github.io/Project/

### Author
Zeeshan Afzal - ICT203 - ROYALE, Copy 2026

