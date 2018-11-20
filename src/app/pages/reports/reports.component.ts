import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { ReportsService } from './reports.service';
import { TreeComponent, TreeModel } from 'angular-tree-component';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { TranslateService } from '@ngx-translate/core';

@Component({
    selector: 'reports',
    templateUrl: './reports.component.html',
    styleUrls: ['./reports.component.css'],
    providers: [ReportsService],
    animations: [
        trigger('togglingTree', [
            state('in', style({ opacity: 1, transform: 'translateX(0)' })),
            transition('void => *', [
                style({
                    transform: 'translateX(-100%)',
                }),
                animate('0.2s ease-in'),
            ]),
            transition('* => void', [
                animate('0.2s 0.1s ease-out', style({ transform: 'translateX(-100%)' })),
            ]),
        ]),
    ],
})

export class ReportsComponent implements AfterViewInit {

    @ViewChild('tree') instanceTree: TreeComponent;
    treeModel: TreeModel;
    reportSelected: boolean = false;
    partialUrl: string;
    titleReportFilter: string;

    toggledTree: boolean = true;
    treeState: string = 'in';

    reportTree = [{
        name: 'VEHICULO',
        isExpanded: true,
        children: [{
            name: 'Viajes',
            isExpanded: true,
            children: [{
                name: 'Viajes',
            }, {
                name: 'Resumen de viajes',
            }],
        }, {
            name: 'Generales',
            isExpanded: true,
            children: [{
                name: 'Seguridad operacional',
            }, {
                name: 'Conducta operativa',
            }],
        }],
    }, {
        name: 'OPERADORES',
        isExpanded: true,
        children: [{
            name: 'Viajes',
            isExpanded: true,
            children: [{
                name: 'Viajes',
            }, {
                name: 'Resumen de viajes',
            }],
        }, {
            name: 'Generales',
            isExpanded: true,
            children: [{
                name: 'Seguridad operacional',
            }, {
                name: 'Conducta operativa',
            }],
        }],
    },{
        name: 'FLOTAS',
        isExpanded: true,
        children: [{
            name: 'Viajes',
            isExpanded: true,
            children: [{
                name: 'Viajes',
            }, {
                name: 'Resumen de viajes',
            }],
        }, {
            name: 'Generales',
            isExpanded: true,
            children: [{
                name: 'Seguridad operacional',
            }, {
                name: 'Conducta operativa',
            }],
        }],
    }];

    constructor (private reportsService: ReportsService,  private translate: TranslateService) {}

    ngAfterViewInit () {
        this.treeModel = this.instanceTree.treeModel;
    }

    onFilterTreeChanged (text: string) {
        this.treeModel.filterNodes(text, true);
    }

    onActivate (event) {
        
        if (event.node.isRoot) {
            return;
        }
        if (event.node.children) {
            return;
        }
        this.partialUrl = this.reportsService
            .getReportPartialUrl(event.node);
        this.titleReportFilter = this.reportsService
            .getReportTitle(event.node);
        this.reportSelected = this.partialUrl ? true : false;
    }

    toggleTreeReports() {
        this.treeState = this.treeState === 'in' ? 'out' : 'in';
        setTimeout(() => {
            this.toggledTree = !this.toggledTree;
        }, 350);
    }
}
