// ---- RESOURCE FAIL TRACER (temporary) ----
// window.addEventListener(
// 	"error",
// 	function (e) {
// 	  const t = e.target;
// 	  if (!t) return;
  
// 	  // resource errors bubble niet; daarom capture=true
// 	  const tag = t.tagName;
  
// 	  // IMG / SCRIPT / LINK (CSS) / SOURCE etc.
// 	  if (tag === "IMG" || tag === "SCRIPT" || tag === "LINK" || tag === "SOURCE") {
// 		const url = t.src || t.href;
// 		console.log("[RESOURCE FAIL]", tag, url, t);
// 	  }
// 	},
// 	true
//   );
  
//   // Extra: ook fetch/XHR failures
//   (function () {
// 	const origFetch = window.fetch;
// 	if (origFetch) {
// 	  window.fetch = function (...args) {
// 		return origFetch.apply(this, args).catch((err) => {
// 		  console.log("[FETCH FAIL]", args[0], err);
// 		  throw err;
// 		});
// 	  };
// 	}
//   })();
  


(function ($) {
	function isMobile() {
	  return window.matchMedia("(max-width: 768px)").matches;
	}
  
	var $win = $(window);
	var $menu = $("#menu_container");
	var $trigger = $("#menu_trigger");
	var $links = $("#ss-links a");
	var triggerTop = 0;
  
	if (!$menu.length || !$trigger.length) return;
  
	function menuHeight() {
	  return $menu.outerHeight() || 0;
	}
  
	function recalc() {
	  // alleen meten als we mobile zijn
	  if (!isMobile()) return;
  
	  // trigger is in-flow -> altijd stabiele offset
	  triggerTop = $trigger.offset().top;
  
	  // optioneel: body padding correct zetten als menu boven plakt
	  document.documentElement.style.setProperty("--menuH", menuHeight() + "px");
	}
  
	function setState() {
	  if (!isMobile()) {
		$menu.removeClass("is-sticky");
		$("body").removeClass("has-sticky-menu");
		return;
	  }
  
	  var y = $win.scrollTop();
	  var shouldStick = y >= (triggerTop - 1);
  
	  $menu.toggleClass("is-sticky", shouldStick);
	//   $("body").toggleClass("has-sticky-menu", shouldStick);
	}
  
	// init
	$win.on("load", function () {
	  recalc();
	  setState();
	});
  
	$win.on("resize orientationchange", function () {
	  recalc();
	  setState();
	});
  
	$win.on("scroll", setState);
  
	// anchor clicks: scroll met correctie + force state
	$links.on("click", function (e) {
	  if (!isMobile()) return;
  
	  var href = $(this).attr("href");
	  if (!href || href.charAt(0) !== "#") return;
  
	  var $target = $(href);
	  if (!$target.length) return;
  
	  e.preventDefault();
  
	  recalc();
  
	  // als we naar secties springen: menu moet boven gaan “sticky-en”
	  // dus scroll rekening houdend met menuhoogte
	  var targetTop = $target.offset().top - menuHeight();
  
	  $("html, body").stop(true).animate(
		{ scrollTop: targetTop },
		350,
		function () {
		  // na animatie nogmaals forceren
		  recalc();
		  setState();
		}
	  );
  
	  if (history.replaceState) history.replaceState(null, "", href);
	  else window.location.hash = href;
	});
  })(jQuery);
  
  (function ($) {
	function setMobileHeights() {
	  if (!window.matchMedia("(max-width: 768px)").matches) return;
  
	  var menu = document.getElementById("menu_container");
	  var contact = document.querySelector("p.cunt");
  
	  if (menu) {
		document.documentElement.style.setProperty("--menuH", menu.getBoundingClientRect().height + "px");
	  }
	  if (contact) {
		document.documentElement.style.setProperty("--contactH", contact.getBoundingClientRect().height + "px");
	  }
	}
  
	window.addEventListener("load", setMobileHeights);
	window.addEventListener("resize", setMobileHeights);
	window.addEventListener("orientationchange", setMobileHeights);
  
	// extra: na fonts/iframes/layout shifts
	setTimeout(setMobileHeights, 0);
	setTimeout(setMobileHeights, 300);
  })(jQuery);

  (function () {
	// mobile only
	if (!window.matchMedia("(max-width: 768px)").matches) return;
  
	const body = document.body;
	const menu = document.getElementById("menu_container");
	if (!menu) return;
  
	let lastY = window.scrollY || 0;
	let ticking = false;
  
	const SHOW_AT_TOP = 80;     // bovenaan altijd zichtbaar
	const HIDE_AFTER = 140;     // pas verbergen na beetje scroll
	const DELTA = 6;            // kleine jitter negeren
  
	function update() {
	  const y = window.scrollY || 0;
  
	  const goingDown = y > lastY + DELTA;
	  const goingUp   = y < lastY - DELTA;
  
	  if (y <= SHOW_AT_TOP) {
		body.classList.remove("menu-hidden");
	  } else if (goingDown && y > HIDE_AFTER) {
		body.classList.add("menu-hidden");
	  } else if (goingUp) {
		body.classList.remove("menu-hidden");
	  }
  
	  lastY = y;
	  ticking = false;
	}
  
	window.addEventListener(
	  "scroll",
	  function () {
		if (!ticking) {
		  ticking = true;
		  requestAnimationFrame(update);
		}
	  },
	  { passive: true }
	);
  
	// als user ergens tapt / menu wil gebruiken: meteen tonen
	window.addEventListener("touchstart", () => body.classList.remove("menu-hidden"), { passive: true });
  
	// initial state
	update();
  })();
  
  $(function () {
	// jQuery Tools overlay init (button has rel="#petrol")
	var $trigger = $('button[rel="#petrol"]');
	if (!$trigger.length || !$.fn.overlay) return;
  
	$trigger.overlay({
	  mask: null, // jouw .apple_overlay is al de backdrop
	  onBeforeLoad: function () {
		$("body").addClass("overlay-open");
	  },
	  onClose: function () {
		$("body").removeClass("overlay-open");
	  }
	});
  
	// Zorg dat de X ook echt sluit + class opruimt
	$("#petrol .close").on("click", function (e) {
	  e.preventDefault();
	  var api = $("#petrol").data("overlay");
	  if (api) api.close();
	  $("body").removeClass("overlay-open");
	});
  });

