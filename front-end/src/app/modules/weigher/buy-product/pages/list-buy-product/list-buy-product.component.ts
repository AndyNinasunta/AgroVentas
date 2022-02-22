import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-list-buy-product',
  templateUrl: './list-buy-product.component.html',
  styleUrls: ['./list-buy-product.component.scss']
})
export class ListBuyProductComponent implements OnInit {


  dataSource = new MatTableDataSource();
  @ViewChild("paginator") paginator!: MatPaginator;

  buyColumns: string[] = ['acciones', 'id', 'producto', 'variedad', 'detalle', 'cantidad', 'tara', 'libra_tara'];

  buys: any[] = [
    { id: '1', producto: 'Product', variedad: 'var', detalle: 'details', cantidad: 42, tara: 34, libra_tara: '2323.3 lb' },
    { id: '2', producto: 'Product', variedad: 'var', detalle: 'details', cantidad: 42, tara: 34, libra_tara: '2323.3 lb' },
  ];

  constructor() { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource(this.buys);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

}
