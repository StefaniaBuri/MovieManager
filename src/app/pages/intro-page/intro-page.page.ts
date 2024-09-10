import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonImg, IonItem } from '@ionic/angular/standalone';
import { Router } from '@angular/router';

const WAIT_TIME = 2500;
@Component({
  selector: 'app-intro-page',
  templateUrl: './intro-page.page.html',
  styleUrls: ['./intro-page.page.scss'],
  standalone: true,
  imports: [IonItem, IonImg, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonMenuButton]
})
export class IntroPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.router.navigate(['consulta/false']);
    }, WAIT_TIME);
  }

}
