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

const siteVideos = Array.from(document.querySelectorAll("video"));

const markVideoState = (video, isPlaying) => {
  video.classList.toggle("video-ready", isPlaying);
  video.classList.toggle("video-waiting", !isPlaying);
  video.closest(".work-item, .portrait-frame, .cinema-strip")?.classList.toggle("video-needs-play", !isPlaying);
};

const prepareVideos = () => {
  siteVideos.forEach((video) => {
    video.muted = true;
    video.defaultMuted = true;
    video.loop = true;
    video.playsInline = true;
    video.setAttribute("muted", "");
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");
    video.setAttribute("x5-playsinline", "");
    video.setAttribute("x5-video-player-type", "h5");
    video.setAttribute("x5-video-player-fullscreen", "false");

    video.addEventListener("playing", () => markVideoState(video, true));
    video.addEventListener("pause", () => markVideoState(video, false));
  });
};

const playVideos = () => {
  siteVideos.forEach((video) => {
    const attempt = video.play();

    if (attempt && typeof attempt.catch === "function") {
      attempt
        .then(() => markVideoState(video, true))
        .catch(() => markVideoState(video, false));
    }
  });
};

prepareVideos();

window.addEventListener("DOMContentLoaded", () => {
  window.setTimeout(playVideos, 80);
  window.setTimeout(playVideos, 700);
});

window.addEventListener("load", () => {
  window.setTimeout(playVideos, 120);
  window.setTimeout(playVideos, 1200);
});

document.addEventListener("WeixinJSBridgeReady", playVideos, false);
document.addEventListener("touchstart", playVideos, { once: true, passive: true });
document.addEventListener("click", playVideos, { once: true });

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
