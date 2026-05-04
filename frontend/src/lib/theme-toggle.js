import { atom } from "nanostores";

/**
 * Persist theme so SSR and client navigation share the same value.
 * @param {"dark" | "light"} theme
 * @returns {void}
 */
function persistTheme(theme) {
  try {
    localStorage.setItem("theme", theme);
  } catch {}
  document.cookie =
    "theme=" + theme + "; Path=/; Max-Age=31536000; SameSite=Lax";
}

export function initThemeToggle(buttonId = "theme-toggle") {
  const root = document.documentElement;
  const toggle = document.getElementById(buttonId);
  if (!toggle) return;

  const sun = toggle.querySelector('[data-theme-icon="sun"]');
  const moon = toggle.querySelector('[data-theme-icon="moon"]');
  let initialTheme = root.classList.contains("dark") ? "dark" : "light";
  try {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark" || savedTheme === "light") {
      initialTheme = savedTheme;
    } else {
      initialTheme = window.matchMedia("(prefers-color-scheme: light)").matches
        ? "light"
        : "dark";
    }
  } catch {}
  const store = atom(initialTheme);

  const applyUi = (theme) => {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    toggle.setAttribute(
      "aria-label",
      isDark ? "Schakel naar lichte modus" : "Schakel naar donkere modus",
    );
    sun?.classList.toggle("hidden", !isDark);
    moon?.classList.toggle("hidden", isDark);
  };

  const setTheme = (theme, persist = true) => {
    store.set(theme);
    applyUi(theme);
    if (!persist) return;
    persistTheme(theme);
  };

  setTheme(store.get(), false);

  toggle.addEventListener("click", () => {
    setTheme(store.get() === "dark" ? "light" : "dark");
  });

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  const onSystemThemeChange = (event) => {
    try {
      if (localStorage.getItem("theme")) return;
    } catch {}
    setTheme(event.matches ? "light" : "dark", false);
  };

  mediaQuery.addEventListener("change", onSystemThemeChange);
}
