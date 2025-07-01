/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu Show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu Hide */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SCROLL ANIMATIONS ===============*/
/* --- Sélection des éléments --- */
const pyramid = document.getElementById("pyramid");
const stone = document.getElementById("stone");
const man = document.getElementById("man");
const title = document.getElementById("title");

/* --- Constantes de base --- */
const DESIGN_WIDTH = 1440;
const TITLE_SPEED_DESKTOP = 2;
const TITLE_SPEED_MOBILE = 1.2;

/* --- Offsets de départ (px) en fonction de la largeur de l’écran --- */
function getBaseOffsets() {
  if (innerWidth <= 767) {
    /* Mobile */
    return { pyramid: -100, stone: -140, man: -125, title: -45 };
  }
  if (innerWidth <= 1023) {
    /* Tablette */
    return { pyramid: 0, stone: 0, man: 100, title: -20 };
  }
  /* Desktop */
  return { pyramid: 0, stone: 50, man: 175, title: 0 };
}

/* --- Valeurs dynamiques recalculées au resize --- */
let baseOffsets = getBaseOffsets();
let k = Math.min(1, innerWidth / DESIGN_WIDTH); // facteur d’échelle
let titleFactor = innerWidth <= 767 ? TITLE_SPEED_MOBILE : TITLE_SPEED_DESKTOP;

/* --- Fonction principale de mise à jour --- */
function updateParallax() {
  const y = scrollY;

  pyramid.style.right = `${baseOffsets.pyramid + y * 0.25 * k}px`;
  stone.style.right = `${baseOffsets.stone + y * 1 * k}px`;
  man.style.left = `${baseOffsets.man + y * 0.5 * k}px`;

  const dx = baseOffsets.title + y * titleFactor * k;

  title.style.transform = `translate(calc(-50% + ${dx}px), -50%)`;
}

/* --- Rendu fluide au scroll (RAF) --- */
let ticking = false;
function onScroll() {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
}

/* --- Recalcul complet au resize/orientation --- */
function recalc() {
  baseOffsets = getBaseOffsets();
  k = Math.min(1, innerWidth / DESIGN_WIDTH);
  titleFactor = innerWidth <= 767 ? TITLE_SPEED_MOBILE : TITLE_SPEED_DESKTOP;
  updateParallax();
}

/* --- Écouteurs --- */
addEventListener("scroll", onScroll);
addEventListener("resize", recalc);
addEventListener("orientationchange", () => setTimeout(recalc, 150));
document.addEventListener("DOMContentLoaded", recalc);
