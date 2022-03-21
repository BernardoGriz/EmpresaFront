import { Location } from '@angular/common';
import { CargoService } from 'src/app/servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../servicos/mentor.service';
import { Cargo } from './../../../models/cargoModels';
import { Mentor } from './../../../models/mentorModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mentor-do-cargo',
  templateUrl: './mentor-do-cargo.component.html',
  styleUrls: ['./mentor-do-cargo.component.css']
})
export class MentorDoCargoComponent implements OnInit {

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  cargo: Cargo = {
    car_nome: "",
    car_atribuicao: ""
  }

  mentorCadastrado: boolean = false

  id_cargo: any
  mentoresSemCargo: any
  mentorSemCargo: any = []


  constructor(private mentorService: MentorService, private route: ActivatedRoute, private router: Router, private cargoService: CargoService, private location: Location) {
    this.id_cargo = this.route.snapshot.paramMap.get("id_cargo")

  }

  ngOnInit(): void {
    this.buscarCargo()
    this.buscarMentorDoCargo()
    this.buscarMentorSemCargo()
  }

  buscarCargo() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe(resultado => {
      this.cargo = resultado
    })
  }

  buscarMentorDoCargo() {
    this.mentorService.buscarMentorDoCargo(this.id_cargo).subscribe((resultado) => {

      if (resultado == undefined) {
        this.cargoService.mensagem("Para esse cargo não há mentor definido.")
        this.mentorCadastrado = false
      } else {
        this.mentor = resultado
        this.mentorCadastrado = true
      }
    })
  }

  buscarMentorSemCargo() {
    this.mentorService.buscarMentoresSemCargo().subscribe((resultado) => {
      this.mentoresSemCargo = resultado
      console.log(this.mentoresSemCargo)
    })
  }

  mostrarMentor() {
    console.log(this.mentorSemCargo)
    this.mentor = this.mentorSemCargo
  }

  atribuirMentor() {
    this.cargoService.mostrarCargo(this.id_cargo).subscribe((res) => {
      this.cargo = res
    })

    this.cargoService.atribuirMentor(this.cargo, this.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("o mentor foi atribuído com sucesso")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("erro ao atribuir mentor")
        this.location.back()
      },
      next: () => console.log("mentor atribuído")
    })
  }

  deixarCargoSemMentor() {
    this.cargoService.deixarCargoSemMentor(this.cargo, this.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("o mentor foi desvinculado com sucesso")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("ERRO: o mentor não foi retirado do cargo")
        this.location.back()
      }
    })
  }

}
