import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {


  isLoading:boolean=false;


  /**
   * Constructor
   * @param dialogRef 
   */
  constructor(public dialogRef: MatDialogRef<SearchUserComponent>) { }


  ngOnInit(): void {
    console.log('hola');
  }


  /**
   * Search User
   */
  searchUser(){
    this.isLoading=true;
  }

}
