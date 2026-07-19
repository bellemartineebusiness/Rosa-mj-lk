(function () {
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var customerId = script.getAttribute('data-customer-id');
  if (!customerId) return;

  // Auto-detect the site's primary brand color
  function detectColor() {
    var docStyle = getComputedStyle(document.documentElement);

    // 1. Common CSS custom properties
    var cssVars = ['--primary', '--brand', '--accent', '--color-primary', '--brand-color',
                   '--theme-color', '--clr-primary', '--color-accent', '--highlight'];
    for (var i = 0; i < cssVars.length; i++) {
      var val = docStyle.getPropertyValue(cssVars[i]).trim();
      if (val && /^#[0-9a-fA-F]{3,6}$/.test(val)) return val;
      if (val && /^rgb/.test(val)) return rgbToHex(val);
    }

    // 2. Scan all buttons and links for a colored background
    var els = document.querySelectorAll('button, a, [role="button"]');
    for (var j = 0; j < els.length; j++) {
      var bg = getComputedStyle(els[j]).backgroundColor;
      if (!bg || bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') continue;
      var hex = rgbToHex(bg);
      if (hex && !isGrayOrWhiteOrBlack(hex)) return hex;
    }

    return null;
  }

  function rgbToHex(rgb) {
    var m = rgb.match(/(\d+),\s*(\d+),\s*(\d+)/);
    if (!m) return null;
    return '#' + [m[1], m[2], m[3]].map(function (n) {
      return ('0' + parseInt(n).toString(16)).slice(-2);
    }).join('');
  }

  function isGrayOrWhiteOrBlack(hex) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    // Skip near-white, near-black, and near-gray (low saturation)
    if (r > 230 && g > 230 && b > 230) return true;
    if (r < 25  && g < 25  && b < 25)  return true;
    if (max - min < 30) return true;
    return false;
  }

  var color = script.getAttribute('data-color') || detectColor() || '';

  var origin = script.src.replace(/\/widget\.js.*$/, '');

  function mountWidget() {
    var iframe = document.createElement('iframe');
    var src = origin + '/widget/' + customerId;
    if (color) src += '?color=' + encodeURIComponent(color);
    iframe.src = src;
    iframe.setAttribute('allowtransparency', 'true');
    iframe.setAttribute('frameborder', '0');
    iframe.setAttribute('scrolling', 'no');
    iframe.style.cssText = [
      'position:fixed',
      'bottom:0',
      'right:0',
      'width:min(420px,100vw)',
      'height:min(640px,100vh)',
      'border:none',
      'z-index:2147483647',
      'background:transparent',
      'pointer-events:auto',
    ].join(';');
    document.body.appendChild(iframe);
  }

  var statusUrl = origin + '/api/widget-status?customerId=' + encodeURIComponent(customerId);
  fetch(statusUrl)
    .then(function (res) { return res.json(); })
    .then(function (data) { if (data.active) mountWidget(); })
    .catch(function () { /* tyst fel — visa inte widgeten */ });
})();
