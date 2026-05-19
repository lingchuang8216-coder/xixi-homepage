const revealItems = document.querySelectorAll("[data-reveal]");

let revealObserver;

if ("IntersectionObserver" in window) {
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
}

revealItems.forEach((item) => {
  const rect = item.getBoundingClientRect();

  if (!revealObserver || (rect.top < window.innerHeight * 0.95 && rect.bottom > 0)) {
    item.classList.add("is-visible");
    return;
  }

  revealObserver.observe(item);
});

document.querySelectorAll("[data-copy]").forEach((button) => {
  button.addEventListener("click", async () => {
    const text = button.getAttribute("data-copy");
    const original = button.textContent;

    try {
      await navigator.clipboard.writeText(text);
      button.textContent = "已复制";
    } catch {
      button.textContent = text;
    }

    window.setTimeout(() => {
      button.textContent = original;
    }, 1600);
  });
});

const alignHashTarget = () => {
  if (!window.location.hash) return;

  const target = document.querySelector(window.location.hash);
  if (!target) return;

  target.scrollIntoView({ block: "start" });
};

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(alignHashTarget, 80);
  window.setTimeout(alignHashTarget, 500);
});

window.addEventListener("load", () => {
  window.setTimeout(alignHashTarget, 80);
  window.setTimeout(alignHashTarget, 700);
});

window.addEventListener("hashchange", () => {
  window.setTimeout(alignHashTarget, 80);
  window.setTimeout(alignHashTarget, 500);
});
