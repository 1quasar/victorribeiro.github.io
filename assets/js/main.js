/**
 * main.js - Comportamentos, Efeito Typewriter, Menu Mobile e Animação de Fundo
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypewriter();
  initMobileMenu();
  initBackToTop();
  initBackgroundCanvas();
  initSmoothScroll();
});

/**
 * Efeito de Máquina de Escrever no Hero
 */
function initTypewriter() {
  const element = document.getElementById('typewriter');
  if (!element) return;

  const words = [
    'Desenvolvedor de Sistemas',
    'PHP & Laravel',
    'Java & Spring Boot Enthusiast',
    'Python & APIs Enthusiast',
    'MySQL & Database Design',
    'Linux Mint & Git Workflow'
  ];

  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 90;
  const deletingSpeed = 45;
  const delayBetweenWords = 1800;

  function type() {
    const currentWord = words[wordIndex];

    if (isDeleting) {
      element.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      element.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let delay = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentWord.length) {
      delay = delayBetweenWords;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      delay = 400;
    }

    setTimeout(type, delay);
  }

  type();
}

/**
 * Menu Mobile Hamburguer
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

/**
 * Botão Voltar ao Topo
 */
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      btn.classList.remove('opacity-0', 'pointer-events-none');
      btn.classList.add('opacity-100', 'pointer-events-auto');
    } else {
      btn.classList.add('opacity-0', 'pointer-events-none');
      btn.classList.remove('opacity-100', 'pointer-events-auto');
    }
  });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/**
 * Scroll Suave para Âncoras
 */
function initSmoothScroll() {
  const links = document.querySelectorAll('a[href^="#"]');
  links.forEach((link) => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
}

/**
 * Background Canvas: Linhas de código e scripts flutuantes e discretos
 */
function initBackgroundCanvas() {
  const canvas = document.getElementById('bg-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Trechos de scripts técnicos reais
  const codeSnippets = [
    'Route::get("/api/v1/services", [ServiceController::class, "index"]);',
    '@SpringBootApplication public class Application { ... }',
    'SELECT u.id, u.name, r.role FROM users u JOIN roles r ON u.role_id = r.id;',
    'git checkout -b feature/kernel-service origin/main',
    'if ($response->status() === 200) { return response()->json($data); }',
    '@Autowired private UserRepository userRepository;',
    'curl -X POST https://api.workspace.internal/v1/auth -H "Authorization: Bearer"',
    'public function store(Request $request): JsonResponse',
    'systemctl status nginx.service --no-pager',
    'CREATE TRIGGER trg_after_update AFTER UPDATE ON orders FOR EACH ROW',
    'ResponseEntity.ok().body(new ApiResponse<>(HttpStatus.OK, data));',
    'docker compose up -d --build postgres redis web'
  ];

  // Criação dos elementos de código distribuídos pela tela
  const columnCount = Math.floor(width / 180);
  const streams = [];

  for (let i = 0; i < columnCount; i++) {
    streams.push({
      x: i * 190 + (Math.random() * 40),
      y: Math.random() * height,
      speed: 0.35 + Math.random() * 0.45,
      text: codeSnippets[Math.floor(Math.random() * codeSnippets.length)],
      opacity: 0.10 + Math.random() * 0.05 // Opacidade ultra-discreta para não ofuscar o conteúdo
    });
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    ctx.font = '11px "JetBrains Mono", monospace';

    for (let i = 0; i < streams.length; i++) {
      const s = streams[i];

      // Cor verde com alpha bem baixo e legibilidade sutil
      ctx.fillStyle = `rgba(16, 185, 129, ${s.opacity})`;
      ctx.fillText(s.text, s.x, s.y);

      s.y += s.speed;

      // Quando passa do fim da página, recicla com um novo snippet
      if (s.y > height + 50) {
        s.y = -20;
        s.x = (i * 190) + (Math.random() * 30);
        s.text = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
        s.opacity = 0.035 + Math.random() * 0.045;
      }
    }

    requestAnimationFrame(render);
  }

  render();
}