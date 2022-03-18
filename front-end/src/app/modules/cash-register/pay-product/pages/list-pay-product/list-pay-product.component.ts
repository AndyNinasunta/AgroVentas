import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { PayProductComponent } from '../../components/pay-product/pay-product.component';

@Component({
  selector: 'app-list-pay-product',
  templateUrl: './list-pay-product.component.html',
  styleUrls: ['./list-pay-product.component.scss']
})
export class ListPayProductComponent implements OnInit {

  @ViewChild('paginator') paginator!: MatPaginator;
  dataSource = new MatTableDataSource();

  private _unsubscribe: Subject<any> = new Subject<any>();
  isLoading: boolean = true;

  ticketColumns: string[] = [
    'acciones',
    'rmncode',
    'idcl',
    'cliente',
    'fcrmn',
    'hrrmn',
  ];

  constructor(private matDialog: MatDialog, private fBuilder: FormBuilder,) { }

  ngOnInit(): void {
  }


  openDialogPay(): void {
    const dialogDetail = this.matDialog.open(PayProductComponent, {
      // data: data,
      disableClose: false
    });
  }
}
