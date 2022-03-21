import { CargoService } from 'src/app/servicos/cargo.service';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BoletoService } from './../../../servicos/boleto.service';
import { Boleto } from './../../../models/boletoModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-boleto-mentor',
  templateUrl: './boleto-mentor.component.html',
  styleUrls: ['./boleto-mentor.component.css']
})
export class BoletoMentorComponent implements OnInit {

  id_mentor: any
  nomeMentor: any

  boletos: Boleto[] = []

  boleto: any


  constructor(private boletoService: BoletoService, private route: ActivatedRoute, private location: Location, private mentorService: MentorService, private cargoService: CargoService) {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
   }

  ngOnInit(): void {
    this.listarBoleto()
    this.buscarMentor()
  }

  listarBoleto() {
    this.boletoService.listarBoletoDoMentor(this.id_mentor).subscribe((res) => {
      this.boletos = res
    })
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.id_mentor).subscribe((res) => {
      this.nomeMentor = res.mentor_nome
    })
  }

  quitarBoleto(boleto: Boleto, codigo: any) {
    this.boletoService.pagarBoleto(boleto, codigo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Bonificação paga com sucesso.")
        this.listarBoleto()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao pagar bonificação.")
        this.listarBoleto()
      },
      next: () => { console.log("Bonificação paga.") }
    });
  }

  cancelarBoleto(boleto: Boleto, codigo: any) {
    this.boletoService.cancelarBoleto(boleto, codigo).subscribe({
      complete: () => {
        this.cargoService.mensagem("Bonificação cancelada com sucesso.")
        this.listarBoleto()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao cancelar bonificação.")
        this.listarBoleto()
      },
      next: () => { console.log("Bonificação cancelada.") }
    });
  }

}
