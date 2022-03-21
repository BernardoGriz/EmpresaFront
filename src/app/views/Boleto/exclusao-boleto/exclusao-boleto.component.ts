import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BoletoService } from './../../../servicos/boleto.service';
import { CargoService } from 'src/app/servicos/cargo.service';
import { FormBuilder } from '@angular/forms';
import { Boleto } from './../../../models/boletoModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exclusao-boleto',
  templateUrl: './exclusao-boleto.component.html',
  styleUrls: ['./exclusao-boleto.component.css']
})
export class ExclusaoBoletoComponent implements OnInit {

  boleto: Boleto = {
    bo_descricao: "",
    bo_dataPagamento: "",
    bo_valor: "",
    bo_status: ""
  }

  id_mentor: any

  constructor( private location: Location, private route: ActivatedRoute, private boletoService: BoletoService, private cargoService: CargoService) { }

  ngOnInit(): void {
    this.boleto.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarUmBoleto()

  }

  buscarUmBoleto() {
    this.boletoService.buscarUmaBoleto(this.boleto.codigo).subscribe((resultado) => {
      this.boleto.bo_dataPagamento = resultado.bo_dataPagamento.slice(0,10)
      this.boleto = resultado
    })
  }

  excluirBoleto() {
    this.boletoService.excluirBoleto(this.boleto.codigo, this.id_mentor).subscribe({
      complete: () => {
        this.cargoService.mensagem("Boleto excluída com sucesso")
        this.location.back()
      },
      error: () => {
        this.cargoService.mensagem("Erro ao excluir boleto")
        this.location.back()
      },
      next: () => { console.log("Boleto excluído") }
    });
  }


}
