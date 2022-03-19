import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormGroupError } from 'app/shared/class/validator-functions';
import { RecipientI } from '../../interfaces/weigher-combo.interface';
import { PesajeDetalleI } from '../../interfaces/weigher.interface';
import { WeigherService } from '../../services/weigher.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  formGroupError = new FormGroupError();
  isLoading: boolean = false;
  productForm: FormGroup;

  recipientCombo: RecipientI[];
  calf: number;
  tara_saco: string;

  @Output() productResponse: EventEmitter<PesajeDetalleI> = new EventEmitter<PesajeDetalleI>();

  @Output() califEmition: EventEmitter<number> = new EventEmitter<number>();

  namePage: string = '';

  isLoadingWbSocket: boolean = true;

  constructor(public matRef: MatDialogRef<FormProductComponent>,
    private fBuilder: FormBuilder,
    private weigherService: WeigherService,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {

    //Set Name Page
    if (this.data) {
      this.namePage = 'Editar'
    } else {
      this.namePage = 'Nuevo';
    }


    this.getRecipient();

    this.productForm = this.createProductForm();

    this.productForm.get('varios_sacos')
      .valueChanges
      .subscribe((res) => {
        if (res) {
          this.productForm.get('cantidad_sacos').enable();
        } else {
          this.productForm.get('cantidad_sacos').setValue('');
          this.productForm.get('cantidad_sacos').disable();
        }
      });

    setInterval(() => {
      this.weigherService.sensordata().subscribe((res) => {
        console.log(res);
        if (res) {
          this.productForm.get('cantidad').setValue(Number(res.peso) * 2, 205);
          this.calf = res.humedad;
        }
      },
        (err) => {
          console.log('err');
        });
      // this.productForm.get('cantidad').setValue(2 * 2, 205);
      // this.calf = Math.random();

    }, 3000);
  }

  getRecipient() {

    this.weigherService.getRecipient()
      .subscribe((res) => {

        if (res) {
          this.recipientCombo = res;
          console.log(res);
        }
      },
        (err) => {
          console.log(err);
        });
  }

  createProductForm(): FormGroup {
    return this.fBuilder.group({
      id: [{ value: '1', disabled: false }],
      producto: [{ value: 'Cacao', disabled: true }, [Validators.required]],
      cantidad: [{ value: '', disabled: true }, [Validators.required]],
      id_tara_saco: [{ value: '', disabled: false }, [Validators.required]],
      libra_tara: [{ value: '', disabled: false }, [Validators.required]],
      cantidad_sacos: [{ value: '', disabled: true }, [Validators.required]],
      varios_sacos: [{ value: false, disabled: false }],
    });
  }

  setDescrTara(event: any): void {
    this.tara_saco = event;
    console.log(event);
  }

  saveProduct(): void {

    let productAux = JSON.parse(JSON.stringify(this.productForm.getRawValue()));
    productAux.calificación = this.calf;
    productAux.tara_saco = this.tara_saco;
    console.log(productAux);
    this.productResponse.emit(productAux);
    this.closeDialog();
  }

  closeDialog(): void {
    this.matRef.close();
  }

}
