window.Modernizr = function (a, b, c) {
    function d(a, b) {
        for (var d in a) if (p[a[d]] !== c) return b == "pfx" ? a[d] : !0;
        return !1
    }
    function e(a, b) {
        return !!~ ("" + a).indexOf(b)
    }
    function f(a, b) {
        return typeof a === b
    }
    function g(a, b) {
        return h(s.join(a + ";") + (b || ""))
    }
    function h(a) {
        p.cssText = a
    }
    var i = "2.0.6",
        j = {}, k = !0,
        l = b.documentElement,
        m = b.head || b.getElementsByTagName("head")[0],
        n = "modernizr",
        o = b.createElement(n),
        p = o.style,
        q, r = Object.prototype.toString,
        s = " -webkit- -moz- -o- -ms- -khtml- ".split(" "),
        t = {}, u = {}, v = {}, w = [],
        x = function (a, c, d, e) {
            var f, g, h, i = b.createElement("div");
            if (parseInt(d, 10)) while (d--) h = b.createElement("div"), h.id = e ? e[d] : n + (d + 1), i.appendChild(h);
            f = ["­", "<style>", a, "</style>"].join(""), i.id = n, i.innerHTML += f, l.appendChild(i), g = c(i, a), i.parentNode.removeChild(i);
            return !!g
        }, y, z = {}.hasOwnProperty,
        A;
    !f(z, c) && !f(z.call, c) ? A = function (a, b) {
        return z.call(a, b)
    } : A = function (a, b) {
        return b in a && f(a.constructor.prototype[b], c)
    };
    var B = function (a, c) {
        var d = a.join(""),
            e = c.length;
        x(d, function (a, c) {
            var d = b.styleSheets[b.styleSheets.length - 1],
                f = d.cssRules && d.cssRules[0] ? d.cssRules[0].cssText : d.cssText || "",
                g = a.childNodes,
                h = {};
            while (e--) h[g[e].id] = g[e];
            j.csstransforms3d = h.csstransforms3d.offsetLeft === 9
        }, e, c)
    }([, ["@media (", s.join("transform-3d),("), n, ")", "{#csstransforms3d{left:9px;position:absolute}}"].join("")], [, "csstransforms3d"]);
    t.csstransforms3d = function () {
        var a = !! d(["perspectiveProperty", "WebkitPerspective", "MozPerspective", "OPerspective", "msPerspective"]);
        a && "webkitPerspective" in l.style && (a = j.csstransforms3d);
        return a
    };
    for (var C in t) A(t, C) && (y = C.toLowerCase(), j[y] = t[C](), w.push((j[y] ? "" : "no-") + y));
    h(""), o = q = null, a.attachEvent && function () {
        var a = b.createElement("div");
        a.innerHTML = "<elem></elem>";
        return a.childNodes.length !== 1
    }() && function (a, b) {
        function d(a) {
            var b = -1;
            while (++b < h) a.createElement(g[b])
        }
        a.iepp = a.iepp || {};
        var e = a.iepp,
            f = e.html5elements || "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
            g = f.split("|"),
            h = g.length,
            i = new RegExp("(^|\\s)(" + f + ")", "gi"),
            j = new RegExp("<(/*)(" + f + ")", "gi"),
            k = /^\s*[\{\}]\s*$/,
            l = new RegExp("(^|[^\\n]*?\\s)(" + f + ")([^\\n]*)({[\\n\\w\\W]*?})", "gi"),
            m = b.createDocumentFragment(),
            n = b.documentElement,
            o = n.firstChild,
            p = b.createElement("body"),
            q = b.createElement("style"),
            r = /print|all/,
            s;
        e.getCSS = function (a, b) {
            if (a + "" === c) return "";
            var d = -1,
                f = a.length,
                g, h = [];
            while (++d < f) {
                g = a[d];
                if (g.disabled) continue;
                b = g.media || b, r.test(b) && h.push(e.getCSS(g.imports, b), g.cssText), b = "all"
            }
            return h.join("")
        }, e.parseCSS = function (a) {
            var b = [],
                c;
            while ((c = l.exec(a)) != null) b.push(((k.exec(c[1]) ? "\n" : c[1]) + c[2] + c[3]).replace(i, "$1.iepp_$2") + c[4]);
            return b.join("\n")
        }, e.writeHTML = function () {
            var a = -1;
            s = s || b.body;
            while (++a < h) {
                var c = b.getElementsByTagName(g[a]),
                    d = c.length,
                    e = -1;
                while (++e < d) c[e].className.indexOf("iepp_") < 0 && (c[e].className += " iepp_" + g[a])
            }
            m.appendChild(s), n.appendChild(p), p.className = s.className, p.id = s.id, p.innerHTML = s.innerHTML.replace(j, "<$1font")
        }, e._beforePrint = function () {
            q.styleSheet.cssText = e.parseCSS(e.getCSS(b.styleSheets, "all")), e.writeHTML()
        }, e.restoreHTML = function () {
            p.innerHTML = "", n.removeChild(p), n.appendChild(s)
        }, e._afterPrint = function () {
            e.restoreHTML(), q.styleSheet.cssText = ""
        }, d(b), d(m);
        e.disablePP || (o.insertBefore(q, o.firstChild), q.media = "print", q.className = "iepp-printshim", a.attachEvent("onbeforeprint", e._beforePrint), a.attachEvent("onafterprint", e._afterPrint))
    }(a, b), j._version = i, j._prefixes = s, j.testProp = function (a) {
        return d([a])
    }, j.testStyles = x, l.className = l.className.replace(/\bno-js\b/, "") + (k ? " js " + w.join(" ") : "");
    return j
}(this, this.document),
function (a, b, c) {
    function d(a) {
        return !a || a == "loaded" || a == "complete"
    }
    function e() {
        var a = 1,
            b = -1;
        while (p.length - ++b) if (p[b].s && !(a = p[b].r)) break;
        a && h()
    }
    function f(a) {
        var c = b.createElement("script"),
            f;
        c.src = a.s, c.onreadystatechange = c.onload = function () {
            !f && d(c.readyState) && (f = 1, e(), c.onload = c.onreadystatechange = null)
        }, m(function () {
            f || (f = 1, e())
        }, H.errorTimeout), a.e ? c.onload() : n.parentNode.insertBefore(c, n)
    }
    function g(a) {
        var c = b.createElement("link"),
            d;
        c.href = a.s, c.rel = "stylesheet", c.type = "text/css";
        if (!a.e && (w || r)) {
            var f = function (a) {
                m(function () {
                    if (!d) try {
                        a.sheet.cssRules.length ? (d = 1, e()) : f(a)
                    } catch (b) {
                        b.code == 1e3 || b.message == "security" || b.message == "denied" ? (d = 1, m(function () {
                            e()
                        }, 0)) : f(a)
                    }
                }, 0)
            };
            f(c)
        } else c.onload = function () {
            d || (d = 1, m(function () {
                e()
            }, 0))
        }, a.e && c.onload();
        m(function () {
            d || (d = 1, e())
        }, H.errorTimeout), !a.e && n.parentNode.insertBefore(c, n)
    }
    function h() {
        var a = p.shift();
        q = 1, a ? a.t ? m(function () {
            a.t == "c" ? g(a) : f(a)
        }, 0) : (a(), e()) : q = 0
    }
    function i(a, c, f, g, i, j) {
        function k() {
            !o && d(l.readyState) && (r.r = o = 1, !q && e(), l.onload = l.onreadystatechange = null, m(function () {
                u.removeChild(l)
            }, 0))
        }
        var l = b.createElement(a),
            o = 0,
            r = {
                t: f,
                s: c,
                e: j
            };
        l.src = l.data = c, !s && (l.style.display = "none"), l.width = l.height = "0", a != "object" && (l.type = f), l.onload = l.onreadystatechange = k, a == "img" ? l.onerror = k : a == "script" && (l.onerror = function () {
            r.e = r.r = 1, h()
        }), p.splice(g, 0, r), u.insertBefore(l, s ? null : n), m(function () {
            o || (u.removeChild(l), r.r = r.e = o = 1, e())
        }, H.errorTimeout)
    }
    function j(a, b, c) {
        var d = b == "c" ? z : y;
        q = 0, b = b || "j", C(a) ? i(d, a, b, this.i++, l, c) : (p.splice(this.i++, 0, a), p.length == 1 && h());
        return this
    }
    function k() {
        var a = H;
        a.loader = {
            load: j,
            i: 0
        };
        return a
    }
    var l = b.documentElement,
        m = a.setTimeout,
        n = b.getElementsByTagName("script")[0],
        o = {}.toString,
        p = [],
        q = 0,
        r = "MozAppearance" in l.style,
        s = r && !! b.createRange().compareNode,
        t = r && !s,
        u = s ? l : n.parentNode,
        v = a.opera && o.call(a.opera) == "[object Opera]",
        w = "webkitAppearance" in l.style,
        x = w && "async" in b.createElement("script"),
        y = r ? "object" : v || x ? "img" : "script",
        z = w ? "img" : y,
        A = Array.isArray || function (a) {
            return o.call(a) == "[object Array]"
        }, B = function (a) {
            return Object(a) === a
        }, C = function (a) {
            return typeof a == "string"
        }, D = function (a) {
            return o.call(a) == "[object Function]"
        }, E = [],
        F = {}, G, H;
    H = function (a) {
        function b(a) {
            var b = a.split("!"),
                c = E.length,
                d = b.pop(),
                e = b.length,
                f = {
                    url: d,
                    origUrl: d,
                    prefixes: b
                }, g, h;
            for (h = 0; h < e; h++) g = F[b[h]], g && (f = g(f));
            for (h = 0; h < c; h++) f = E[h](f);
            return f
        }
        function d(a, d, e, f, g) {
            var h = b(a),
                i = h.autoCallback;
            if (!h.bypass) {
                d && (d = D(d) ? d : d[a] || d[f] || d[a.split("/").pop().split("?")[0]]);
                if (h.instead) return h.instead(a, d, e, f, g);
                e.load(h.url, h.forceCSS || !h.forceJS && /css$/.test(h.url) ? "c" : c, h.noexec), (D(d) || D(i)) && e.load(function () {
                    k(), d && d(h.origUrl, g, f), i && i(h.origUrl, g, f)
                })
            }
        }
        function e(a, b) {
            function c(a) {
                if (C(a)) d(a, h, b, 0, e);
                else if (B(a)) for (i in a) a.hasOwnProperty(i) && d(a[i], h, b, i, e)
            }
            var e = !! a.test,
                f = e ? a.yep : a.nope,
                g = a.load || a.both,
                h = a.callback,
                i;
            c(f), c(g), a.complete && b.load(a.complete)
        }
        var f, g, h = this.yepnope.loader;
        if (C(a)) d(a, 0, h, 0);
        else if (A(a)) for (f = 0; f < a.length; f++) g = a[f], C(g) ? d(g, 0, h, 0) : A(g) ? H(g) : B(g) && e(g, h);
        else B(a) && e(a, h)
    }, H.addPrefix = function (a, b) {
        F[a] = b
    }, H.addFilter = function (a) {
        E.push(a)
    }, H.errorTimeout = 1e4, b.readyState == null && b.addEventListener && (b.readyState = "loading", b.addEventListener("DOMContentLoaded", G = function () {
        b.removeEventListener("DOMContentLoaded", G, 0), b.readyState = "complete"
    }, 0)), a.yepnope = k()
}(this, this.document), Modernizr.load = function () {
    yepnope.apply(window, [].slice.call(arguments, 0))
};
jQuery.easing["jswing"] = jQuery.easing["swing"];
jQuery.extend(jQuery.easing, {
    def: "easeOutQuad",
    swing: function (a, b, c, d, e) {
        return jQuery.easing[jQuery.easing.def](a, b, c, d, e)
    },
    easeInQuad: function (a, b, c, d, e) {
        return d * (b /= e) * b + c
    },
    easeOutQuad: function (a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c
    },
    easeInOutQuad: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b + c;
        return -d / 2 * (--b * (b - 2) - 1) + c
    },
    easeInCubic: function (a, b, c, d, e) {
        return d * (b /= e) * b * b + c
    },
    easeOutCubic: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c
    },
    easeInOutCubic: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b + c;
        return d / 2 * ((b -= 2) * b * b + 2) + c
    },
    easeInQuart: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c
    },
    easeOutQuart: function (a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c
    },
    easeInOutQuart: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b * b + c;
        return -d / 2 * ((b -= 2) * b * b * b - 2) + c
    },
    easeInQuint: function (a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c
    },
    easeOutQuint: function (a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c
    },
    easeInOutQuint: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return d / 2 * b * b * b * b * b + c;
        return d / 2 * ((b -= 2) * b * b * b * b + 2) + c
    },
    easeInSine: function (a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c
    },
    easeOutSine: function (a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c
    },
    easeInOutSine: function (a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c
    },
    easeInExpo: function (a, b, c, d, e) {
        return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c
    },
    easeOutExpo: function (a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, - 10 * b / e) + 1) + c
    },
    easeInOutExpo: function (a, b, c, d, e) {
        if (b == 0) return c;
        if (b == e) return c + d;
        if ((b /= e / 2) < 1) return d / 2 * Math.pow(2, 10 * (b - 1)) + c;
        return d / 2 * (-Math.pow(2, - 10 * --b) + 2) + c
    },
    easeInCirc: function (a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c
    },
    easeOutCirc: function (a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c
    },
    easeInOutCirc: function (a, b, c, d, e) {
        if ((b /= e / 2) < 1) return -d / 2 * (Math.sqrt(1 - b * b) - 1) + c;
        return d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c
    },
    easeInElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        if (!g) g = e * .3;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c
    },
    easeOutElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        if (!g) g = e * .3;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, - 10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c
    },
    easeInOutElastic: function (a, b, c, d, e) {
        var f = 1.70158;
        var g = 0;
        var h = d;
        if (b == 0) return c;
        if ((b /= e / 2) == 2) return c + d;
        if (!g) g = e * .3 * 1.5;
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        if (b < 1) return -.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c;
        return h * Math.pow(2, - 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c
    },
    easeInBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        return d * (b /= e) * b * ((f + 1) * b - f) + c
    },
    easeOutBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        return d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c
    },
    easeInOutBack: function (a, b, c, d, e, f) {
        if (f == undefined) f = 1.70158;
        if ((b /= e / 2) < 1) return d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c;
        return d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c
    },
    easeInBounce: function (a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c
    },
    easeOutBounce: function (a, b, c, d, e) {
        if ((b /= e) < 1 / 2.75) {
            return d * 7.5625 * b * b + c
        } else if (b < 2 / 2.75) {
            return d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c
        } else if (b < 2.5 / 2.75) {
            return d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c
        } else {
            return d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c
        }
    },
    easeInOutBounce: function (a, b, c, d, e) {
        if (b < e / 2) return jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c;
        return jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c
    }
});

