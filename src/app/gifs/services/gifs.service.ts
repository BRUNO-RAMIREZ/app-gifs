import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string =
    'https://api.giphy.com/v1/gifs/search?api_key=9JXEpXIn92Eqj215o9NGzPCBE9Kwf9TA&q=PATRICIO';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  buscarGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    console.log(this._historial);
  }
}
