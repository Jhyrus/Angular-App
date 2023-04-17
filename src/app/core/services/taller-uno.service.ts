import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TallerUnoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerDatosEjercicio1(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/ejercicio_1/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEstados() {
    const url = `${this.apiUrl}/taller_1/zones`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio2(estado: string, fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/ejercicio_2/${estado}/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio3(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/ejercicio_3/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio4(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/ejercicio_4/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio5(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/ejercicio_5/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio6(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/p4/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerDatosEjercicio7(fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_1/p4/${fechaInicio}/${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocurrió un error en la aplicación, por favor inténtelo de nuevo más tarde.';
    if (error.error instanceof ErrorEvent) {
      // Un error del lado del cliente ocurrió. Manejarlo en consecuencia.
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // El servidor devolvió una respuesta no satisfactoria. El cuerpo de la respuesta puede contener detalles adicionales.
      errorMessage = `El servidor devolvió un código de error ${error.status}, ` +
        `el cuerpo del mensaje de error es: ${error.error}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  };
}
