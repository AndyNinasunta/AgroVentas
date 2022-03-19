import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { PesajeDetalleI, TicketI } from '../../interfaces/weigher.interface';
import { FormProductComponent } from '../form-product/form-product.component';
import { WeigherService } from '../../services/weigher.service'
import { StateCoatI, VarietysI } from '../../interfaces/weigher-combo.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { TicketGeneratorService } from 'app/modules/client/ticket-generator/services/ticket-generator.service';
import { ValidCI } from 'app/shared/validators/identification.validator';
import { FormGroupError } from 'app/shared/class/validator-functions';
import { AuthService } from 'app/core/auth/auth.service';
import Swal from 'sweetalert2';

export interface PeriodicElement {
    name: string;
    position: number;
    weight: number;
    symbol: string;
}


@Component({
    selector: 'app-attend-ticket',
    templateUrl: './attend-ticket.component.html',
    styleUrls: ['./attend-ticket.component.scss'],
})
export class AttendTicketComponent implements OnInit {
    formGroupError = new FormGroupError();
    userForm: FormGroup;
    pendTicketForm: FormGroup;
    dataSource = new MatTableDataSource();

    id_ticket: string;

    variety: string = '';

    stateCoat: StateCoatI[];
    varietys: VarietysI[];

    pesajeDetailColumns: string[] = [
        'acciones',
        'id',
        'producto',
        'detalle',
        'cantidad',
        'tara_saco',
        'libra_tara',
    ];

    pesajeDetails: PesajeDetalleI[] = [];

    user: any;

    constructor(private matDialog: MatDialog, private fBuilder: FormBuilder,
        private weigherService: WeigherService,
        private ticketGeneratorService: TicketGeneratorService,
        private route: ActivatedRoute, private router: Router,
        private userServ: AuthService,) { }

    ngOnInit(): void {
        this.user = JSON.parse(this.userServ.user);
        console.log(this.user.usrid, 'id');

        this.id_ticket = this.route.snapshot.params.cod;
        this.userForm = this.createUserForm();
        this.pendTicketForm = this.createPendTicket();
        this.getInformationTicket();
        this.dataSource = new MatTableDataSource(this.pesajeDetails);

        this.getStateCoat();
    }

    getInformationTicket() {


        this.weigherService.getInfTicket(this.id_ticket)
            .subscribe((res) => {

                // this.ticketGeneratorService.searchUser(res[0].ruc)
                //     .subscribe((res) => {
                if (res) {
                    this.userForm.patchValue(res);
                }

                // },
                //     (err) => {
                //         console.log(err);
                //     });

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

    setVariety(data: string): void {
        this.variety = data;
    }

    createUserForm(): FormGroup {
        return this.fBuilder.group({
            ruc: [
                { value: '', disabled: true },
                [ValidCI, Validators.required],
            ],
            cliente: [{ value: '', disabled: true }, [Validators.required]],
            mail: [
                { value: '', disabled: true },
                [Validators.required, Validators.email],
            ],
            direccion: [{ value: '', disabled: true }, [Validators.required]],
            telefono: [{ value: '', disabled: true }, [Validators.required]],
            // quantityProducts: ['', []],
        });
    }

    createPendTicket(): FormGroup {
        return this.fBuilder.group({
            variedadid: [
                { value: '', disabled: false },
                [Validators.required],
            ],
            estadoid: [{ value: '', disabled: false }, [Validators.required]],
            calificacion: [{ value: '', disabled: false }, [Validators.required]],
            // precio: [{ value: '', disabled: false }, [Validators.required]],
            // pesadorid: [{ value: '', disabled: false }, [Validators.required]],
            // productoid: [{ value: '', disabled: false }, [Validators.required]],
            detalle: [{ value: '', disabled: false }, [Validators.required]],
            // cantidad: [{ value: '', disabled: false }, [Validators.required]],
            // recipienteid: [{ value: '', disabled: false }, [Validators.required]],
            // pesorecipiente: [{ value: '', disabled: false }, [Validators.required]],

        });
    }

    updateTable(): void {
        this.pendTicketForm.get('detalle').setValue(this.pesajeDetails);
        this.dataSource = new MatTableDataSource(this.pesajeDetails);
    }

    attendTicket() {

        let attendTicketAux = JSON.parse(JSON.stringify(this.pendTicketForm.getRawValue()));

        for (let index = 0; index < this.pesajeDetails.length; index++) {


            //Consumo
            attendTicketAux.calificacion = Number(attendTicketAux.calificacion);
            attendTicketAux.estadoid = Number(attendTicketAux.estadoid);
            attendTicketAux.variedadid = Number(attendTicketAux.variedadid);

            attendTicketAux.rcd = this.id_ticket;
            attendTicketAux.pesadorid = Number(this.user.usrid); //int
            attendTicketAux.productoid = Number(this.pesajeDetails[index].id); //int
            attendTicketAux.detalle = this.pesajeDetails[index].detalle;//String
            attendTicketAux.cantidad = this.pesajeDetails[index].cantidad;//double
            attendTicketAux.recipienteid = this.pesajeDetails[index].id_tara_saco; //int
            attendTicketAux.pesorecipiente = this.pesajeDetails[index].libra_tara;//double

            attendTicketAux.precio = 96;


            this.weigherService.generatePesaje(attendTicketAux)
                .subscribe((res) => {
                    console.log(res);
                }, (err) => {
                    console.log(err);
                    this.showAlertResponse('500');
                })

            console.log(attendTicketAux);

            if (index === this.pesajeDetails.length - 1) {
                this.showAlertResponse('200');
            }
        }


    }

    goToPendTicket(): void {
        this.router.navigate([`/weigher/tickets`]);
    }

    openDialogProduct(data?: any) {
        const dialogDetail = this.matDialog.open(FormProductComponent, {
            data: data,
            disableClose: false
        }).componentInstance.productResponse
            .subscribe((res) => {
                if (res) {

                    this.pendTicketForm.get('calificacion').setValue(res.calf);

                    if (res.prod.varios_sacos) {
                        for (let index = 0; index < res.cantidad_sacos; index++) {

                            res.detalle = `${res.libra_tara} Libras de ${res.prod.producto} ${this.variety} Recibido en ${res.prod.tara_saco}`;

                            this.pesajeDetails.push(res.prod);



                        }

                    } else {

                        res.detalle = `${res.prod.libra_tara} Libras de ${res.prod.producto} ${this.variety} Recibido en ${res.prod.tara_saco}`;

                        this.pesajeDetails.push(res.prod);

                    }

                    this.updateTable();

                }
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
                    title: "Transacción realizada con éxito",//title: message,
                    customClass: {
                        popup: 'swal-border-popup',
                        icon: 'swal-border-icon',
                        title: 'swal-title',
                    },
                    showConfirmButton: false,
                    timer: 3000,
                });
                this.goToPendTicket();
                break;
            //mensaje de error 
            case '500':

                Swal.fire({
                    position: 'center',
                    width: "500px",
                    iconHtml: 'error',
                    title: 'Ocurrió un Problema al ejecutar la transacción.',//title: message,
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
}
