import {Component, OnInit, Input, AfterViewInit, Output, EventEmitter, OnChanges} from '@angular/core';
import * as d3 from 'd3';
import { Injectable } from '@angular/core';
import { IGroupModel } from '../../../shared/models/groups/group.edit.model';


@Injectable()



@Component({
    selector: 'motum-group-tree',
    templateUrl: './motumGroupTree.component.html',
    styleUrls: ['./motumGroupTree.scss']
})
export class MotumGroupTreeComponent implements OnInit, AfterViewInit, OnChanges {



    @Input()  treeData;

    @Output() formData  = new EventEmitter<IGroupModel>();
    @Input()  editedData : any;

    i = 0;
    duration = 750;
    svg;
    margin;
    width;
    height;

    // declares a tree layout and assigns the size
    treemap;
    root;


    constructor() {

        //  this.root = this.d3.hierarchy(this.treeData, function(d) { return d.children; });
    }

    ngOnChanges() {


        if (this.editedData) {
            let data = {
                id: this.editedData.idGroup,
                name: this.editedData.groupName,
                colorA: this.editedData.color,
                colorB: this.editedData.borderColor,
                parent: this.editedData.father
            };


            if (this.editedData.type == "new"){

                // FIRST YOU HAVE TO UPDATE TREE
                var newData = this.updateTree(this.treeData, this.editedData.idGroup, data);
                var crudeData = this.deleteOldNewNodes(newData, 'new');
                this.root = d3.hierarchy(crudeData, function(d) {
                    if (d.children){

                        let data1 = {"id": (Math.random() * 1000000), "name": 'NUEVO', "colorA": '#fff', "colorB": '#146ef9', 'type':'new'};
                        d.children.push(data1);
                    }
                    return d.children;
                });
                this.root.x0 = this.height / 2;
                this.root.y0 = 0;
                //console.log(this.dataSource);
                this.root.children.forEach(this.collapse);
                
                this.update(this.root);

            }
            else if (this.editedData.type == "addgroup"){
                //HANDLES JUST ID > GENERATE A NEW ONE FOR CHILD ELEMENT

                var newData = this.addGroupTree(this.treeData, this.editedData.idGroup, data);

                this.treemap = d3.tree().size([this.height, this.width]);
                this.root = d3.hierarchy(newData, function(d) {
                    return d.children; });
                this.root.x0 = this.height / 2;
                this.root.y0 = 0;

                this.root.children.forEach(this.collapse);

                this.update(this.root);

            } else if (this.editedData.type == "delete"){
                var crudeData = this.deleteNode(this.treeData, this.editedData.idGroup);
                this.treemap = d3.tree().size([this.height, this.width]);
                this.root = d3.hierarchy(crudeData, function(d) {
                    return d.children; });
                this.root.x0 = this.height / 2;
                this.root.y0 = 0;
                //console.log(this.dataSource);
                this.root.children.forEach(this.collapse);

                this.update(this.root);

            }
            else {

                var newData = this.updateTree(this.treeData, this.editedData.idGroup, data);

                this.treemap = d3.tree().size([this.height, this.width]);
                this.root = d3.hierarchy(newData, function(d) {
                    return d.children; });
                this.root.x0 = this.height / 2;
                this.root.y0 = 0;
                //console.log(this.dataSource);
                this.root.children.forEach(this.collapse);

                this.update(this.root);
            }

        }
    }
deleteOldNewNodes(tree1, type){
    var result;
    var i=0;
    var length = 0;
    try {
        length = Object.keys(tree1.children).length;
    } catch (e){
        length = 0;
    }
   for(i=0;i<length;i++){
        if(tree1.children[i].type === type){
            tree1.children.splice(i,1);
            break;
        } else{
            result = this.deleteOldNewNodes(tree1.children[i],type);
        }
    }
    result = tree1;
    return result;
}

deleteNode(tree1, id){
        var result;
        var i=0;
        var length = 0;
        try {
            length = Object.keys(tree1.children).length;
        } catch (e){
            length = 0;
        }
        for(i=0;i<length;i++){
            if(tree1.children[i].id === id){
                tree1.children.splice(i,1);
                break;
            } else{
                result = this.deleteNode(tree1.children[i],id);
            }
        }
        result = tree1;
        return result;
    }

sendItemToGroup(data){
    let groupModel: IGroupModel = new IGroupModel;
    groupModel.idGroup = data.data.id;
    groupModel.father = data.parent.data.name;
    groupModel.type = "addgroup";
    this.formData.emit(groupModel);
}

addGroupTree(tree1,id, arrayArg) {
        var result;
        var i=0;
        var length = 0;
        try {
            length = Object.keys(tree1.children).length;

        } catch (e){
            length = 0;
        }



        for(i=0;i<length;i++){


            if(tree1.children[i].id == id){

                let id = (Math.random() * 1000000);
                let name = arrayArg.name;
                let colorA = arrayArg.colorA;
                let colorB = arrayArg.colorB;
                let newData = [{"id": id, "name":name, "colorA":colorA, "colorB":colorB}];

                if (tree1.children[i].children){
                    tree1.children[i].children.push(newData);
                } else {
                    tree1.children[i].children = newData;
                    let data1 = {"id": (Math.random() * 1000000), "name": 'NUEVO', "colorA": '#fff', "colorB": '#146ef9', 'type':'new'};
                    tree1.children[i].children.push(data1);
                }
                //tree1.children[i].children[0].colorB = newData[0].colorA;

                break;
            } else{
                result = this.addGroupTree(tree1.children[i],id,arrayArg);
            }
        }
        result = tree1;
        return result;

    }

updateTree(tree1,id, arrayArg) {
        var result;
        var i=0;
        var length = 0;
         try {
          length = Object.keys(tree1.children).length;

         } catch (e){
             length = 0;
         }

        for(i=0;i<length;i++){

            if(tree1.children[i].id === id){

                tree1.children[i].id = arrayArg.id;
                tree1.children[i].name = arrayArg.name;
                tree1.children[i].colorA = arrayArg.colorA;
                tree1.children[i].colorB = arrayArg.colorB;
                        if(tree1.children[i].type){

                            tree1.children[i].type = "node";
                        } else {

                        }

                 break;
            } else{
                result = this.updateTree(tree1.children[i],id,arrayArg);
            }
        }
      result = tree1;
    return result;

    }

