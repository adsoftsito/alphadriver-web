import {Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import {EventsService} from "../../../../shared/providers/events";
import {Constants} from "../../../../shared/providers/constants";

/**
* Created by Tech Group BWL on 29/06/2018.
*/

@Component({
  selector: 'chat-detail-motum-component',
  templateUrl: './chat.detail.component.html',
  styleUrls: ['./chat.detail.component.scss']
})
export class ChatDetailComponent implements OnInit, OnDestroy {
  isMerbers: boolean = true;
  isGallery: boolean= true;
  status: boolean;
  gallery = [{
    'url':'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5mEc7WMmMPsVpIW6xzcxUigZ8BZ41R1cKClrljNoMMB9UPKbO2w'
  }]
  memberList= [{
    'id':'idMember',
    'pictureURL':'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_01.jpg',
    'name': "Juan Lara"
  }]
  @Input() circleColor: any;
  @Output() closeChatDetail = new EventEmitter<any>();
  constructor(private events: EventsService, private C: Constants) {
  }

 ngOnInit () {

 }
 ngOnDestroy () {
 }
 displayComponent() {
 }
 close () {
   this.closeChatDetail.emit(false);
 }
}
