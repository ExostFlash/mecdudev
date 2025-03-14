document.addEventListener("DOMContentLoaded", function () {
  // Masquer le loader et afficher le contenu après un délai
  setTimeout(function () {
    document.getElementById("loader-wrapper").style.display = "none"; // Masquer le loader
    const content = document.getElementById("allcontainer");
    content.hidden = false; // Afficher le contenu

    setTimeout(function () {
      content.classList.add("show");
    }, 50);
  }, 1000); // Modifier cette valeur pour ajuster le temps de chargement
});
