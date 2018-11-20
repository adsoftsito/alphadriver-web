import { Component, OnInit, ViewChild, Input } from "@angular/core";
import { TreeComponent } from "./tree/tree.component";
import { CatalogosService } from "../catalogos.service";
import { TreeNode } from "../model/tree-node";
import { ToastyService, ToastyConfig, ToastOptions, ToastData } from "ng2-toasty";

@Component({
    selector: "panel-tree",
    templateUrl: "./panel-tree.component.html",
    styleUrls: ["./panel-tree.component.css"],
    providers: [CatalogosService, ToastyService, ToastyConfig]
})
export class PanelTreeComponent implements OnInit {

    @ViewChild("tree")
    tree: TreeComponent;

    @Input("parametrosDashlet")
    parametrosIndicador: any;

    private padre: TreeNode;
    arbolFlotas: Array<TreeNode>;
    subflotas: Array<TreeNode>;
    filtroSeleccinados: string;
    unidades: Array<TreeNode>;
    modoSeleccion: number;
    mapNodesUniversal: Map<string, TreeNode>;

    constructor(
        private catalogosService: CatalogosService,
        private toastyService: ToastyService,
        private toastyConfig: ToastyConfig
    ) {
        this.arbolFlotas = [];
        this.filtroSeleccinados = "";
        this.toastyConfig.theme = "bootstrap"; //Config theme bootstrap
        this.toastyConfig.position = "top-right";
    }

    ngOnInit(): void {

        if(this.parametrosIndicador.configuracion.modoSeleccion){
            this.modoSeleccion = this.parametrosIndicador.configuracion.modoSeleccion.vista;
        }else{
            this.modoSeleccion = 1;
        }

        //En este punto supuestamente ya hay info por los inputs!
        this.listFleets();
    }

    listFleets(): void {
        console.info(this.parametrosIndicador.flota);
        this.catalogosService.listarSubflotasDelUsuario(this.parametrosIndicador.flota)
            .then(subflotas => {
                console.info(subflotas);
                this.buildTree(subflotas);

                //Esto solo debe hacerse si está el modo de vehiculos activado
                if(this.modoSeleccion == 2){
                    this.catalogosService.listarUnidadesDelUsuario(this.parametrosIndicador.flota, this.parametrosIndicador.subflota)
                        .then(unidades => {
                            console.info(unidades);
                            this.buildTreeUnidades(unidades);
                        }).catch(err => {
                            this.errorAlert();
                            console.log(err);
                        });
                }//del if
            }).catch(err => {
                this.errorAlert();
                console.log(err);
            });
    }

    private buildTree(subflotas: Array<any>): void {
        this.subflotas = new Array<TreeNode>();
        let mapNodes: Map<string, TreeNode> = new Map<string, TreeNode>();
        let node: TreeNode, root: TreeNode;

        subflotas.forEach(sf => {
            node = new TreeNode(sf.flota, this.parametrosIndicador.subflotasSeleccionadas.indexOf(sf.flota) > -1);
            node.flota = true;

            mapNodes.set(sf.flota, node);
            this.subflotas.push(node);

            if (!sf.flotaPadre) {
                this.padre = node;
            }
            if (sf.flota === this.parametrosIndicador.subflota) {
                root = node;
            }
        });

        subflotas.forEach(sf => {
            if (sf.flotaPadre) { //Comonzar a buscar los padres de cada uno excepto de la flota padre
                mapNodes.get(sf.flotaPadre).addNode(mapNodes.get(sf.flota));
            }
        });

        console.info("Estado de flotas directas");
        console.info(this.parametrosIndicador.configuracion.subflotasDirectas);

        this.arbolFlotas = [root];
        if (this.parametrosIndicador.configuracion.subflotasDirectas) { //Si está marcado lo de flotas directas lo usamos
            this.changeIgnoreStateDirectFleets(root.nodes, true);
        }
        if (root.parent) {
            this.ignoreFilterForParent(root.parent);  //Marcar aquellos que no se visulaizan en la lista
        }

        this.mapNodesUniversal = mapNodes;
        console.info(root);
    }


