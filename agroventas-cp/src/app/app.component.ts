import { Component } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from './shared/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(private storage: StorageService) {}
}
