import { Component, OnInit, Renderer2, ElementRef, ViewChild, OnDestroy, ViewEncapsulation } from '@angular/core';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { User } from '../../../../../shared/models/user.model';
import { creareOrderModel } from '../../../../../shared/models/orders/creareOrder.model';
import { listVehicleDispositiveModel } from '../../../../../shared/models/orders/listVehicleDispositive.model';
import { dispositiveModel } from '../../../../../shared/models/orders/dispositive.model';
import { vehicleModel } from '../../../../../shared/models/orders/vehicle.model';

import {FormGroup, AbstractControl, FormBuilder, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { Select2OptionData } from 'ng2-select2';
import { Subscription } from 'rxjs/Subscription';
import { ClientProductService } from '../clients.service';

@Component({
  selector: 'form-order-component',
  templateUrl: './formOrder.component.html',
  styleUrls: ['./formOrder.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: [
    trigger('slideHiddenShow', [
      state('hidden', style({
        transform: 'translate3d(100%, 0, 0)',
        display: 'none',
      })),
      state('show', style({
        transform: 'translate3d(0, 0, 0)',
      }))
    ]),
  ],
})
export class FormOrderComponent implements OnInit, OnDestroy{

  @ViewChild('window') window: ElementRef;
  @ViewChild('backdrop') windowBackdrop: ElementRef;

  public form:FormGroup;
  public quantityFormA:AbstractControl;
  public planFormA:AbstractControl;
  public productFormA:AbstractControl;
  public chargeFormA:AbstractControl;
  public durationFormA:AbstractControl;
  public folioERPFormA:AbstractControl;
  windowState: string = 'hidden';
  userModel: any = {};
  initials: string;
  initialsColor: string;
  setColorAvatar: string;
  userName: any;
  editar: boolean;
  subscriptionCreate: Subscription;
  subscriptionEdit: Subscription;
  public eje: String;
  public options: Select2Options;

  tableListArrayDummi:Array<any> = [{'index':''},{'index':''},{'index':''},{'index':''}];
  selectedRowVehicleDispositive : Number;
  selectedRowAccessories : Number;
  pedidoSelected : Array<any>;
  vehicleSelected : Array<any>;
  pedido: Array<any> = [];
  listVehicleDispositive: any = [];
  listAccessories: Array<any> = [];
  productForm: creareOrderModel = new creareOrderModel();
  productsList: Array<creareOrderModel> = new Array<creareOrderModel>();
  productsData: Array<any> =[{
    'category':'products',
    'products': [{
      'product': 'Motum Track'
    },
    {
      'product': 'Motum Uptime'
    },
    {
      'product': 'Motum Dual Signal'
    },
    {
      'product': 'Motum Logística'
    }
  ]
},
{
  'category':'dispositives',
  'products': [{
    'product': 'Plug Modelo T1'
  },
  {
    'product': 'Plug Hesa'
  },
  {
    'product': 'Plug Freightliner'
  },
  {
    'product': 'Plug Cummis'
  }
]
},
{
  'category':'accesories',
  'products': [{
    'product': 'Ignición'
  },
  {
    'product': 'Botón de Pánico'
  },
  {
    'product': 'Botón de asistencia'
  }
]
}];

plan: Array<any> = [{
  'id':1,
  'plan': 'Motum Uptime'
},{
  'id':2,
  'plan': 'MotumTrack'
}];
duration: Array<any> = [{
  'id':1,
  'duration': '9 meses'
},{
  'id':2,
  'duration': '12 meses'
},{
  'id':3,
  'duration': '36 meses'
}];
numberPart: Array<any> = [{
  'id':1,
  'numberPart':'ABC0933',
}, {
  'id':2,
  'numberPart':'ABC975',
},{
  'id':3,
  'numberPart':'ABC1234',
},{
  'id':4,
  'numberPart':'JDBC1234',
}];
charge: Array<any> = [{
  'id':1,
  'chargePeriod':'Mensual',
}, {
  'id':2,
  'chargePeriod':'Anual',
}];
types: Array<any> = [{
  'id':1,
  'typeTruck':'Tratocamión',
},{
  'id':2,
  'typeTruck':'Tractomula',
},{
  'id':3,
  'typeTruck':'Doble Troque',
}];
brands: Array<any> = [{
  'id':1,
  'brand':'Kenworth',
},{
  'id':2,
  'brand':'Volvo',
},{
  'id':3,
  'brand':'Test',
}];
models:Array<any> = [{
  'id':1,
  'model':'T600',
},{
  'id':2,
  'model':'D12',
},{
  'id':3,
  'model':'T800',
}];
years: Array<any> =[{
  'id':1,
  'year':'2018',
},{
  'id':2,
  'year':'2017',
},{
  'id':3,
  'year':'2016',
},{
  'id':4,
  'year':'2015',
}];
builders: Array<any> =[{
  'id':1,
  'builder':'Suntech Modelo',
},{
  'id':2,
  'builder':'Tecnomotum',
},{
  'id':3,
  'builder':'Quake Global',
},{
  'id':4,
  'builder':'2015',
}];
variants: Array<any> =[{
  'id':1,
  'variant':'R',
},{
  'id':2,
  'variant':'V2',
}];
seller: Array<any> =[{
  'id':1,
  'seller':'Auto quimicos',
},{
  'id':2,
  'seller':'Azteca plus',
},{
  'id':3,
  'seller':'Daimler',
}];

dealer: Array<any> =[{
  'id':1,
  'dealer':'Elementia',
},{
  'id':2,
  'dealer':'Road runner',
}];
constructor(private renderer: Renderer2, private clientProductService: ClientProductService,
  private formBuilder: FormBuilder, private router: Router, fb:FormBuilder) {
    this.productForm.quantity = 1;
    this.subscriptionCreate = clientProductService.sCreateOrder$.subscribe(
      data => {
        if(data !== undefined && data !== null) {
        let dataJson = JSON.parse(JSON.stringify(data));
        this.userModel.rol = dataJson.rol;
        let tempName = dataJson.businessName.split("/", 1);
        this.userModel.usuario = tempName[0];

      }else {
        this.userModel.rol = 'Admin';
        this.userModel.usuario = 'User';
      }

      this.editar = true;
      this.toggle(false,'create');

      this.userName = this.userModel.usuario.charAt(0);
      let cad: string = String (this.userName+' '+this.userModel.lastname);
      let word = '';
      let letter = '';
      let carat = cad.length;

      for (let index = 0; index < carat; index++) {
        if(cad.charAt(index)!=' '){
          word += cad.charAt(index);
          if(index+1 === carat){
            letter += word.charAt(0);
            this.initials = letter.toUpperCase();
            this.initialsColor = this.initials.charAt(0);

            if(this.initialsColor >= 'A' && this.initialsColor <= 'C'){
              this.setColorAvatar = 'azulB';
            }else{
              if(this.initialsColor >= 'D' && this.initialsColor <= 'F'){
                this.setColorAvatar = 'amarillo';
              }else{
                if(this.initialsColor >= 'G' && this.initialsColor <= 'I'){
                  this.setColorAvatar = 'rojo';
                }else{
                  if(this.initialsColor >= 'J' && this.initialsColor <= 'L'){
                    this.setColorAvatar = 'morado';
                  }else{
                    if(this.initialsColor >= 'M' && this.initialsColor <= 'O'){
                      this.setColorAvatar = 'verde';
                    }else{
                      if(this.initialsColor >= 'P' && this.initialsColor <= 'R'){
                        this.setColorAvatar = 'rosa';
                      }else{
                        if(this.initialsColor >= 'S' && this.initialsColor <= 'U'){
                          this.setColorAvatar = 'verdeF';
                        }else{
                          if(this.initialsColor >= 'V' && this.initialsColor <= 'Z'){
                            this.setColorAvatar = 'rosaF';
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }else{
          letter += word.charAt(0);
          word='';
        }
      }
    });

    this.form = fb.group({
      'quantity': ['', Validators.compose([Validators.required, Validators.maxLength(2)])],
      // 'plan': ['', Validators.compose([Validators.required])],
      // 'product': ['', Validators.compose([Validators.required])],
      'charge': ['', Validators.compose([Validators.required])],
      // 'duration': ['', Validators.compose([Validators.required])],
      'folioERP': ['', Validators.compose([Validators.required])],
    });
    this.quantityFormA = this.form.controls['quantity'];
    // this.planFormA = this.form.controls['plan'];
    // this.productFormA = this.form.controls['product'];
    this.chargeFormA = this.form.controls['charge'];
    // this.durationFormA = this.form.controls['duration'];
    this.folioERPFormA = this.form.controls['folioERP'];
  }
  formHasError() {
    if(this.quantityFormA.valid && this.chargeFormA.valid && this.folioERPFormA.valid) {
      return true
    }
    return false;
  }
  ngOnInit() {
    this.options = {
      multiple: false,
      theme: 'classic',
      closeOnSelect: true,
    };
    this.clientProductService.getListProductsForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.productsData;
          this.productsData = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );
    this.clientProductService.getListPlansForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.plan;
          this.plan = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );
    this.clientProductService.getListDurationForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.duration;
          this.duration = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    // review
    this.clientProductService.getListNumberPartForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.numberPart;
          this.numberPart = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListChargeForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.charge;
          this.charge = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListTypesForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.types;
          this.types = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListBrandsForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.brands;
          this.brands = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListModelsForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.models;
          this.models = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListYearsForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.years;
          this.years = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListBuildersForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.builders;
          this.builders = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );

    this.clientProductService.getListVariantsForOrder().subscribe(
      res => {
        if(res.status === 200) {
          const body = JSON.parse(res['_body']);
          const dataToSetup: any = body.variants;
          this.variants = dataToSetup;
        }
      },
      err => {
        console.info(err);
      }
    );
  }
  onChangeQuantityProduct(event, indice) {
    try {
      let numberQuantity = event.srcElement.valueAsNumber;
      this.productsList[indice].listVehicleDispositive.splice(numberQuantity, this.productsList[indice].listVehicleDispositive.length);
    }
    catch(e) {
      console.log(e);
    }
  }
  valueChangedVehicleType(event, indice ,indice2) {
    this.productsList[indice].listVehicleDispositive[indice2].vehicle.type = event.value;
  }
  valueChangedVehicleBrand(event, indice ,indice2) {
    this.productsList[indice].listVehicleDispositive[indice2].vehicle.brand = event.value;
  }
  valueChangedVehicleModel(event, indice ,indice2) {
    this.productsList[indice].listVehicleDispositive[indice2].vehicle.model = event.value;
  }
  valueChangedVehicleYear(event, indice ,indice2) {
    this.productsList[indice].listVehicleDispositive[indice2].vehicle.year = event.value;
  }
  valueChangedDispositiveBuilder(event, indice3, indice2, indice) {
    this.productsList[indice3].listVehicleDispositive[indice2].dispositive[indice].builder = event.value;
  }
  valueChangedDispositiveVariant(event, indice3, indice2, indice) {
    this.productsList[indice3].listVehicleDispositive[indice2].dispositive[indice].variant = event.value;
  }
  valueChangedDispositiveModel(event, indice3, indice2, indice) {
    this.productsList[indice3].listVehicleDispositive[indice2].dispositive[indice].model = event.value;
  }
  valueChangedDispositiveNumberPart(event, indice3, indice2, indice) {
    this.productsList[indice3].listVehicleDispositive[indice2].dispositive[indice].numberPart = event.value;
  }
  valueChangedProductProduct(event, indice) {
    this.productsList[indice].product = event.value;
  }
  valueChangedProductPlan(event, indice) {
    this.productsList[indice].plan = event.value;
  }
  valueChangedPartNumber(event, indice){
    this.productsList[indice].numberPart = event.value;
  }
  valueChangedProductCharge(event, indice) {
    if (indice === null) {
      this.productForm.product =  event.value;
    }else {
      this.productsList[indice].charge = event.value;
    }
  }
  valueChangedProductDuration(event, indice) {
    this.productsList[indice].duration = event.value;
  }

  ngOnDestroy() {
    this.subscriptionCreate.unsubscribe();
    // this.subscriptionEdit.unsubscribe();
    this.windowState = null;
    this.initials = null;
    this.userName = null;
  }
  toggle(control , windowType) {
    switch (control) {
      case true:
      this.windowState = 'hidden';
      break;
      case false:
      this.windowState = 'show';
      break;
      default:
      this.windowState = this.windowState === 'show' ? 'hidden' : 'show';
      break;
    }
    if (windowType === 'create') {
      this.windowCreateClass();
    }else {
      this.windowEditClass();
    }
  }

  addOrder() {
    if (this.formHasError()) {
      this.listVehicleDispositive.splice(0, this.listVehicleDispositive.length);

      let creareOrderModelTemp = new creareOrderModel();
      creareOrderModelTemp = this.getNewOrderform();
      // for (let i = 0; i < this.productForm.quantity; i++) {
      //   let listVehicleDispositiveModelTemp = new listVehicleDispositiveModel();
      //   let vehicleModelTemp = new vehicleModel();
      //   let dispositiveModelTemp: Array<dispositiveModel> = new Array<dispositiveModel>();
      //   listVehicleDispositiveModelTemp.vehicle = vehicleModelTemp;
      //   listVehicleDispositiveModelTemp.dispositive = dispositiveModelTemp;
      //   this.listVehicleDispositive.push(listVehicleDispositiveModelTemp);
      // }
      // creareOrderModelTemp.listVehicleDispositive = this.listVehicleDispositive.slice();
      this.productsList.push(creareOrderModelTemp);
      creareOrderModelTemp = new creareOrderModel();
      creareOrderModelTemp.product = this.productForm.product;
      creareOrderModelTemp.quantity = 1;
      this.setNewOrderForm(creareOrderModelTemp);
    }
  }
  setNewOrderForm(creareOrderModel) {
    this.productForm = creareOrderModel;
  }
  getNewOrderform() {
    return this.productForm;
  }
  addVehicle(indice) {
    try {
      let value:number = this.productsList[indice].quantity;
      let limit:number;
      if(!this.productsList[indice].listVehicleDispositive) {
        limit = 0;
      }else {
        limit = this.productsList[indice].listVehicleDispositive.length;
      }
      if (value > limit) {
        if(!this.productsList[indice].listVehicleDispositive) {
          this.productsList[indice].listVehicleDispositive = [];
        }
        let listVehicleDispositiveModelTemp = new listVehicleDispositiveModel();
        let vehicleModelTemp = new vehicleModel();
        let dispositiveModelTemp: Array<dispositiveModel> = new Array<dispositiveModel>();
        listVehicleDispositiveModelTemp.vehicle = vehicleModelTemp;
        listVehicleDispositiveModelTemp.dispositive = dispositiveModelTemp;
        this.productsList[indice].listVehicleDispositive.push(listVehicleDispositiveModelTemp);
      }
    }
    catch(e) {
      console.log(e);
    }
  }

  addDispositive(indice, indice2) {
    let dispositiveModelTemp = new dispositiveModel();
    this.productsList[indice].listVehicleDispositive[indice2].dispositive.push(dispositiveModelTemp);
  }
  addQuantity(){
    let value:number = this.productForm.quantity;
    if (value < 99) {
      this.productForm.quantity = value + 1;
    }else {
      if (value === undefined || value === null) {
        this.productForm.quantity = 1;
      }
    }
  }

  restQuantity(){
    let value:number = this.productForm.quantity;
    if (value > 1) {
      this.productForm.quantity = value - 1;
    }
  }

  onlyNumber(event) {
    return (event.charCode == 8 || event.charCode == 0) ? null : event.charCode >= 48 && event.charCode <= 57;
  }

  windowEditClass() {
    this.renderer.addClass(this.window.nativeElement, 'window-edit');
    this.renderer.removeClass(this.window.nativeElement, 'window-create');
    this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
  }

  windowCreateClass() {
    this.renderer.removeClass(this.window.nativeElement, 'window-edit');
    this.renderer.addClass(this.window.nativeElement, 'window-create');
    this.renderer.addClass(this.windowBackdrop.nativeElement, 'window-backdrop');
  }

}
