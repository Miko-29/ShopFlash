import { bootstrapApplication } from '@angular/platform-browser';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'shopflash-d055a',
        appId: '1:533932131229:web:98ce3d440a81edfeb66574',
        storageBucket: 'shopflash-d055a.firebasestorage.app',
        apiKey: 'AIzaSyDk7GttHXgFGeOfQnWko1aYTqoU-ugLVFk',
        authDomain: 'shopflash-d055a.firebaseapp.com',
        messagingSenderId: '533932131229',
        measurementId: 'G-38Z8D4TD0N',
      }),
    ),
    provideFirestore(() => getFirestore()),
  ],
});
