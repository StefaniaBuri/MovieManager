import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterOutlet, IonRouterLink } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, searchCircleOutline, search, searchSharp, eye, eyeSharp } from 'ionicons/icons';

const iconList = { eyeSharp, eye, searchSharp, mailOutline, mailSharp, paperPlaneOutline, paperPlaneSharp, heartOutline, heartSharp, archiveOutline, archiveSharp, trashOutline, trashSharp, warningOutline, warningSharp, bookmarkOutline, bookmarkSharp, searchCircleOutline, search};

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [RouterLink, RouterLinkActive, CommonModule, IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonListHeader, IonNote, IonMenuToggle, IonItem, IonIcon, IonLabel, IonRouterLink, IonRouterOutlet],
})
export class AppComponent {
  public appPages = [
    { title: 'Buscar', url: '/busqueda', icon: 'search' },
    { title: 'Consultar', url: '/consulta/false', icon: 'eye' },
    { title: 'Favoritos', url: '/favoritos/true', icon: 'heart' },
    { title: 'Acerca de..', url: '/acercade', icon: 'archive' }
    
  ];
  public labels = ['Terror', 'Action', 'Comedy', 'Suspense', 'Romance'];
  constructor() {
    addIcons(iconList);
  }
}
