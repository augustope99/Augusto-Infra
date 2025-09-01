// Typing effect for title
const typedEl = document.getElementById('typed');
const cursorEl = document.querySelector('.cursor');
const roles = [
  'Augusto Pereira Emiliano',
  'Analista de Suporte Técnico N1',
  'Automação • MDM • 365 • Jira'
];
let roleIndex = 0;
let charIndex = 0;
let deleting = false;
let pause = 0;

function typeLoop(){
  const current = roles[roleIndex];
  if(pause > 0){ pause--; return; }

  if(!deleting){
    typedEl.textContent = current.slice(0, ++charIndex);
    if(charIndex === current.length){
      deleting = true;
      pause = 30;
    }
  } else {
    typedEl.textContent = current.slice(0, --charIndex);
    if(charIndex === 0){
      deleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
}
setInterval(typeLoop, 60);
setInterval(()=> cursorEl.classList.toggle('hidden'), 500);

// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Reveal on Scroll
const observer = new IntersectionObserver((entries)=>{
  entries.forEach((e)=>{
    if(e.isIntersecting){ e.target.classList.add('show'); }
  });
}, { threshold: .14 });

document.querySelectorAll('.reveal, .skill-card, .project-card, .gallery figure, .contact-card')
  .forEach(el => observer.observe(el));

// Modal helpers
function openModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.setAttribute('aria-hidden','false');
}
function closeModal(id){
  const m = document.getElementById(id);
  if(!m) return;
  m.setAttribute('aria-hidden','true');
}
window.openModal = openModal;
window.closeModal = closeModal;

// Matrix Rain Effect
function createMatrix(){
  const matrix = document.getElementById('matrix');
  const chars = '01';
  const virusChars = 'VIRUS ERROR HACK BREACH INFECTED MALWARE TROJAN';
  const columns = Math.floor(window.innerWidth / 18);
  
  for(let i = 0; i < columns; i++){
    const column = document.createElement('div');
    const isGlitch = Math.random() < 0.15;
    const isVirus = Math.random() < 0.08;
    
    if(isVirus){
      column.className = 'matrix-column virus';
      column.style.color = '#ff4444';
    } else if(isGlitch){
      column.className = 'matrix-column glitch';
      column.style.color = '#ff0040';
    } else {
      column.className = 'matrix-column';
      column.style.color = Math.random() < 0.3 ? '#00ff41' : '#2ed3b7';
    }
    
    column.style.left = i * 18 + 'px';
    column.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
    column.style.animationDelay = Math.random() * 3 + 's';
    
    let text = '';
    const length = Math.floor(Math.random() * 15 + 10);
    for(let j = 0; j < length; j++){
      if(isVirus && Math.random() < 0.4){
        const virusWords = virusChars.split(' ');
        text += virusWords[Math.floor(Math.random() * virusWords.length)] + '<br>';
      } else {
        text += chars[Math.floor(Math.random() * chars.length)] + '<br>';
      }
    }
    column.innerHTML = text;
    matrix.appendChild(column);
  }
  
  // Random glitch effects
  setInterval(() => {
    const columns = document.querySelectorAll('.matrix-column');
    const randomColumn = columns[Math.floor(Math.random() * columns.length)];
    if(randomColumn && Math.random() < 0.1){
      randomColumn.classList.add('glitch');
      setTimeout(() => randomColumn.classList.remove('glitch'), 200);
    }
  }, 500);
}

createMatrix();
window.addEventListener('resize', () => {
  document.getElementById('matrix').innerHTML = '';
  createMatrix();
});
