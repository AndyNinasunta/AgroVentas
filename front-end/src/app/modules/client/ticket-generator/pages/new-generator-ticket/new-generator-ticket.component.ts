import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SearchUserComponent } from '../../components/search-user/search-user.component';

@Component({
  selector: 'app-new-generator-ticket',
  templateUrl: './new-generator-ticket.component.html',
  styleUrls: ['./new-generator-ticket.component.scss']
})
export class NewGeneratorTicketComponent implements OnInit {

  constructor(private matDialog: MatDialog) { }

  ngOnInit(): void {

    this.openDialogSearchUser();

  }

  openDialogSearchUser():void{
  
    const dialogAux = this.matDialog.open(SearchUserComponent, {
      disableClose: true,
      //width: '70%',
      //height: '50%',
      // scrollStrategy:
    });

  }

}
