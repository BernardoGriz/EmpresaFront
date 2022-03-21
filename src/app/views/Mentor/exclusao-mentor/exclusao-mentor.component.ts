import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { MentorService } from 'src/app/servicos/mentor.service';
import { Mentor } from './../../../models/mentorModels';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-exclusao-mentor',
  templateUrl: './exclusao-mentor.component.html',
  styleUrls: ['./exclusao-mentor.component.css']
})
export class ExclusaoMentorComponent implements OnInit {

  closeResult = '';

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  id_cargo: String = ""

  constructor(private mentorService: MentorService,
    private route: ActivatedRoute, private location: Location, private funcionarioService: FuncionarioService) {
      this.mentor.id_mentor = this.route.snapshot.paramMap.get("id_mentor");

     }

  ngOnInit(): void {
    this.buscarUmMentor();
  }

  buscarUmMentor(){
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado)=>{
      // console.log(resultado);
      this.mentor = resultado;
      this.mentor.mentor_foto = resultado.mentor_foto.slice(11,100)
    })
  }

  excluirMentor() {
    this.mentorService.excluirMentor(this.mentor.id_mentor).subscribe({
      complete: () => {
        this.funcionarioService.mensagem("Mentor excluído com sucesso!")
        this.location.back();
      },
      error: () => {
        this.funcionarioService.mensagem("ERRO ao excluir mentor.")
        this.location.back();
      },
      next: () => console.log("Mentor excluído")
    })
  }

  // Função para abrir modal
  // open(content: any) {
  //   this.modalService.open(content, { size: 'md' }).result.then(
  //     (result) => {
  //       this.closeResult = `Closed with: ${result}`;
  //     },
  //     (reason) => {
  //       this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //     }
  //   );
  // }
  //open

  // Função para fechar modal
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  //getDismissReason


}
