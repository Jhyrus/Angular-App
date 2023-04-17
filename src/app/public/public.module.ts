import { TareaArranqueService } from './../core/services/tarea-arranque.service';
import { SharedModule } from './../core/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicRoutingModule } from './public-routing.module';
import { TareaArranqueComponent } from './components/tarea-arranque/tarea-arranque.component';
import { TallerUnoComponent } from './components/taller-uno/taller-uno.component';


@NgModule({
  declarations: [TareaArranqueComponent, TallerUnoComponent],
  imports: [
    CommonModule,
    PublicRoutingModule,
    SharedModule
  ],
  providers: [
    TareaArranqueService
  ],
  exports:[
    TareaArranqueComponent,
    TallerUnoComponent
  ]
})
export class PublicModule { }
