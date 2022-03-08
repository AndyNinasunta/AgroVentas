import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TicketI } from '../../interfaces/weigher.interface';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';

@Component({
    selector: 'app-list-tickets',
    templateUrl: './list-tickets.component.html',
    styleUrls: ['./list-tickets.component.scss'],
})
export class ListTicketsComponent implements OnInit, AfterViewInit {
    @ViewChild('paginator') paginator!: MatPaginator;
    dataSource = new MatTableDataSource();

    ticketColumns: string[] = [
        'acciones',
        'codTicket',
        'fechaGen',
        'horaGen',
        'identCliente',
        'nombresCliente',
        'cantTentSacos',
    ];

    tickets: TicketI[] = [
        {
            codTicket: 'AB123',
            fechaGen: '07/ENERO/2022',
            horaGen: '13:30',
            identCliente: '1207245927',
            nombresCliente: 'JOSÉ MARIO SOLORZANO CABRERA',
            cantTentSacos: 25,
        },
        {
            codTicket: 'AB222',
            fechaGen: '25/FEBRERO/2022',
            horaGen: '17:30',
            identCliente: '1207245927001',
            nombresCliente: 'JOSÉ MARIO SOLORZANO CABRERA',
            cantTentSacos: 30,
        },
    ];

    private stompClient = null;

    constructor(private router: Router) {}

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
        this.dataSource = new MatTableDataSource(this.tickets);
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
    }

    openAttentionWindow(element: any): any {
        this.router.navigate([
            `weigher/tickets/attend-ticket/${element.codTicket}`,
        ]);
    }
}
