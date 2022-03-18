import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PesajeDetalleI, TicketI } from '../../interfaces/weigher.interface';
import { FormProductComponent } from '../form-product/form-product.component';
import { WeigherService } from '../../services/weigher.service'
import { StateCoatI, VarietysI } from '../../interfaces/weigher-combo.interface';
import { ActivatedRoute } from '@angular/router';
import { TicketGeneratorService } from 'app/modules/client/ticket-generator/services/ticket-generator.service';
import { ValidCI } from 'app/shared/validators/identification.validator';

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

    id_ticket: string;

    stateCoat: StateCoatI[];
    varietys: VarietysI[];

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

    constructor(private matDialog: MatDialog, private fBuilder: FormBuilder,
        private weigherService: WeigherService,
        private ticketGeneratorService: TicketGeneratorService,
        private route: ActivatedRoute,) { }

    ngOnInit(): void {
        this.id_ticket = this.route.snapshot.params.id;
        this.userForm = this.createUserForm();
        // this.getInformationTicket();
        this.dataSource = new MatTableDataSource(this.pesajeDetails);

        this.getStateCoat();
    }

    getInformationTicket() {

        this.weigherService.getInfTicket(this.id_ticket)
            .subscribe((res) => {

                this.ticketGeneratorService.searchUser(res[0].ruc)
                    .subscribe((res) => {
                        if (res) {
                            console.log(res);
                            this.userForm.patchValue(res);
                            // this.userForm.get('ruc').disable();
                            // this.userForm.get('cliente').disable();
                            // this.userForm.get('mail').disable();
                            // this.userForm.get('direccion').disable();
                            // this.userForm.get('telefono').disable();
                        }

                    },
                        (err) => {
                            console.log(err);
                        });

            },
                (err) => {
                    console.log(err);
                });

    }

    getStateCoat() {

        this.weigherService.getStateCoat()
            .subscribe((res) => {

                if (res) {
                    this.stateCoat = res;
                    console.log(res);
                }
            },
                (err) => {
                    console.log(err);
                });

        this.weigherService.getVarietys()
            .subscribe((res) => {

                if (res) {
                    this.varietys = res;
                    console.log(res);
                }
            },
                (err) => {
                    console.log(err);

                });


    }

    createUserForm(): FormGroup {
        return this.fBuilder.group({
            ruc: [
                { value:'', disabled: true },
                [ValidCI, Validators.required],
            ],
            cliente: [{value:'', disabled: true }, [Validators.required]],
            mail: [
                {value:'', disabled: true },
                [Validators.required, Validators.email],
            ],
            direccion: [{ value:'',disabled: true }, [Validators.required]],
            telefono: [{ value:'',disabled: true }, [Validators.required]],
            // quantityProducts: ['', []],
        });
    }

    openDialogProduct(data?: any) {
        const dialogDetail = this.matDialog.open(FormProductComponent, {
            data: data,
            disableClose: false
        });
    }
}
