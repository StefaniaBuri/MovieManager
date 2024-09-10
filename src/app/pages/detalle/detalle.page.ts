import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonCardTitle, IonButtons, IonMenuButton, IonImg } from '@ionic/angular/standalone';
import { PeliculasService } from 'src/app/services/httpomdb.service';
import { ActivatedRoute } from '@angular/router';
import { FullMovie } from 'src/app/interfaces/full-movie';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
  standalone: true,
  imports: [IonImg, IonButtons, IonCardTitle, IonCardContent, IonCardSubtitle, IonCardHeader, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class DetallePage implements OnInit {

  //otra forma de inyectar un servicio sin llamarlo en el constructor.
  public omdbService = inject(PeliculasService);
  private imdbID: string = "";
  private activatedRoute = inject(ActivatedRoute); //PARAMETROS DEL ROUTING
  public peliculaCompleta : FullMovie | undefined;

  constructor() { }

  ngOnInit() {
    this.imdbID = (this.activatedRoute.snapshot.paramMap.get('imdbID') as string); //PARAMETROS DEL ROUTING
    //console.log("Detalles pelicula",this.imdbID);
    this.omdbService.getMovie(this.imdbID).subscribe(pelicula => {
      this.peliculaCompleta = pelicula;
      console.log(this.peliculaCompleta);
      
    });
  }


}
