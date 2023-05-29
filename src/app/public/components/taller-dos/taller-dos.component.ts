import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { TallerDosService } from 'src/app/core/services/taller-dos.service';
import { formatDate } from '@angular/common';
import { Object } from 'core-js';
import { IconDefinition, faPlus, faSmile, faThumbsUp, faClock, faCheckCircle, faTired, faAngry, faExclamationTriangle, faThumbsDown, faSurprise, faSadTear, faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { TreeNode } from 'primeng/api';


@Component({
  selector: 'app-taller-dos',
  templateUrl: './taller-dos.component.html',
  styleUrls: ['./taller-dos.component.scss']
})
export class TallerDosComponent implements OnInit {
  faPlus = faPlus;
  faUserCircle = faUserCircle;
  Object: any = Object;
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  polaridadRes: any;
  sectorRes: any;
  generoRes: any;
  form: FormGroup = this.fb.group({
    usuarios: ["", [Validators.required]],
    temas: ["", [Validators.required]],
    rango: ["", Validators.required]
  });
  sectorForm: FormGroup = this.fb.group({
    sector: ["", [Validators.required]],
  });
  generoForm: FormGroup = this.fb.group({
    genero: ["", [Validators.required]],
  });
  filesSettings: IDropdownSettings = {
    singleSelection: false,
    selectAllText: 'Seleccionar Todos',
    unSelectAllText: 'Deseleccionar Todos',
    itemsShowLimit: 1000,
    allowSearchFilter: true
  };
  filesSettingsSingle: IDropdownSettings = {
    singleSelection: true,
    selectAllText: 'Seleccionar Todos',
    unSelectAllText: 'Deseleccionar Todos',
    itemsShowLimit: 1000,
    allowSearchFilter: true
  };
  usuarios: any;
  sectores: any;
  generos: any;
  temas: any;
  tweetText: any;
  dbPediaData: any;
  hoveredToken: any[] = [];

  selectedNodes: TreeNode[] = [];

  data: TreeNode[] = [];

  showLoading: boolean = false;

  sortField: string = "Fecha";
  sortOrder: number = 1;

  constructor(
    private fb: FormBuilder,
    private service: TallerDosService
  ) {
    this.obtenerUsuarios();
    this.obtenerTemas();
    this.obtenerSectores();
    this.obtenerGeneros();
    this.minDate = new Date('2023-04-20');
    this.maxDate = new Date('2023-05-29');
    this.bsInlineRangeValue = [this.minDate, this.maxDate];
    this.form.patchValue({ rango: this.bsInlineRangeValue });
  }


  obtenerPolaridad() {
    this.showLoading = true;
    const fechaInicio = new Date(this.form.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.form.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.service.obtenerPolaridad(this.form.value.usuarios, this.form.value.temas, fechaInicio, fechaFin).subscribe(
      (response) => {
        this.polaridadRes = response;
        this.data = this.transformData(this.polaridadRes.analisis_por_tema);
        this.showLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerTweetsPorSector() {
    this.showLoading = true;
    const fechaInicio = new Date(this.form.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.form.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.service.obtenerTweetsPorSector(this.sectorForm.value.sector, fechaInicio, fechaFin).subscribe(
      (response) => {
        this.sectorRes = response;
        this.showLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerTweetsPorGenero() {
    this.showLoading = true;
    const fechaInicio = new Date(this.form.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.form.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.service.obtenerTweetsPorGenero(this.generoForm.value.genero, fechaInicio, fechaFin).subscribe(
      (response) => {
        this.generoRes = response;
        this.showLoading = false;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerUsuarios() {
    this.service.obtenerUsuarios().subscribe(
      (response: any) => {
        this.usuarios = this.transformUsuarios(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerSectores() {
    this.service.obtenerSectores().subscribe(
      (response: any) => {
        this.sectores = this.transformSectores(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerGeneros() {
    this.service.obtenerGeneros().subscribe(
      (response: any) => {
        this.generos = this.transformGeneros(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerTemas() {
    this.service.obtenerTemas().subscribe(
      (response: any) => {
        this.temas = this.transformTemas(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerTweet(id: string) {
    this.showLoading = true;
    this.showLoading = true;
    this.service.obtenerSemanticaTweet(id).subscribe(
      (semanticResponse) => {
        this.service.obtenerEnriquecimientoTweet(id).subscribe(
          (response) => {
            this.tweetText = semanticResponse;
            this.dbPediaData = response;
            this.tweetText.dbPediaText = this.getProcessedText()
            this.showLoading = false;
          },
          (error) => {
            console.error(error);
          }
        );
      },
      (error) => {
        console.error(error);
      }
    );
  }

  formatDate(date: string): string {
    const formattedDate = new Date(date);
    return formatDate(formattedDate, 'dd-MM-yyyy', 'en-US');
  }

  truncateText(text: string, limit: number): string {
    if (text.split(' ').length > limit) {
      const words = text.split(' ');
      return words.slice(0, limit).join(' ') + '...';
    }
    return text;
  }

  ngOnInit(): void {
  }

  transformUsuarios(usuarios: any[]): string[] {
    return usuarios.map(usuario => usuario.Usuario);
  }
  
  transformSectores(sectores: any[]): string[] {
    return sectores.map(sector => sector.Sector);
  }

  transformGeneros(generos: any[]): string[] {
    return generos.map(genero => genero.Genero);
  }

  transformTemas(temas: any[]): string[] {
    return temas.map(tema => tema.Tema);
  }

  handleMouseOver(token: any) {
    this.hoveredToken = [token];
  }

  getProcessedText(): string {
    let processedText = this.tweetText.texto_original;

    this.dbPediaData.DbPedia.forEach((dbTerm: any) => {
      const surfaceForm = dbTerm['@surfaceForm'];
      const uri = dbTerm['@URI'];

      const pattern = new RegExp(`\\b${surfaceForm}\\b`, 'gi');
      const replaceText = `<a href="${uri}" target="_blank">${surfaceForm}</a>`;
      processedText = processedText.replace(pattern, replaceText);
    });

    return processedText;
  }

  getBadgeClass(key: any): string {
    switch (key) {
      case 'Alegría':
      case 'Positivo':
        return 'badge bg-success';
      case 'Anticipación':
      case 'Confianza':
        return 'badge bg-primary';
      case 'Asco':
      case 'Ira':
      case 'Miedo':
      case 'Negativo':
      case 'Sorpresa':
      case 'Tristeza':
        return 'badge bg-danger';
      default:
        return 'badge';
    }
  }

  getIcon(key: any): IconDefinition {
    switch (key) {
      case 'Alegría':
        return faSmile;
      case 'Positivo':
        return faThumbsUp;
      case 'Anticipación':
        return faClock;
      case 'Confianza':
        return faCheckCircle;
      case 'Asco':
        return faTired;
      case 'Ira':
        return faAngry;
      case 'Miedo':
        return faExclamationTriangle;
      case 'Negativo':
        return faThumbsDown;
      case 'Sorpresa':
        return faSurprise;
      case 'Tristeza':
        return faSadTear;
      default:
        return faPlus;
    }
  }

  sortPolarity(polarity: any): any[] {
    return Object.entries(polarity).sort((a, b) => b[1] - a[1]);
  }

  transformData(analisis_por_tema: any) {
    let result: any[] = [
      {
        expanded: true,
        type: 'titulo',
        data: {
          Titulo: 'Análisis'
        },
        children: []
      }
    ];
    for (let user in analisis_por_tema) {
      if (analisis_por_tema.hasOwnProperty(user)) {
        let userEntry: any = {
          expanded: true,
          type: 'usuario',
          data: {
            Avatar: 'ruta_a_la_imagen_de_perfil',
            Nombre: user,
            Usuario: '@' + user,
          },
          children: []
        };
        for (let tema in analisis_por_tema[user]) {
          if (analisis_por_tema[user].hasOwnProperty(tema)) {
            let polaridad = analisis_por_tema[user][tema];
            let temaEntry: any = {
              expanded: true,
              type: 'tema',
              data: {
                Tema: tema,
                polaridad: polaridad
              }
            };
            userEntry.children.push(temaEntry);
          }
        }
        result[0].children.push(userEntry);
      }
    }
    return result;
  }

  sortColumn(column: string) {
    if (this.sortField === column) {
      this.sortOrder *= -1;
    } else {
      this.sortField = column;
      this.sortOrder = 1;
    }

    this.sortData();
  }

  sortData() {
    if (this.sortField) {
      this.polaridadRes.analisis_por_tweet.sort((a: any, b: any) => {
        const valueA = a[this.sortField];
        const valueB = b[this.sortField];

        if (typeof valueA === 'string' && typeof valueB === 'string') {
          return valueA.localeCompare(valueB) * this.sortOrder;
        } else if (typeof valueA === 'number' && typeof valueB === 'number') {
          return (valueA - valueB) * this.sortOrder;
        } else {
          return 0;
        }
      });
    }
  }

}
