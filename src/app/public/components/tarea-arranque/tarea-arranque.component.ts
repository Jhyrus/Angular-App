import { TareaArranqueService } from './../../../core/services/tarea-arranque.service';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { environment } from 'src/environments/environment';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { CloudData } from 'angular-tag-cloud-module';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-tarea-arranque',
  templateUrl: './tarea-arranque.component.html',
  styleUrls: ['./tarea-arranque.component.scss']
})
export class TareaArranqueComponent implements OnInit {
  myform: FormGroup = new FormGroup({
    archivos: new FormControl([], Validators.required),
    numeroPalabras: new FormControl("", Validators.required),
    reto: new FormControl("", Validators.required)
  });
  showLoading: boolean = false;
  resultados: any = '';

  retos: any = [
    {
      id: 1,
      method: "v3primero",
      text: "Encuentre cuántas palabras hay en los archivos seleccionados"
    },
    {
      id: 2,
      method: "v3segundo",
      text: "Encuentre cuántas veces aparece cada palabra presente los archivos seleccionados"
    },
    {
      id: 3,
      method: "v3tercero",
      text: "Encuentre el número de palabras más frecuentes en los archivos seleccionados, con su frecuencia de aparición"
    },
    // {
    //   id: 4,
    //   method: "v3cuarto",
    //   text: ""
    // },
    // {
    //   id: 5,
    //   method: "v3quinto",
    //   text: ""
    // }
  ];

  filesList: Array<any> = [];
  selectedItems: Array<any> = [];
  filesSettings: IDropdownSettings = {};
  apiUrl: string = environment.apiUrl;

  constructor(
    private fb: FormBuilder,
    private tareaArranqueService: TareaArranqueService,
    private zone: NgZone,
  ) { }

  ngOnInit() {
    this.getFilesList()
  }

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }

  getFilesList(): void {
    const me = this;
    const url = me.apiUrl + "/v2list";
    const payload = {
      "path": "string"
    };
    me.filesList = [];
    me.selectedItems = [];
    me.filesSettings = {
      singleSelection: false,
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Deseleccionar Todos',
      itemsShowLimit: 1000,
      allowSearchFilter: true
    };
    me.tareaArranqueService.listFiles(url, payload).subscribe((response) => {
      me.zone.run(() => {
        me.filesList = response;
      });
    });
  }

  getResuts() {
    const me = this;
    me.showLoading = true;
    me.resultados = '';
    const url = me.apiUrl + "/" + this.myform.value.reto;
    let payload: any = {
      paths: []
    };
    this.myform.value.archivos.forEach((element: any) => {
      payload.paths.push({
        path: element,
        top: this.myform.value.numeroPalabras
      });
    });
    me.tareaArranqueService.getResults(url, payload).subscribe((response) => {
      me.zone.run(() => {
        response.paths.forEach((archivo: any) => {
          let wordCloudData: CloudData[] = [];
          if (this.myform.value.reto === 'v3tercero') {
            for (const key in archivo.words) {
              wordCloudData.push({ text: key, weight: archivo.words[key] });
            };
          }
          archivo.wordCloudData = wordCloudData;
        });
        me.resultados = response;
        me.showLoading = false;
      });
    });
  }

}
