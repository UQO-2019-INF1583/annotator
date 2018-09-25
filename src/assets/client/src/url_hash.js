var URLHash = (function($, window, undefined) {
    var URLHash = function(collection, _document, _arguments) {
        var that = this;
        that.collection = collection;
        that.document = _document || '';
        that.arguments = _arguments || {};
        that.calcArgs();
    }

    URLHash.prototype = {
        calcArgs: function() {
            var args = URLHash.splitArgs(this.arguments);
            this.intArguments = args[0];
            this.extArguments = args[1];
        },

        setArgument: function(argument, value) {
            if (!this.arguments) {
                this.arguments = {};
            }
            this.arguments[argument] = value;
            this.calcArgs();
            return this;
        },

        setArguments: function(_arguments) {
            // the $.extend here basically takes a copy; raw assignment
            // would allow changes of the args to alter original, which
            // could be e.g. the "args" of search results
            this.arguments = $.extend({}, _arguments || {});
            this.calcArgs();
            return this;
        },

        setDocument: function(_document) {
            this.document = _document;
            return this;
        },

        setCollection: function(collection) {
            this.collection = collection;
            return this;
        },

        getHash: function() {
            var url_hash = this.collection + this.document;

            var url_args = Util.param(this.extArguments);

            if (url_args.length) {
                url_hash += '?' + url_args;
            }

            if (url_hash.length) {
                url_hash = '#' + url_hash;
            }

            return url_hash;
        },
    };

    // arguments that do not appear in the URL
    var INT_ARGS = ['match', 'matchfocus', 'edited'];

    URLHash.splitArgs = function(args) {
        var intArgs = {};
        var extArgs = $.extend({}, args);
        var intArgNameLen = INT_ARGS.length;
        for (var i = 0; i < intArgNameLen; i++) {
            intArgs[INT_ARGS[i]] = extArgs[INT_ARGS[i]];
            delete extArgs[INT_ARGS[i]];
        }
        return [intArgs, extArgs];
    };

    // TODO: Document and conform variables to the rest of the object
    URLHash.parse = function(hash) {
        if (hash.length) {
            // Remove the leading hash (#)
            hash = hash.substr(1);
        }

        var pathAndArgs = hash.split('?');
        var path = pathAndArgs[0] || '';
        var argsStr = pathAndArgs[1] || '';
        var coll;
        var slashPos = path.lastIndexOf('/');
        if (slashPos === -1) {
            coll = '/';
        } else {
            coll = path.substr(0, slashPos + 1);
            if (coll[coll.length - 1] !== '/') {
                coll += '/';
            }
            if (coll[0] !== '/') {
                coll = '/' + coll;
            }
        }
        var doc = path.substr(slashPos + 1);
        var args = Util.deparam(argsStr);
        return new URLHash(coll, doc, args);
    };

    return URLHash;
})(jQuery, window);

// BRAT STANDALONE LIBRARY BEGIN
// Browserify export
module.exports = URLHash;
// BRAT STANDALONE LIBRARY END
