import { CargoService } from './../../../servicos/cargo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MentorService } from './../../../servicos/mentor.service';
import { Cargo } from './../../../models/cargoModels';
import { Mentor } from './../../../models/mentorModels';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-atribuir-cargo-do-mentor',
  templateUrl: './atribuir-cargo-do-mentor.component.html',
  styleUrls: ['./atribuir-cargo-do-mentor.component.css']
})
export class AtribuirCargoDoMentorComponent implements OnInit {

  id_mentor: any

  cargosSemMentor: any
  cargoSemMentorEscolhido: any = []
  mentorSemCargoEscolhido: any = []

  mentor: Mentor = {
    id_mentor: '',
    mentor_nome: '',
    mentor_cpf: '',
    mentor_cargo: '',
    mentor_foto: ''
  }

  cargo: Cargo = {
    id_cargo: '',
    car_nome: '',
    car_atribuicao: ''
  }

  constructor(private mentorService: MentorService,
    private route: ActivatedRoute,
    private router: Router,
    private cargoService: CargoService,
    private location: Location) { }

  ngOnInit(): void {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarMentor()
    this.buscarMentorDoCargo()
    this.buscarCargoSemMentor()
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe(resultado => {
      this.mentor = resultado
    })
  }
  buscarMentorDoCargo() {
    this.cargoService.buscarCargoDoMentor(this.id_mentor).subscribe(resultado => {

      if (resultado == null) {
        this.cargoService.mensagem("Para esse mentor não está definido um cargo")
      } else {
        this.cargo = resultado
        console.log(resultado);
      }

    })
  }

  buscarCargoSemMentor() {
    this.cargoService.mostrarCargosSemMentor().subscribe((resultado) => {

      this.cargosSemMentor = resultado
      console.log("aqui")
      console.log(resultado);

    })

  }

  escolherCargo() {
    console.log(this.cargoSemMentorEscolhido)
    this.cargo = this.cargoSemMentorEscolhido
  }

  atribuirCargo() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((resultado) => {
      this.mentor = resultado
    })

    this.cargoService.atribuirMentor(this.cargo, this.cargo.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("SUCESSO: O cargo foi atribuído ao mentor")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("ERRO: o cargo não foi atribuído.")
        this.location.back()
      }
    })
  }

  deixarCargoSemMentor() {
    this.cargoService.deixarCargoSemMentor(this.cargo, this.cargo.id_cargo, this.mentor.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("SUCESSO: O mentor está sem Cargo")
      },
      error: () => {
        this.cargoService.mensagem("ERRO: o mentor não foi retirado do cargo")
      }
    })
  }

}
