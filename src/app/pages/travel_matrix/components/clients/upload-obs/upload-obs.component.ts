import { Component, OnInit } from '@angular/core';
import { Asset } from '../Asset'
@Component({
  selector: 'app-upload-obs',
  templateUrl: './upload-obs.component.html',
  styleUrls: ['./upload-obs.component.scss']
})
export class UploadObsComponent implements OnInit {

  constructor() { }
  arrAssets:Array<any> = [
    new Asset(1, 'Rocio Sanchez, 2018-11-13 10:15 subido por Adolfo Centeno', 'el trafico esta muy lento por toma de caseta'),
    new Asset(2, 'Jesus Velez, 2018-11-13 10:15 subido por Adolfo Centeno', 'Accidente en tramo de tuneles en cumbres de maltrata'),
    new Asset(3, 'Alejandro Reyes, 2018-11-13 10:15 subido por Adolfo Centeno', 'Neblina densa en zona del puente de metlac'),
    new Asset(4, 'Armando Lopez,  2018-11-13 10:15 subido por Adolfo Centeno', 'Accidente en curva de nogales altura de la laguna')
  ];

  ngOnInit() {

  }

  name = 'Angular 4';
  url = '';
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      console.log("preview..." + event.target.files[0]);
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (e:any) => {
        (<HTMLImageElement>document.getElementById('blah')).src=e.target.result 
        //assuming element with id blah will always be an ImageElement
      };
    }
  }

}
