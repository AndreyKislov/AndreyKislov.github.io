(function () {
    const n = document.createElement("link").relList;
    if (n && n.supports && n.supports("modulepreload")) return;
    for (const e of document.querySelectorAll('link[rel="modulepreload"]')) u(e);
    new MutationObserver(e => {
        for (const r of e) if (r.type === "childList") for (const s of r.addedNodes) s.tagName === "LINK" && s.rel === "modulepreload" && u(s)
    }).observe(document, {childList: !0, subtree: !0});

    function i(e) {
        const r = {};
        return e.integrity && (r.integrity = e.integrity), e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy), e.crossOrigin === "use-credentials" ? r.credentials = "include" : e.crossOrigin === "anonymous" ? r.credentials = "omit" : r.credentials = "same-origin", r
    }

    function u(e) {
        if (e.ep) return;
        e.ep = !0;
        const r = i(e);
        fetch(e.href, r)
    }
})();

function w({btnPrevSelector: a, btnNextSelector: n, sliderInnerSelector: i, dotsSelector: u}) {
    const e = document.querySelector(a), r = document.querySelector(n), s = document.querySelector(i),
        f = document.querySelector(u);
    let c = 0, l = s.childElementCount, m;
    if (!e || !r || !s) {
        console.error("Один или несколько селекторов не найдены.");
        return
    }
    h(l), r.addEventListener("click", () => {
        L(++c)
    }), e.addEventListener("click", () => {
        L(--c)
    }), f.addEventListener("click", t => {
        const o = t.target;
        o.hasAttribute("data-index") && L(o.getAttribute("data-index"))
    }), window.addEventListener("resize", () => {
        L(c)
    });

    function h(t, o = 0) {
        if (t !== f.childElementCount) {
            f.innerHTML = "";
            for (let d = 0; d < t; d++) f.innerHTML += `<li data-index="${d}"></li>`
        }
        for (let d = 0; d < t; d++) f.children[d].classList.remove("slider__dots-active");
        f.children[o].classList.add("slider__dots-active")
    }

    function L(t) {
        let o = s.offsetWidth;
        l = s.childElementCount, c = t, c >= l && (c = 0), c < 0 && (c = l - 1), s.style.transform = `translateX(-${c * o}px)`, h(l, c)
    }

    s.addEventListener("touchend", t => {
        console.log(t);
        const o = t.changedTouches[0].clientX - m;
        o > 50 ? (console.log(o), L(--c)) : o < 0 && o < -50 && (L(++c), console.log(o))
    }), s.addEventListener("touchstart", t => {
        m = t.touches[0].clientX
    })
}

function q({containerClass: a, activeTabClass: n, tabClass: i, cardClass: u, hiddenClass: e, pagesSelector: r}) {
    if (!a || !n || !i || !u || !e || !r) {
        console.error("Один или несколько селекторов не найдены.");
        return
    }
    const s = document.querySelectorAll(i), f = document.querySelector(a), c = document.querySelectorAll(u),
        l = document.querySelector(n);
    m(l), f.addEventListener("click", t => {
        h(t)
    });

    function m(t) {
        const o = t.getAttribute("data-filter");
        c.forEach(d => {
            d.classList.add(e.slice(1)), d.getAttribute("data-filter") === o && d.classList.remove(e.slice(1))
        }), L(r)
    }

    function h(t) {
        const o = t.target.closest(i);
        o && (s.forEach(d => {
            d.classList.remove(n.slice(1))
        }), o.classList.add(n.slice(1)), m(o))
    }

    function L(t) {
        c.forEach(o => {
            const d = o.querySelector(t);
            d && (d.style.transform = "translateX(0px)")
        })
    }
}

function A({cardClass: a, containerClass: n, cardLinkNext: i, cardLinkPrev: u, pagesSelector: e}) {
    const r = document.querySelectorAll(a), s = document.querySelector(n), f = r[0].offsetWidth - 1.6;
    s.addEventListener("click", l => {
        c(l)
    });

    function c(l) {
        l.preventDefault();
        const m = l.target;
        if (m.classList.contains(i.slice(1))) {
            const h = m.closest(e);
            h.style.transform = `translateX(-${f}px)`
        } else if (m.classList.contains(u.slice(1))) {
            const h = m.closest(e);
            h.style.transform = "translateX(0px)"
        }
    }
}

