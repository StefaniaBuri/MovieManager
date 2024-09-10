import { Injectable } from '@angular/core';
import { Movie } from '../interfaces/movie';
import { Storage } from '@ionic/storage-angular';
import { Observable } from 'rxjs';

const NODO_RAIZ ="peliculas";

@Injectable({
  providedIn: 'root'
})
export class MovieManagerService {

  //lo ponemos en privado y luego creamos un metodo getPeliculas(), es un acceso para llamarlo en otro componente
  private peliculas: Movie[] = [];

  constructor(private storage: Storage) { 
    this.init();
  }

  //INICIALIZACION Y CARGA DE LOS DATOS ALMACENADOS EN LA BASE DE DATOS LOCAL
  async init() {
    this.storage = await this.storage.create().finally(() => {
      this.rellenarArray();
    });
  }

  //CARGA LAS PELICULAS ALMACENADAS EN LA BASE DE DATOS EN EL ARRAY LOCAL
  rellenarArray() {
    this.storage.get(NODO_RAIZ).
    then((peliculasDB) => {
      //console.log((peliculasDB);
        if (peliculasDB != null) {
          peliculasDB.forEach((element: Movie) => {
            this.peliculas.push(element);
          });
        } 
      })
  }

  // METODO PUBLICO PARA AGREGAR UNA PELICULA AL SERVICIO
  public addPelicula(pelicula: Movie) {
    if (this.peliculas.find(p => p.imdbID === pelicula.imdbID) != undefined) {
      throw new Error("La película ya existe"); 
    } else {
      this.peliculas.push(pelicula); //Añadimos la pelicula al array
      this.guardarPeliculas(); //Añadimos la pelicula a la base de datos local
    }
  } 

  //METODO PARA AGREGAR LA PELICULA A LA BASE DE DATOS LOCAL
  public guardarPeliculas() {
    this.storage.get(NODO_RAIZ).
    then(() => {
          this.storage.set(NODO_RAIZ, this.peliculas);
    }).
    catch((error) => {
      console.error("Error:" + error);
    }).
    finally(() => {
      console.log("Fin del proceso de almacenamiento");
    });
  }

  //OBTENER TODAS LAS PELICULAS
  public getPeliculas(): Movie[] {
    return this.peliculas;
  }
  
  // METODO PARA ELIMINAR LA PELICULA 
  public deletePelicula(pelicula: Movie | undefined) {
    if (pelicula != undefined) {
      let posicionPeliculaBuscada = this.peliculas.indexOf(pelicula);
      this.peliculas.splice(posicionPeliculaBuscada,1);
      this.guardarPeliculas();
    }
  }

}
