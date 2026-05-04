export const LANG_ENUM = {
  NL: "nl",
  EN: "en",
};

/**
 * Get the language from the pathname
 * @param {*} pathname
 * @returns
 */
export const getLangFromPathname = (pathname) => {
  const lang = pathname.includes(LANG_ENUM.NL) ? LANG_ENUM.NL : LANG_ENUM.EN;
  return lang;
};
