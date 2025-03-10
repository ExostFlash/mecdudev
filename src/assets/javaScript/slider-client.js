const nosClients = [
  {
    Name: "Instagram",
    Link: "instagram.com",
    Logo: "no.png",
  },
  {
    Name: "Discord",
    Link: "discord.com",
    Logo: "no.png",
  },
  {
    Name: "Linkedin",
    Link: "linkedin.com",
    Logo: "no.png",
  },
  {
    Name: "Github",
    Link: "github.com",
    Logo: "no.png",
  },
];

// Duplication des éléments pour le slider
const sliderItems = nosClients.concat(nosClients);

// Récupération de l'élément du DOM
const slider = document.getElementById("slide-track");

// Vérifie si l'élément slider existe avant d'ajouter les éléments
if (slider) {
  sliderItems.forEach((sliderItem) => {
    const a = document.createElement("a");
    const img = document.createElement("img");

    // Ajoute "https://" si le lien ne contient pas déjà un protocole
    const url =
      sliderItem.Link.startsWith("http://") || sliderItem.Link.startsWith("https://")
        ? sliderItem.Link
        : "https://" + sliderItem.Link;

    a.href = url;
    a.target = "_blank"; // Correction de "_blanc" en "_blank"

    // Ajout d'une vérification pour l'image
    img.src = `/assets/images/clients/${sliderItem.Logo || "default.png"}`;
    img.alt = `Logo ${sliderItem.Name}`;
    img.className = "slide-item";

    a.appendChild(img);
    slider.appendChild(a);
  });
} else {
  console.warn("L'élément #slide-track n'a pas été trouvé dans le DOM.");
}
