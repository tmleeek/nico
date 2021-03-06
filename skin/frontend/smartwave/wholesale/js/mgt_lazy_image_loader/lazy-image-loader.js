/*
 *  JAIL: jQuery Asynchronous Image Loader
 *
 * Copyright (c) 2011 Sebastiano Armeli-Battana (http://www.sebastianoarmelibattana.com)
 *
 * By Sebastiano Armeli-Battana (@sebarmeli) - http://www.sebastianoarmelibattana.com
 * Licensed under the MIT license.
 * https://github.com/sebarmeli/JAIL/blob/master/MIT-LICENSE.txt
 *
 * Tested with jQuery 1.3.2+ on FF 2+, Opera 10+, Safari 4+, Chrome 8+ on Win/Mac/Linux and IE 6/7/8 on Win.
 *
 * Contributor : Derek Lindahl - dlindahl
 *
 * @link http://github.com/sebarmeli/JAIL
 * @author Sebastiano Armeli-Battana
 * @date 30/12/2011
 * @version 0.9.9
 *
 */

;//semicolon added as it breaks when enabling css merge

(function(a, c) {
    var b = c(jQuery),
        d = typeof define === "function" && define.amd;
    if (d) {
        define("jail", ["jquery"], b);
    } else {
        (this.jQuery || this.$ || this)[a] = b;
    }
}("jail", function(f) {
    var b = f(window),
        d = {
            timeout: 1,
            effect: false,
            speed: 400,
            triggerElement: null,
            offset: 0,
            event: "load",
            callback: null,
            callbackAfterEachImage: null,
            placeholder: false,
            loadHiddenImages: false
        },
        k = [],
        g = false;
    f.jail = function(o, n) {
        var o = o || {},
            n = f.extend({}, d, n);
        f.jail.prototype.init(o, n);
        if (/^(load|scroll)/.test(n.event)) {
            f.jail.prototype.later.call(o, n);
        } else {
            f.jail.prototype.onEvent.call(o, n);
        }
    };
    f.jail.prototype.init = function(o, n) {
        o.data("triggerEl", (n.triggerElement) ? f(n.triggerElement) : b);
        if (!!n.placeholder) {
            o.each(function() {
                f(this).attr("src", n.placeholder);
            });
        }
    };
    f.jail.prototype.onEvent = function(o) {
        var n = this;
        if (!!o.triggerElement) {
            i(o, n);
        } else {
            n.bind(o.event, {
                options: o,
                images: n
            }, function(s) {
                var r = f(this),
                    q = s.data.options,
                    p = s.data.images;
                k = f.extend({}, p);
                a(q, r);
                f(s.currentTarget).unbind(s.type);
            });
        }
    };
    f.jail.prototype.later = function(o) {
        var n = this;
        setTimeout(function() {
            k = f.extend({}, n);
            n.each(function() {
                c(o, this, n);
            });
            o.event = "scroll";
            i(o, n);
        }, o.timeout);
    };

    function i(o, n) {
        if (!!n) {
            var p = n.data("triggerEl");
        }
        if (!!p && typeof p.bind === "function") {
            p.bind(o.event, {
                options: o,
                images: n
            }, m);
            b.resize({
                options: o,
                images: n
            }, m);
        }
    }

    function j(n) {
        var o = 0;
        if (n.length > 0) {
            while (true) {
                if (o === n.length) {
                    break;
                } else {
                    if (n[o].getAttribute("data-src")) {
                        o++;
                    } else {
                        n.splice(o, 1);
                    }
                }
            }
        }
    }

    function m(p) {
        var n = p.data.images,
            o = p.data.options;
        n.data("poller", setTimeout(function() {
            k = f.extend({}, n);
            j(k);
            f(k).each(function() {
                if (this === window) {
                    return;
                }
                c(o, this, k);
            });
            if (l(k)) {
                f(p.currentTarget).unbind(p.type);
                return;
            } else {
                if (o.event !== "scroll") {
                    var q = (/scroll/i.test(o.event)) ? n.data("triggerEl") : b;
                    o.event = "scroll";
                    n.data("triggerEl", q);
                    i(o, f(k));
                }
            }
        }, o.timeout));
    }

    function l(n) {
        var o = true;
        f(n).each(function() {
            if (!!f(this).attr("data-src")) {
                o = false;
            }
        });
        return o;
    }

    function c(q, s, o) {
        var r = f(s),
            p = (/scroll/i.test(q.event)) ? o.data("triggerEl") : b,
            n = true;
        if (!q.loadHiddenImages) {
            n = h(r, p, q) && r.is(":visible");
        }
        if (n && e(p, r, q.offset)) {
            a(q, r);
        }
    }

    function e(u, n, s) {
        var q = u[0] === window,
            y = (q ? {
                top: 0,
                left: 0
            } : u.offset()),
            r = y.top + (q ? u.scrollTop() : 0),
            t = y.left + (q ? u.scrollLeft() : 0),
            p = t + u.width(),
            v = r + u.height(),
            x = n.offset(),
            w = n.width(),
            o = n.height();
        return (r - s) <= (x.top + o) && (v + s) >= x.top && (t - s) <= (x.left + w) && (p + s) >= x.left;
    }

    function a(n, o) {
        o.hide();
        o.attr("src", o.attr("data-src"));
        o.removeAttr("data-src");
        if (n.effect) {
            if (n.speed) {
                o[n.effect](n.speed);
            } else {
                o[n.effect]();
            }
            o.css("opacity", 1);
            o.show();
        } else {
            o.show();
        }
        j(k);
        if (!!n.callbackAfterEachImage) {
            n.callbackAfterEachImage.call(this, o, n);
        }
        if (l(k) && !!n.callback && !g) {
            n.callback.call(f.jail, n);
            g = true;
        }
    }

    function h(q, o, p) {
        var r = q.parent(),
            n = true;
        while (r.get(0).nodeName.toUpperCase() !== "BODY") {
            if (r.css("overflow") === "hidden") {
                if (!e(r, q, p.offset)) {
                    n = false;
                    break;
                }
            } else {
                if (r.css("overflow") === "scroll") {
                    if (!e(r, q, p.offset)) {
                        n = false;
                        f(k).data("triggerEl", r);
                        p.event = "scroll";
                        i(p, f(k));
                        break;
                    }
                }
            }
            if (r.css("visibility") === "hidden" || q.css("visibility") === "hidden") {
                n = false;
                break;
            }
            if (o !== b && r === o) {
                break;
            }
            r = r.parent();
        }
        return n;
    }
    f.fn.jail = function(n) {
        new f.jail(this, n);
        k = [];
        return this;
    };
    return f.jail;
}));