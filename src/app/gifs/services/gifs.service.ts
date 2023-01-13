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

  constructor(private http: HttpClient) {
    this._historial = JSON.parse(localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || [];
  }

  buscarGifs(query: string = ''): void {
    query = query.trim().toLowerCase();
    if (!this._historial.includes(query)) {
      this._historial.unshift(query);
      this._historial = this._historial.splice(0, 10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    this.http
      .get<SearchGifsResponse>(
        `https://api.giphy.com/v1/gifs/search?api_key=9JXEpXIn92Eqj215o9NGzPCBE9Kwf9TA&q=${query}&limit=10`
      )
      .subscribe((res) => {
        console.log(res.data);
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados));
      });
  }
}