    private buildTreeUnidades(unidadesLocales: Array<any>): void {

        this.unidades = new Array<TreeNode>();
        let node: TreeNode;
        let flotastemp: Array<any> = new Array<any>();

        //recorro el arbol ya de puras flotas
        this.mapNodesUniversal.forEach(af => {

            unidadesLocales.forEach(sf => {

                if (sf.flota == af.name) { //Si la flota es lo mismo que tiene de nombre el nodo entonces le pego un hijo con la unidad
                    if(this.parametrosIndicador.configuracion.unidades){
                        node = new TreeNode(sf.alias, this.parametrosIndicador.configuracion.unidades.indexOf(sf.alias) > -1);
                        node.flota = false;
                        this.unidades.push(node);
                        af.addNode(node);
                    }else{
                        node = new TreeNode(sf.alias, false);
                        this.unidades.push(node);
                        af.addNode(node);
                    }
                }else{
                     af.checked = false;
                }
            });
        });

        //recorro las unidades y guardo sus flotas en otra lista
        this.unidades.forEach(un => {

            if (un.checked){
                flotastemp.push(un.parent.name);
            }
        });

        //Ahora con esas flotas padre, vuelvo a recorrer y busco quienes son sus flotas papá
        this.subflotas.forEach(sf => {

            flotastemp.forEach(ft => {
                if (sf.name == ft){
                    if (sf.parent != null){
                        flotastemp.push(sf.parent.name);
                    }
                }
            });

        });

        //Ya que tengo las flotas que deben ser para marcar, vuelvo a recorrer para marcar las flotas a donde pertenecen

        if (flotastemp.length != 0){
            flotastemp.forEach(sf => {
                    this.mapNodesUniversal.get(sf).checked = true;
            });
        }else{
            this.unidades.forEach(un => {
                un.checked = true;
                flotastemp.push(un.parent.name);
            });

            flotastemp.forEach(sf => {
                    this.mapNodesUniversal.get(sf).checked = true;
            });

        }

        //Y le pasamos la flota padre también
        this.mapNodesUniversal.get(this.parametrosIndicador.flota).checked = true;

    }//de buildTreeUnidades

    enabledOnlyDirectSons(): void {
        this.changeIgnoreStateDirectFleets(this.arbolFlotas[0].nodes, this.parametrosIndicador.configuracion.subflotasDirectas);
        //this.tree.enabledOnlyDirectSons(this.parametrosIndicador.configuracion.subflotasDirectas)
    }

    getListSelection(): Array<string> {
        if(this.modoSeleccion == 1){
            return this.subflotas.filter(sf => sf.checked).map(sf => sf.name);
        }

        if(this.modoSeleccion == 2){
            return this.unidades.filter(sf => sf.checked).map(sf => sf.name);
        }
    }

    getListFleets():  Array<any>{

        let arrayFleets: Array<any> = new Array<any>();

        this.subflotas.forEach(sf => {
            if (sf.checked){

                let jsonvalores = {
                    flota: null,
                    flota_padre: null
                }

                jsonvalores.flota = sf.name;
                if (sf.parent != null){
                    jsonvalores.flota_padre = sf.parent.name;
                }else{
                    jsonvalores.flota_padre = sf.name;
                }
                    arrayFleets.push(jsonvalores);
            }
        });

        return arrayFleets;
    }

    getListVehicles():  Array<any>{

        let arrayVehicles: Array<any> = new Array<any>();

        this.unidades.forEach(sf => {

            if (sf.checked){

                let jsonvalores = {
                     unitno: null,
                    flota: null
                }

                jsonvalores.unitno = sf.name;

                if (sf.parent != null){
                    jsonvalores.flota = sf.parent.name;
                }else{
                    jsonvalores.flota = sf.name;
                }

                    arrayVehicles.push(jsonvalores);
            }
        });

        return arrayVehicles;
    }

    private changeIgnoreStateDirectFleets(subflotas: Array<TreeNode>, state: boolean) {
        subflotas.forEach(sf => {
            this.ignoreNodes(sf, state);
        });
    }

    private ignoreNodes(node: TreeNode, state: boolean) {
        if (node.nodes.length > 0) {
            node.nodes.forEach(sf => {
                sf.ignoreFilter = state;
                this.ignoreNodes(sf, state);
            });
        }
    }

    private ignoreFilterForParent(node: TreeNode): void {
        if (node) {
            node.ignoreFilter = true;
            if (node.parent) {
                this.ignoreFilterForParent(node.parent);
            }
        }
    }

    errorAlert(): void {
        this.toastyService.error({
            title: "Error",
            msg: "No se pudieron cargar los datos.",
            showClose: true,
            timeout: 5000
        });
    }

}
