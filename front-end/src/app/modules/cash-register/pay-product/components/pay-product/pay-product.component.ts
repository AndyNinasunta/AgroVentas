import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pay-product',
  templateUrl: './pay-product.component.html',
  styleUrls: ['./pay-product.component.scss']
})
export class PayProductComponent implements OnInit {

  payForm: FormGroup;

  constructor(private fBuilder: FormBuilder, public matRef: MatDialogRef<PayProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: any,
  ) { }

  ngOnInit(): void {

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
      forma_pago: [{ value: '1', disabled: false }],
    });
  }


  payTicket(): void {
    console.log('sE PAGO');
    this.showAlertResponse('200');
    this.closeDialog();
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
