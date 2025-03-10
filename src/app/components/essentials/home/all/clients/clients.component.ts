import { Component } from '@angular/core';

@Component({
  selector: 'app-clients',
  standalone: false,
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent {
  nosClients = [
    { Name: "Instagram", Link: "instagram.com", Logo: "no.png" },
    { Name: "Discord", Link: "discord.com", Logo: "no.png" },
    { Name: "Linkedin", Link: "linkedin.com", Logo: "no.png" },
    { Name: "Github", Link: "github.com", Logo: "no.png" }
  ];

  // Fonction pour formater correctement les liens
  getSafeUrl(link: string): string {
    return link.startsWith('http') ? link : `https://${link}`;
  }
}
