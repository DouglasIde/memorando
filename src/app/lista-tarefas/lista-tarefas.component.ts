import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { TarefaService } from 'src/app/service/tarefa.service';
import { Tarefa } from '../interface/tarefa';
import { buttonStateTrigger, checkButtonTrigger, filterTrigger, flyInOutTrigger, formButtonTrigger, highlightedStateTrigger, listStateTrigger, shakeTrigger, shownStateTrigger } from '../animations';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista-tarefas',
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css'],
  animations: [highlightedStateTrigger,
    shownStateTrigger,
    buttonStateTrigger,
    filterTrigger,
    formButtonTrigger,
    flyInOutTrigger,
    shakeTrigger,
    listStateTrigger,
    checkButtonTrigger
  ]
})

export class ListaTarefasComponent implements OnInit {
  listaTarefas: Tarefa[] = [];
  formAberto: boolean = false;
  categoria: string = '';
  validado: boolean = false;
  indexTarefa = -1;
  id: number | null = 0;
  campoBusca: string = '';
  tarefasFiltradas: Tarefa[] = [];
  tarefasSubscription: Subscription = new Subscription();
  estadoButton: string = 'unchecked';


  formulario: FormGroup = this.fomBuilder.group({
    id: [0],
    descricao: ['', Validators.required],
    statusFinalizado: [false, Validators.required],
    categoria: ['', Validators.required],
    prioridade: ['', Validators.required],
  });

  constructor(
    private service: TarefaService,
    private fomBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.service.listar();
    this.tarefasSubscription = this.service.tarefas$.subscribe((tarefas) => {
      this.listaTarefas = tarefas;
      this.tarefasFiltradas = tarefas;
    });
  }

  filtrarTarefasPorDescricao(descricao: string){
    this.campoBusca = descricao.trim().toLowerCase();
    if(descricao){
      this.tarefasFiltradas = this.listaTarefas.filter(tarefa => tarefa.descricao.toLowerCase().includes(this.campoBusca));
    } else {
      this.tarefasFiltradas = this.listaTarefas;
    }
  }

  mostrarOuEsconderFormulario() {
    this.formAberto = !this.formAberto;
    this.resetarFormulario();
  }

  salvarTarefa() {
    if (this.formulario.value.id) {
      this.editarTarefa();
    } else {
      this.criarTarefa();
    }
  }

  editarTarefa() {
    if(this.formulario.valid){
      const tarefaEditada = this.formulario.value;
      this.service.editar(tarefaEditada, true)
      this.resetarFormulario();
    }
  }

  criarTarefa() {
    if(this.formulario.valid){
      const novaTarefa = this.formulario.value;
      this.service.criar(novaTarefa)
      this.resetarFormulario();
    }
  }

  excluirTarefa(tarefa: Tarefa) {
    if(tarefa.id){
      this.service.excluir(tarefa.id);
    }
  }

  cancelar() {
    this.resetarFormulario();
    this.formAberto = false;
  }

  resetarFormulario() {
    this.formulario.reset({
      descricao: '',
      statusFinalizado: false,
      categoria: '',
      prioridade: '',
    });
  }

  carregarParaEditar(id: number) {
    this.service.buscarPorId(id!).subscribe((tarefa: Tarefa) => {
      this.formulario.patchValue({
        id: tarefa.id,
        descricao: tarefa.descricao,
        statusFinalizado: tarefa.statusFinalizado,
        categoria: tarefa.categoria,
        prioridade: tarefa.prioridade,
      });
    });
    this.formAberto = true;
  }

  finalizarTarefa(tarefa: Tarefa) {
    this.id = tarefa.id;
    this.service.atualizarStatusTarefa(tarefa);

    if(tarefa.statusFinalizado == true){
      this.estadoButton = 'checked';
    } else {
      this.estadoButton = 'unchecked';
    }
  }

  habilitarBotao(): string {
    if (this.formulario.valid) {
      return 'botao-salvar';
    } else return 'botao-desabilitado';
  }

  campoValidado(campoAtual: string): string {
    if (
      this.formulario.get(campoAtual)?.errors &&
      this.formulario.get(campoAtual)?.touched
    ) {
      this.validado = false;
      return 'form-tarefa input-invalido';
    } else {
      this.validado = true;
      return 'form-tarefa';
    }
  }
}
