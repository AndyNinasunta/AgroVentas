import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { TicketI } from '../../interfaces/weigher.interface';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import { WeigherService } from '../../services/weigher.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.scss'],
})
export class ListTicketsComponent implements OnInit, AfterViewInit {
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

    tickets: TicketI[];

    private stompClient = null;

    constructor(private router: Router,
        private weigherService: WeigherService) { }

    connect(): void {
        const socket = new SockJS('http://localhost:8080/agroventas-socket');
        this.stompClient = Stomp.Stomp.over(socket);

        const _this = this;
        this.stompClient.connect({}, function (frame) {
            console.log('Connected: ' + frame);

            _this.stompClient.subscribe('/realtime/sensors', function (hello) {
                console.log(hello);
            });
        });
    }

    ngOnInit(): void {
        this.getList();

    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    getList(): void {
        this.weigherService.getListTickets()
            .pipe(
                takeUntil(this._unsubscribe),
                timeout(2000),
                finalize(() => {
                    this.isLoading = false;

                })
            )
            .subscribe((res) => {

                if (res) {
                    this.tickets = res;
                    this.isLoading = false;
                    this.dataSource = new MatTableDataSource(this.tickets);
                    this.dataSource.paginator = this.paginator;
                }

            },
                (err) => {
                    console.log(err);
                })
    }

    openAttentionWindow(element: any): any {
        this.router.navigate([
            `weigher/tickets/attend-ticket/${element.rmncode}`,
        ]);
    }


    rejectedTicket(idTicket: string): void {
        this.weigherService.discardTicket(idTicket).subscribe((res) => {
            console.log(res);
            this.showAlertResponse('200');
        }, (err) => {
            this.showAlertResponse('500');
        });
    }

    /**
    * Show Alert Response
    * @param type 
    * @param message 
    */
    showAlertResponse(type: string): void {

        switch (type) {
            // mensaje de exito	
            case '200':

                Swal.fire({
                    position: 'center',
                    width: "500px",
                    icon: 'success',
                    title: "Transacci??n realizada con ??xito",//title: message,
                    customClass: {
                        popup: 'swal-border-popup',
                        icon: 'swal-border-icon',
                        title: 'swal-title',
                    },
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.getList();
                break;

            //mensaje de error 
            case '500':

                Swal.fire({
                    position: 'center',
                    width: "500px",
                    icon: 'error',
                    title: 'Ocurri?? un Problema al ejecutar la transacci??n.',//title: message,
                    customClass: {
                        popup: 'swal-border-popup',
                        icon: 'swal-border-icon',
                        title: 'swal-title',
                        //actions:'swal-button-confirm',
                    },
                    showConfirmButton: true,
                    confirmButtonColor: '#22d3ee',
                    //timer:3000,

                });

                break;

        }
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
