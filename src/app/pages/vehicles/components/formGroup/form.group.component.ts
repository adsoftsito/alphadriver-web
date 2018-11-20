/**
 * Created by Tech Group BWL on 18/09/2018.
 */
 import {Component, OnDestroy, AfterViewInit, HostListener, ElementRef, ViewChild, Input, Output, EventEmitter} from "@angular/core";
 import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
 import { IGroupModel } from '../../../../shared/models/groups/group.edit.model';
import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'form-group-component',
  templateUrl: './form.group.component.html',
  styleUrls: ['./form.group.component.scss']
})
export class FormGroupsComponent implements AfterViewInit, OnDestroy {
  selectedColor : Function;
  selectColorList: any;
  edit:boolean;
  @ViewChild('formGroupWindow') windowEdit: ElementRef;
  @ViewChild('modalDelete') windowDelete: ElementRef;
  groupModel:IGroupModel;

  public form:FormGroup;
  public nameForm:AbstractControl;

  alertControl: boolean = false;
  @Input() iGroupModel:IGroupModel;
  @Output() setGroup: EventEmitter<IGroupModel> = new EventEmitter<IGroupModel>();
  @Output() deleteGroup: EventEmitter<any> = new EventEmitter<any>();
  @Output() hasBeenClose: EventEmitter<any> = new EventEmitter<any>();
  @Input() iColors: any =[];
  colors: any =[{
    colorName:'Blue',
    color: '#146ef9',
    borderColor:'#3f8bff'
  },{
    colorName:'Light-blue',
    color: '#16b8e8',
    borderColor:'#3edbf3'
  },{
    colorName:'Black',
    color: '#000',
    borderColor:'#131417'
  },{
    colorName:'Grey',
    color: '#565655',
    borderColor:'#999999'
  },{
    colorName:'Light-grey',
    color: '#B2B2B2',
    borderColor:'#CCCCCC'
  },{
    colorName:'Deep-purple',
    color: '#654ede',
    borderColor:'#7155ff'
  },{
    colorName:'Cyan',
    color: '#5ce2d7',
    borderColor:'#73fff3'
  },{
    colorName:'Green',
    color: '#00d573',
    borderColor:'#80eab9'
  },{
    colorName:'Orange',
    color: '#ff9419',
    borderColor:'#ffa538'
  },{
    colorName:'Red',
    color: '#ff3031',
    borderColor:'#ff4344'
  }];
  constructor(private modalService: NgbModal, fb:FormBuilder) {
    this.form = fb.group({
      'name': ['', Validators.compose([Validators.required])]
    });
    this.nameForm = this.form.controls['name'];

    this.selectedColor = function(indice) {
      this.selectColorList = indice;
    };

  }

  ngAfterViewInit() {
    if(this.iColors) {
      this.colors = this.iColors;
    }
    if(this.iGroupModel) {
      if(!this.iGroupModel.color && !this.iGroupModel.groupName) {
        this.groupModel = new IGroupModel();
        this.groupModel.idGroup = this.iGroupModel.idGroup;
        this.groupModel.father = this.iGroupModel.father;
        this.groupModel.type = this.iGroupModel.type;
        this.selectColorList = 0;
        this.setGroupColor(this.colors[0]);
        this.edit = false;
      }else {
        this.groupModel = this.iGroupModel;
        for (let i = 0; i < this.colors.length; i++) {
            if (this.colors[i].color === this.groupModel.color) {
                this.selectColorList = i;
            }else {
              this.selectColorList = 0;
              this.setGroupColor(this.colors[0]);
            }
        }
        this.edit = true;
      }
    } else {
      this.hasBeenClose.emit(true);
    }
    this.onEditGroup();
  }

  onEditGroup() {
    setTimeout(() => {
      const modalRef = this.modalService.open(this.windowEdit, { size: 'lg' , keyboard: false, windowClass: 'motum-modal-edit', backdrop: true });
      modalRef.result.then((userResponse) => {
        if(userResponse == 'delete'){
        }else {
          if(userResponse) {
            if(this.groupModel) {
              if (this.groupModel.borderColor && this.groupModel.color &&
                  this.groupModel.groupName) {
                  this.setGroup.emit(this.groupModel);
                }else {
                  this.hasBeenClose.emit(true);
                }
              }else {
                this.hasBeenClose.emit(true);
              }
          }else {
            this.hasBeenClose.emit(true);
          }
        }
      }).catch((error) => {
        this.hasBeenClose.emit(true);
      });
    },200);
  }
  onDeleteGroup(modalDelete) {
    setTimeout(() => {
      const modalRef = this.modalService.open(modalDelete, { size: 'lg' , keyboard: true, windowClass: 'motum-modal-delete', backdrop: true });
      modalRef.result.then((userResponse) => {
        if(userResponse) {
          this.deleteGroup.emit(this.groupModel);
        }else {
          this.hasBeenClose.emit(true);
        }
      });
    },200);
  }
  setGroupColor(item) {
    this.groupModel.color = item.color;
    this.groupModel.borderColor = item.borderColor;
  }


  ngOnDestroy() {
    this.hasBeenClose.emit(true);
    this.groupModel = null;
    this.colors = null;
    this.setGroup = null;
    this.deleteGroup = null;
    this.hasBeenClose = null;
  }
}
