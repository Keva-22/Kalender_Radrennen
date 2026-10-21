/* Logo Roadbooku: silniční kolo jednou čarou v barvě textu. Stejná kresba
   je ve faviconu (public/favicon.svg), tam žlutě na tmavomodrém čtverci. */
export function Logo() {
  return (
    <svg
      className="logo"
      viewBox="3 6 26 21"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="8.5" cy="20.5" r="5.3" />
      <circle cx="23.5" cy="20.5" r="5.3" />
      <path d="M8.5 20.5 12.5 11.5H21l2.5 9M8.5 20.5H15l-2.5-9M15 20.5 21 11.5M21 11.5 21.4 9h2.1a1.6 1.6 0 0 1 0 3.2M10.6 9.2h3.8" />
    </svg>
  );
}
