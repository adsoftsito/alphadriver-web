import {Component, OnInit, ElementRef, ViewChild, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
// import { Message } from './model/message';
import { dateService } from './services/date.service';
import { fileService } from './services/file.service';
// import { User } from './model/user';
import {ChangeSpaceColsAndRowsService} from "../../../../shared/providers/changeSpaceColsAndRows.service";
// import {environment} from "../../../../../environments/environment";
import { ChatEngine } from './services/chat.engine';
declare var require: any;
import {EventsService} from "../../../../shared/providers/events";
import {Constants} from "../../../../shared/providers/constants";
// import { PubNubAngular } from 'pubnub-angular2';
/**
* Created by Tech Group BWL on 29/06/2018.
*/


const AVATAR_URL = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/195612/chat_avatar_';

@Component({
  selector: 'chat-motum-component',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  // providers: [PubNubAngular]
})
export class ChatComponent implements OnInit, OnDestroy {
  messageContent: string = null;
  data: any=[];
  message: string;
  // messages: Message[] = [];
  messages: any[] = [];
  messagesFromChannel: any = [];
  ioConnection: any;
  // user: User;
  turn: boolean = true;
  username: string= 'user';
  emojiPickerControll:boolean = false;
  optionsBubble:boolean = false;
  dateM = new Date();
  newDateChatLog: any;
  chatEngine: any;
  channel = 'my_channel';
  pubnub :any;
  chat: any;
  index: number;
  users: any[] = [];
  changecolor:boolean=false;
  @Input() circleColors: any = null;
  @Output() changeWidthTabsChat = new EventEmitter<any>();

  options = {
    status: false,
    circleColor: undefined
  };
  @ViewChild('chatlogScroll') private myScrollContainer: ElementRef;
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private _monitoringService: ChangeSpaceColsAndRowsService , private _dateService: dateService,
    // private _chatEngine: ChatEngine,
    // private _pubnub: PubNubAngular,
     private events: EventsService, private C: Constants, private _fileService: fileService) {
    // this.chatEngine = _chatEngine;
    // , private _pubnub: PubNubAngular) {
      // this.channel = 'Channel-BWL';
      // this.pubnub = _pubnub;
      // this.pubnub.init({
      //           publishKey: 'pub-c-b02ef753-9205-4eb1-985f-970044bd8cab',
      //           subscribeKey: 'sub-c-d95ded00-9777-11e8-8f0f-6ef91e362860'
      //       });
      // this.pubnub.subscribe({
      //     channels: [this.channel],
      //     triggerEvents: true,
      //     withPresence: true,
      //     autoload: 150
      // });
      // this.messagesFromChannel = this.pubnub.getMessage(this.channel, function(msg) {
      //     console.info(msg);
      // });
      this.newDateChatLog = _dateService.getDateFormat(this.dateM);
  }

  addEmoji(event) {
    if(this.messageContent === null){
      this.messageContent ='';
    }
    this.messageContent += ''+event.emoji.native;
  }

  ngOnInit() {
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 6 , 12);
    this.changeWidthTabsChat.emit(true);

    // this.chatEngine.instance.connect(new Date().getTime(), {}, 'auth-key');
    // this.chatEngine.instance.on('$.ready', (data) => {
    //   this.chatEngine.me = data.me;
    //   this.chatEngine.me.plugin(random());
    //   this.chatEngine.chat = this.chatEngine.instance.global;
    //   // this.chatEngine.chat.plugin(search({ prop: 'state.username', caseSensitive: false }));
    // });
    // this.chatEngine.instance.on('message', (payload) => {
    //   // if the last message was sent from the same user
    //   payload.sameUser = this.messages.length > 0 && payload.sender.uuid === this.messages[this.messages.length - 1].sender.uuid;
    //   // if this message was sent by this client
    //   payload.isSelf = payload.sender.name === 'Me';
    //   // add the message to the array
    //   this.messages.push(payload);
    // });

    this.options.status = true;
    this.options.circleColor = this.circleColors;
    this.events.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, this.options);
  }
  ngOnDestroy() {
    this._monitoringService.tmOnChangeMenuSize('SUBMENU_1', 3 , 12);
    this.changeWidthTabsChat.emit(false);
    // this.pubnub.unsubscribe({
    //     channels : [this.channel]
    // });
    this.options.status = false;
    this.events.publish(this.C.EVENTS_SERVICE.MONITORING_REACTION_CHAT_DETAIL, this.options);
  }
  emojiShow() {
    this.emojiPickerControll = true;
  }
  emojiHide() {
    this.emojiPickerControll = false;
  }

  sendButtonClick() {
    if (!this.messageContent || this.messageContent.trim().length < 1) {
      this.messageContent = null;
      return;
    }
    let avatar = `${AVATAR_URL}02.jpg`;
    this.turn = !this.turn;

    let hora = this._dateService.getHourFormat(new Date());
    // this.pubnub.publish({
    //   channel: this.channel, message: this.messageContent
    // });
    // this.chatEngine.chat.emit('message', { text: this.messageContent, avatar: avatar, hour: hora });
    let mediaUrl ;
    // ='https://i.ytimg.com/vi/LzE45Wfd5zo/maxresdefault.jpg';
    if (this.turn) {
        mediaUrl = null;
    }
    this.messages.push({isSelf: this.turn, data:{ text: this.messageContent, avatar: avatar,
     hour: hora, mediaUrl: mediaUrl }});
    this.messageContent = null;
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      setTimeout(() => {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
      }, 150);
    } catch(err) { }
  }
  onFileChange($event) {
     let file = $event.target.files[0];
    this._fileService.uploadFiles(file).subscribe(response => {
        // respuesta
        console.info(response);
        this.clearFile();
    },
    error => {
        console.error(error);
    });
  }
  clearFile() {
    this.fileInput.nativeElement.value = '';
  }
  cambiarColor(texto:string){
  if(texto.length>0)
   this.changecolor=true;
   else
   this.changecolor=false;
  }
}
