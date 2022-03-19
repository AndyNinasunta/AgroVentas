import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../shared/storage.service';
import { ValidCI } from '../shared/validators/identification.validator';
import { RegisterService } from './services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  userRegisterForm = this.formBuilder.group({
    ruc: [
      { value: '', disabled: false },
      [ValidCI, Validators.required],
    ],
    cliente: [{ value: '', disabled: false }, [Validators.required]],
    mail: [
      { value: '', disabled: false },
      [Validators.required, Validators.email],
    ],
    direccion: [{ value: '', disabled: false }, [Validators.required]],
    telefono: [{ value: '', disabled: false }, [Validators.required]],
  });


  /**
   * Constructor
   */
  constructor(private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private registerService: RegisterService,
    private storage: StorageService) { }

  /**
   * On Init
   */
  ngOnInit() {
  }

  /**
   * Register New User
   */
  registerUser(): void {
    if (this.userRegisterForm.invalid) {
      this.userRegisterForm.markAsTouched();
      this.showToast('The entered info is not correct. Please confirm it.');
      return;
    }

    this.registerService
      .registerUser(this.userRegisterForm.value)
      .subscribe((res) => {
        if (res) {
          this.showToast('Logged In');
          // this.storage.set('user', JSON.stringify(res));
          this.userRegisterForm.reset;
          this.backToLogIn();
        } else {
          this.showToast('The user is not registered or it is inactive.');

          this.backToLogIn();
        }
      });
  }

  async showToast(messageI: string) {
    const toast = await this.toastController.create({
      message: messageI,
      duration: 2000,
      translucent: true,
    });
    toast.present();
  }

  createPdf(): void {

  }

  /**
   * Back to Log In
   */
  backToLogIn(): void {
    this.router.navigate(['']);
  }
}
