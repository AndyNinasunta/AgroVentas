import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';

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

  constructor() { }

  ngOnInit(): void {
  }

}
