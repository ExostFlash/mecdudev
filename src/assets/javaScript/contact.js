var url = document.location.origin + "/api";

document
  .getElementById("contact-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    const button = document.getElementById("contactButton");
    const originalText = button.textContent;
    button.disabled = true;
    button.textContent = "Le bouton est désactivé pendant 30 secondes...";

    setTimeout(() => {
      button.disabled = false;
      button.textContent = originalText;
    }, 30000);

    const data = {
      name: name,
      email: email,
      message: message,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Ajouter des en-têtes supplémentaires si nécessaire (comme les jetons d'authentification)
      },
      body: JSON.stringify(data), // Convertit FormData en JSON
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw err;
          });
        }
        return response.json();
      })
      .then((data) => {
        console.log("Réponse serveur :", data);
        // Traitez la réponse du serveur ici
        button.textContent =
          JSON.stringify(data.status) + " : " + JSON.stringify(data.message);

        if (data.message == "Données reçues et mail envoyé") {
          document.getElementById("name").value = "";
          document.getElementById("email").value = "";
          document.getElementById("message").value = "";
        }
      })
      .catch((error) => {
        console.error("Erreur lors de la requête :", error);
        // Gérez les erreurs ici
        button.textContent =
          "Erreur lors de la requête : " + JSON.stringify(data);
      });
  });

const textarea = document.getElementById("message");
textarea.addEventListener("input", autoResize, false);
textarea.addEventListener("blur", autoResizeOnBlur, false);

function autoResizeOnBlur() {
  autoResize();

  // Get the computed height of the textarea content (including padding and border)
  const computedHeight = this.scrollHeight;

  if (computedHeight > 43) {
    this.classList.add("scroll-enabled");
  } else {
    this.classList.remove("scroll-enabled");
  }
}

function autoResize() {
  const mirrorDiv = document.createElement("div");
  mirrorDiv.style.position = "absolute";
  mirrorDiv.style.visibility = "hidden";
  mirrorDiv.style.whiteSpace = "pre-wrap";
  mirrorDiv.style.wordWrap = "break-word";
  mirrorDiv.style.padding = textarea.style.padding;
  mirrorDiv.style.width = textarea.offsetWidth + "px";
  mirrorDiv.style.fontFamily = getComputedStyle(textarea).fontFamily;
  mirrorDiv.style.fontSize = getComputedStyle(textarea).fontSize;
  mirrorDiv.style.lineHeight = getComputedStyle(textarea).lineHeight;

  mirrorDiv.textContent = textarea.value + "\u200b"; // Add zero-width space to ensure height calculation

  document.body.appendChild(mirrorDiv);

  const newHeight = mirrorDiv.offsetHeight;
  textarea.style.height = newHeight + "px";

  document.body.removeChild(mirrorDiv);
}
