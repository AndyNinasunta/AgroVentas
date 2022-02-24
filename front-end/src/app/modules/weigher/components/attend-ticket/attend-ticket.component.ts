import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PesajeDetalleI, TicketI } from '../../interfaces/weigher.interface';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
    { position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H' },
    { position: 2, name: 'Helium', weight: 4.0026, symbol: 'He' },
    { position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li' },
    { position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be' },
    { position: 5, name: 'Boron', weight: 10.811, symbol: 'B' },
    { position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C' },
    { position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N' },
    { position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O' },
    { position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F' },
    { position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne' },
];

@Component({
    selector: 'app-attend-ticket',
    templateUrl: './attend-ticket.component.html',
    styleUrls: ['./attend-ticket.component.scss'],
})
export class AttendTicketComponent implements OnInit {
    userForm: FormGroup;
    dataSource = new MatTableDataSource();

    pesajeDetailColumns: string[] = [
        'acciones',
        'rowNumber',
        'producto',
        'variedad',
        'detalle',
        'cantidad',
        'tara',
        'librasTara',
    ];

    pesajeDetails: PesajeDetalleI[] = [];

    constructor(private matDialog: MatDialog, private fBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.userForm = this.createUserForm();
        this.dataSource = new MatTableDataSource(this.pesajeDetails);
    }

    createUserForm(): FormGroup {
        return this.fBuilder.group({
            identification: [{ value: '', disabled: true }],
            fullName: [{ value: '', disabled: true }],
            email: [{ value: '', disabled: true }],
            direction: [{ value: '', disabled: true }],
            phoneNumber: [{ value: '', disabled: true }],
        });
    }
}
