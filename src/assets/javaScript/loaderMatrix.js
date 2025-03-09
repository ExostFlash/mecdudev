document.addEventListener("DOMContentLoaded", function () {
  // Masquer le loader et afficher le contenu après un délai
  setTimeout(function () {
    document.getElementById("loader-wrapper").style.display = "none"; // Masquer le loader
    const content = document.getElementById("allcontainer");
    content.hidden = false; // Afficher le contenu

    setTimeout(function () {
      content.classList.add("show");
    }, 50);

    // Utiliser setInterval pour vérifier périodiquement si content.hidden est false
    const checkContentHidden = setInterval(function () {
      if (!content.hidden) {
        clearInterval(checkContentHidden); // Arrêter la vérification périodique

        restoreScrollPosition();

        const canvas = document.getElementById("matrix");
        const ctx = canvas.getContext("2d");

        let width, height, columns, drops;
        const characters =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const fontSize = 16;

        function initializeMatrix() {
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
          columns = Math.floor(width / fontSize);
          drops = Array.from({ length: columns }).map(() => 1);
        }

        function drawMatrix() {
          ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);

          ctx.fillStyle = "darkred";
          ctx.font = `${fontSize}px monospace`;

          for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(
              Math.floor(Math.random() * characters.length)
            );
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
              drops[i] = 0;
            }

            drops[i]++;
          }
        }

        initializeMatrix();
        setInterval(drawMatrix, 50);

        window.addEventListener("resize", () => {
          initializeMatrix();
        });
      }
    }, 50); // Vérifier toutes les 50 ms
  }, 1000); // Modifier cette valeur pour ajuster le temps de chargement
});