    ngAfterViewInit(){

        // Set the dimensions and margins of the diagram
        this.margin = {top: 0, right: 0, bottom: 30, left: 150};
        this.width = 200 - this.margin.left - this.margin.right;
        this.height = 600 - this.margin.top - this.margin.bottom;

        // append the svg object to the body of the page
        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
       this. svg = d3.select('#groupTreeCanvas').insert('svg')
            .attr('style', 'width: 100%;height: 100%;')

           .attr("preserveAspectRatio", "xMinYMid meet")
           .attr("viewBox", "0 0 1300 600")
           .classed("svg-content", true)
            .append('g')
            .attr('transform', 'translate('
                + this.margin.left + ',' + this.margin.top + ')');



        this.loadTreeInfo()

    }

    loadTreeInfo(){



        //this.treeData = dst;

        this.treemap = d3.tree().size([this.height, this.width]);
        this.root = d3.hierarchy(this.treeData, function(d) {
            if (d.children){

                let data1 = {"id": (Math.random() * 1000000), "name": 'NUEVO', "colorA": '#fff', "colorB": '#146ef9', 'type':'new'};
                d.children.push(data1);
            }
            return d.children; });
        this.root.x0 = this.height / 2;
        this.root.y0 = 0;
        //console.log(this.dataSource);
        this.root.children.forEach(this.collapse);

        this.update(this.root);

    }
    ngOnInit() {

    }



// Collapse the node and all it's children
    collapse = (d) => {
        if(d.children) {
            d._children = d.children;
            d._children.forEach(this.collapse);
            d.children = null;


        }
    };

