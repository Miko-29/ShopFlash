import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonLabel,
  IonItem,
  IonListHeader,
  IonList,
  IonBackButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { PushNotifications } from '@capacitor/push-notifications';
import { Preferences } from '@capacitor/preferences';
import { FCM } from '@capacitor-community/fcm';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [
    IonButtons,
    IonBackButton,
    IonList,
    IonListHeader,
    IonItem,
    IonLabel,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
  ],
})
export class SettingsPage implements OnInit {
  subs = {
    electronics: false,
    fashion: false,
  };

  constructor() {}

  async ngOnInit() {
    await this.loadPreferences();
  }

  async loadPreferences() {
    const electronics = await Preferences.get({ key: 'sub_electronics' });
    const fashion = await Preferences.get({ key: 'sub_fashion' });

    this.subs.electronics = electronics.value === 'true';
    this.subs.fashion = fashion.value === ' true';
  }

  async toggleTopic(topic: string, event: any) {
    const isChecked = event.detail.checked;

    await Preferences.set({ key: `sub_${topic}`, value: String(isChecked) }); // saving to disk

    try {
      if (isChecked) {
        await FCM.subscribeTo({ topic });
        console.log(`Subscribed to ${topic}`);
      } else {
        await FCM.unsubscribeFrom({ topic });
        console.log(`Unsubscribe from ${topic}`);
      }
    } catch (e) {
      console.error('FCM Error (Are you on a real device?):', e);
    }
  }
}
