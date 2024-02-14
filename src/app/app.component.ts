import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from './app.settings';
import { TranslateService } from '@ngx-translate/core';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Liga point do jogador';
  loading: boolean = false;
  public settings: Settings;
  constructor(public appSettings: AppSettings, 
    private titleService: Title, private metaService: Meta,
              public router: Router,
              @Inject(PLATFORM_ID) private platformId: Object,
              public translate: TranslateService){
    this.settings = this.appSettings.settings;
    translate.addLangs(['en','de','fr','ru','tr']);
    translate.setDefaultLang('en'); 
    translate.use('en');
  }

  ngOnInit() {
   // this.router.navigate(['']);  //redirect other pages to homepage on browser refresh    
   this.titleService.setTitle(this.title);
    this.metaService.addTags([
      { name: 'keywords', content: 'Liga, Cartola, Dicas Cartola, Liga Cartola, Catimba, Maior Liga, CatimbaScore, brasileirao, CartolaFC, Mitada no Cartola' },
      { name: 'description', content: 'Liga cartola point do jogador' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0,0);
        } 
      }
    })  
  }
}
