var labelType, useGradients, nativeTextSupport, animate;

(function() {
  var ua = navigator.userAgent,
      iStuff = ua.match(/iPhone/i) || ua.match(/iPad/i),
      typeOfCanvas = typeof HTMLCanvasElement,
      nativeCanvasSupport = (typeOfCanvas == 'object' || typeOfCanvas == 'function'),
      textSupport = nativeCanvasSupport
        && (typeof document.createElement('canvas').getContext('2d').fillText == 'function');
  //I'm setting this based on the fact that ExCanvas provides text support for IE
  //and that as of today iPhone/iPad current text support is lame
  labelType = (!nativeCanvasSupport || (textSupport && !iStuff))? 'Native' : 'HTML';
  nativeTextSupport = labelType == 'Native';
  useGradients = nativeCanvasSupport;
  animate = !(iStuff || !nativeCanvasSupport);
})();

var Log = {
  elem: false,
  write: function(text){
    if (!this.elem)
      this.elem = document.getElementById('log');
    this.elem.innerHTML = text;
    this.elem.style.left = (500 - this.elem.offsetWidth / 2) + 'px';
  }
};


function init(){
    //init data

    var response = {
    "searchType": "DFS",
    "https://stackoverflow.com/questions": {
        "children": [
            "http://meta.stackoverflow.com",
            "https://stackoverflow.com/questions",
            "https://stackoverflow.com/questions",
            "https://stackoverflow.com/questions",
            "http://stackoverflow.com/company/about",
            "https://stackoverflow.com/questions",
            "https://stackoverflow.com/questions/ask",
            "https://stackoverflow.com/users/6553941/jorge-luis",
            "https://stackoverflow.com/users/6553941/jorge-luis",
            "https://stackoverflow.com/questions",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "https://stackoverflow.com/questions",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com"
        ],
        "kw": false
    },
    "https://stackoverflow.com/users/6553941/jorge-luis": {
        "children": [
            "http://meta.stackoverflow.com",
            "https://stackoverflow.com/users/6553941/jorge-luis",
            "https://stackoverflow.com/users/6553941/jorge-luis",
            "https://stackoverflow.com/users/6553941/jorge-luis",
            "http://stackoverflow.com/company/about",
            "https://stackoverflow.com/questions",
            "https://stackoverflow.com/questions/ask",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com"
        ],
        "kw": false
    },
    "https://stackoverflow.com/questions/ask": {
        "children": [
            "http://meta.stackoverflow.com",
            "https://stackoverflow.com/questions/ask",
            "https://stackoverflow.com/questions/ask",
            "https://stackoverflow.com/questions/ask",
            "http://stackoverflow.com/company/about",
            "https://stackoverflow.com/questions",
            "https://stackoverflow.com/questions/ask",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com"
        ],
        "kw": false
    },
    "http://meta.stackoverflow.com": {
        "children": [
            "http://meta.stackoverflow.com",
            "http://meta.stackoverflow.com",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://meta.stackoverflow.com/questions/tagged/review": {
        "children": [
            "http://meta.stackoverflow.com",
            "http://meta.stackoverflow.com",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://meta.stackoverflow.com/questions/tagged/review",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://meta.stackoverflow.com/users/811071/piotrpo": {
        "children": [
            "http://meta.stackoverflow.com",
            "http://meta.stackoverflow.com",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com/users/811071/piotrpo",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://gaming.stackexchange.com": {
        "children": [
            "http://gaming.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://stackoverflow.com/company/about",
            "http://gaming.stackexchange.com/?tab=month",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://gaming.stackexchange.com/?tab=month": {
        "children": [
            "http://gaming.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://gaming.stackexchange.com/?tab=month",
            "http://gaming.stackexchange.com/?tab=month",
            "http://gaming.stackexchange.com/?tab=month",
            "http://stackoverflow.com/company/about",
            "http://gaming.stackexchange.com/?tab=month",
            "http://gaming.stackexchange.com/?tab=month",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://wordpress.stackexchange.com": {
        "children": [
            "http://wordpress.stackexchange.com",
            "http://wordpress.stackexchange.com",
            "http://stackoverflow.com/company/about",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://bicycles.stackexchange.com": {
        "children": [
            "http://bicycles.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://stackoverflow.com/company/about",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://bicycles.stackexchange.com/questions/tagged/sprocket": {
        "children": [
            "http://bicycles.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://stackoverflow.com/company/about",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://bicycles.stackexchange.com/questions/tagged/racing": {
        "children": [
            "http://bicycles.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://stackoverflow.com/company/about",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/sprocket",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://bicycles.stackexchange.com/questions/tagged/racing",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://anime.stackexchange.com": {
        "children": [
            "http://anime.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://stackoverflow.com/company/about": {
        "children": [
            "http://meta.stackoverflow.com",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://meta.stackoverflow.com",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://mathoverflow.net": {
        "children": [
            "http://mathoverflow.net",
            "http://mathoverflow.net",
            "http://stackoverflow.com/company/about",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://mathoverflow.net/questions/tagged/special-functions": {
        "children": [
            "http://mathoverflow.net",
            "http://mathoverflow.net",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://stackoverflow.com/company/about",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://mathoverflow.net/questions/tagged/special-functions",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://mathoverflow.net/users/42326/mathstudent": {
        "children": [
            "http://mathoverflow.net",
            "http://mathoverflow.net",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://stackoverflow.com/company/about",
            "http://mathoverflow.net/users/42326/mathstudent",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://android.stackexchange.com": {
        "children": [
            "http://android.stackexchange.com",
            "http://android.stackexchange.com",
            "http://stackoverflow.com/company/about",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos": {
        "children": [
            "http://android.stackexchange.com",
            "http://android.stackexchange.com",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://stackoverflow.com/company/about",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://android.stackexchange.com/questions/69142/unable-to-play-snapchat-videos",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used": {
        "children": [
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://stackoverflow.com/company/about",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/users/16494/gerrit",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://ux.stackexchange.com/questions/101990/why-are-terminal-consoles-still-used",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://ux.stackexchange.com/users/16494/gerrit": {
        "children": [
            "http://ux.stackexchange.com/users/16494/gerrit",
            "http://ux.stackexchange.com/users/16494/gerrit",
            "http://ux.stackexchange.com/users/16494/gerrit",
            "http://stackoverflow.com/company/about",
            "http://ux.stackexchange.com/users/16494/gerrit",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://area51.stackexchange.com": {
        "children": [
            "http://area51.stackexchange.com/proposals/94426/comics-cartoons-animation"
        ],
        "kw": false
    },
    "http://area51.stackexchange.com/proposals/94426/comics-cartoons-animation": {
        "children": [
            "http://area51.stackexchange.com/proposals/94426/comics-cartoons-animation",
            "http://area51.stackexchange.com/proposals/94426/comics-cartoons-animation",
            "http://math.stackexchange.com/users/106234"
        ],
        "kw": false
    },
    "http://math.stackexchange.com/users/106234": {
        "children": [
            "http://math.stackexchange.com/users/106234",
            "http://math.stackexchange.com/users/106234",
            "http://math.stackexchange.com/users/106234",
            "http://stackoverflow.com/company/about",
            "http://math.stackexchange.com/help/badges/54/enthusiast?userid=106234",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    },
    "http://math.stackexchange.com/help/badges/54/enthusiast?userid=106234": {
        "children": [
            "http://math.stackexchange.com/help/badges/54/enthusiast?userid=106234",
            "http://math.stackexchange.com/help/badges/54/enthusiast?userid=106234",
            "http://math.stackexchange.com/help/badges/54/enthusiast?userid=106234",
            "http://stackoverflow.com/company/about",
            "http://stackoverflow.com/company/about",
            "http://wordpress.stackexchange.com",
            "http://android.stackexchange.com",
            "http://gaming.stackexchange.com",
            "http://bicycles.stackexchange.com",
            "http://anime.stackexchange.com",
            "http://mathoverflow.net",
            "http://area51.stackexchange.com"
        ],
        "kw": false
    }
}


var tempJSON =  Object.keys(response)[1];

var responseKeys = Object.keys(response);

console.log("These are the contents of responseKeys: " + JSON.stringify(responseKeys));

var json = {

    id: "0",
    name: "<a target='_blank' href = "+ JSON.stringify(tempJSON) +"><span title= "+JSON.stringify(tempJSON)+"><img src='./jack.png'></span></a>" + "Parent",
    children: [],
    data: {"$type" : "custom"}
}

console.log("This is the first node of json:" + JSON.stringify(json));

var count = Object.keys(response).length;

console.log("This is the count: "+ count);



var j = 0;

if(response.searchType == "BFS"){

    for(var i = 2; i < count; i++){
        
        console.log("This is the current count: " + i);


        json.children[i-2] = {
            id: String(i),
            name: "<a target='_blank' href = "+ JSON.stringify(responseKeys[i]) +"><span title= "+ JSON.stringify(responseKeys[i])+"><img src='./jack.png'></span></a>" + "Child",
            children: [],
            data: {"$type" : "custom"}
        }


        j++;

        var childObj = response[responseKeys[i]];
        console.log("childObj: " + JSON.stringify(childObj));
        var childKeys = Object.keys(childObj);
        console.log("childKeys: " + JSON.stringify(childKeys));
        var childCount = childKeys.length;
        console.log("childCount: " + childCount);


            var grandChildObj = childObj[childKeys[0]];

            for(key in grandChildObj){

                console.log("This is the key for grandChildObj: " + key);
                console.log("grandChildObj index: " + key + " is " + grandChildObj[key]);

                var tempGrandchild = grandChildObj[key];

                console.log(JSON.stringify(tempGrandchild));
                console.log("This is i:" + i);
                console.log(JSON.stringify(json.children[i-2]));

                json.children[i-2].children[key] = {
                  id: String(key) + "_" + String(i) + "_" + String(j),
                  name: "<a target='_blank' href = "+ JSON.stringify(tempGrandchild)+"><span title= "+JSON.stringify(tempGrandchild)+"><img src='./jack.png'></span></a>" + "Child",
                  children: [],
                  data: {"$type" : "custom"}
                }
                console.log(json.children[i-2].children[key].id);

            }
    }
}
else if(response.searchType == "DFS"){


    dfsRecur(json, responseKeys, count-2, 2);


}

function dfsRecur(obj, obj2, countdown, place){

    var keys = Object.keys(obj2);
    console.log("obj keys: " + JSON.stringify(keys));


    if(countdown > 0){
        
        childObj = obj[keys[place]];

        obj.children[0] = {
            id: String(countdown) + "_" + String(place),
            name: "<a target='_blank' href = "+ JSON.stringify(obj2[place]) +"><span title= "+ JSON.stringify(obj2[place])+"><img src='./jack.png'></span></a>" + "Child",
            children: [],
            data: {"$type" : "custom"}
        }

        dfsRecur(obj.children[0], obj2, countdown-1, place+1);
    }

}

function countKeysPerLevel(store, level, obj) {
    var keys = Object.keys(obj);
    var count = keys.length;

    store[level] = (store[level] || 0) + count;

    for (var i = 0; i < count; i++) {
        var childObj = obj[keys[i]];
        if (typeof childObj === 'object') {
            countKeysPerLevel(store, level + 1, childObj);
        }
    }
}

var result = {};
countKeysPerLevel(result, 0, json);

console.log("These are the results:");
console.log(JSON.stringify(json));

    //end
    var infovis = document.getElementById('infovis');
// <<<<<<< HEAD
    var w = 2000, h = 2300;
    
// =======
    

// >>>>>>> origin/master
    //init Hypertree
    var ht = new $jit.Hypertree({
      //id of the visualization container
      injectInto: 'infovis',
      //canvas width and height
      width: 5000,
      height: 7000,
      //Change node and edge styles such as
      //color, width and dimensions.
      Node: {
          dim: 9,
          color: "#f00",
          type: "circle",
          height: 10,
          width: 20
      },
      Edge: {
          lineWidth: 3,
          color: "#088"
      },
      onBeforeCompute: function(node){
          Log.write("centering");
      },
      //Attach event handlers and add text to the
      //labels. This method is only triggered on label
      //creation
      onCreateLabel: function(domElement, node){
          domElement.innerHTML = node.name;
          $jit.util.addEvent(domElement, 'click', function () {
              ht.onClick(node.id, {
                  onComplete: function() {
                      ht.controller.onComplete();
                  }
              });
          });
      },
      //Change node styles when labels are placed
      //or moved.
      onPlaceLabel: function(domElement, node){
          var style = domElement.style;
          style.display = '';
          style.cursor = 'pointer';
          if (node._depth <= 1) {
              style.fontSize = "0.8em";
              style.color = "#ddd";

          } else if(node._depth == 2){
              style.fontSize = "0.7em";
              style.color = "#555";

          } else {
              style.fontSize = "0.7em";
              style.color = "#555";

          }

          var left = parseInt(style.left);
          var w = domElement.offsetWidth;
          style.left = (left - w / 2) + 'px';
      },

      onComplete: function(){
          Log.write("done");

          //Build the right column relations list.
          //This is done by collecting the information (stored in the data property)
          //for all the nodes adjacent to the centered node.
          var node = ht.graph.getClosestNodeToOrigin("current");
          var html = "<h4>" + node.name + "</h4><b>Connections:</b>";
          html += "<ul>";
          node.eachAdjacency(function(adj){
              var child = adj.nodeTo;
              if (child.data) {
                  var rel = (child.data.band == node.name) ? child.data.relation : node.data.relation;
                  html += "<li>" + child.name + " " + "<div class=\"relation\">(relation: " + rel + ")</div></li>";
              }
          });
          html += "</ul>";
          $jit.id('inner-details').innerHTML = html;
      }
    });


    //load JSON data.
    ht.loadJSON(json);
    //compute positions and plot.
    ht.refresh();
    //end
    ht.controller.onComplete();


}

//Custom node
$jit.Hypertree.Plot.NodeTypes.implement({
  //// this node type is used for plotting resource types (web)
// <<<<<<< HEAD
//    'custom': 
//        { 'render': function(node, canvas) { 
//            var ctx = canvas.getCtx(); 
//            var img = new Image(); 
//            var pos = node.pos.getc(true); 
//            img.onload = function(){ 
//                ctx.drawImage(img,pos.x-25, pos.y-25); 
//            }; 
//            img.src = 'C:/Users/DarbyBeltran/Desktop/CS419/jack.png'; 
//           } 
//       } 
// });
// =======
   'custom':
       { 'render': function(node, canvas) {
           var ctx = canvas.getCtx();
           var img = new Image();
           var pos = node.pos.getc(true);
           img.onload = function(){
               ctx.drawImage(img,pos.x-15, pos.y-15);
           };
           img.src = './jack.png';
          }
      }
});
// >>>>>>> origin/master
