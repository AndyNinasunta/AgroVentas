import { Component, Inject, OnInit } from '@angular/core';
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

    this.payForm = this.createProductForm();
  }


  createProductForm(): FormGroup {
    return this.fBuilder.group({
      id_ticket: [{ value: '1', disabled: true }],
      identificacion: [{ value: '1250599436', disabled: true }, [Validators.required]],
      nombre: [{ value: 'Andy Ninasunt', disabled: true }, [Validators.required]],
      peso: [{ value: '345', disabled: true }, [Validators.required]],
      calificacion: [{ value: '245.45', disabled: true }, [Validators.required]],
      total: [{ value: '3434', disabled: true }, [Validators.required]],
      forma_pago: [{ value: '', disabled: false }, [Validators.required]],
    });
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
