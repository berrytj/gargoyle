(function () {
    var M_methods = {
        in: function(list) {
            if (!_.isArray(list)) list = _.keys(list);
            return _(list).contains(this._orig);
        },

        // Like concat, but mutates the list it's called on.
        attach: function(list) {
            this._orig.push.apply(this._orig, list);
            return this;
        },

        get: function(key, fallback) {
            return _.get(this._orig, key, fallback);
        }
    };

    var M = window.M = function(input) {
        var M_object = _({}).extend(M_methods);
        M_object._orig = input;
        return M_object;
    };

    M.copy = function(obj) {
        return $.extend(true, {}, obj);
    };

    // Shims and such
    if (typeof window.console === "undefined") {
        window.console = {
            log: function () {
            }
        };
    }

    String.prototype.capitalize = function() {
        return this.charAt(0).toUpperCase() + this.slice(1);
    };

    if (!String.prototype.format) {
        String.prototype.format = function() {
            var args = arguments;
            var using_indices = this.match(/{\d+}/);

            if (using_indices) {
                return this.replace(/{(\d+)}/g, function(match, num) {
                    return _.isUndefined(args[num])? match : args[num];
                });
            } else {
                var i = 0;
                return this.replace(/{}/g, function(match) {
                    var replacement = _.isUndefined(args[i])? match : args[i];
                    i++;
                    return replacement;
                });
            }
        };
    }

    if(!String.prototype.contains) {
        String.prototype.contains = function(str, startIndex) {
            return -1 !== String.prototype.indexOf.call(this, str, startIndex);
        };
    }

    if (!Function.prototype.bind) {
        Function.prototype.bind = function (oThis) {
            if (typeof this !== "function") {
                // closest thing possible to the ECMAScript 5 internal IsCallable function
                throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
            }

            var aArgs = Array.prototype.slice.call(arguments, 1),
                fToBind = this,
                fNOP = function () {},
                fBound = function () {
                    return fToBind.apply(this instanceof fNOP && oThis
                        ? this
                        : oThis,
                        aArgs.concat(Array.prototype.slice.call(arguments)));
                };

            fNOP.prototype = this.prototype;
            fBound.prototype = new fNOP();

            return fBound;
        };
    }
})();
