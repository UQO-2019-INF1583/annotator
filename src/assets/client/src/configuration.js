// -*- Mode: JavaScript; tab-width: 2; indent-tabs-mode: nil; -*-
// vim:set ft=javascript ts=2 sw=2 sts=2 cindent:
var Configuration = (function(window, undefined) {
    var Configuration = function() {
        var that = this;
        that.abbrevsOn = true;
        that.textBackgrounds = "striped";
        that.svgWidth = '100%';
        that.rapidModeOn = false;
        that.confirmModeOn = true;
        that.autorefreshOn = false;
        that.visual = {
            margin: { x: 2, y: 1 },
            arcTextMargin: 1,
            boxSpacing: 1,
            curlyHeight: 4,
            arcSpacing: 9, //10;
            arcStartHeight: 19, //23; //25;
        };
    };

    return Configuration;
})(window);

// BRAT STANDALONE LIBRARY BEGIN
// Browserify export
module.exports = Configuration;
// BRAT STANDALONE LIBRARY END