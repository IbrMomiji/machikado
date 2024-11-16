const ts = performance.now();
/* ======================== TEST ======================== */
console.log("%c見ないで", "font-size:100px; color:red;");
console.assert(document.getElementById("debug"), "'debug'IDはありません"); 
/* ================= IE user Redirect =================== */
var userAgent = window.navigator.userAgent.toLowerCase();
if(userAgent.indexOf('msie') != -1 || userAgent.indexOf('trident') != -1) {
    window.location.href('pages/IE.html')
}
/* ====================== HTML get ====================== */
const elements = document.querySelectorAll('*');
const elementData = Array.from(elements).map((element, index) => {
  return {
    index: index + 1,
    name: element.tagName.toLowerCase(), 
    line: getLineNumberOfElement(element), 
  };
});
console.table(elementData);
function getLineNumberOfElement(element) {
  let lineNumber = 1;
  let currentNode = element;
  while (currentNode.previousSibling) {
    currentNode = currentNode.previousSibling;
    lineNumber++;
  }
  return lineNumber;
}
/* ====================== TIMER END ====================== */
const te = performance.now();
console.log('disposal time :: ', (te - ts).toFixed(2), 'ms');
/* ===================== COOKIE TEST ===================== */
function trackPageNavigation() {
    let pageVisits = parseInt(getCookie('pageVisits')) || 0;
    pageVisits++;
    setCookie('pageVisits', pageVisits, 30);
    console.log('ページ移動回数:', pageVisits);
  }
  window.onload = trackPageNavigation;
  window.addEventListener('popstate', trackPageNavigation);
  window.addEventListener('pushstate', trackPageNavigation);
  window.addEventListener('replacestate', trackPageNavigation);
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `; expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}${expires}; path=/`;
  }
/* ======================== YOUR IP ======================= */
$.ajax({
    url: "https://ipinfo.io",
    dataType: "jsonp",
    success: function(res){
         $(".ip-address").text(res.ip);
    }
});