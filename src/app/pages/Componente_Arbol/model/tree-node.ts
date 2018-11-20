export class TreeNode {

    name: string;
    checked: boolean;
    hidden: boolean;
    expanded: boolean;
    ignoreFilter: boolean;
    parent: TreeNode;
    nodes: Array<TreeNode>;
    flota: boolean;
    estado: boolean=false;
    //Elementos fuera de cada nodo
    listaMarcados: Array<Boolean> = [];

    constructor(name: string, checked?: boolean, parent?: TreeNode, nodes?: Array<TreeNode>, flota?: boolean) {
        this.name = name;
        this.parent = parent || null;
        this.nodes = nodes || [];
        this.checked = checked || false;
        this.ignoreFilter = false;
        this.hidden = false;
        this.expanded = false;
        this.flota = flota;
    }


    toggle(): void {
        this.expanded = !this.expanded;
    }


    check(): void {
        console.log(this.nodes);
        this.checked = !this.checked;
        this.checkRecursive(this.nodes, this.checked);
        this.listaMarcados = [];
        if(this.checked){
          this.marcarPadres(this.parent);
        }else{
          this.verificacionNiveleSuperior(this);
        }
    }

    addNode(node: TreeNode): void {
        node.parent = this;
        this.nodes.push(node);
    }

    addNodes(nodes: Array<TreeNode>): void {
        nodes.forEach(node => {
            node.parent = this;
            this.nodes.push(node);
        });

    }

    countNoIgnoredNodes(): number {
        let count: number = 0;
        this.nodes.forEach(node => {
            if (!node.ignoreFilter) {
                count++;
            }
        });
        return count;
    }

    private checkRecursive(nodes: Array<TreeNode>, state: boolean): void {
        if (nodes) {
            nodes.forEach(node => {
                node.checked = state;
                this.checkRecursive(node.nodes, state);
            });
        }
    }
    private marcarPadres(node: TreeNode): void {
      if (node){
        node.checked=true;
        this.marcarPadres(node.parent);
      }
    }
    private verificarFamilia(nodes: Array<TreeNode>,origen: TreeNode, estado): boolean {
      nodes.forEach(node => {
        if(node!==origen && node.checked){
          estado=true;
        }
        if(node.nodes){
          estado=this.verificarFamilia(node.nodes, origen, estado);
        }
      });
      return estado;
    }

    private verificacionNiveleSuperior(node:TreeNode):void{
      if(node.parent){
        console.log(node.parent.name)
        let x=this.verificarFamilia(node.parent.nodes, node, false);
        if (!x){
          node.parent.checked=false;
        }
        this.verificacionNiveleSuperior(node.parent);
      }
    }

}
