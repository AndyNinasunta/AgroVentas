import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from '../shared/storage.service';

@Component({
  selector: 'app-list-tickets-tab',
  templateUrl: './list-tickets-tab.page.html',
  styleUrls: ['./list-tickets-tab.page.scss'],
})
export class ListTicketsTabPage implements OnInit {
  user = '';
  $user = new BehaviorSubject<string>(this.user);

  constructor(private storage: StorageService) {}

  ngOnInit() {
    // this.storage.get('user').then((res) => {
    //   this.user = res;
    // });
    this.storage.getUser().subscribe((user) => {
      console.log(user);
      this.user = user;
    });
  }
}
