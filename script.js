<script>
// Creamos un nuevo elemento div para el fondo del tpGateway.
var tpGatewayBackground = document.createElement('div');
tpGatewayBackground.setAttribute('id', 'tp-gateway-background');
tpGatewayBackground.setAttribute('class', 'tp-gateway-background');

// Creamos un nuevo elemento div para el oscurecimiento del tpGateway.
var tpGatewayBackgroundBlackout = document.createElement('div');
tpGatewayBackgroundBlackout.setAttribute('id', 'tp-gateway-background-blackout');
tpGatewayBackgroundBlackout.setAttribute('class', 'tp-gateway-background-blackout');

// Creamos un nuevo elemento div para el tpGateway principal.
var tpGateway = document.createElement('div');
tpGateway.setAttribute('id', 'tp-gateway');
tpGateway.setAttribute('class', 'tp-gateway');

// Obtenemos la URL actual y agregamos el parámetro 'expand_article' con valor '1'.
gatewayURL = new URL(window.location.href);
gatewayURL.searchParams.append('expand_article', '1');

// Creamos un nuevo elemento 'a' para el botón del tpGateway.
var tpGatewayButton = document.createElement('a');
var customText = document.createTextNode('Expandir para mostrar el artículo completo');
tpGatewayButton.appendChild(customText);
tpGatewayButton.setAttribute('id', 'tp-gateway-button');
tpGatewayButton.setAttribute('class', 'tp-gateway-button');
tpGatewayButton.setAttribute('href', gatewayURL.href);

// Añadimos el botón del tpGateway al elemento tpGateway.
tpGateway.appendChild(tpGatewayButton);

// Definimos una variable global para habilitar el uso del tpGwjsonpg.
window.tpGwjsonpg = true;

// Agregamos un evento onscroll que mostrará el tpGateway cuando se haga scroll en la página.
window.onscroll = function() {
  if (window.scrollY >= Math.max(0, (800 - 100)) && typeof __tp_show_gateway !== 'undefined') {
    __tp_show_gateway();
  }
};

// Agregamos un evento onload que insertará los elementos del tpGateway al comienzo del body una vez cargada la página.
window.onload = function() {
  document.body.insertBefore(tpGateway, document.body.firstChild);
  document.body.insertBefore(tpGatewayBackground, document.body.firstChild);
  document.body.insertBefore(tpGatewayBackgroundBlackout, document.body.firstChild);
};