function x({
               modalClass: a,
               dataConsultation: n,
               consultationModalId: i,
               dataOrder: u,
               orderModalId: e,
               thanksModalId: r,
               productTitleClass: s,
               productCardClass: f,
               modalClose: c
           }) {
    if (!a || !n || !i || !u || !e || !r || !s || !f || !c) {
        console.error("Один или несколько селекторов не найдены.");
        return
    }
    const l = document.querySelector(a), m = document.querySelectorAll(`[${n}]`), h = document.querySelector("body"),
        L = document.getElementById(i), t = document.getElementById(e), o = document.getElementById(r),
        d = document.querySelectorAll(`[${u}]`), _ = document.querySelectorAll(c);
    m.forEach(g => {
        g.addEventListener("click", E)
    }), d.forEach(g => {
        g.addEventListener("click", v => {
            p(v)
        })
    }), t.addEventListener("submit", g => {
        S()
    }), l.addEventListener("click", g => {
        g.target === l && y()
    }), _.forEach(g => {
        g.addEventListener("click", y)
    });

    function E() {
        h.classList.add("show-modal"), l.classList.remove("hidden"), L.classList.remove("hidden")
    }

    function p(g) {
        const v = g.target, b = v.closest(f).querySelector(s);
        t.querySelector(".modal__title-small").innerText = b.innerText, h.classList.add("show-modal"), l.classList.remove("hidden"), t.classList.remove("hidden")
    }

    function S() {
        t.classList.add("hidden"), o.classList.remove("hidden")
    }

    function y() {
        h.classList.remove("show-modal"), l.classList.add("hidden"), L.classList.add("hidden")
    }
}

function k() {
    document.querySelectorAll("form").forEach(n => {
        n.addEventListener("submit", i => {
            i.preventDefault(), i.target.reset()
        })
    })
}

function M(a) {
    const n = document.querySelector(a);
    document.addEventListener("scroll", i => {
        window.scrollY > 500 ? n.classList.remove("invisible") : n.classList.add("invisible")
    })
}

function P({sectionClass: a, itemClass: n}) {
    document.querySelector(a);
    const i = document.querySelectorAll(n);
    window.addEventListener("scroll", u);

    function u() {
        i.forEach(e => {
            e.getBoundingClientRect().top < window.innerHeight - 60 && e.classList.remove("invisible"), Array.from(i).some(s => s.classList.contains("invisible")) || window.removeEventListener("scroll", u)
        })
    }
}

document.addEventListener("DOMContentLoaded", () => {
    w({
        btnPrevSelector: ".slider__btn-left",
        btnNextSelector: ".slider__btn-right",
        sliderInnerSelector: ".slider__inner",
        dotsSelector: ".slider__dots"
    }), q({
        containerClass: ".catalog__tabs",
        activeTabClass: ".catalog__tabs-item-active",
        tabClass: ".catalog__tabs-item",
        cardClass: ".card",
        hiddenClass: ".hidden",
        pagesSelector: ".card__inner"
    }), A({
        cardClass: ".card",
        containerClass: ".catalog__grid-container",
        cardLinkNext: ".card__link-next",
        cardLinkPrev: ".card__link-prev",
        pagesSelector: ".card__inner"
    }), x({
        modalClass: ".modal",
        dataConsultation: 'data-target="consultation"',
        consultationModalId: "consultation",
        dataOrder: 'data-target="order"',
        orderModalId: "order",
        thanksModalId: "thanks",
        productTitleClass: ".card__title",
        productCardClass: ".card",
        modalClose: ".modal__close"
    }), k(), M(".up"), P({sectionClass: ".reviews", itemClass: ".reviews__item"})
});
//# sourceMappingURL=index-ClK35PLO.js.map
