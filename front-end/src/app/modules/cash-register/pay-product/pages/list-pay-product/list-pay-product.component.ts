import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { PayProductComponent } from '../../components/pay-product/pay-product.component';
import { TicketDataPayment } from '../../interfaces/pay-product.interface';
import { PayProductService } from '../../services/pay-product.service';

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
    'tk',
    'idnt',
    'npers',
    'fh',
    'hr',
  ];



  ticketDataPayment: TicketDataPayment[];

  constructor(private payProductService: PayProductService, private matDialog: MatDialog, private fBuilder: FormBuilder,) { }

  ngOnInit(): void {

    this.getList();



  }

  getList(): void {
    this.payProductService.getListTicketsPendsPay()
      .pipe(
        takeUntil(this._unsubscribe),
        finalize(() => {
          this.isLoading = false;

        })
      )
      .subscribe((res) => {

        if (res) {
          this.ticketDataPayment = res;
          this.isLoading = false;
          this.dataSource = new MatTableDataSource(this.ticketDataPayment);
          this.dataSource.paginator = this.paginator;
        }

      },
        (err) => {
          console.log(err);
        })
  }


  openDialogPay(id_ticket: string): void {
    const dialogDetail = this.matDialog.open(PayProductComponent, {
      data: id_ticket,
      disableClose: false
    }).componentInstance.action.subscribe((res) => {
      if (res) {
        this.getList();
      }
    });
  }
}
