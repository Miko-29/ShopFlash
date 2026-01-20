import { Component, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { IonApp, IonRouterOutlet, Platform } from '@ionic/angular/standalone';
import { Capacitor } from '@capacitor/core';
import {
  PushNotifications,
  ActionPerformed,
} from '@capacitor/push-notifications';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private router: Router,
    private ngZone: NgZone,
  ) {}

  ngOnInit() {
    // Only initialize Push if on a native device (iOS/Android)
    if (Capacitor.isNativePlatform()) {
      this.initPushNotifications();
    }
  }

  private async initPushNotifications() {
    const result = await PushNotifications.requestPermissions();

    if (result.receive === 'granted') {
      await PushNotifications.register();
    }

    PushNotifications.addListener('registration', (token) => {
      console.log('PUSH TOKEN:', token.value);
      // TODO: Send this token to your backend
    });

    PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification: ActionPerformed) => {
        const data = notification.notification.data;
        console.log('Push Action Data:', data);

        if (data && data.productId) {
          this.ngZone.run(() =>
            this.router.navigate(['/product', data.productId]),
          );
        }
      },
    );
  }
}
