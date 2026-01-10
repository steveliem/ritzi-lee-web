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
(function () {
    var a = /msie (6|7|8)/i.test(navigator.userAgent) && !/opera/i.test(navigator.userAgent);
    var b = window.soundcloud = {
        version: "0.1",
        debug: false,
        _listeners: [],
        _redispatch: function (a, b, c) {
            var d, e = this._listeners[a] || [],
                f = "soundcloud:" + a;
            try {
                d = this.getPlayer(b)
            } catch (g) {
                if (this.debug && window.console) {
                    console.error("unable to dispatch widget event " + a + " for the widget id " + b, c, g)
                }
                return
            }
            if (window.jQuery) {
                jQuery(d).trigger(f, [c])
            } else if (window.Prototype) {
                $(d).fire(f, c)
            } else {}
            for (var h = 0, i = e.length; h < i; h += 1) {
                e[h].apply(d, [d, c])
            }
            if (this.debug && window.console) {
                console.log(f, a, b, c)
            }
        },
        addEventListener: function (a, b) {
            if (!this._listeners[a]) {
                this._listeners[a] = []
            }
            this._listeners[a].push(b)
        },
        removeEventListener: function (a, b) {
            var c = this._listeners[a] || [];
            for (var d = 0, e = c.length; d < e; d += 1) {
                if (c[d] === b) {
                    c.splice(d, 1)
                }
            }
        },
        getPlayer: function (b) {
            var c;
            try {
                if (!b) {
                    throw "The SoundCloud Widget DOM object needs an id atribute, please refer to SoundCloud Widget API documentation."
                }
                c = a ? window[b] : document[b];
                if (c) {
                    if (c.api_getFlashId) {
                        return c
                    } else {
                        throw "The SoundCloud Widget External Interface is not accessible. Check that allowscriptaccess is set to 'always' in embed code"
                    }
                } else {
                    throw "The SoundCloud Widget with an id " + b + " couldn't be found"
                }
            } catch (d) {
                if (console && console.error) {
                    console.error(d)
                }
                throw d
            }
        },
        onPlayerReady: function (a, b) {
            this._redispatch("onPlayerReady", a, b)
        },
        onMediaStart: function (a, b) {
            this._redispatch("onMediaStart", a, b)
        },
        onMediaEnd: function (a, b) {
            this._redispatch("onMediaEnd", a, b)
        },
        onMediaPlay: function (a, b) {
            this._redispatch("onMediaPlay", a, b)
        },
        onMediaPause: function (a, b) {
            this._redispatch("onMediaPause", a, b)
        },
        onMediaBuffering: function (a, b) {
            this._redispatch("onMediaBuffering", a, b)
        },
        onMediaSeek: function (a, b) {
            this._redispatch("onMediaSeek", a, b)
        },
        onMediaDoneBuffering: function (a, b) {
            this._redispatch("onMediaDoneBuffering", a, b)
        },
        onPlayerError: function (a, b) {
            this._redispatch("onPlayerError", a, b)
        }
    }
})();
(function (b) {
    var c = function (a) {
        var b = function (a) {
            return {
                h: Math.floor(a / (60 * 60 * 1e3)),
                m: Math.floor(a / 6e4 % 60),
                s: Math.floor(a / 1e3 % 60)
            }
        }(a),
            c = [];
        if (b.h > 0) {
            c.push(b.h)
        }
        c.push(b.m < 10 && b.h > 0 ? "0" + b.m : b.m);
        c.push(b.s < 10 ? "0" + b.s : b.s);
        return c.join(".")
    };
    var d = function (a) {
        a.sort(function () {
            return Math.round(Math.random())
        });
        return a
    };
    var e = true,
        f = false,
        g = b(document),
        h = function (a) {
            try {
                if (e && window.console && window.console.log) {
                    window.console.log.apply(window.console, arguments)
                }
            } catch (b) {}
        }, i = f ? "sandbox-soundcloud.com" : "soundcloud.com",
        j = function (a, b) {
            return (/api\./.test(a) ? a + "?" : "http://api." + i + "/resolve?url=" + a + "&") + "format=json&consumer_key=" + b + "&callback=?"
        };
    var k = function () {
        var c = function () {
            var a = false;
            try {
                var b = new Audio;
                a = b.canPlayType && /maybe|probably/.test(b.canPlayType("audio/mpeg"));
                a = a && /iPad|iphone|mobile|pre\//i.test(navigator.userAgent)
            } catch (c) {}
            return a
        }(),
            d = {
                onReady: function () {
                    g.trigger("scPlayer:onAudioReady")
                },
                onPlay: function () {
                    g.trigger("scPlayer:onMediaPlay")
                },
                onPause: function () {
                    g.trigger("scPlayer:onMediaPause")
                },
                onEnd: function () {
                    g.trigger("scPlayer:onMediaEnd")
                },
                onBuffer: function (a) {
                    g.trigger({
                        type: "scPlayer:onMediaBuffering",
                        percent: a
                    })
                }
            };
        var e = function () {
            var c = new Audio,
                e = function (a) {
                    var b = a.target,
                        c = (b.buffered.length && b.buffered.end(0)) / b.duration * 100;
                    d.onBuffer(c);
                    if (b.currentTime === b.duration) {
                        d.onEnd()
                    }
                }, f = function (a) {
                    var b = a.target,
                        c = (b.buffered.length && b.buffered.end(0)) / b.duration * 100;
                    d.onBuffer(c)
                };
            b('<div class="sc-player-engine-container"></div>').appendTo(document.body).append(c);
            c.addEventListener("play", d.onPlay, false);
            c.addEventListener("pause", d.onPause, false);
            c.addEventListener("ended", d.onEnd, false);
            c.addEventListener("timeupdate", e, false);
            c.addEventListener("progress", f, false);
            return {
                load: function (a, b) {
                    c.pause();
                    c.src = a.stream_url + "?consumer_key=" + b;
                    c.load();
                    c.play()
                },
                play: function () {
                    c.play()
                },
                pause: function () {
                    c.pause()
                },
                stop: function () {
                    c.currentTime = 0;
                    c.pause()
                },
                seek: function (a) {
                    c.currentTime = c.duration * a;
                    c.play()
                },
                getDuration: function () {
                    return c.duration
                },
                getPosition: function () {
                    return c.currentTime
                },
                setVolume: function (b) {
                    if (a) {
                        a.volume = b / 100
                    }
                }
            }
        };
        var f = function () {
            var a = "scPlayerEngine",
                c, e = function (c) {
                    var d = "http://player." + i + "/player.swf?url=" + c + "&enable_api=true&player_type=engine&object_id=" + a;
                    if (b.browser.msie) {
                        return '<object height="100%" width="100%" id="' + a + '" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" data="' + d + '">' + '<param name="movie" value="' + d + '" />' + '<param name="allowscriptaccess" value="always" />' + "</object>"
                    } else {
                        return '<object height="100%" width="100%" id="' + a + '">' + '<embed allowscriptaccess="always" height="100%" width="100%" src="' + d + '" type="application/x-shockwave-flash" name="' + a + '" />' + "</object>"
                    }
                };
            soundcloud.addEventListener("onPlayerReady", function (b, e) {
                c = soundcloud.getPlayer(a);
                d.onReady()
            });
            soundcloud.addEventListener("onMediaEnd", d.onEnd);
            soundcloud.addEventListener("onMediaBuffering", function (a, b) {
                d.onBuffer(b.percent)
            });
            soundcloud.addEventListener("onMediaPlay", d.onPlay);
            soundcloud.addEventListener("onMediaPause", d.onPause);
            return {
                load: function (a) {
                    var d = a.permalink_url;
                    if (c) {
                        c.api_load(d)
                    } else {
                        b('<div class="sc-player-engine-container"></div>').appendTo(document.body).html(e(d))
                    }
                },
                play: function () {
                    c && c.api_play()
                },
                pause: function () {
                    c && c.api_pause()
                },
                stop: function () {
                    c && c.api_stop()
                },
                seek: function (a) {
                    c && c.api_seekTo(c.api_getTrackDuration() * a)
                },
                getDuration: function () {
                    return c && c.api_getTrackDuration && c.api_getTrackDuration() * 1e3
                },
                getPosition: function () {
                    return c && c.api_getTrackPosition && c.api_getTrackPosition() * 1e3
                },
                setVolume: function (a) {
                    if (c && c.api_setVolume) {
                        c.api_setVolume(a)
                    }
                }
            }
        };
        return c ? e() : f()
    }();
    var l, m = false,
        n = [],
        o = {}, p, q = function (a, c, d) {
            var e = 0,
                f = {
                    node: a,
                    tracks: []
                }, g = function (a) {
                    b.getJSON(j(a.url, l), function (d) {
                        e += 1;
                        if (d.tracks) {
                            f.tracks = f.tracks.concat(d.tracks)
                        } else if (d.duration) {
                            d.permalink_url = a.url;
                            f.tracks.push(d)
                        } else if (d.username) {
                            if (/favorites/.test(a.url)) {
                                c.push({
                                    url: d.uri + "/favorites"
                                })
                            } else {
                                c.push({
                                    url: d.uri + "/tracks"
                                })
                            }
                        } else if (b.isArray(d)) {
                            f.tracks = f.tracks.concat(d)
                        }
                        if (c[e]) {
                            g(c[e])
                        } else {
                            f.node.trigger({
                                type: "onTrackDataLoaded.scPlayer",
                                playerObj: f
                            })
                        }
                    })
                };
            l = d;
            n.push(f);
            g(c[e])
        }, r = function (a, b) {
            if (b) {
                return '<div class="sc-loading-artwork">Loading Artwork</div>'
            } else if (a.artwork_url) {
                return '<img src="' + a.artwork_url.replace("-large", "-t300x300") + '"/>'
            } else {
                return '<div class="sc-no-artwork">No Artwork</div>'
            }
        }, s = function (a, d) {
            b(".sc-info", a).each(function (a) {
                b("h3", this).html('<a href="' + d.permalink_url + '">' + d.title + "</a>");
                b("h4", this).html('by <a href="' + d.user.permalink_url + '">' + d.user.username + "</a>");
                b("p", this).html(d.description || "no Description")
            });
            b(".sc-artwork-list li", a).each(function (a) {
                var c = b(this),
                    e = c.data("sc-track");
                if (e === d) {
                    c.addClass("active").find(".sc-loading-artwork").each(function (a) {
                        b(this).removeClass("sc-loading-artwork").html(r(d, false))
                    })
                } else {
                    c.removeClass("active")
                }
            });
            b(".sc-duration", a).html(c(d.duration));
            b(".sc-waveform-container", a).html('<img src="' + d.waveform_url + '" />');
            a.trigger("onPlayerTrackSwitch.scPlayer", [d])
        }, t = function (a) {
            var b = a.permalink_url;
            if (p === b) {
                k.play()
            } else {
                p = b;
                k.load(a, l)
            }
        }, u = function (a) {
            return n[b(a).data("sc-player").id]
        }, v = function (a, c) {
            if (c) {
                b("div.sc-player.playing").removeClass("playing")
            }
            b(a).toggleClass("playing", c).trigger((c ? "onPlayerPlay" : "onPlayerPause") + ".scPlayer")
        }, w = function (a, c) {
            var d = u(a).tracks[c || 0];
            s(a, d);
            o = {
                $buffer: b(".sc-buffer", a),
                $played: b(".sc-played", a),
                position: b(".sc-position", a)[0]
            };
            v(a, true);
            t(d)
        }, x = function (a) {
            v(a, false);
            k.pause()
        }, y = function () {
            var a = o.$played.closest(".sc-player"),
                d;
            o.$played.css("width", "0%");
            o.position.innerHTML = c(0);
            v(a, false);
            k.stop();
            h("track finished get the next one");
            d = b(".sc-trackslist li.active", a).next("li");
            if (!d.length) {
                d = a.nextAll("div.sc-player:first").find(".sc-trackslist li.active")
            }
            d.click()
        }, z = function (a, b) {
            k.seek(b)
        }, A = function () {
            var a = 80,
                b = document.cookie.split(";"),
                c = new RegExp("scPlayer_volume=(\\d+)");
            for (var d in b) {
                if (c.test(b[d])) {
                    a = parseInt(b[d].match(c)[1], 10);
                    break
                }
            }
            return a
        }(),
        B = function (a) {
            var b = Math.floor(a);
            var c = new Date;
            c.setTime(c.getTime() + 365 * 24 * 60 * 60 * 1e3);
            A = b;
            document.cookie = ["scPlayer_volume=", b, "; expires=", c.toUTCString(), '; path="/"'].join("");
            k.setVolume(A)
        }, C;
    g.bind("scPlayer:onAudioReady", function (a) {
        h("onPlayerReady: audio engine is ready");
        k.play();
        B(A)
    }).bind("scPlayer:onMediaPlay", function (a) {
        clearInterval(C);
        C = setInterval(function () {
            var a = k.getDuration(),
                b = k.getPosition(),
                d = b / a;
            o.$played.css("width", 100 * d + "%");
            o.position.innerHTML = c(b);
            g.trigger({
                type: "onMediaTimeUpdate.scPlayer",
                duration: a,
                position: b,
                relative: d
            })
        }, 500)
    }).bind("scPlayer:onMediaPause", function (a) {
        clearInterval(C);
        C = null
    }).bind("scPlayer:onVolumeChange", function (a) {
        B(a.volume)
    }).bind("scPlayer:onMediaEnd", function (a) {
        y()
    }).bind("scPlayer:onMediaBuffering", function (a) {
        o.$buffer.css("width", a.percent + "%")
    });
    b.scPlayer = function (a, e) {
        var f = b.extend({}, b.scPlayer.defaults, a),
            g = n.length,
            h = e && b(e),
            i = h[0].className.replace("sc-player", ""),
            j = f.links || b.map(b("a", h).add(h.filter("a")), function (a) {
                return {
                    url: a.href,
                    title: a.innerHTML
                }
            }),
            k = b('<div class="sc-player loading"></div>').data("sc-player", {
                id: g
            }),
            l = b('<ol class="sc-artwork-list"></ol>').appendTo(k),
            o = b('<div class="sc-info"><h3></h3><h4></h4><p></p><a href="#" class="sc-info-close">X</a></div>').appendTo(k),
            p = b('<div class="sc-controls"></div>').appendTo(k),
            t = b('<ol class="sc-trackslist"></ol>').appendTo(k);
        if (i || f.customClass) {
            k.addClass(i).addClass(f.customClass)
        }
        k.find(".sc-controls").append('<a href="#play" class="sc-play">Play</a> <a href="#pause" class="sc-pause hidden">Pause</a>').end().append('<a href="#info" class="sc-info-toggle">Info</a>').append('<div class="sc-scrubber"></div>').find(".sc-scrubber").append('<div class="sc-volume-slider"><span class="sc-volume-status" style="width:' + A + '%"></span></div>').append('<div class="sc-time-span"><div class="sc-waveform-container"></div><div class="sc-buffer"></div><div class="sc-played"></div></div>').append('<div class="sc-time-indicators"><span class="sc-position"></span> | <span class="sc-duration"></span></div>');
        q(k, j, f.apiKey);
        k.bind("onTrackDataLoaded.scPlayer", function (a) {
            var e = a.playerObj.tracks;
            if (f.randomize) {
                e = d(e)
            }
            b.each(e, function (a, d) {
                var e = a === 0;
                b('<li><a href="' + d.permalink_url + '">' + d.title + '</a><span class="sc-track-duration">' + c(d.duration) + "</span></li>").data("sc-track", {
                    id: a
                }).toggleClass("active", e).appendTo(t);
                b("<li></li>").append(r(d, a >= f.loadArtworks)).appendTo(l).toggleClass("active", e).data("sc-track", d)
            });
            k.removeClass("loading").trigger("onPlayerInit.scPlayer");
            k.each(function () {
                if (b.isFunction(f.beforeRender)) {
                    f.beforeRender.call(this, e)
                }
            });
            b(".sc-duration", k)[0].innerHTML = c(e[0].duration);
            b(".sc-position", k)[0].innerHTML = c(0);
            s(k, e[0]);
            if (f.autoPlay && !m) {
                w(k);
                m = true
            }
        });
        h.each(function (a) {
            b(this).replaceWith(k)
        });
        return k
    };
    b.scPlayer.stopAll = function () {
        b(".sc-player.playing a.sc-pause").click()
    };
    b.fn.scPlayer = function (a) {
        m = false;
        this.each(function () {
            b.scPlayer(a, this)
        });
        return this
    };
    b.scPlayer.defaults = b.fn.scPlayer.defaults = {
        customClass: null,
        beforeRender: function (a) {
            var c = b(this)
        },
        onDomReady: function () {
            b("a.sc-player, div.sc-player").scPlayer()
        },
        autoPlay: false,
        randomize: false,
        loadArtworks: 5,
        apiKey: "htuiRd1JP11Ww0X72T1C3g"
    };
    b("a.sc-play, a.sc-pause").live("click", function (a) {
        var c = b(this).closest(".sc-player").find("ol.sc-trackslist");
        c.find("li.active").click();
        return false
    });
    b("a.sc-info-toggle, a.sc-info-close").live("click", function (a) {
        var c = b(this);
        c.closest(".sc-player").find(".sc-info").toggleClass("active").end().find("a.sc-info-toggle").toggleClass("active");
        return false
    });
    b(".sc-trackslist li").live("click", function (a) {
        var c = b(this),
            d = c.closest(".sc-player"),
            e = c.data("sc-track").id,
            f = d.is(":not(.playing)") || c.is(":not(.active)");
        if (f) {
            w(d, e)
        } else {
            x(d)
        }
        c.addClass("active").siblings("li").removeClass("active");
        b(".artworks li", d).each(function (a) {
            b(this).toggleClass("active", a === e)
        });
        return false
    });
    var D = function (a, c) {
        var d = b(a).closest(".sc-time-span"),
            e = d.find(".sc-buffer"),
            f = d.find(".sc-waveform-container img"),
            g = d.closest(".sc-player"),
            h = Math.min(e.width(), c - f.offset().left) / f.width();
        z(g, h)
    };
    var E = function (a) {
        if (a.targetTouches.length === 1) {
            D(a.target, a.targetTouches && a.targetTouches.length && a.targetTouches[0].clientX);
            a.preventDefault()
        }
    };
    b(".sc-time-span").live("click", function (a) {
        D(this, a.pageX);
        return false
    }).live("touchstart", function (a) {
        this.addEventListener("touchmove", E, false);
        a.originalEvent.preventDefault()
    }).live("touchend", function (a) {
        this.removeEventListener("touchmove", E, false);
        a.originalEvent.preventDefault()
    });
    var F = function (a, c) {
        var d = b(a),
            e = d.offset().left,
            f = d.width(),
            h = function (a) {
                return Math.floor((a - e) / f * 100)
            }, i = function (a) {
                g.trigger({
                    type: "scPlayer:onVolumeChange",
                    volume: h(a.pageX)
                })
            };
        d.bind("mousemove.sc-player", i);
        i(c)
    };
    var G = function (a, c) {
        b(a).unbind("mousemove.sc-player")
    };
    b(".sc-volume-slider").live("mousedown", function (a) {
        F(this, a)
    }).live("mouseup", function (a) {
        G(this, a)
    });
    g.bind("scPlayer:onVolumeChange", function (a) {
        b("span.sc-volume-status").css({
            width: a.volume + "%"
        })
    });
    b(function () {
        if (b.isFunction(b.scPlayer.defaults.onDomReady)) {
            b.scPlayer.defaults.onDomReady()
        }
    })
})(jQuery);

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
/* (c) 2008-2012 Add This, LLC */
if (!((window._atc || {}).ver)) {
    var _atd = "www.addthis.com/",
        _atr = "//s7.addthis.com/",
        _euc = encodeURIComponent,
        _duc = decodeURIComponent,
        _atc = {
            rrev: 114791,
            dr: 0,
            ver: 250,
            loc: 0,
            enote: "",
            cwait: 500,
            bamp: 0.25,
            camp: 1,
            csmp: 0.0001,
            damp: 0,
            famp: 0.02,
            pamp: 0.2,
            tamp: 1,
            lamp: 1,
            vamp: 1,
            vrmp: 0.0001,
            ohmp: 0,
            ltj: 1,
            xamp: 1,
            abf: !! window.addthis_do_ab,
            qs: 0,
            cdn: 0,
            rsrcs: {
                bookmark: _atr + "static/r07/bookmark018.html",
                atimg: _atr + "static/r07/atimg018.html",
                countercss: _atr + "static/r07/counter002.css",
                counterIE67css: _atr + "static/r07/counterIE67002.css",
                counter: _atr + "static/r07/counter002.js",
                core: _atr + "static/r07/core023.js",
                wombat: _atr + "static/r07/bar007.js",
                qbarcss: _atr + "bannerQuirks.css",
                fltcss: _atr + "static/r07/floating001.css",
                barcss: _atr + "static/r07/banner004.css",
                barjs: _atr + "static/r07/banner001.js",
                contentcss: _atr + "static/r07/content005.css",
                contentjs: _atr + "static/r07/content005.js",
                ssojs: _atr + "static/r07/sso002.js",
                ssocss: _atr + "static/r07/sso000.css",
                peekaboocss: _atr + "static/r07/peekaboo002.css",
                overlayjs: _atr + "static/r07/overlay004.js",
                widget32css: _atr + "static/r07/widgetbig045.css",
                widgetcss: _atr + "static/r07/widget086.css",
                widgetIE67css: _atr + "static/r07/widgetIE67002.css",
                widgetpng: "//s7.addthis.com/static/r07/widget045.png",
                link: _atr + "static/r07/link.html",
                pinit: _atr + "static/r07/pinit005.html",
                linkedin: _atr + "static/r07/linkedin018.html",
                tweet: _atr + "static/r07/tweet018.html",
                menujs: _atr + "static/r07/menu116.js",
                sh: _atr + "static/r07/sh090.html"
            }
        };
}(function () {
    var f;
    var j = (window.location.protocol == "https:"),
        x, o, c = {
            0: _atr,
            1: "//ct1.addthis.com/",
            2: "//ct2.addthis.com/",
            3: "//ct3.addthis.com/",
            4: "//ct4.addthis.com/",
            100: "//ct0.addthis.com/"
        }, u = Math.random();
    _atc.cdn = 0;
    if (!window.addthis || window.addthis.nodeType !== f) {
        try {
            x = window.navigator ? (navigator.userLanguage || navigator.language) : "";
            o = x.split("-").pop().toLowerCase() == "us";
            _atc.cdn = j ? 0 : (window.addthis_cdn || (u >= 0.99 ? 100 : (u >= 0.98 ? 2 : (u >= 0.97 ? 3 : (u >= 0.96 && o ? 4 : (u >= 0.95 && o ? 1 : 0))))));
            if (_atc.cdn) {
                for (var q in _atc.rsrcs) {
                    if (_atc.rsrcs.hasOwnProperty(q)) {
                        _atc.rsrcs[q] = _atc.rsrcs[q].replace(_atr, c[_atc.cdn]).replace(/live\/[a-z]07/, "live/d07");
                    }
                }
                _atr = c[_atc.cdn];
            }
        } catch (v) {}
        function b(r, k, e, a) {
            return function () {
                if (!this.qs) {
                    this.qs = 0;
                }
                _atc.qs++;
                if (!((this.qs++ > 0 && a) || _atc.qs > 1000) && window.addthis) {
                    window.addthis.plo.push({
                        call: r,
                        args: arguments,
                        ns: k,
                        ctx: e
                    });
                }
            };
        }
        function p(k) {
            var e = this,
                a = this.queue = [];
            this.name = k;
            this.call = function () {
                a.push(arguments);
            };
            this.call.queuer = this;
            this.flush = function (y, s) {
                this.flushed = 1;
                for (var r = 0; r < a.length; r++) {
                    y.apply(s || e, a[r]);
                }
                return y;
            };
        }
        window.addthis = {
            ost: 0,
            cache: {},
            plo: [],
            links: [],
            ems: [],
            timer: {
                load: ((new Date()).getTime())
            },
            _Queuer: p,
            _queueFor: b,
            data: {
                getShareCount: b("getShareCount", "data")
            },
            bar: {
                show: b("show", "bar"),
                initialize: b("initialize", "bar")
            },
            login: {
                initialize: b("initialize", "login"),
                connect: b("connect", "login")
            },
            box: b("box"),
            button: b("button"),
            counter: b("counter"),
            count: b("count"),
            toolbox: b("toolbox"),
            update: b("update"),
            init: b("init"),
            ad: {
                event: b("event", "ad"),
                getPixels: b("getPixels", "ad")
            },
            util: {
                getServiceName: b("getServiceName")
            },
            ready: b("ready"),
            addEventListener: b("addEventListener", "ed", "ed"),
            removeEventListener: b("removeEventListener", "ed", "ed"),
            user: {
                getID: b("getID", "user"),
                getGeolocation: b("getGeolocation", "user", null, true),
                getPreferredServices: b("getPreferredServices", "user", null, true),
                getServiceShareHistory: b("getServiceShareHistory", "user", null, true),
                ready: b("ready", "user"),
                isReturning: b("isReturning", "user"),
                isOptedOut: b("isOptedOut", "user"),
                isUserOf: b("isUserOf", "user"),
                hasInterest: b("hasInterest", "user"),
                isLocatedIn: b("isLocatedIn", "user"),
                interests: b("getInterests", "user"),
                services: b("getServices", "user"),
                location: b("getLocation", "user")
            },
            session: {
                source: b("getSource", "session"),
                isSocial: b("isSocial", "session"),
                isSearch: b("isSearch", "session")
            },
            _pmh: new p("pmh")
        };
        var l = document.getElementsByTagName("script")[0];

        function d(a) {
            a.style.width = a.style.height = "1px";
            a.style.position = "absolute";
            a.style.zIndex = 100000;
        }
        if (document.location.href.indexOf(_atr) == -1) {
            var m = document.getElementById("_atssh");
            if (!m) {
                m = document.createElement("div");
                m.style.visibility = "hidden";
                m.id = "_atssh";
                d(m);
                l.parentNode.appendChild(m);
            }
            function g(a) {
                if (addthis._pmh.flushed) {
                    _ate.pmh(a);
                } else {
                    addthis._pmh.call(a);
                }
            }
            if (window.postMessage) {
                if (window.attachEvent) {
                    window.attachEvent("onmessage", g);
                } else {
                    if (window.addEventListener) {
                        window.addEventListener("message", g, false);
                    }
                }
            }
            if (!m.firstChild) {
                var h, t = navigator.userAgent.toLowerCase(),
                    n = Math.floor(Math.random() * 1000);
                if (/msie/.test(t) && !(/opera/.test(t))) {
                    m.innerHTML = "<iframe id=\"_atssh" + n + "\" width=\"1\" height=\"1\" title=\"AddThis utility frame\" name=\"_atssh" + n + "\" src=\"\">";
                    h = document.getElementById("_atssh" + n);
                } else {
                    h = document.createElement("iframe");
                    h.id = "_atssh" + n;
                    h.title = "AddThis utility frame";
                    m.appendChild(h);
                }
                d(h);
                h.frameborder = h.style.border = 0;
                h.style.top = h.style.left = 0;
                _atc._atf = h;
            }
        }
        var w = document.createElement("script");
        w.type = "text/javascript";
        w.src = (j ? "https:" : "http:") + _atc.rsrcs.core;
        l.parentNode.appendChild(w);
        var i = 10000;
        if (Math.random() < _atc.ohmp) {
            setTimeout(function () {
                if (!window.addthis.timer.core) {
                    (new Image()).src = "//m.addthisedge.com/live/t00/oh.gif?" + Math.floor(Math.random() * 4294967295).toString(36) + "&cdn=" + _atc.cdn + "&sr=" + _atc.ohmp + "&rev=" + _atc.rrev + "&to=" + i;
                    if (_atc.cdn !== 0) {
                        var e = document.createElement("script");
                        e.type = "text/javascript";
                        e.src = (j ? "https:" : "http:") + _atr + "static/r07/core023.js";
                        l.parentNode.appendChild(e);
                    }
                }
            }, i);
        }
    }
})();
$(document).ready(function() {
		$("#form1").validationEngine({
			ajaxSubmit: false,
			success :  false,
			failure : function() {}
		})	
	});
	
  $(function() {
    $("button[rel]").overlay({mask: '#000'});
  });

