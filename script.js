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
