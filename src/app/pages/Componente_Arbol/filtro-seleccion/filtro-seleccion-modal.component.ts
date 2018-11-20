import { Component, OnInit, ViewChild } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PanelTreeComponent } from "../panel-tree/panel-tree.component";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from "ng2-toasty";

@Component({
    templateUrl: "./filtro-seleccion-modal.component.html",
    styleUrls: ["./filtro-seleccion-modal.component.css"],
    providers: [ToastyService, ToastyConfig]
})
export class FiltroSeleccionModal implements OnInit {

    @ViewChild("panelTree")
    panelTree: PanelTreeComponent;


    idDashlet: number;
    parametrosIndicador: any;
    modoSeleccion: number;

    constructor(private activeModal: NgbActiveModal,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig) {
        this.toastyConfig.theme = "bootstrap"; //Config theme bootstrap
        this.toastyConfig.position = "top-right";
    }

    ngOnInit(): void {
         this.modoSeleccion = this.parametrosIndicador.configuracion.modoSeleccion.vista;
    }

    apply(): void {

        if (this.parametrosIndicador.configuracion.modoSeleccion.vista == 1){
            //flotas seleccionadas tiene el formato de objetos con subflota y flota padre
            this.parametrosIndicador.flotasSeleccionadas = this.panelTree.getListFleets();
            this.parametrosIndicador.subflotasSeleccionadas = this.panelTree.getListSelection();
        }else if(this.parametrosIndicador.configuracion.modoSeleccion.vista == 2){
            //unidades seleccionadas tiene el formato de objetos con vehiculo y flota padre
            this.parametrosIndicador.unidadesSeleccionadas = this.panelTree.getListVehicles();
            this.parametrosIndicador.configuracion.unidades = this.panelTree.getListSelection();
        }
        //Cierro el modal con la nueva configuracion, la cual se guardaá en el componente que lo mandó a llamar
        this.activeModal.close({ nuevaConfiguracion: this.parametrosIndicador });

    }

    cancel(): void {
        this.activeModal.close();
    }

}