// Tag the "Personal Note" row so we can style the connector on mobile
document.addEventListener("DOMContentLoaded", function () {
	const note = document.querySelector("h4.note");
	const row = note && note.closest(".ss-row");
	if (row) row.classList.add("note-connector");
  });

  (function () {
	function isMobile() {
	  return window.matchMedia("(max-width: 768px)").matches;
	}
  
	function fitPortfolio() {
	  if (!isMobile()) return;
  
	  var el = document.getElementById("portfolio");
	  if (!el) return;
  
	  // 1000px is jouw gallery breedte (CSS #portfolio)
	  var baseW = 1000;
	  var padding = 24; // wat ademruimte links/rechts
	  var available = Math.max(280, window.innerWidth - padding);
	  var scale = Math.min(1, available / baseW);
  
	  document.documentElement.style.setProperty("--portfolioScale", scale.toFixed(3));
	}
  
	window.addEventListener("load", fitPortfolio);
	window.addEventListener("resize", fitPortfolio);
	window.addEventListener("orientationchange", fitPortfolio);
	setTimeout(fitPortfolio, 0);
	setTimeout(fitPortfolio, 300);
  })();
  
  // Disable legacy "-hover.jpg" swap for Selected Works thumbs
document.addEventListener("DOMContentLoaded", function () {
	// Unbind legacy jQuery hover handlers from thumbs
	if (window.jQuery) {
	  jQuery("img.work-thumb, img.nohover").off("mouseover mouseout");
	}
  
	// Extra safety: stop the legacy handler in capture phase for these images
	document.addEventListener(
	  "mouseover",
	  function (e) {
		if (e.target && e.target.matches && e.target.matches("img.work-thumb, img.nohover")) {
		  e.stopImmediatePropagation();
		}
	  },
	  true
	);
  
	document.addEventListener(
	  "mouseout",
	  function (e) {
		if (e.target && e.target.matches && e.target.matches("img.work-thumb, img.nohover")) {
		  e.stopImmediatePropagation();
		}
	  },
	  true
	);
  });
  