import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from '../../model/tree-node';

@Component({
    selector: "tree",
    templateUrl: "./tree.component.html",
    styleUrls: ["./tree.component.css"]
})
export class TreeComponent implements OnInit {

    private flagFirstLoad = false;
    private enabledDirectSons: boolean;
    private nodesFound: Array<TreeNode> = [];
    private filterGlobalFlotas: string;
    private filterGlobalUnidades: string;

    @Input("data")
    data: Array<TreeNode>;

    constructor() {
        this.enabledDirectSons = true;
    }

    ngOnInit(): void {
    }

    filter(value: string): void {
        this.nodesFound = [];
        this.filterGlobalFlotas = value;
        this.changeVisiblechildren(this.data); //Todos visibles
        if (value !== "") { // es necesario filtrar???
            this.filterData(this.data, value, 1);
        }
        //Voy a llenar de unidades siempre que no haya comenzado otro filtrado de vehiculos
        if(typeof(this.filterGlobalUnidades) == "undefined" || this.filterGlobalUnidades == ""){
            this.addVehiculos(this.data, value);
        }

    }

    filterVehiculos(value: string): void {
        this.nodesFound = [];
        this.filterGlobalUnidades = value;
        this.changeVisiblechildren(this.data); //Todos visibles
        if (value !== "") { // es necesario filtrar???
            this.filterData(this.data, value, 2);
        }

        if((typeof(this.filterGlobalUnidades) == "undefined" || this.filterGlobalUnidades == "") &&  (typeof(this.filterGlobalFlotas) != "undefined" || this.filterGlobalFlotas != "")){
            this.filter(this.filterGlobalFlotas);
        }
    }

    private filterData(nodes: Array<TreeNode>, value: string, tipo: number): void {
        nodes.forEach(node => {
            node.hidden = true;

            //Reviso que sea de tipo flotas y que coincida
            if ((node.name.toLowerCase().indexOf(value.toLowerCase()) > -1) && node.flota && tipo == 1) {
                console.log(this.filterGlobalFlotas);
                if (typeof(this.filterGlobalUnidades) == "undefined" || this.filterGlobalUnidades == ""){
                    this.nodesFound.push(node);
                }else{
                    this.filterVehiculos(this.filterGlobalUnidades);
                }
            }

            //Reviso que sea de tipo vehiculos
            if (tipo == 2) {
                if (typeof(this.filterGlobalFlotas) == "undefined" || this.filterGlobalFlotas == ""){
                    //Reviso que coincida el valor con algo en el arbol
                    if ((node.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ) && !node.flota){
                        this.nodesFound.push(node);
                    }
                }else{
                    if((node.name.toLowerCase().indexOf(value.toLowerCase()) > -1 ) && (node.parent.name.toLowerCase().indexOf(this.filterGlobalFlotas.toLowerCase()) > -1)){
                        this.nodesFound.push(node);
                    }
                }
            }
            this.filterData(node.nodes, value, tipo); //???????
        });
        this.nodesFound.forEach(node => {
            this.changeVisibleParents(node);
        })
    }

    private changeVisibleParents(node: TreeNode): void {
        node.hidden = false;
        if (node.parent) {
            node.parent.expanded = true;
            this.changeVisibleParents(node.parent);
        }
    }

    private changeVisiblechildren(nodes: Array<TreeNode>) {
        nodes.forEach(node => {
            node.hidden = false;
            node.expanded = false;
            this.changeVisiblechildren(node.nodes);
        })
    }

    private addVehiculos(nodes: Array<TreeNode>, value: string){
        nodes.forEach(node => {
            if(!node.flota){
                if (node.parent){
                    node.expanded = false;
                }
                node.hidden = false;
                this.nodesFound.push(node);
            }
            this.addVehiculos(node.nodes, value);
        });
    }

}
