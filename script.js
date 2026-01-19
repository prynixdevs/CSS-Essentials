// Theme Toggle System
(function initTheme() {
  const themeToggle = document.querySelector('.theme-toggle');
  const html = document.documentElement;
  const lightIcon = document.querySelector('.theme-icon-light');
  const darkIcon = document.querySelector('.theme-icon-dark');
  
  // Get saved theme or use system preference
  const getSavedTheme = () => localStorage.getItem('theme');
  const getSystemTheme = () => window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  
  // Apply theme
  const applyTheme = (theme) => {
    if (theme === 'dark') {
      html.setAttribute('data-theme', 'dark');
      lightIcon.style.display = 'none';
      darkIcon.style.display = 'block';
    } else {
      html.setAttribute('data-theme', 'light');
      lightIcon.style.display = 'block';
      darkIcon.style.display = 'none';
    }
    localStorage.setItem('theme', theme);
  };
  
  // Initialize theme without transition on first load
  html.classList.add('no-transition');
  const savedTheme = getSavedTheme();
  const initialTheme = savedTheme || getSystemTheme();
  applyTheme(initialTheme);
  
  // Re-enable transitions after initial load
  requestAnimationFrame(() => {
    html.classList.remove('no-transition');
  });
  
  // Theme toggle button handler
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = html.getAttribute('data-theme') || getSystemTheme();
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }
  
  // Listen to system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!getSavedTheme()) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });
})();

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }

    const navbar = document.querySelector(".navbar");
    const toggle = navbar?.querySelector(".nav-toggle");
    if (navbar?.classList.contains("menu-open")) {
      navbar.classList.remove("menu-open");
      toggle?.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    }
  });
});

(function setupNavbar() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  const toggle = navbar.querySelector(".nav-toggle");
  const links = navbar.querySelector(".nav-links");
  const dropdown = navbar.querySelector(".nav-dropdown");
  const dropdownToggle = dropdown?.querySelector(".nav-dropdown-toggle");

  const isMobile = () => window.matchMedia("(max-width: 768px)").matches;

  const closeDropdown = () => {
    if (!dropdown) return;
    dropdown.classList.remove("open");
    dropdownToggle?.setAttribute("aria-expanded", "false");
  };

  const closeMenu = () => {
    navbar.classList.remove("menu-open");
    toggle?.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";

    closeDropdown();
  };

  const openMenu = () => {
    navbar.classList.add("menu-open");
    toggle?.setAttribute("aria-expanded", "true");
    document.body.style.overflow = "hidden";
  };

  toggle?.addEventListener("click", () => {
    if (!isMobile()) return;
    if (navbar.classList.contains("menu-open")) closeMenu();
    else openMenu();
  });

  dropdownToggle?.addEventListener("click", () => {
    if (!dropdown) return;
    const isOpen = dropdown.classList.toggle("open");
    dropdownToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  document.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (dropdown?.classList.contains("open") && !dropdown.contains(target)) {
      closeDropdown();
    }

    if (navbar.classList.contains("menu-open") && !navbar.contains(target)) {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeMenu();
  });

  window.addEventListener("resize", () => {
    if (!isMobile()) closeMenu();
  });

  links?.addEventListener("click", (e) => {
    const target = e.target;
    if (!(target instanceof HTMLElement)) return;

    if (target.closest(".nav-dropdown-menu a")) closeDropdown();

    if (isMobile() && target.closest("a")) closeMenu();
  });
})();

const demoButton = document.querySelector(".demo-button");
if (demoButton) {
  demoButton.addEventListener("click", () => {
    demoButton.textContent = "Clicked!";
    setTimeout(() => {
      demoButton.textContent = "Hover Over Me";
    }, 1000);
  });
}

function copyCode(button) {
  const codeBlock = button.parentElement.querySelector("code");
  const code = codeBlock.textContent;

  navigator.clipboard.writeText(code).then(() => {
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
      Copied!
    `;
    button.classList.add("copied");

    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove("copied");
    }, 2000);
  });
}
