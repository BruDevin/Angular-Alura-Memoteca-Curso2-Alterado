import { Component, OnInit } from '@angular/core';
import { Pensamento } from '../pensamento';
import { PensamentoService } from '../pensamento.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { minusculoValidator } from './minusculoValidator';

@Component({
  selector: 'app-editar-pensamento',
  templateUrl: './editar-pensamento.component.html',
  styleUrls: ['./editar-pensamento.component.css']
})
export class EditarPensamentoComponent implements OnInit {

  formulario!: FormGroup;

  pensamento: Pensamento = {
    id: 0,
    conteudo: '',
    autoria: '',
    modelo:'',
    favorito: false
  }

  constructor(
    private service: PensamentoService,
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      conteudo: ['', Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
      autoria: ['', Validators.compose([Validators.required, Validators.minLength(3), minusculoValidator])],
      modelo: ['modelo1'],
      favorito: [false]
    })
    const id: number = parseInt(this.route.snapshot.paramMap.get('id')!)
    this.service.buscarPorId(id).subscribe((pensamento) => {
      this.pensamento = pensamento
      this.formulario = this.formBuilder.group({
        conteudo: [pensamento.conteudo, Validators.compose([Validators.required, Validators.pattern(/(.|\s)*\S(.|\s)*/)])],
        autoria: [pensamento.autoria, Validators.compose([Validators.required, Validators.minLength(3), minusculoValidator])],
        modelo: [pensamento.modelo],
        favorito: [pensamento.favorito]
      })
    })
    
  }

  editarPensamento() {
    if(this.formulario.valid) {
      const id = parseInt(this.route.snapshot.paramMap.get('id')!)
      this.pensamento.id = id
      this.pensamento.conteudo = this.formulario.get('conteudo')?.value
      this.pensamento.autoria = this.formulario.get('autoria')?.value
      this.pensamento.modelo = this.formulario.get('modelo')?.value
      this.pensamento.favorito = this.formulario.get('favorito')?.value
      this.service.editar(this.pensamento).subscribe(() => {
      this.router.navigate(['/listarPensamentos'])
     })
    }    
  }

  cancelar() {
    this.router.navigate(['/listarPensamentos'])
  }

  habilitarBotao() {
    if(this.formulario.valid) {
      return 'botao'
    }
    return 'botao_desabilitado'
  }

}
