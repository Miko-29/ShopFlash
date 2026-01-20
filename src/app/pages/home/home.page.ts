import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonCard,
  IonButton,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonBadge,
  IonIcon,
  IonCardContent,
  IonButtons,
  IonCol,
  IonRow,
  IonGrid,
} from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { settingsOutline, notificationsOutline } from 'ionicons/icons';
import { ProductService, Product } from '../../services/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonGrid,
    IonRow,
    IonCol,
    IonButtons,
    IonCardContent,
    IonIcon,
    IonBadge,
    IonButton,
    IonCard,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    RouterLink,
  ],
})
export class HomePage implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {
    addIcons({ settingsOutline, notificationsOutline });
  }

  ngOnInit() {
    this.products = this.productService.getProducts();
  }
}
