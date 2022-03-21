import { CargoService } from 'src/app/servicos/cargo.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { BoletoService } from './../../../servicos/boleto.service';
import { Boleto } from './../../../models/boletoModels';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicao-boleto',
  templateUrl: './edicao-boleto.component.html',
  styleUrls: ['./edicao-boleto.component.css']
})
export class EdicaoBoletoComponent implements OnInit {

  boleto: Boleto = {
    bo_descricao: "",
    bo_dataPagamento: "",
    bo_valor: "",
    bo_status: ""
  }

  id_mentor: any

  constructor(private boletoService:BoletoService,
    private route:ActivatedRoute,
    private location:Location,
    private cargoService: CargoService) { }

  ngOnInit(): void {
    this.boleto.codigo = this.route.snapshot.paramMap.get('codigo')
    this.id_mentor = this.route.snapshot.paramMap.get('id_mentor')
    this.buscarUmBoleto()
  }

  buscarUmBoleto(){
    this.boletoService.buscarUmaBoleto(this.boleto.codigo).subscribe((resultado)=>{
      this.boleto = resultado
      this.boleto.bo_dataPagamento = resultado.bo_dataPagamento.slice(0,10) //Para pegarmos apenas a data, sem o UTC
      console.log(this.boleto.bo_dataPagamento)
    })
  }

  editarBoleto(){
    this.boletoService.editarBoleto(this.boleto, this.boleto.codigo, this.id_mentor).subscribe({
    complete: () => { this.cargoService.mensagem("Boleto editada com sucesso")
                      this.location.back()},
    error: () => { this.cargoService.mensagem("Erro ao editar boleto")
                      this.location.back() },
    next: () => { console.log("Boleto editada.")}

    });

  }

}
