import { Component, OnInit, inject } from '@angular/core'; // Import inject
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import {
  PushNotifications,
  ActionPerformed,
} from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { Firestore, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent implements OnInit {
  private firestore: Firestore = inject(Firestore);

  constructor(
    private platform: Platform,
    private router: Router,
  ) {}

  ngOnInit() {
    if (Capacitor.isNativePlatform()) {
      this.initPushNotifications();
    }
  }

  async initPushNotifications() {
    const result = await PushNotifications.requestPermissions();
    if (result.receive === 'granted') {
      await PushNotifications.register();
    }

    PushNotifications.addListener('registration', async (token) => {
      console.log('PUSH TOKEN:', token.value);

      await this.saveTokenToFirestore(token.value);
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        const data = notification.notification.data;
        if (data && data.productId) {
          this.router.navigate(['/product', data.productId]);
        }
      },
    );
  }

  async saveTokenToFirestore(token: string) {
    try {
      const deviceId = await Device.getId();
      const uniqueId = deviceId.identifier;

      const userRef = doc(this.firestore, 'users', uniqueId);

      await setDoc(
        userRef,
        {
          pushToken: token,
          updatedAt: new Date().toISOString(),
          platform: Capacitor.getPlatform(),
        },
        { merge: true },
      );

      console.log('Token saved to Firestore for user:', uniqueId);
    } catch (e) {
      console.error('Error saving token:', e);
    }
  }
}
