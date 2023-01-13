import { Gif } from './../interface/gifs.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private apiKey: string =
    'https://api.giphy.com/v1/gifs/search?api_key=9JXEpXIn92Eqj215o9NGzPCBE9Kwf9TA&q=PATRICIO&limit=10';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor(private http: HttpClient) {}

  buscarGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=9JXEpXIn92Eqj215o9NGzPCBE9Kwf9TA&q=${query}&limit=10`
      )
      .subscribe((res) => {
        console.log(res.data);
        this.resultados = res.data;
      });
  }
}
