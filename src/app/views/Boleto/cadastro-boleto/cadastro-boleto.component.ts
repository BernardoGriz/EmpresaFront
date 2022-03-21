import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BoletoService } from './../../../servicos/boleto.service';
import { CargoService } from 'src/app/servicos/cargo.service';
import { Boleto } from './../../../models/boletoModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cadastro-boleto',
  templateUrl: './cadastro-boleto.component.html',
  styleUrls: ['./cadastro-boleto.component.css']
})
export class CadastroBoletoComponent implements OnInit {

  boleto: Boleto ={
    bo_descricao: '',
    bo_dataPagamento:'',
    bo_valor:0,
    bo_status:'PENDENTE'
  }

  id_mentor: any

  constructor(private boletoService: BoletoService, private route: ActivatedRoute, private location: Location, private cargoService: CargoService) {
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
  }

  ngOnInit(): void {

  }

  cadastrarBoleto(){
    this.boletoService.cadastrarBoleto(this.boleto, this.id_mentor).subscribe({
    complete: () => { this.cargoService.mensagem("Boleto cadastrado com sucesso")
                      this.location.back()},
    error: () => { this.cargoService.mensagem("Erro ao cadastrar boleto.")
                    this.location.back()},
    next: () => { console.log("Boleto cadastrado.")}
    });

  }

}
