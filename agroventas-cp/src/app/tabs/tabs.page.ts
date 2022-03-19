import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
})
export class TabsPage implements OnInit {
  constructor(private router: Router, private storage: StorageService) {}

  ngOnInit(): void {
    //this.isLoggedIn();
  }

  toLogin() {
    this.storage.remove('user');
    this.router.navigate(['']);
  }

  isLoggedIn() {
    if (!this.storage.user) {
      this.toLogin();
    }
  }
}
