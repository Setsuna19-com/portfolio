// ── CURSOR ──
const cursor = document.getElementById('cursor');
const ring   = document.getElementById('cursorRing');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => { 
    mx=e.clientX; 
    my=e.clientY; 
});

(function animCursor(){
  cursor.style.left=mx+'px'; cursor.style.top=my+'px';
  rx += (mx-rx)*0.12; ry += (my-ry)*0.12;
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  requestAnimationFrame(animCursor);
})();

document.querySelectorAll('a,button,.project-card,.skill-category,.stat-box').forEach(el=>{
  el.addEventListener('mouseenter',()=>{ 
      ring.style.width='56px'; 
      ring.style.height='56px'; 
      ring.style.opacity='0.8'; 
  });
  el.addEventListener('mouseleave',()=>{ 
      ring.style.width='36px'; 
      ring.style.height='36px'; 
      ring.style.opacity='0.5'; 
  });
});

// ── THEME TOGGLE ──
const html      = document.documentElement;
const themeBtn  = document.getElementById('themeToggle');
let isDark = true;

themeBtn.addEventListener('click', ()=>{
  isDark = !isDark;
  html.setAttribute('data-theme', isDark ? 'dark' : 'light');
  themeBtn.textContent = isDark ? '☀' : '🌙';
});

// ── HAMBURGER / MOBILE MENU ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
let menuOpen = false;

function toggleMenu(force){
  menuOpen = force !== undefined ? force : !menuOpen;
  hamburger.classList.toggle('open', menuOpen);
  if(menuOpen){
    mobileMenu.style.display='flex';
    requestAnimationFrame(()=> mobileMenu.classList.add('open'));
  } else {
    mobileMenu.classList.remove('open');
    setTimeout(()=>{ mobileMenu.style.display='none'; }, 300);
  }
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}

hamburger.addEventListener('click', ()=> toggleMenu());
document.querySelectorAll('.mobile-nav-link, .mobile-resume-btn').forEach(l=>{
  l.addEventListener('click', ()=> toggleMenu(false));
});

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries=>{
  entries.forEach((e,i)=>{
    if(e.isIntersecting) setTimeout(()=> e.target.classList.add('visible'), i*60);
  });
}, {threshold:0.1});

document.querySelectorAll('.reveal').forEach(el=> observer.observe(el));

// ── NAV SHRINK ──
window.addEventListener('scroll', ()=>{
  const nav = document.getElementById('navbar');
  const mobile = window.innerWidth <= 900;
  nav.style.padding = window.scrollY > 50
    ? (mobile ? '0.6rem 1.5rem' : '0.8rem 4rem')
    : (mobile ? '1rem 1.5rem'   : '1.2rem 4rem');
});

// ── CONTACT FORM ──
document.getElementById('submitBtn').addEventListener('click', ()=>{
  const name  = document.getElementById('fname').value.trim();
  const email = document.getElementById('femail').value.trim();
  const msg   = document.getElementById('fmsg').value.trim();
  
  if(!name||!email||!msg){ 
      alert('Please fill in all fields.'); 
      return; 
  }
  
  const toast = document.getElementById('toast');
  toast.classList.add('show');
  
  document.getElementById('fname').value='';
  document.getElementById('femail').value='';
  document.getElementById('fmsg').value='';
  
  setTimeout(()=> toast.classList.remove('show'), 4000);
});