
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User_Point } from 'src/app/models/user_point';
import { ApiCartolaService } from 'src/app/service/api.cartola';
import { AuthService } from 'src/app/service/auth.service';


@Component({
  selector: 'app-participar-competicao-cartola',
  templateUrl: './participar-competicao-cartola.component.html',
  styleUrls: ['./participar-competicao-cartola.component.scss']
})
export class ParticiparCompeticaoCartolaComponent implements OnInit {

  times = [];
  public usuario: User_Point = <User_Point>{};
  usuario_id = 0;
  selectAll = false;
  public toggleSearchBar: boolean = false;
  searchText: string = '';


  constructor(private router: Router,
    private route: ActivatedRoute,
    private apiCartolaService: ApiCartolaService, public authService: AuthService) {
    if (this.authService.currentUserPointValue) {
      this.usuario = this.authService.currentUserPointValue;
      this.usuario_id = this.usuario.id
    }
  }

  ngOnInit() {

    this.listarMeusTimesFavoritos()

  }



  listarMeusTimesFavoritos() {

    this.apiCartolaService.listarTimeFavoritoUsuario(this.usuario_id)
      .subscribe((times) => {
        this.times = times;
        for (let i = 0; i < this.times.length; i++) {

          this.times[i].checked = false;

        }
      })
  }


  updateCheck() {

    if (this.selectAll === true) {
      for (let i = 0; i < this.times.length; i++) {
        this.times[i].checked = true;
      }

    } else {
      for (let i = 0; i < this.times.length; i++) {
        this.times[i].checked = false;
      }
    }
  }

  isAllSelected(evt: any, time: any) {

    if (evt.checked) {
      for (let i = 0; i < this.times.length; i++) {
        if (time.time_id === this.times[i].time_id) {
          this.times[i].checked = true;
        }
      }
    } else {
      for (let i = 0; i < this.times.length; i++) {
        if (time.time_id === this.times[i].time_id) {
          this.times[i].checked = false;
        }
      }

    }

  }



  salvarTimes() {
    let count = 0
    for (let i = 0; i < this.times.length; i++) {
      if (this.times[i].checked) {
        count++
      }
    }
  }



}

