import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroupError } from 'app/shared/class/validator-functions';
import { UserI } from 'app/shared/interfaces/user.interface';
import {
    ValidCI,
    ValidRUC,
} from 'app/shared/validators/identification.validator';
import { Subject } from 'rxjs';
import { finalize, takeUntil, timeout } from 'rxjs/operators';
import { TicketGeneratorService } from '../../services/ticket-generator.service';

@Component({
    selector: 'app-search-user',
    templateUrl: './search-user.component.html',
    styleUrls: ['./search-user.component.scss'],
})
export class SearchUserComponent implements OnInit {
    @Output() userResponse: EventEmitter<UserI> = new EventEmitter<UserI>();

    isLoading: boolean = false;
    formGroupError = new FormGroupError();

    userForm: FormGroup = this.createUserForm();

    user: UserI;

    private _unsubscribe: Subject<any> = new Subject<any>();
    // identification: FormControl = new FormControl('', [ValidCI, ValidRUC, Validators.required]);

    /**
     * Constructor
     * @param dialogRef
     */
    constructor(
        public dialogRef: MatDialogRef<SearchUserComponent>,
        private fBuilder: FormBuilder,
        private _ticketService: TicketGeneratorService,
        private router: Router
    ) {}

    ngOnInit(): void {}

    /**
     * Create Form
     *
     * @returns FormGroup
     */
    createUserForm(): FormGroup {
        return this.fBuilder.group({
            identification: ['', [ValidCI, Validators.required]],
        });
    }

    cancelTicket() {
        this.dialogClose();
        this.router.navigate(['/']);
    }

    /**
     * Search User
     */
    searchUser() {
        this.isLoading = true;

        const identificationAux: string =
            this.userForm.get('identification').value;

        this._ticketService
            .searchUser(identificationAux)
            .pipe(
                takeUntil(this._unsubscribe),
                timeout(2000),
                finalize(() => {
                    this.isLoading = false;

                    this.user = {
                        idUser: 1,
                        isExist: true,
                        identification: identificationAux,
                        fullName: 'Andy Ninasunta',
                        direction: 'Parroquia NID',
                        email: 'andy2000-09@hotmail.com',
                        phoneNumber: '0982804639',
                    };

                    this.userResponse.emit(this.user);

                    this.dialogClose();
                })
            )
            .subscribe(
                (res) => {},
                (err) => {}
            );
    }

    dialogClose() {
        this.dialogRef.close();
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        this._unsubscribe.next();
        this._unsubscribe.complete();
    }
}
