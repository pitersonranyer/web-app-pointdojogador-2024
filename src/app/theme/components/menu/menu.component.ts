import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public emailVerified: boolean;
  
  constructor(public authService: AuthService) { 

    if (this.authService.currentUserValue) {
      this.emailVerified = this.authService.currentUserValue.emailVerified;
    } else {
      this.emailVerified = false
    }
  }

  ngOnInit() { }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el: any) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }

}
