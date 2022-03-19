import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { StorageService } from '../shared/storage.service';
import { ValidCI } from '../shared/validators/identification.validator';
import { LoginService } from './login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  userLoginForm = this.formBuilder.group({
    userIdDoc: [
      '',
      [
        ValidCI,
        Validators.required,
        Validators.maxLength(13),
        Validators.minLength(10),
      ],
    ],
  });

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private router: Router,
    private loginService: LoginService,
    private storage: StorageService
  ) {}

  set user(res: any) {
    this.storage.set('user', res);
  }

  ngOnInit() {}

  logInUser() {
    if (this.userLoginForm.invalid) {
      this.userLoginForm.markAsTouched();
      this.showToast('The entered info is not correct. Please confirm it.');
      return;
    }

    this.loginService
      .logInUser(this.userLoginForm.get('userIdDoc').value)
      .subscribe((res) => {
        if (res) {
          this.showToast('Logged In');
          this.storage.remove('user');
          this.storage.setUser(JSON.stringify(res));
          //this.user = JSON.stringify(res);
          this.router.navigate(['app/tabs/new-ticket-tab']);
        } else {
          this.showToast('The user is not registered or it is inactive.');

          this.router.navigate(['register']);
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
}
