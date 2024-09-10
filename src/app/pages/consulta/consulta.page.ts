import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonMenuButton, IonButtons, IonProgressBar, IonItem, IonInput, IonButton, IonItemSliding, IonItemOption, IonItemOptions, IonLabel, IonList, IonIcon, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonAlert, IonBadge, IonToast, IonImg } from '@ionic/angular/standalone';
import { addIcons } from "ionicons";
import { heart, trash, searchOutline, searchCircleOutline, text, heartOutline, heartSharp } from "ionicons/icons";
import { MovieManagerService } from 'src/app/services/movie-manager.service';
import { Movie } from 'src/app/interfaces/movie';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from 'src/app/services/httpomdb.service';

const iconList = { heart, heartOutline, heartSharp,searchCircleOutline,trash };

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.page.html',
  styleUrls: ['./consulta.page.scss'],
  standalone: true,
  imports: [IonImg, IonToast, IonBadge, IonAlert, IonCardContent, IonCardSubtitle, IonCardTitle, IonCardHeader, IonCard, IonIcon, IonList, IonLabel, IonItemOptions, IonItemOption, IonItemSliding, IonButton, IonInput, IonItem, IonProgressBar, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class ConsultaPage implements OnInit {

  private activatedRoute = inject(ActivatedRoute); //PARAMETROS DEL ROUTING

  //otra forma de inyectar un servicio sin llamarlo en el constructor.
  public moviesManagerService = inject(MovieManagerService);
  public isToastOpen: boolean = false;
  public mensaje: string = "";

  tituloBuscado: string = "";
  peliculasFiltradas: Movie[];
  borrando: boolean = false;
  peliculaIDBorrar: Movie | undefined;
  verFavoritos: boolean = false;

  constructor(private router: Router) {
    addIcons({searchCircleOutline,heartSharp,heartOutline,trash}); 
    this.peliculasFiltradas = this.moviesManagerService.getPeliculas();
  }

  ngOnInit() {
    this.verFavoritos = "true" == (this.activatedRoute.snapshot.paramMap.get('fav') as string); //PARAMETROS DEL ROUTING
    if(this.verFavoritos) {
      this.peliculasFiltradas = this.peliculasFiltradas.filter(p => p.fav == true);
    }
  }

  public ocultarDialogo() {
    this.borrando = false;
  }

  eliminar(pelicula: Movie) {
    this.borrando = true;
    this.peliculaIDBorrar = pelicula;
    //console.error("Eliminando.." + pelicula);
  }

  //Alert para eliminar pelicula
  public alertButtons = [
    {
      text: 'Cancelar', role: 'cancel',
      handler: () => {
        //console.log('Alert canceled');
        this.peliculaIDBorrar = undefined;
      },
    },
    {
      text: 'Borrar',
      role: 'confirm',
      handler: () => {
        //console.log('Alert confirmed');
        this.moviesManagerService.deletePelicula(this.peliculaIDBorrar);
        this.isToastOpen = true;
        this.mensaje = "Película eliminada correctamente";
        this.buscar();
      },
    },
  ];


  buscar() {
   this.peliculasFiltradas = this.moviesManagerService.getPeliculas().filter (p => p.Title.toUpperCase().includes(this.tituloBuscado.toLocaleUpperCase()) &&
   (!this.verFavoritos || p.fav == this.verFavoritos));
  }

  setOpen(open:boolean) { //cerrar toast
    //this.isToastOpen = open;
    this.isToastOpen = false;
  }

  public setFav(peliculaFavorita: Movie) {
    peliculaFavorita.fav = !peliculaFavorita.fav;
    this.moviesManagerService.guardarPeliculas();
  }

  public verDetalle(imdbID: string) {
    this.router.navigateByUrl('/detalle/'+ imdbID);
  }

}