    collapseCustom = (node, depth) => {
        if(node.depth === depth) node._children = node.children || node._children;
        if(node.depth < depth) node.children = node.children || node._children;
        if(!node.children) return;
        node.children.forEach( (n)=>{
            this.collapseCustom(n,depth);
        })
    };

    sendEditToModal(data){
        //console.log(data);
        let groupModel: IGroupModel = new IGroupModel;

        groupModel.idGroup = data.data.id;
        groupModel.groupName = data.data.name;
        groupModel.color = data.data.colorA;
        groupModel.borderColor = data.data.colorB;
        groupModel.father = data.parent.data.name;
        this.formData.emit(groupModel);

    }

    sendNewToModal(data){
        let groupModel: IGroupModel = new IGroupModel;
        groupModel.father = data.parent.data.name;
        groupModel.idGroup = data.data.id;
        groupModel.level = data.depth;
        groupModel.type = "new";
        this.formData.emit(groupModel);
    }

    click = (d) => {
        //console.log("LEVEL: " + d.depth);
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }


        this.update(d);

    };

    update = (source) => {
        let that = this;
        // Assigns the x and y position for the nodes
        let treeData: any = this.treemap(this.root);

        // Compute the new tree layout.
        let nodes: any = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) {

            d.y = d.depth * 150
        });

        // ****************** Nodes section ***************************

        // Update the nodes...
        let node = this.svg.selectAll('g.node')
            .data(nodes, function (d) {

                return d.id || (d.id = ++that.i);
            });



        // Enter any new modes at the parent's previous position.
        let nodeEnter = node.enter().append('g')
            .attr('class', 'node')
            .attr('transform', function () {
                return 'translate(' + source.y0 + ',' + source.x0 + ')';
            });



        // Add Circle for the nodes
        nodeEnter.append('circle')
            .attr('id', function(d){
                return d.data.id;
            })
            .attr('class', 'node')
            .attr('height', '80px')
            .attr('width', '80px')
            .attr('r', "80px")
            .style('stroke', function (d) {
                return d._children ? d.data.colorA : d.data.colorB;
            })
            .style('stroke-width', '200')
            .style('fill', function (d) {
                return d._children ? d.data.colorB : d.data.colorA;
            })


        // Add labels for the nodes
        nodeEnter.append('text')
            .attr('id', function(d){
              return d.data.id + 'L';
            })
            .attr('class', 'text-lbl')
            .attr('dy', '-.30em')
            .attr('style', 'font-weight: 500; position: absolute;')
            .attr('fill', '#575756')
            .attr('x', function(d){
                if (d.data.type === 'main'){
                    return -30;
                } else {
                    return -28;
                }
            })
            .attr('text-anchor', 'end')
            .text(function (d) {
                return d.data.name;
            });


        // TRYING TO PLACE A NUMBER
        nodeEnter.append('text')
            .attr('id', function(d){return d.data.id + 't'})
            .attr('class', 'text-num')
            .attr("dy", ".35em")
            .attr("x", function(d) {
                return d.children || d._children ? 5 : -5;
            })
            .attr('style', 'font-weight: 500')
            .attr('font-size', '17px')
            .attr('fill', 'white')
            .attr("text-anchor", function(d) {
                return d.children || d._children ? "end" : "start";
            })
            .text(function(d) {
                let children = d.children || d._children;
                return children ? children.length : '+';
            });

        nodeEnter.append('circle')
            .attr('class', 'newc')
            .attr('height', '15px')
            .attr('width', '15px')
            .attr('r', "15px")
            .style('stroke', function (d) {
                return d._children ? d.data.colorA : d.data.colorB;
            })
            .style('stroke-width', '0')
            .style('cursor','pointer')
            .style('fill', 'transparent').on('click',this.click);
        // UPDATE
        let nodeUpdate = nodeEnter.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(this.duration)
            .attr('transform', function (d) {
                return 'translate(' + d.y + ',' + d.x + ')';
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', "15px")
            .style('stroke', function (d) {
                nodeUpdate.select('.text-num')
                    .attr('x', function(a){

                        if (a.children){
                            return 5
                        } else {
                            if (a._children){
                                if((a._children.length-1)>9){
                                    return 9;
                                } else {
                                    return 5;
                                }
                            } else {
                                return -5;
                            }

                        }
                    })
                    .text(function(a){
                        if (a.children){
                            return "<";
                        } else {
                            if (a._children){
                                return a._children.length - 1
                            } else {
                                return '+';
                            }

                        }
                    });
                return d._children ? d.data.colorA : d.data.colorB;
            })
            .style('stroke-width', '3')
            .style('fill', function (d) {
                return d._children ? d.data.colorB : d.data.colorA;
            })
            .attr('cursor', 'pointer');

        nodeUpdate.select('.text-lbl').on("dblclick",function(d){

        });
        nodeUpdate.select('.node circle.newc').on("mousedown",  (d) =>{

            nodeUpdate.select("circle[id='" + d.data.id+"']").attr('r', '17px');

            if(d.data.type == "new"){

                this.sendNewToModal(d);

            } else {
               if (d.children || d._children){
                    //NOTHING TO DO JUST COLLAPSE
               } else {

                   this.sendItemToGroup(d);
               }
            }
        });

        nodeUpdate.select('.node circle.newc').on('mouseover', function(d){
            if(d.data.type == "new"){
                nodeUpdate.select("text[id='" + d.data.id+"t']").attr('fill', d.data.colorB)
                    .attr('font-size','21px')
                    .attr('dy', '0.30em')
                    .attr('x', -6);

            }
        });

        nodeUpdate.select('.node circle.newc').on('mouseout', function(d){
            if(d.data.type == "new"){
                nodeUpdate.select("text[id='" + d.data.id+"t']").attr('fill', 'transparent');
            }
        });

        nodeUpdate.select('.text-lbl').on("click", (d)=>{
                    if (d.data.type == "new"){

                    } else {
                        this.sendEditToModal(d);
                    }

        });

        nodeUpdate.select('.text-lbl').on("mouseover", (d)=>{
            nodeUpdate.select("text[id='" + d.data.id+"L']").attr('fill', '#146ef9')
                .attr('style', 'cursor: pointer; font-weight: 500;');

        });

        nodeUpdate.select('.text-lbl').on("mouseout", (d)=>{
            nodeUpdate.select("text[id='" + d.data.id+"L']").attr('fill', '#575756');


        });


        // Remove any exiting nodes
        let nodeExit = node.exit().transition()
            .duration(this.duration)
            .attr('transform', function () {
                return 'translate(' + source.y + ',' + source.x + ')';
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        let link = this.svg.selectAll('path.link')
            .data(links, function (d) {
                return d.id;
            });

        // Enter any new links at the parent's previous position.
        let linkEnter = link.enter().insert('path', 'g')
            .attr('class', 'link')
            .attr('fill', 'transparent')
            .attr('stroke', '#c6c6c6')
            .attr('stroke-width', '1px')
            .attr('d', function () {
                let o = {x: source.x0, y: source.y0};
                return diagonal(o, o)
            });

        // UPDATE
        let linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(this.duration)
            .attr('d', function (d) {
                return diagonal(d, d.parent)
            });

        // Remove any exiting links
        let linkExit = link.exit().transition()
            .duration(this.duration)
            .attr('d', function () {
                let o = {x: source.x, y: source.y};
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            return `M ${s.y} ${s.x}
            C ${(s.y + d.y) / 2} ${s.x},
              ${(s.y + d.y) / 2} ${d.x},
              ${d.y} ${d.x}`;
        }

        // Toggle children on click.



    }


}
