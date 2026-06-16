(function () {
  var script = document.currentScript || (function () {
    var scripts = document.getElementsByTagName('script');
    return scripts[scripts.length - 1];
  })();

  var customerId = script.getAttribute('data-customer-id');
  if (!customerId) return;

  var origin = script.src.replace(/\/widget\.js.*$/, '');

  var iframe = document.createElement('iframe');
  iframe.src = origin + '/widget/' + customerId;
  iframe.setAttribute('allowtransparency', 'true');
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute('scrolling', 'no');
  iframe.style.cssText = [
    'position:fixed',
    'bottom:0',
    'right:0',
    'width:420px',
    'height:640px',
    'border:none',
    'z-index:2147483647',
    'background:transparent',
    'pointer-events:auto',
  ].join(';');

  document.body.appendChild(iframe);
})();
