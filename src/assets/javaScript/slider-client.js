const nosClients = [
  {
    Name: "Instagram",
    Link: "instagram.com",
    Logo: "images/socialMedia/icon-instagram.png",
  },
  {
    Name: "Discord",
    Link: "discord.com",
    Logo: "images/socialMedia/icon-discord.png",
  },
  {
    Name: "Linkedin",
    Link: "linkedin.com",
    Logo: "images/socialMedia/icon-linkedin.png",
  },
  {
    Name: "Github",
    Link: "github.com",
    Logo: "images/socialMedia/icon-github.png",
  },
];

/* const sliderItems = imageNames.concat(imageNames); */

const sliderItems = nosClients.concat(nosClients);

const slider = document.getElementById("slide-track");

sliderItems.forEach((sliderItem) => {
  const a = document.createElement("a");
  const img = document.createElement("img");

  a.href = "https://" + sliderItem.Link;
  a.target = "_blanc";

  img.src = "./assets/" + sliderItem.Logo;
  img.alt = "Logo " + sliderItem.Name;
  img.className = "slide-item";

  a.appendChild(img);
  slider.appendChild(a);
});
