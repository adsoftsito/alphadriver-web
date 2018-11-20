/**
 * Created by Tech Group BWL on 12/09/2018.
 */
import {Component, OnInit} from "@angular/core";
import {IGroupModel} from "../../../../shared/models/groups/group.edit.model";
@Component({
  selector: 'tm-groups-component.col-md-12',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
  // for testing purposes only
    groupsModel: IGroupModel;
    editedModel: IGroupModel;

    editorEnabled = false;

    test = {
        'id':'1',
        'type': 'main',
        'name': 'TDOSVEHICULOS',
        'colorA':'#146ef9',
        'colorB':'#1261d6',
        'children': [
            {
                'id':'2',
                'name': 'HIJO_1',
                'colorA':'#146ef9',
                'colorB':'#1261d6',
                'children': [
                    { 'id':'3',
                        'name': 'HIJO_01',
                        'colorA':'#146ef9',
                        'colorB':'#1261d6'},
                    { 'id':'4',
                        'name': 'HIJO_02',
                        'colorA':'#146ef9',
                        'colorB':'#1261d6'}
                ]
            },
            { 'id':'5',
                'name': 'HIJO_2',
                'colorA':'#146ef9',
                'colorB':'#1261d6', 'children':[
                { 'id':'6',
                    'name': 'HIJO_01',
                    'colorA':'#146ef9',
                    'colorB':'#1261d6',
                    'children': [
                        { 'id':'7',
                            'name': 'HIJO_02',
                            'colorA':'#146ef9',
                            'colorB':'#1261d6',
                                'children':[
                                    {
                                        'id':'26',
                                        'name': 'HIJO_01',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                        'children': [

                                            {
                                                'id':'149',
                                                'name': 'HIJO_01',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                                'children':[
                                                    {
                                                        'id':'349',
                                                        'name': 'HIJO_01',
                                                        'colorA':'#146ef9',
                                                        'colorB':'#1261d6',
                                                        'children':[
                                                            {
                                                                'id':'549',
                                                                'name': 'HIJO_01',
                                                                'colorA':'#146ef9',
                                                                'colorB':'#1261d6',
                                                            }
                                                        ]
                                                    }
                                                ]
                                            },
                                            {
                                                'id':'150',
                                                'name': 'HIJO_02',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            },
                                            {
                                                'id':'136',
                                                'name': 'HIJO_03',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            }
                                        ]
                                    },
                                    {
                                        'id':'36',
                                        'name': 'HIJO_02',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'37',
                                        'name': 'HIJO_03',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'38',
                                        'name': 'HIJO_04',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                        'children':[
                                            {
                                                'id':'249',
                                                'name': 'HIJO_01',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            },
                                            {
                                                'id':'250',
                                                'name': 'HIJO_02',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            },
                                            {
                                                'id':'236',
                                                'name': 'HIJO_03',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            }
                                        ]
                                    },
                                    {
                                        'id':'39',
                                        'name': 'HIJO_05',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'40',
                                        'name': 'HIJO_06',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'41',
                                        'name': 'HIJO_07',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'42',
                                        'name': 'HIJO_08',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                        'children': [

                                            {
                                                'id':'49',
                                                'name': 'HIJO_01',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            },
                                            {
                                                'id':'50',
                                                'name': 'HIJO_02',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            },
                                            {
                                                'id':'36',
                                                'name': 'HIJO_03',
                                                'colorA':'#146ef9',
                                                'colorB':'#1261d6',
                                            }
                                        ]
                                    },
                                    {
                                        'id':'96',
                                        'name': 'HIJO_09',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'97',
                                        'name': 'HIJO_10',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'98',
                                        'name': 'HIJO_11',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'99',
                                        'name': 'HIJO_12',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    },
                                    {
                                        'id':'100',
                                        'name': 'HIJO_13',
                                        'colorA':'#146ef9',
                                        'colorB':'#1261d6',
                                    }
                                ]
                        },
                        { 'id':'8',
                            'name': 'HIJO_03',
                            'colorA':'#146ef9',
                            'colorB':'#1261d6'
                        }
                    ]}
            ]}
        ]};


  constructor() {}


  getFormData(event){

      this.groupsModel = event;
      this.editorEnabled = true;

  }
  closeModal(event){

      this.editorEnabled = false;
  }
  getEditedData(event){
      this.editedModel = event;
      this.editorEnabled = false;
      console.log(event);
  }
  doDeleteGroup(event){
      this.editedModel = event;
      this.editedModel.type ="delete";
      this.editorEnabled = false;
  }
  ngOnInit() {}
}
