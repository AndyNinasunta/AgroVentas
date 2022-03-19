import { Component, OnInit } from '@angular/core';
import { StorageService } from '../shared/storage.service';
import { NewTicketTabService } from './services/new-ticket-tab.service';

import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import { Observable, Subscription } from 'rxjs';
import { UserI } from '../shared/interfaces/shared.interface';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-new-ticket-tab',
  templateUrl: './new-ticket-tab.page.html',
  styleUrls: ['./new-ticket-tab.page.scss'],
})
export class NewTicketTabPage implements OnInit {
  user: UserI;
  userSubscription: Subscription;

  constructor(
    private newTicketService: NewTicketTabService,
    private storage: StorageService
  ) {}

  ngOnInit() {
    this.user = this.storage.user;
    // this.userSubscription = this.storage.user.subscribe((res) => {
    //   this.user = res;
    //   console.log(this.user, res);
    // });
  }

  generateTicket(): void {
    this.generateTicketServ();
  }

  generateTicketServ() {
    this.newTicketService.generateTicket('1250599436001').subscribe(
      (res) => {
        this.generatedTicket(res.idp);
      },
      (err) => {}
    );
  }

  generatedTicket(queue: string) {
    const now = new Date(Date.now());

    const formatoMap = {
      dd: now.getDate(),
      mm: now.getMonth() + 1,
      yy: now.getFullYear().toString().slice(-2),
      yyyy: now.getFullYear(),
    };

    const dateNow: string =
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
          text: ['Bienvenido a AgroVentas!\n', 'Su número de cola es:\n'],
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
}