var versionPixelFired = false;
let isInit = false;
let isGwd = false;
function __tp_init_gateway() {
    isInit = true;
    firepx();
    setInitCookie();
    checkGwd();
}
function setInitCookie() {
    let expireTime = (new Date(Date.now() + 300000)).toUTCString();
    let version = -1;
    if (typeof window.tpgwb !== 'undefined' && typeof window.tpgwb.version !== 'undefined' && !isNaN(window.tpgwb.version)) {
        version = parseInt(window.tpgwb.version);
    }
    let intCookie = "tpgwv=" + version + "; expires=" + expireTime + "; path=/";
    document.cookie = intCookie;
}
function checkGwd() {
    if (window.hideGatewayButton === true) {
        isGwd = true;
        return
    }
    if (typeof window.tpgwb !== 'undefined' && typeof window.tpgwb.version !== 'undefined' && (window.tpgwb.version === -1 || isNaN(window.tpgwb.version))) {
        isGwd = true;
        return
    }
    let minPageLength = window.innerHeight * 2.5;
    if (getPageLength() <= minPageLength) {
        isGwd = true;
        return
    }
    let seenVignette = getCookie("tpvignetteviewed");
    let confirmedShowMore = getCookie("tpgwcc");
    if (seenVignette !== "" || confirmedShowMore !== "") {
        isGwd = true;
        return
    }
}
function __tp_show_gateway() {
    if (isInit !== true) {
        __tp_init_gateway();
    }
    if (isGwd === false) {
        let triggerLength = 800;
        if (typeof window.tpcustscry !== 'undefined') {
            triggerLength = window.tpcustscry;
        }
        let gateway = document.getElementById("tp-gateway");
        let gatewaybg = document.getElementById("tp-gateway-background");
        if (!gateway || !gatewaybg) {
            return;
        }
        scrollEventThrottle((scrollPosition,prevScrollPos)=>{
            let head = 100;
            let buffer = 2;
            let tail = 50;
            let headStart = triggerLength - head;
            let tailStart = triggerLength;
            let tailEnd = tailStart + tail;
            let bufferEnd = tailEnd + buffer;
            function progress(current, start, stop, max) {
                let p = current - start;
                let d = stop - start;
                return Math.min(Math.max((p / d) * max, 0), max)
            }
            if (scrollPosition < headStart) {
                gateway.style.display = "none";
                gatewaybg.style.display = "none";
            } else {
                gateway.style.display = "flex";
                gatewaybg.style.display = "block";
            }
            if (scrollPosition >= headStart && scrollPosition <= bufferEnd) {
                gatewaybg.style.opacity = progress(scrollPosition, headStart, tailStart, 0.75);
            }
            if (scrollPosition > bufferEnd) {
                if ('scrollBehavior'in document.documentElement.style) {
                    window.scrollTo({
                        top: tailEnd,
                        left: 0,
                        behavior: 'instant',
                    });
                } else {
                    window.scrollTo(0, tailEnd);
                }
            }
        }
        );
        let gwClickBtn = document.getElementById("tp-gateway-button");
        if (gwClickBtn) {
            gwClickBtn.onclick = function() {
                let expireTime = (new Date(Date.now() + 300000)).toUTCString();
                let intCookie = "tpgwcc=1; expires=" + expireTime + "; path=" + window.location.pathname;
                document.cookie = intCookie;
            }
        }
    }
}
;function firepx() {
    if (!versionPixelFired && typeof window.tpgwb !== 'undefined' && typeof window.tpgwb.version !== 'undefined') {
        let gatewayVersion = -1;
        if (!isNaN(window.tpgwb.version)) {
            gatewayVersion = parseInt(window.tpgwb.version);
        }
        __tp.bit.AddAndFire(window["_tpaq"]["page_view_id"], [(new __tpDotData('show_more_version',gatewayVersion))]);
        versionPixelFired = true;
    }
}
window.addEventListener("beforeunload", function(e) {
    sessionStorage.setItem("position", window.scrollY);
});
function scrollEventThrottle(fn) {
    let scrollPosition = 0;
    let ticking = false;
    window.addEventListener("scroll", function() {
        let prevScrollPos = scrollPosition;
        scrollPosition = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function() {
                fn(scrollPosition, prevScrollPos);
                ticking = false;
            });
            ticking = true;
        }
    });
}
function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function getPageLength() {
    return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
}
</script>
<style>
    .tp-gateway {
    display: none;
    bottom: 20vh;
    left: 0;
    -webkit-box-align: center;
    align-items: center;
    box-sizing: border-box;
    flex-direction: column;
    margin: 0 auto;
    padding: 20px;
    position: fixed;
    text-align: left;
    width: 100%;
    z-index: 99000;
    height: auto;
    opacity: 1;
}
.tp-gateway-background {
    display: none;
    position: fixed;
    top: 0;
    z-index: 99000;
    height: 100vh;
    width: 100vw;
    pointer-events: none;
    background: linear-gradient(transparent,#000);
    opacity: 0;
}


.tp-gateway-button {
    background-color: #2470ce;
    border: 2px solid#14509c;
    border-radius: 30px;
    box-shadow: 0 4px 10px rgb(0 0 0/16%);
    color: #fff!important;
    display: inline-block;
    text-align: center;
    font-size: 16px;
    text-rendering: optimizeLegibility;
    font-family: -apple-system,arial,helvetica;
    font-weight: 700;
    line-height: 1.6;
    margin: 0 auto;
    min-width: 230px;
    padding: 14px 30px;
    text-decoration: none;
}
</style>
