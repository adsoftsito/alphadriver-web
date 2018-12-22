import { Component, OnInit } from '@angular/core';
import { Asset } from '../Asset';

@Component({
  selector: 'app-upload-sign',
  templateUrl: './upload-sign.component.html',
  styleUrls: ['./upload-sign.component.scss']
})
export class UploadSignComponent implements OnInit {

  constructor() { }
  arrAssets:Array<any> = [
    new Asset(1, '2018-11-13 10:15 subido por ', 'Juan Perez (operador)', ''),
    new Asset(13, '2018-10-13 11:40 subido por ', 'Adolfo Centeno (operador)', '')
    //new Asset(15, '2018-09-13 13:03 subido por ', 'Alejandro Reyes (operador)'),
    //new Asset(20, '2018-05-13 15:07 subido por ', 'Jesus Velez (operador)')
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
