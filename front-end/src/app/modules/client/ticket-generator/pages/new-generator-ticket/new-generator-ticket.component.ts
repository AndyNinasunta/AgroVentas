import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FormGroupError } from 'app/shared/class/validator-functions';
import { UserI } from 'app/shared/interfaces/user.interface';
import { ValidCI } from 'app/shared/validators/identification.validator';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { SearchUserComponent } from '../../components/search-user/search-user.component';
import { TicketGeneratorService } from '../../services/ticket-generator.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Router } from '@angular/router';
import { AuthService } from 'app/core/auth/auth.service';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
    selector: 'app-new-generator-ticket',
    templateUrl: './new-generator-ticket.component.html',
    styleUrls: ['./new-generator-ticket.component.scss'],
})
export class NewGeneratorTicketComponent implements OnInit {
    isLoading: boolean = false;
    formGroupError = new FormGroupError();

    private _unsubscribe: Subject<any> = new Subject<any>();
    userForm: FormGroup = this.createUserForm();

    user: UserI;

    /**
     *
     * @param matDialog
     * @param fBuilder
     * @param _ticketService
     */
    constructor(
        private matDialog: MatDialog,
        private fBuilder: FormBuilder,
        private _ticketService: TicketGeneratorService,
        private _authService: AuthService,
        private router: Router
    ) { }

    ngOnInit(): void {
        this.openDialogSearchUser();
    }

    /**
     * Create Form
     *
     * @returns FormGroup
     */
    createUserForm(): FormGroup {
        return this.fBuilder.group({
            ruc: [
                { disabled: false },
                [ValidCI, Validators.required],
            ],
            cliente: [{ disabled: false }, [Validators.required]],
            mail: [
                { disabled: false },
                [Validators.required, Validators.email],
            ],
            direccion: [{ disabled: false }, [Validators.required]],
            telefono: [{ disabled: false }, [Validators.required]],
            // quantityProducts: ['', []],
        });
    }

    /**
     * Open dialog Search User
     */
    openDialogSearchUser(): void {
        const dialogAux = this.matDialog
            .open(SearchUserComponent, {
                disableClose: true,
            })
            .componentInstance.userResponse.subscribe((data) => {
                if (data) {
                    console.log(data);
                    this.user = data;

                    this.userForm.patchValue(this.user);

                    if (this.user.isExist) {
                        this.userForm.get('ruc').disable();
                        this.userForm.get('cliente').disable();
                        this.userForm.get('mail').disable();
                        this.userForm.get('direccion').disable();
                        this.userForm.get('telefono').disable();
                    }
                }
            });
    }

    /**
     * Generated Ticket
     */
    generateTicket() {
        this.isLoading = true;

        const userAux: UserI = JSON.parse(
            JSON.stringify(this.userForm.getRawValue())
        );

        if (!this.user.isExist) {
            this._authService.registerUser(userAux).pipe(
                takeUntil(this._unsubscribe),
                timeout(2000),
                finalize(() => {
                    this.isLoading = false;
                })
            ).subscribe(
                (res) => {

                    if (res.st === 'Ingreso completo' && res.ident!=='null') {
                        this.generateTicketServ(userAux);
                    }else{
                        console.log('ERROR AL REGISTRAR');
                    }
                    

                },
                (err) => { }
            );
        } else {

            this.generateTicketServ(userAux);
        }

    }

    generateTicketServ( user: UserI) {
        this._ticketService
            .generateTicket(this.userForm.get('ruc').value)
            .pipe(
                takeUntil(this._unsubscribe),
                timeout(2000),
                finalize(() => {
                    this.isLoading = false;

                })
            )
            .subscribe(
                (res) => {

                    this.generatedTicket(res.idp, user);

                },
                (err) => { }
            );
    }

    generatedTicket(queue: string, user: UserI) {
        const now = new Date(Date.now());

        const formatoMap = {
            dd: now.getDate(),
            mm: now.getMonth() + 1,
            yy: now.getFullYear().toString().slice(-2),
            yyyy: now.getFullYear(),
        };

        let dateNow: string =
            formatoMap.dd + '/' + formatoMap.mm + '/' + formatoMap.yyyy;

        console.log(dateNow);

        const pdfGenerated: any = {
            // pageSize: { width: 80, height: 80 },
            content: [
                {
                    text: 'AgroVentas',
                    style: 'header',
                    alignment: 'center',
                },
                {
                    text: ['' + dateNow + ''],
                    style: 'time',
                    bold: true,
                    alignment: 'center',
                },
                {
                    text: [
                        'Bienvenido a AgroVentas!\n',
                        'Su número de cola es:\n',
                    ],
                    style: 'body',
                    bold: false,
                    alignment: 'center',
                },
                {
                    text: [queue],
                    style: 'ticket',
                    bold: true,
                    alignment: 'center',
                },
                {
                    text: [
                        'qui dolorem ipsum, quia dolor\n',
                        'liquam quaerat voluptatem\n',
                        'adipisci velit, sed \n',
                        'tempora incidunt, ut labore  \n',
                    ],
                    style: 'body',
                    bold: false,
                    alignment: 'center',
                },
            ],

            styles: {
                header: {
                    fontSize: 15,
                    bold: true,
                    alignment: 'justify',
                },
                body: {
                    fontSize: 10,
                    bold: false,
                    alignment: 'justify',
                },
                ticket: {
                    fontSize: 18,
                    bold: true,
                    alignment: 'justify',
                },
                time: {
                    fontSize: 7,
                    bold: true,
                    alignment: 'justify',
                },
            },
        };

        const pdf = pdfMake.createPdf(pdfGenerated);
        pdf.open();
    }

    cancelTicket() {
        this.router.navigate(['/']);
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
