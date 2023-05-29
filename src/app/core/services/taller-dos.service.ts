import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TallerDosService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  obtenerPolaridad(usuarios: string, temas: string, fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_2/analyze_emotions/?usuarios=${usuarios}&temas=${temas}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerTweetsPorSector(sector: string, fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_2/tweets_by_sector/?sector=${sector}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerTweetsPorGenero(genero: string, fechaInicio: string, fechaFin: string) {
    const url = `${this.apiUrl}/taller_2/tweets_by_gender/?gender=${genero}&fecha_inicio=${fechaInicio}&fecha_fin=${fechaFin}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerUsuarios() {
    const url = `${this.apiUrl}/taller_2/all_users`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSectores() {
    const url = `${this.apiUrl}/taller_2/all_sectors`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerGeneros() {
    const url = `${this.apiUrl}/taller_2/all_gender`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerTemas() {
    const url = `${this.apiUrl}/taller_2/all_subjects`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerSemanticaTweet(id: string) {
    const url = `${this.apiUrl}/taller_2/semantic_analysis_by_tweet_id/?Id=${id}`;
    return this.http.get(url).pipe(
      catchError(this.handleError)
    );
  }

  obtenerEnriquecimientoTweet(id: string) {
    const url = `${this.apiUrl}/taller_2/dbpedia_by_tweet_id/?Id=${id}`;
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