$(function () {
    $("img").mouseover(function () {
        var a = $(this).attr("src").match(/[^\.]+/) + "-hover.jpg";
        $(this).attr("src", a)
    }).mouseout(function () {
        var a = $(this).attr("src").replace("-hover", "");
        $(this).attr("src", a)
    })
});

$(function () {
    var a = function () {
        var a = $("#ss-container > div.ss-row"),
            b, c, d = $("#ss-links > a"),
            e = $(window),
            f = {}, g = false,
            h = 2e3,
            i = "easeInOutExpo",
            j = true,
            k = j && Modernizr.csstransforms3d && !window.matchMedia("(max-width: 768px)").matches,
            l = function () {
                o();
                p();
                m();
                n();
                if (k) {
                    a.css({
                        "-webkit-perspective": 600,
                        "-webkit-perspective-origin": "50% 0%"
                    })
                }
                b.find("a.ss-circle").addClass("ss-circle-deco");
                q()
            }, m = function () {
                $.extend($.expr[":"], {
                    inviewport: function (a) {
                        if ($(a).offset().top < f.height) {
                            return true
                        }
                        return false
                    }
                })
            }, n = function () {
                b = a.filter(":inviewport");
                c = a.not(b)
            }, o = function () {
                f.width = e.width();
                f.height = e.height()
            }, p = function () {
                d.on("click.Scrolling", function (a) {
                    $("html, body").stop().animate({
                        scrollTop: $($(this).attr("href")).offset().top
                    }, h, i);
                    return false
                });
                $(window).on({
                    "resize.Scrolling": function (c) {
                        o();
                        n();
                        a.find("a.ss-circle").removeClass("ss-circle-deco");
                        b.each(function () {
                            $(this).find("div.ss-left").css({
                                left: "0%"
                            }).end().find("div.ss-right").css({
                                right: "0%"
                            }).end().find("a.ss-circle").addClass("ss-circle-deco")
                        })
                    },
                    "scroll.Scrolling": function (a) {
                        if (g) return false;
                        g = true;
                        setTimeout(function () {
                            q();
                            g = false
                        }, 10)
                    }
                })
            }, q = function () {
                var a = e.scrollTop(),
                    a = $(window).scrollTop(),
                    triggerFactor = window.matchMedia("(max-width: 768px)").matches ? 0.80 : 0.50,
                    b = f.height * triggerFactor + a;                
                c.each(function (c) {
                    var d = $(this),
                        e = d.find("div.ss-left"),
                        g = d.find("div.ss-right"),
                        h = d.offset().top;
                    if (h > f.height + a) {
                        if (k) {
                            e.css({
                                "-webkit-transform": "translate3d(-75%, 0, 0) rotateY(-90deg) translate3d(-75%, 0, 0)",
                                opacity: 0
                            });
                            g.css({
                                "-webkit-transform": "translate3d(75%, 0, 0) rotateY(90deg) translate3d(75%, 0, 0)",
                                opacity: 0
                            })
                        } else {
                            e.css({
                                left: "-50%"
                            });
                            g.css({
                                right: "-50%"
                            })
                        }
                    } else {
                        var i = d.height(),
                            j = (h + i / 2 - b) / (f.height / 2 + i / 2),
                            l = Math.max(j * 50, 0);
                        if (l <= 0) {
                            if (!d.data("pointer")) {
                                d.data("pointer", true);
                                d.find(".ss-circle").addClass("ss-circle-deco")
                            }
                        } else {
                            if (d.data("pointer")) {
                                d.data("pointer", false);
                                d.find(".ss-circle").removeClass("ss-circle-deco")
                            }
                        }
                        if (k) {
                            var m = Math.max(j * 75, 0),
                                n = Math.max(j * 90, 0),
                                o = Math.min(Math.abs(j - 1), 1);
                            e.css({
                                "-webkit-transform": "translate3d(-" + m + "%, 0, 0) rotateY(-" + n + "deg) translate3d(-" + m + "%, 0, 0)",
                                opacity: o
                            });
                            g.css({
                                "-webkit-transform": "translate3d(" + m + "%, 0, 0) rotateY(" + n + "deg) translate3d(" + m + "%, 0, 0)",
                                opacity: o
                            })
                        } else {
                            e.css({
                                left: -l + "%"
                            });
                            g.css({
                                right: -l + "%"
                            })
                        }
                    }
                })
            };
        return {
            init: l
        }
    }();
    a.init()
})

