import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'app/core/auth/auth.service';
import { FormGroupError } from 'app/shared/class/validator-functions';
import Swal from 'sweetalert2';
import { PayCash } from '../../interfaces/pay-product.interface';
import { PayProductService } from '../../services/pay-product.service';
@Component({
  selector: 'app-pay-product',
  templateUrl: './pay-product.component.html',
  styleUrls: ['./pay-product.component.scss']
})
export class PayProductComponent implements OnInit {

  payForm: FormGroup;

  @Output() action = new EventEmitter<boolean>();

  formGroupError = new FormGroupError();

  user: any;

  constructor(private payProductService: PayProductService, private userServ: AuthService, private fBuilder: FormBuilder, public matRef: MatDialogRef<PayProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) { }

  payType: any[] = [
    { codigo: 1, descripcion: 'Cash' },
    { codigo: 2, descripcion: 'Bank Transfer' },
    { codigo: 3, descripcion: 'Check' },
  ]


  ngOnInit(): void {
    this.user = JSON.parse(this.userServ.user);
    console.log(this.data);
    this.payForm = this.createProductForm();
    this.getOnePayProduct();


  }


  createProductForm(): FormGroup {
    return this.fBuilder.group({
      id_ticket: [{ value: '', disabled: true }],
      identificacion: [{ value: '', disabled: true }, [Validators.required]],
      nombre: [{ value: '', disabled: true }, [Validators.required]],
      peso: [{ value: '', disabled: true }, [Validators.required]],
      calificacion: [{ value: '', disabled: true }, [Validators.required]],
      total: [{ value: '', disabled: true }, [Validators.required]],
      forma_pago: [{ value: '', disabled: false }, [Validators.required]],
    });
  }

  getOnePayProduct(): void {
    this.payProductService.getOneTicketPendPay(this.data)
      .subscribe((res) => {
        if (res) {
          this.payForm.get('id_ticket').setValue(res.tk);
          this.payForm.get('identificacion').setValue(res.idnt);
          this.payForm.get('nombre').setValue(res.clt);
          this.payForm.get('peso').setValue(res.pso);
          this.payForm.get('calificacion').setValue(res.clf);
          this.payForm.get('total').setValue(res.pago);
        }
      })
  }

  payTicket(): void {

    let paymentAux: PayCash =
    {
      rmnid: Number(this.payForm.get('id_ticket').value),
      cajero: Number(this.user.usrid),
      payvalue: Number(this.payForm.get('total').value),
      paymth: Number(this.payForm.get('forma_pago').value),
    };

    this.payProductService.payProduct(paymentAux).subscribe
      ((res) => {
        this.showAlertResponse('200');
        this.closeDialog();
        this.action.emit(true);
      }, (err) => {
        this.showAlertResponse('500');

      })

  }


  closeDialog(): void {
    this.matRef.close();
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
        break;
      //mensaje de error 
      case '500':

        Swal.fire({
          position: 'center',
          width: "500px",
          icon: 'error',
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
