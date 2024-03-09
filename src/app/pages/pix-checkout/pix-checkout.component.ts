import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiPixService } from 'src/app/service/api.pix';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-pix-checkout',
  templateUrl: './pix-checkout.component.html',
  styleUrls: ['./pix-checkout.component.scss']
})
export class PixCheckoutComponent implements OnInit {

  form: FormGroup;
  valorPix = '';
  descPix: any;
  valorDB = 0;
  qrcodeTela = '';
  pixCopyPaste = '';
  btnCopy = false ;

  constructor(fb: FormBuilder, private gerarQrCodeService: ApiPixService, public authService: AuthService) {
    this.form = fb.group({
      valorPixCurrency: [''],
      descPixCr: ['']
    })
  }

  ngOnInit() {

  }

  gerarCobranca() {
    if (this.form.valid) {
      this.gerarQrCode();
    }
  }


  gerarQrCode() {

    this.valorDB = parseInt(this.valorPix);

    this.gerarQrCodeService.gerarQrCode(this.valorDB, this.descPix, this.authService.currentUserValue.uid).subscribe((pixResponse: any) => {
      this.qrcodeTela = pixResponse.imagemQrcode;
      this.pixCopyPaste = pixResponse.copyPaste
    });

  }

  copiarTextPix() {

    this.pixCopyPaste;
    this.btnCopy = false;
    navigator.clipboard.writeText(this.pixCopyPaste)
      .then(() => {
        alert('Pix "Codigo QR", copiado com sucesso!');
        this.btnCopy = true;
      })

    /* // Alert the copied text
    alert("Copied the text: " + copyText); */

  }



}
