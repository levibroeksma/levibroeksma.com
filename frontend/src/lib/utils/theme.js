(() => {
  const root = document.documentElement;
  const cookieMatch = document.cookie.match(
    /(?:^|;\s*)theme=(dark|light)(?:;|$)/,
  );
  const cookieTheme = cookieMatch?.[1];
  let theme =
    cookieTheme === "dark" || cookieTheme === "light" ? cookieTheme : "light";

  if (!cookieTheme) {
    try {
      const savedTheme = localStorage.getItem("theme");
      if (savedTheme === "dark" || savedTheme === "light") {
        theme = savedTheme;
      } else {
        theme = window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light";
      }
    } catch {
      theme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    }
  }

  const isDark = theme === "dark";

  // Apply theme class immediately
  root.classList.toggle("dark", isDark);

  // Prevent first-paint flash before CSS fully loads
  root.style.colorScheme = isDark ? "dark" : "light";
  root.style.backgroundColor = isDark ? "hsl(222 30% 7%)" : "hsl(40 20% 98%)";
  root.style.color = isDark ? "hsl(40 25% 94%)" : "hsl(220 25% 12%)";

  try {
    localStorage.setItem("theme", theme);
  } catch {}
  document.cookie =
    "theme=" + theme + "; Path=/; Max-Age=31536000; SameSite=Lax";
})();
