const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");

let lastFocused = null;

function openLightbox(src, alt = "") {
  lastFocused = document.activeElement;

  lightboxImg.src = src;
  lightboxImg.alt = alt;

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");

  document.documentElement.style.overflow = "hidden";

  const closeBtn = lightbox.querySelector("[data-close]");
  closeBtn?.focus();
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");

  lightboxImg.src = "";
  lightboxImg.alt = "";

  document.documentElement.style.overflow = "";

  lastFocused?.focus?.();
}

if (gallery) {
  gallery.addEventListener("click", (e) => {
    const card = e.target.closest(".card");
    if (!card) return;

    const full = card.dataset.full || card.querySelector("img")?.src;
    const img = card.querySelector("img");
    openLightbox(full, img?.alt || "");
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (
      e.target.closest("[data-close]") ||
      e.target.hasAttribute("data-close")
    ) {
      closeLightbox();
    }
  });
}

if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target.classList.contains("lightbox__backdrop")) closeLightbox();
  });
}

document.addEventListener("keydown", (e) => {
  if (
    e.key === "Escape" &&
    lightbox &&
    lightbox.classList.contains("is-open")
  ) {
    closeLightbox();
  }
});

// Email obfuscation to protect from spam bots
(function protectEmails() {
  // Obfuscated email (base64 encoded: "noty0urmuse@proton.me")
  const encodedEmail = "bm90eTB1cm11c0Bwcm90b24ubWU=";

  // Decode base64
  const decodeEmail = (encoded) => {
    try {
      return atob(encoded);
    } catch (e) {
      return "";
    }
  };

  const email = decodeEmail(encodedEmail);

  if (!email) {
    return;
  }

  // Find all elements that need email protection
  const emailElements = document.querySelectorAll("[data-email]");

  emailElements.forEach((element) => {
    const isIcon = element.classList.contains("email-icon");
    const mailtoLink = `mailto:${email}`;

    if (isIcon) {
      // For icons, update the href and keep the SVG
      const svg = element.querySelector("svg");
      element.setAttribute("href", mailtoLink);
      element.setAttribute("aria-label", `Email: ${email}`);
    } else {
      // For text links, create the full link
      const link = document.createElement("a");
      link.href = mailtoLink;
      link.textContent = email;
      link.setAttribute("rel", "noopener noreferrer");
      element.appendChild(link);
    }
  });
})();
