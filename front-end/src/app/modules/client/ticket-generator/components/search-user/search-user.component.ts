import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FormGroupError } from 'app/shared/class/validator-functions';
import { ValidCI, ValidRUC } from 'app/shared/validators/identification.validator';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {


  isLoading: boolean = false;
  formGroupError = new FormGroupError();

  userForm: FormGroup=this.createUserForm();
  // identification: FormControl = new FormControl('', [ValidCI, ValidRUC, Validators.required]);



  /**
   * Constructor
   * @param dialogRef 
   */
  constructor(public dialogRef: MatDialogRef<SearchUserComponent>,private fBuilder: FormBuilder,) { }


  ngOnInit(): void {
  }


  createUserForm(): FormGroup {
    return this.fBuilder.group({
      identification: [''
        ,
        [ValidCI,Validators.required],
      ]
    });
  }


  /**
   * Search User
   */
  searchUser() {
    this.isLoading = true;
  }

}
