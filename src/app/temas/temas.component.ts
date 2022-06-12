import { Component, OnInit } from '@angular/core';
import { Tema } from '../model/Tema';
import { TemaService } from '../service/tema.service';

@Component({
  selector: 'app-temas',
  templateUrl: './temas.component.html',
  styleUrls: ['./temas.component.css']
})
export class TemasComponent implements OnInit {

  tema: Tema = new Tema()

  listaTemas: Tema[] = []

  constructor(private temaService: TemaService) { }

  ngOnInit() {
    this.buscarTemas()
  }

  buscarTemas() {
    this.temaService.getAllTemas().subscribe((resp: Tema[]) => {
      this.listaTemas = resp
    })
  }

  cadastrar() {
    this.temaService.postTema(this.tema).subscribe((resp: Tema) => {
      this.tema = resp
      alert('Tema cadastrado')
      this.buscarTemas()
      this.tema = new Tema()
    })
  }
}
