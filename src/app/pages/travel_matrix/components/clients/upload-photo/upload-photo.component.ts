import { Component, OnInit } from '@angular/core';
import { Asset } from '../Asset';


@Component({
  selector: 'app-upload-photo',
  templateUrl: './upload-photo.component.html',
  styleUrls: ['./upload-photo.component.scss']
})
export class UploadPhotoComponent implements OnInit {
  constructor() { }
  arrAssets:Array<any> = [
    new Asset(1, 'Windstorm', '2018-11-13 10:15'),
    new Asset(13, 'Bombasto', '2018-10-13 11:40'),
    new Asset(15, 'Magneta', '2018-09-13 13:03'),
    new Asset(20, 'Tornado', '2018-05-13 15:07')
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
