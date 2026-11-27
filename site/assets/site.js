// Theme toggle, mobile navigation and copy buttons. No dependencies.
(function () {
	var root = document.documentElement;

	function currentTheme() {
		if (root.dataset.theme) return root.dataset.theme;
		return matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
	}

	document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
		btn.addEventListener("click", function () {
			var next = currentTheme() === "dark" ? "light" : "dark";
			root.dataset.theme = next;
			try { localStorage.setItem("theme", next); } catch (e) {}
		});
	});

	var sheet = document.getElementById("nav-sheet");
	var openBtn = document.querySelector("[data-nav-open]");
	var closeBtn = document.querySelector("[data-nav-close]");

	function setNav(open) {
		if (!sheet) return;
		if (open) sheet.setAttribute("data-open", "");
		else sheet.removeAttribute("data-open");
		if (openBtn) openBtn.setAttribute("aria-expanded", String(open));
		document.body.style.overflow = open ? "hidden" : "";
		(open ? closeBtn : openBtn) && (open ? closeBtn : openBtn).focus();
	}

	if (openBtn) openBtn.addEventListener("click", function () { setNav(true); });
	if (closeBtn) closeBtn.addEventListener("click", function () { setNav(false); });
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && sheet && sheet.hasAttribute("data-open")) setNav(false);
	});

	// The docs sidebar is a collapsible <details> on phones only.
	var docsNav = document.querySelector(".docs-nav");
	if (docsNav && matchMedia("(max-width: 767px)").matches) docsNav.open = false;

	function copy(text, btn) {
		navigator.clipboard.writeText(text).then(function () {
			var icon = btn.querySelector(".icon");
			icon.classList.replace("i-copy", "i-check");
			btn.setAttribute("aria-label", "Copied");
			setTimeout(function () {
				icon.classList.replace("i-check", "i-copy");
				btn.setAttribute("aria-label", "Copy");
			}, 1500);
		});
	}

	document.querySelectorAll("[data-copy]").forEach(function (btn) {
		btn.addEventListener("click", function () { copy(btn.dataset.copy, btn); });
	});

	// Copy buttons on code blocks. Console blocks copy only the commands.
	document.querySelectorAll(".prose pre").forEach(function (pre) {
		var code = pre.querySelector("code");
		if (!code) return;
		var btn = document.createElement("button");
		btn.type = "button";
		btn.className = "btn btn-ghost btn-icon copy-btn";
		btn.setAttribute("aria-label", "Copy");
		btn.innerHTML = '<span class="icon i-copy"></span>';
		btn.addEventListener("click", function () {
			var cmds = code.querySelectorAll(".command");
			var text = cmds.length
				? Array.prototype.map.call(cmds, function (c) { return c.textContent; }).join("\n")
				: code.textContent;
			copy(text, btn);
		});
		pre.appendChild(btn);
	});
})();
