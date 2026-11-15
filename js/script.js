/* =====================================================
   SCRIPT · INSTITUTO AMÉRICA
   1 Menú móvil · 2 Sección activa · 3 Barra de progreso
   4 Aparecer al hacer scroll · 5 Botón "subir"
   ===================================================== */

const lista   = document.querySelector('.menu ul');
const enlaces = document.querySelectorAll('.menu a.enlace');

/* 1. Menú móvil: abre y cierra con el botón ☰ */
document.querySelector('.boton-menu').addEventListener('click', () => {
  lista.classList.toggle('abierto');
});
enlaces.forEach(a => a.addEventListener('click', () => lista.classList.remove('abierto')));

/* 2. Marca en el menú la sección que estás viendo */
const observadorMenu = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) {
      enlaces.forEach(a => a.classList.toggle('activo', a.getAttribute('href') === '#' + e.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section').forEach(s => observadorMenu.observe(s));

/* 3 y 5. Barra de progreso y botón de subir */
const barra = document.querySelector('.progreso');
const subir = document.querySelector('.subir');
window.addEventListener('scroll', () => {
  const total = document.documentElement.scrollHeight - window.innerHeight;
  barra.style.width = (window.scrollY / total * 100) + '%';
  subir.classList.toggle('visible', window.scrollY > 400);
});
subir.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

/* 4. Los elementos con clase "aparece" se muestran al llegar a ellos */
const observadorAparecer = new IntersectionObserver(entradas => {
  entradas.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observadorAparecer.unobserve(e.target); }
  });
}, { threshold: .15 });
document.querySelectorAll('.aparece').forEach(el => observadorAparecer.observe(el));
