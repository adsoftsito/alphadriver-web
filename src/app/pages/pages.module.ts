import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing }       from './pages.routing';
import { NgaModule } from '../theme/nga.module';
import { AppTranslationModule } from '../app.translation.module';
import { TranslateModule } from '@ngx-translate/core';

import { Pages } from './pages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TreeModule } from 'angular-tree-component';
import { FilterSelectionPipe } from './Componente_Arbol/filter-flotas.pipe';
import { FilterSelectionUnidadesPipe } from './Componente_Arbol/filter-unidades.pipe';
import { TreeComponent } from './Componente_Arbol/panel-tree/tree/tree.component';
import { PanelTreeComponent } from './Componente_Arbol/panel-tree/panel-tree.component';
import { FilterSelectionPipe as RSP } from './Componente_Arbol/filtro-seleccion/filter-seleccion.pipe';
import { ToastyModule } from 'ng2-toasty';
import { ApplicationMenu } from "./../theme/components/baMenu/components/baMenuItem/applicationMenu/applicationMenu.component";
//import { MTravelComponent } from './travel_matrix/m_travel.component';

// const PAGES_COMPONENTS = [
//   FilterSelectionPipe,
//   FilterSelectionUnidadesPipe,
//   TreeComponent,
//   RSP,
//   PanelTreeComponent
// ];

@NgModule({
    declarations: [
    // ...PAGES_COMPONENTS,
    Pages,
    ApplicationMenu,
   // MTravelComponent,
  ],
  imports: [
    CommonModule, 
    NgbModule.forRoot(), 
    AppTranslationModule,
    NgaModule, routing,  
    TranslateModule, 
    FormsModule,
    TreeModule,
    
    ToastyModule.forRoot()
  ],
  exports: [
    // ...PAGES_COMPONENTS
  ]
})
export class PagesModule {
}
