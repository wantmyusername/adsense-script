document.addEventListener("DOMContentLoaded", function () {
    const urlHash = window.location.hash;
    const hashParams = new URLSearchParams(urlHash.substr(1)); // Elimina el símbolo # del hash

    const overlay = document.createElement("div");
    const modal = document.createElement("div");
    const expanderButton = document.createElement("button");

    overlay.id = "overlay";
    modal.id = "modal";
    expanderButton.id = "expander";
    expanderButton.textContent = "Expander para leer el artículo completo";
    expanderButton.addEventListener("click", function () {
        window.location.href = "./#modal=off";
    });

    document.body.appendChild(overlay);
    document.body.appendChild(modal);
    modal.appendChild(expanderButton);

    const styles = `
    body {
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    .content {
      width: 80%;
      margin: 0 auto;
      padding: 20px;
    }

    #overlay {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(0deg, rgb(2 0 36) 0.75%, rgb(0 0 0 / 0%) 100%);
      z-index: 1000;
    }

    #modal {
      display: none;
      position: fixed;
      top: 90%;
      left: 50%;
      transform: translate(-50%, -50%);
      z-index: 1001;
      width: 300px;
    }

    #expander {
      padding: 10px 20px;
      cursor: pointer;
      background-color: #2470ce !important;
      border: 2px solid#14509c !important;
      border-radius: 5px;
      color: #fff!important;
      display: inline-block;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
    `;

    const styleSheet = document.createElement("style");
    styleSheet.type = "text/css";
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);

    const maxScrollValue = 800 - 100;
    let isModalVisible = false;

    function scrollHandler() {
        if (!isModalVisible && window.scrollY >= maxScrollValue) {
            overlay.style.display = "block";
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            isModalVisible = true;
        }
    }

    if (hashParams.get("modal") !== "off") {
        window.addEventListener("scroll", scrollHandler);

        expanderButton.addEventListener("click", function () {
            overlay.style.display = "none";
            modal.style.display = "none";
            document.body.style.overflow = "auto";
            isModalVisible = false;
        });
    } else {
        overlay.style.display = "none";
        modal.style.display = "none";
    }

    overlay.addEventListener("mousewheel", function (event) {
        event.preventDefault();
    });

    overlay.addEventListener("touchstart", function (event) {
        event.preventDefault();
    });

    expanderButton.addEventListener("mousewheel", function (event) {
        event.preventDefault();
    });

    window.addEventListener("hashchange", function () {
        const newHash = window.location.hash;
        const newHashParams = new URLSearchParams(newHash.substr(1));

        if (newHashParams.get("modal") === "off") {
            overlay.style.display = "none";
            modal.style.display = "none";
            window.removeEventListener("scroll", scrollHandler);
        }
    });

    

// Event listener para volver al inicio cuando se pasa la mitad de la página
window.addEventListener("scroll", function () {
    if (hashParams.get("modal") !== "off" && window.scrollY > maxScrollValue) {
        // Hacer scroll hacia arriba de manera suave solo si el modal no está desactivado y se ha pasado el umbral
        window.scrollTo({
            top: 0,
            behavior: "auto"
        });
    }
});


    const scrollButtons = document.querySelectorAll(".scroll-button");
    for (const scrollButton of scrollButtons) {
        scrollButton.addEventListener("click", function () {
            overlay.style.display = "block";
            modal.style.display = "block";
            document.body.style.overflow = "hidden";
            isModalVisible = true;
        });
    }
});