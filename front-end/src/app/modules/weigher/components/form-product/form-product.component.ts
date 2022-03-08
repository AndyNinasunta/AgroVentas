import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss']
})
export class FormProductComponent implements OnInit {

  isLoading: boolean = false;
  productForm: FormGroup;

  @Output() productResponse: EventEmitter<any> = new EventEmitter<any>();

  namePage: string = '';

  constructor(public matRef: MatDialogRef<FormProductComponent>,
    private fBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data?: any) { }

  ngOnInit(): void {

    //Set Name Page
    if (this.data) {
      this.namePage = 'Editar'
    } else {
      this.namePage = 'Nuevo';
    }

    

    this.productForm = this.createProductForm();

    this.productForm.get('varios_sacos')
    .valueChanges
    .subscribe((res)=>{
      if(res){
        this.productForm.get('cantidad_sacos').enable();
      }else{
        this.productForm.get('cantidad_sacos').setValue('');
        this.productForm.get('cantidad_sacos').disable();
      }
    });

  }

  createProductForm(): FormGroup {
    return this.fBuilder.group({
      ID: [{ value: '', disabled: false }],
      Producto: [{ value: '', disabled: false }],
      cantidad: [{ value: '', disabled: false }],
      tara_saco: [{ value: '', disabled: false }],
      libra_tara: [{ value: '', disabled: false }],
      cantidad_sacos: [{ value: '', disabled: true }],
      varios_sacos: [{ value: '', disabled: false }],
    });
  }

  closeDialog(): void {
    this.matRef.close();
  }
}
