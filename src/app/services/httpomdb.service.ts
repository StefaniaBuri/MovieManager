import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { delay, Observable } from 'rxjs';
import { BASE_URL } from 'src/app/app-config';
import { FullMovie } from '../interfaces/full-movie';

//const BASE_URL = 'https://www.omdbapi.com';
const API_KEY = environment.OMDB_API_KEY;

@Injectable({
  providedIn: 'root'
})
export class PeliculasService {

  private http = inject(HttpClient);
  public movies: any[] = [];
  constructor() {
    //Para probar el servicio
    /*this.getMovie('tt7631058').subscribe(data => {
      console.log(data);
    });*/
   }

  //DEVUELVE UNA COLECCION DE PELICULAS
  getMovies(title: string): Observable<any> {
    return this.http
      .get<any>(`${BASE_URL}?apikey=${API_KEY}&s=${title}`)
      .pipe(
        delay(1000) //Simulación de retardo
      );
  }

  getMovie(imdbID: string): Observable<FullMovie> {
    return this.http
      .get<FullMovie>(`${BASE_URL}?apikey=${API_KEY}&i=${imdbID}`)
      .pipe(delay(1000));
  }
}