$(function () {
    // =========================
    // Overlay init (CONTACT)
    // =========================
    $("button[rel]").overlay({ mask: '#000' });
  
    // =========================
    // Form submit flow
    // =========================
    var submitted = false;
  
    $("#contactForm").on("submit", function (e) {
      // Als submit door native validation of Turnstile is geblokkeerd
      if (e.isDefaultPrevented && e.isDefaultPrevented()) {
        return;
      }
      submitted = true;
    });
  
    $("#form_target").on("load", function () {
      if (!submitted) return;
      submitted = false;
  
      var bodyText = "";
      try {
        bodyText = $(this).contents().text() || "";
      } catch (e) {
        bodyText = "";
      }
  
      // Error (403 / captcha)
      if (bodyText.toLowerCase().includes("forbidden")) {
        $("#form-div .form-error").remove();
        $("#form-div").prepend(
          '<p class="form-error">Captcha failed or request blocked. Please try again.</p>'
        );
        return;
      }
  
      // Success
      $("#form-div").html(
        '<div class="form-success">' +
          '<h3 class="hardware">Thanks</h3>' +
          '<p>Your message has been sent.</p>' +
          '<p><button type="button" id="closeOverlayBtn">Close</button></p>' +
        '</div>'
      );
    });
  
    $(document).on("click", "#closeOverlayBtn", function () {
      $("#petrol .close").trigger("click");
    });
  });
  
  
  (function () {
    // ===== Config =====
    var TOKEN_FIELD = "cf-turnstile-response"; // default Turnstile hidden input name

    function getForm() {
      return document.getElementById("contactForm");
    }

    function getSubmitBtn() {
      var form = getForm();
      return form ? form.querySelector('input[type="submit"], button[type="submit"]') : null;
    }

    function setStatus(msg) {
      var host = document.getElementById("form-div");
      if (!host) return;

      var el = document.getElementById("turnstile-status");
      if (!el) {
        el = document.createElement("p");
        el.id = "turnstile-status";
        el.className = "form-error"; // gebruik je eigen class als je wil
        // plaats boven de submit
        host.appendChild(el);
      }
      el.textContent = msg || "";
      el.style.display = msg ? "block" : "none";
    }

    function setSubmitEnabled(enabled) {
      var btn = getSubmitBtn();
      if (btn) btn.disabled = !enabled;
    }

    function hasToken() {
      var form = getForm();
      if (!form) return false;

      var field = form.querySelector('input[name="' + TOKEN_FIELD + '"]');
      return !!(field && field.value && field.value.trim().length > 0);
    }

    // ===== Public callbacks for Turnstile (must be global) =====
    window.onTurnstileSuccess = function (token) {
      // token is present + hidden field is set
      setStatus("");          // clear any error
      setSubmitEnabled(true); // allow submit
    };

    window.onTurnstileError = function () {
      setStatus("Captcha error. Please refresh the page and try again.");
      setSubmitEnabled(false);
    };

    window.onTurnstileExpired = function () {
      setStatus("Captcha expired. Please complete it again.");
      setSubmitEnabled(false);
    };

    // ===== On page ready: disable submit until captcha ok =====
    document.addEventListener("DOMContentLoaded", function () {
        var form = getForm();
        if (!form) return;
      
        // Alleen Turnstile logic aanzetten als de widget aanwezig is
        var hasTurnstileWidget = !!document.querySelector(".cf-turnstile");
      
        if (!hasTurnstileWidget) {
          // Geen Turnstile op pagina: submit moet gewoon werken
          setSubmitEnabled(true);
          return;
        }
      
        // Turnstile wél aanwezig: blokkeer submit tot token er is
        setSubmitEnabled(false);
      
        form.addEventListener("submit", function (e) {
          if (!hasToken()) {
            e.preventDefault();
            setStatus("Please complete the captcha before submitting.");
            setSubmitEnabled(false);
          }
        });
      });
      
  })();
