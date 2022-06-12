import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { Postagem } from '../model/Postagem';
import { Tema } from '../model/Tema';
import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';
import { PostagemService } from '../service/postagem.service';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  tema: Tema = new Tema()
  listaTemas: Tema[] = []
  temaId:number
  nomeTema: string

  postagem: Postagem = new Postagem()
  listaPostagens: Postagem[] = []

  usuario: Usuario = new Usuario()
  idUsuario = environment.id

  constructor(
    private temaService: TemaService,
    private postagemService: PostagemService,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    window.scroll(0,0)

    if(environment.token == ""){
      /* //alert("Sessão encerrada! Faça login novamente.") */
      this.router.navigate(["/entrar"])
    }

    this.auth.refreshToken()
    this.buscarTemas()
    this.buscarPostagens()
  }

  buscarTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  temaById() {
    this.temaService.getTemaById(this.temaId).subscribe((resp: Tema) => {
      this.tema = resp
    })
  }


  publicar() {
    this.tema.id = this.temaId
    this.postagem.tema = this.tema

    this. usuario.id = this.idUsuario
    this.postagem.usuario = this.usuario

    this.postagemService.postPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      alert('Postagem feita com sucesso')
      this.postagem = new Postagem()
      this.buscarPostagens()
    })
  }
  
  buscarPostagens() {
    this.postagemService.getAllPostagens().subscribe((resp: Postagem[]) => {
      this.listaPostagens = resp
    })
  }

  getUsuarioById() {
    this.auth.getByIdUsuario(this.idUsuario).subscribe((resp: Usuario) => {
      this.usuario = resp
    })
  }

  findByNomeTema(){
    if(this.nomeTema == ''){
      this.buscarTemas()
    } else {
      this.temaService.getByNomeTema(this.nomeTema).subscribe((resp: Tema[]) => {
        this.listaTemas = resp
      })
    }
  }  
}