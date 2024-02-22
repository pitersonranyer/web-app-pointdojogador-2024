import { Component, Input } from '@angular/core';
import { SwiperConfigInterface } from '../../theme/components/swiper/swiper.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-brands-carousel',
  templateUrl: './brands-carousel.component.html',
  styleUrls: ['./brands-carousel.component.scss']
})
export class BrandsCarouselComponent {

  @Input('ligas') ligas: Array<any> = [];

  public config: SwiperConfigInterface = { };
  
  constructor(private router: Router) { }

  listarCompeticaoLiga(competicao: any) {

    this.router.navigate(['/competicaoLigaCartola'], { queryParams: competicao });

  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 7,
      spaceBetween: 16,         
      keyboard: true,
      navigation: true,
      pagination: false,
      grabCursor: true,  
      loop: true,
      preloadImages: false,
      lazy: true,     
      autoplay: {
        delay: 6000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide",
      breakpoints: {
        240: {
          slidesPerView: 1
        },
        480: {
          slidesPerView: 2
        },
        /* 600: {
          slidesPerView: 3
        },
        960: {
          slidesPerView: 4
        },
        1280: {
          slidesPerView: 5
        },
        1500: {
          slidesPerView: 6
        } */
      }
    }
  }

}