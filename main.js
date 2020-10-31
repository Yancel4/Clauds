
       
(function () {
  var openComment, styles, time, writeStyleChar, writeStyles;

  styles = "\nbody {\n  background-color: #1a1c24; color: #fff;\n  font-size: 13px; line-height: 1.4;\n  -webkit-font-smoothing: subpixel-antialiased;\n}\n\npre { \n  position: fixed; width: 28%;\n  top: 0px; bottom: 40px; left: 05%;\n  transition: left 450ms;\n  overflow: auto;\n  background-color: #313744; color: #a6c3d4;\n  border: 1px solid rgba(0,0,0,0.2);\n  padding: 24px 12px;\n  box-sizing: border-box;\n  border-radius: 3px;\n  box-shadow: 0px 4px 0px 2px rgba(0,0,0,0.1);\n}\n\npre em:not(.comment) { font-style: normal; }\n\n.comment       { color: #707e84; }\n.selector      { color: #c66c75; }\n.selector .key { color: #c66c75; }\n.key           { color: #c7ccd4; }\n.value         { color: #d5927b; }\n\n.bola {\n  height: 150px;\n  width: 150px;\n  background-color: DodgerBlue;\n  margin: 100px 100px 100px 400px;\n  border-radius: 50%;\n}\n.sombra {\n  height: 20px;\n  width: 150px;\n  margin: 22px 400px;\n  background-image: radial-gradient(ellipse, white 25%, #1a1c24 60%);\n}\n.bola {\n  animation: subir-bajar 1s infinite; \n}\n@keyframes subir-bajar { \n  50% {  \n    transform: translateY(-20%);  \n  }  \n}\n.bola + .sombra { \n  animation: transparencia 1s infinite;\n}\n@keyframes transparencia {    \n  50% {  \n    opacity: 0.1;\n  } \n}";

  openComment = false;

  writeStyleChar = function (which) {
    // begin wrapping open comments
    if (which === '/' && openComment === false) {
      openComment = true;
      styles = $('#style-text').html() + which;
    } else if (which === '/' && openComment === true) {
      openComment = false;
      styles = $('#style-text').html().replace(/(\/[^\/]*\*)$/, '<em class="comment">$1/</em>');
      // wrap style declaration
    } else if (which === ':') {
      styles = $('#style-text').html().replace(/([a-zA-Z- ^\n]*)$/, '<em class="key">$1</em>:');
      // wrap style value 
    } else if (which === ';') {
      styles = $('#style-text').html().replace(/([^:]*)$/, '<em class="value">$1</em>;');
      // wrap selector
    } else if (which === '{') {
      styles = $('#style-text').html().replace(/(.*)$/, '<em class="selector">$1</em>{');
    } else {
      styles = $('#style-text').html() + which;
    }
    $('#style-text').html(styles);
    return $('#style-tag').append(which);
  };

  writeStyles = function (message, index, interval) {
    var pre;
    if (index < message.length) {
      pre = document.getElementById('style-text');
      pre.scrollTop = pre.scrollHeight;
      writeStyleChar(message[index++]);
      return setTimeout(function () {
        return writeStyles(message, index, interval);
      }, interval);
    }
  };
   // appending the tags I'll need.
 $('body').append("  <style id=\"style-tag\"></style>\n<span id=\"echo\"></span>\n<div class=\"bola\"></div>\n<div class=\"sombra\"></div>\n<pre id=\"style-text\"></pre>");

time = window.innerWidth <= 578 ? 4 : 16;
  // starting it off
  writeStyles(styles, 1, time);

}).call(this);

    

