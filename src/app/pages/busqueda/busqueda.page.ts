import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItemSliding, IonList, IonCardHeader, IonItemOption, IonItemOptions, IonCardSubtitle, IonCardTitle, IonIcon, IonInput, IonCardContent, IonItem, IonButtons, IonMenuButton, IonButton, IonCard, IonProgressBar, IonToast, IonAlert } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { heart, searchCircleOutline, trash, share, save } from "ionicons/icons";
import { Movie } from 'src/app/interfaces/movie';
import { MovieManagerService } from 'src/app/services/movie-manager.service';
import { PeliculasService } from 'src/app/services/httpomdb.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.page.html',
  styleUrls: ['./busqueda.page.scss'],
  standalone: true,
  imports: [IonAlert, IonToast, IonProgressBar, IonCard, IonButton, IonButtons, IonItem, IonCardContent, IonInput, IonIcon, IonCardTitle, IonCardSubtitle, IonItemOptions, IonItemOption, IonCardHeader, IonList, IonItemSliding, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class BusquedaPage implements OnInit {
  public tituloBuscado: string = "";
  public peliculas: Movie[] = [];
  public cargando: boolean = false;
  public isToastOpen: boolean = false;
  public mensaje: string = "";
  public noEncontrado: boolean = false; //Para el dialogo que avisa de que no se ha encontrado ninguna película
  public alertButtons = ['cerrar'];

  constructor(private peliculasService: PeliculasService, private movieManager: MovieManagerService) {
      addIcons({save});
     }

  ngOnInit() { }

  buscar() {
    this.cargando = true;
    this.peliculasService.getMovies(this.tituloBuscado).subscribe(data => {
      this.cargando = false;
      if (data.Response === 'False') { //Response es especifico de OMDB API
       this.noEncontrado = true;
      } else {
        //console.log(data);
        this.peliculas = data.Search;
      }
    })
  }

  guardar(pelicula:Movie) {
    try {
      this.movieManager.addPelicula(pelicula);
      //this.peliculas.splice(this.peliculas.indexOf(pelicula), 1); // borra de la lista la pelicula si se añade en el servicio
      this.isToastOpen = true;
      this.mensaje = "Guardada correctamente";
    } catch {
      this.isToastOpen = true;
      this.mensaje = "La pelicula ya existe";
    }
    this.peliculas.splice(this.peliculas.indexOf(pelicula), 1); // borra de la lista siempre
  }

  setOpen(open:boolean) { //cerrar toast
    //this.isToastOpen = open;
    this.isToastOpen = false;
  }

  cerrarAlerta() {
    this.noEncontrado = false;
    this.tituloBuscado = "";
  }
}
