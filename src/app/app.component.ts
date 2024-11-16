import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Artist {
  name: string;
  highlight: boolean;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styles: [
    `
      .list-group-item:first-child {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        border-top: 0;
      }
      .highlight {
        background-color: yellow;
        font-weight: bold;
      }
    `
  ]
})
export class AppComponent implements OnInit {
  query: string = '';
  artists: Artist[] = [];
  currentArtist: Artist | null = null;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Artist[]>('../assets/data.json').subscribe({
      next: (data: Artist[]) => {
        this.artists = data;
      },
      error: (err) => {
        console.error('Error fetching artist data:', err);
      }
    });
  }

  showArtist(item: Artist): void {
    if (item && item.name) {
      this.query = item.name;
      item.highlight = !item.highlight;
      this.currentArtist = item;
    }
  }
}
