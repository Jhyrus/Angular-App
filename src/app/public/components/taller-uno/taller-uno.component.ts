import { TallerUnoService } from './../../../core/services/taller-uno.service';
import { Component, OnInit } from '@angular/core';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidationErrors } from '@angular/forms';
import { TypeaheadMatch } from 'ngx-bootstrap/typeahead';
import { Object } from 'core-js';
import { faShip, faPeopleGroup, faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons';
import * as ss from 'simple-statistics';
import * as d3 from 'd3';

declare var google: any;

@Component({
  selector: 'app-taller-uno',
  templateUrl: './taller-uno.component.html',
  styleUrls: ['./taller-uno.component.scss']
})
export class TallerUnoComponent implements OnInit {
  bsInlineValue = new Date();
  bsInlineRangeValue: Date[];
  minDate: Date;
  maxDate: Date;
  ejercicio1: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio2: FormGroup = this.fb.group({
    estado: ["", [Validators.required]],
    rango: ["", Validators.required]
  });
  ejercicio3: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio4: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio5: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio6: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio7: FormGroup = this.fb.group({
    rango: ["", Validators.required],
  });
  ejercicio1Resultados: any;
  ejercicio2Resultados: any;
  ejercicio3Resultados: any;
  ejercicio4Resultados: any;
  ejercicio5Resultados: any;
  ejercicio6Resultados: any;
  ejercicio7Resultados: any;
  estados: any = [];
  Object: any = Object;
  faShip = faShip;
  faPeopleGroup = faPeopleGroup;
  faMoneyBillTrendUp = faMoneyBillTrendUp;

  constructor(
    private fb: FormBuilder,
    private tuService: TallerUnoService
  ) {
    this.minDate = new Date('2017-01-02');
    this.maxDate = new Date('2021-01-01');
    this.bsInlineRangeValue = [this.minDate, this.maxDate];
    this.ejercicio1.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio2.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio3.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio4.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio5.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio6.patchValue({ rango: this.bsInlineRangeValue })
    this.ejercicio7.patchValue({ rango: this.bsInlineRangeValue })
    this.obtenerEstados();
  }

  ngOnInit(): void {
    google.charts.load('current', { 'packages': ['geochart', 'corechart'] });
  }

  obtenerEjercicio1() {
    const fechaInicio = new Date(this.ejercicio1.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio1.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio1(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        if (response.length > 0) {
          const estado = response[0]._id.Zone === "NA" ? (response[1] !== undefined ? response[1] : []) : response[0];
          this.ejercicio1Resultados = estado;
        } else {
          this.ejercicio1Resultados = response;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEstados() {
    this.tuService.obtenerEstados().subscribe(
      (response: any) => {
        if (response[0] !== undefined) {
          this.estados = response[0].Zones;
        }
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEjercicio2() {
    const fechaInicio = new Date(this.ejercicio2.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio2.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio2(this.ejercicio2.value.estado, fechaInicio, fechaFin).subscribe(
      (response) => {
        this.ejercicio2Resultados = response;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEjercicio3() {
    this.ejercicio3Resultados = {};
    const fechaInicio = new Date(this.ejercicio3.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio3.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio3(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        let viajesPorEstado: any = {};
        let fechas: any[] = [];
        // this.ejercicio3Resultados = response;
        for (const viaje of response) {
          const estado = viaje._id.Zone;
          const mes = viaje._id.Month;
          const anio = viaje._id.Year;
          const fecha = `${mes}-${anio}`;
          if (!viajesPorEstado[estado]) {
            viajesPorEstado[estado] = {};
          }
          viajesPorEstado[estado][fecha] = viaje.trips;
          if (!fechas.includes(fecha)) {
            fechas.push(fecha);
          }
        }
        fechas.sort();
        this.ejercicio3Resultados.viajesPorEstado = viajesPorEstado;
        this.ejercicio3Resultados.fechas = fechas;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEjercicio4() {
    const fechaInicio = new Date(this.ejercicio4.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio4.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio4(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        const valoresPorEstado: any = {};
        response.forEach((estado: any) => {
          const name = estado._id.Zone;
          const count = estado.count;
          if (name !== "NA") {
            valoresPorEstado[name] = count;
          }
        });
        this.ejercicio4Resultados = response;
        this.ejercicio4Resultados.geoChartData = {
          chartType:'GeoChart',
          dataTable:[
            ['City', 'Population'],
            ['Melbourne', 456789]
          ],
          options:{
            'region': 'IT',
            'displayMode':'markers'
          }
        };
        google.charts.setOnLoadCallback(this.dibujarGraficoDeCalor.bind(this, valoresPorEstado));
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEjercicio5() {
    this.ejercicio5Resultados = {};
    const fechaInicio = new Date(this.ejercicio5.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio5.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio5(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        this.ejercicio5Resultados.datosAgrupados = response.reduce((acc: any, cur: any) => {
          const diaSemana = cur._id.DayW;
          const year = cur._id.Year;
          const nombreDiaSemana = this.obtenerNombreDiaSemana(diaSemana);
          const clave = `${nombreDiaSemana}-${year}`;
          const estado = cur._id.Zone;
          const viajes = cur.trips;

          if (!acc[clave]) {
            acc[clave] = {};
          }

          if (!acc[clave][estado]) {
            acc[clave][estado] = 0;
          }

          acc[clave][estado] += viajes;

          return acc;
        }, {});

        this.ejercicio5Resultados.columnas = Object.keys(this.ejercicio5Resultados.datosAgrupados);
        this.ejercicio5Resultados.estados = this.obtenerEstadosdeDatos(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerEjercicio6() {
    this.ejercicio6Resultados = {};
    const fechaInicio = new Date(this.ejercicio6.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio6.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio6(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        this.ejercicio6Resultados.datosAgrupados = response.reduce((acc: any, cur: any) => {
          const estado = cur._id.Zone;
          const viajes = cur.trips;
          const poblacion = cur._id.Pop;
          if (!acc[estado]) {
            acc[estado] = {};
          }
          if (!acc[estado]['viajes']) {
            acc[estado]['viajes'] = 0;
          }
          acc[estado]['viajes'] += viajes;
          if (!acc[estado]['poblacion']) {
            acc[estado]['poblacion'] = poblacion;
          }
          return acc;
        }, {});
        const poblacion: number[] = [];
        const viajes: number[] = [];
        for (const estado in this.ejercicio6Resultados.datosAgrupados) {
          const poblacionEstado = parseInt(this.ejercicio6Resultados.datosAgrupados[estado].poblacion);
          const viajesEstado = this.ejercicio6Resultados.datosAgrupados[estado].viajes;
          poblacion.push(poblacionEstado);
          viajes.push(viajesEstado);
        }
        const coeficiente = ss.sampleRankCorrelation(poblacion, viajes);
        this.ejercicio6Resultados.coeficiente = coeficiente;
      },
      (error) => {
        console.error(error);
        alert(error);
      }
    );
  }

  obtenerEjercicio7() {
    this.ejercicio7Resultados = {};
    const fechaInicio = new Date(this.ejercicio7.value.rango[0]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    const fechaFin = new Date(this.ejercicio7.value.rango[1]).toLocaleDateString('es-CO', { day: '2-digit', month: '2-digit', year: 'numeric' }).replace(/\//g, '-');
    this.tuService.obtenerDatosEjercicio7(fechaInicio, fechaFin).subscribe(
      (response: any) => {
        this.ejercicio7Resultados.datosAgrupados = response.reduce((acc: any, cur: any) => {
          const estado = cur._id.Zone;
          const viajes = cur.trips;
          const pib = cur._id.Money;
          if (!acc[estado]) {
            acc[estado] = {};
          }
          if (!acc[estado]['viajes']) {
            acc[estado]['viajes'] = 0;
          }
          acc[estado]['viajes'] += viajes;
          if (!acc[estado]['pib']) {
            acc[estado]['pib'] = pib;
          }
          return acc;
        }, {});
        const pib: number[] = [];
        const viajes: number[] = [];
        for (const estado in this.ejercicio7Resultados.datosAgrupados) {
          const pibEstado = parseInt(this.ejercicio7Resultados.datosAgrupados[estado].pib);
          const viajesEstado = this.ejercicio7Resultados.datosAgrupados[estado].viajes;
          pib.push(pibEstado);
          viajes.push(viajesEstado);
        }
        const coeficiente = ss.sampleRankCorrelation(pib, viajes);
        this.ejercicio7Resultados.coeficiente = coeficiente;
      },
      (error) => {
        console.error(error);
      }
    );
  }

  obtenerNombreDiaSemana(diaSemana: number): string {
    switch (diaSemana) {
      case 1: return 'Lunes';
      case 2: return 'Martes';
      case 3: return 'Miércoles';
      case 4: return 'Jueves';
      case 5: return 'Viernes';
      case 6: return 'Sábado';
      case 7: return 'Domingo';
      default: return '';
    }
  }

  obtenerEstadosdeDatos(data: any[]): string[] {
    const zones = new Set<string>();
    for (const record of data) {
      zones.add(record._id.Zone);
    }
    return Array.from(zones).sort();
  }

  dibujarGraficoDeCalor(valoresPorEstado: any) {
    const datos: any = [['Estado', 'Valor']];
    for (const estado in valoresPorEstado) {
      datos.push([estado, valoresPorEstado[estado]]);
    }

    const opciones = {
      region: 'US',
      resolution: 'provinces',
      colorAxis: {
        colors: ['#ffffc8', '#7d0025'] // Establece el rango de colores
      }
    };

    const grafico = new google.visualization.GeoChart(document.getElementById('heatmap'));

    grafico.draw(google.visualization.arrayToDataTable(datos), opciones);
  }

  // drawMap(): void {
  //   const svg = d3.select('svg');
  //   const width = +svg.attr('width');
  //   const height = +svg.attr('height');

  //   // Define el mapa de USA con sus coordenadas
  //   const projection = d3.geoAlbersUsa()
  //     .scale(1200)
  //     .translate([width / 2, height / 2]);

  //   const path = d3.geoPath()
  //     .projection(projection);

  //   // Carga los datos de los estados de USA desde un archivo JSON
  //   d3.json('https://d3js.org/us-10m.v1.json').then((us: any) => {

  //     // Dibuja los estados en el mapa
  //     svg.append('g')
  //       .attr('class', 'states')
  //       .selectAll('path')
  //       .data(d3.feature(us, us.objects.states).features)
  //       .enter().append('path')
  //       .attr('d', path)
  //       .attr('fill', 'white')
  //       .attr('stroke', 'black')
  //       .attr('stroke-width', 0.5);
  //   });
  // }

  // dibujarGraficoDeCalor2(valoresPorEstado: any) {
  //   let datos: any = [['Estado', 'Viajes', 'Población']];
  //   for (const estado in valoresPorEstado) {
  //     const estadoObj = valoresPorEstado[estado];
  //     datos.push([estado, parseInt(estadoObj.viajes), parseInt(estadoObj.poblacion)]);
  //   }
  //   datos = google.visualization.arrayToDataTable(datos);
  //   const opciones = {
  //     title: 'Relación entre población y número de viajes',
  //     hAxis: {
  //       title: 'Estado'
  //     },
  //     vAxis: {
  //       title: 'Número de viajes'
  //     }
  //   };
  //   const grafico = new google.visualization.ColumnChart(document.getElementById('ejercicio6-chart'));
  //   grafico.draw(datos, opciones);
  // }
}
