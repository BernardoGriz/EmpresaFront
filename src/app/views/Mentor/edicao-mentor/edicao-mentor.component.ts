
import { Mentor } from './../../../models/mentorModels';
import { HttpClient } from '@angular/common/http';
import { MentorService } from './../../../servicos/mentor.service';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { FuncionarioService } from './../../../servicos/funcionario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edicao-mentor',
  templateUrl: './edicao-mentor.component.html',
  styleUrls: ['./edicao-mentor.component.css']
})
export class EdicaoMentorComponent implements OnInit {

  closeResult = '';

  mentor: Mentor = {
    mentor_nome: "",
    mentor_cargo: "",
    mentor_cpf: "",
    mentor_foto: ""
  }

  foto !: any

  id_cargo: any

  showDiv = {
    opcaonao: false,
    atualizar: true
  }

  constructor(private funcionarioService: FuncionarioService, private route: ActivatedRoute, private location: Location, private mentorService: MentorService, private http: HttpClient) {
    this.mentor.id_mentor = this.route.snapshot.paramMap.get('id_mentor')!
    this.id_cargo = this.route.snapshot.paramMap.get('id_cargo')!

  }

  ngOnInit(): void {
    this.buscarMentor()
  }

  buscarMentor() {
    this.mentorService.buscarUmMentor(this.mentor.id_mentor).subscribe((resultado) => {
      this.mentor = resultado;
    })
  }

  editarMentor() {
    if (this.id_cargo != 0) {
      this.mentorService.editarMentor(this.mentor, this.mentor.id_mentor, this.id_cargo).subscribe({
        complete: () => {
          this.funcionarioService.mensagem("Mentor(a) editado(a) com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcionarioService.mensagem("Erro ao editar mentor(a).")
          // this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    } else {
      this.mentorService.editarMentorSemCargo(this.mentor, this.mentor.id_mentor).subscribe({
        complete: () => {
          this.funcionarioService.mensagem("Mentor(a) editado(a) com sucesso!")
          // this.location.back();
        },
        error: () => {
          this.funcionarioService.mensagem("Erro ao editar mentor(a).")
          // this.location.back();
        },
        next: () => console.log("Mentor(a) editado(a).")
      })
    }
  }

  importarImg(event: any) {

    // Se o usuário selecionar um arquivo e
    // Se estiver na posição 0 (o multifiles permite que sejam importados diversos arquivos, que serão registrados em array)
    if (event.target.files && event.target.files[0]) {
      this.foto = event.target.files[0]

      console.log(this.foto)

      // variável que aramazena os seguintes atributos -- nome do atributo: , valor do atributo:
      // é como se estivessemos criando um obj
      const formData = new FormData

      // dentro do formData, criamos um atributo que chama foto e atribuímos a ele o conteúdo da variável foto
      formData.append("foto", this.foto)

      const cpf: string = this.mentor.mentor_cpf + "-" + event.target.files[0].name

      this.http.post(`http://localhost:8080/empresa/envio/${this.mentor.id_mentor}?cpf=${cpf}`, formData).subscribe({
        complete: () => console.log("Foto enviada com sucesso."),
      })
      this.funcionarioService.mensagem("Imagem anexada ao(à) mentor(a)")
      // window.location.reload()
    }
  }

  atualizarPg() {
    window.location.reload();
  }

  voltar() {
    this.location.back()
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
