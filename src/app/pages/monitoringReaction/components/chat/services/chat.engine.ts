import { Injectable } from '@angular/core';
import { ChatEngineCore } from 'chat-engine';
import { environment } from "../../../../../../environments/environment";
/**
* Created by Tech Group BWL on 29/06/2018.
*/
const PUBNUB_KEY = environment.pubNubKey;
@Injectable()
export class ChatEngine {
  instance: any;
  create: any;
  plugin: any;
  me: any = { state: {} };
  chat: any = {};
  chats: any[] = [];
  constructor() {
    // this.instance = ChatEngineCore.create(PUBNUB_KEY,
    //   {
    //     debug: true,
    //     globalChannel: 'chat-engine-angular2-simple'
    //     withPresence: true
    //   });
    // this.create = ChatEngineCore.create.bind(this);
    // this.plugin = ChatEngineCore.plugin;
  }

  getUsers(obj) {
    let users: any = [];
    if (obj) {
      Object.keys(obj).forEach((key) => {
        users.push(obj[key]);
      });
    }
    return users;
  }

  newChat(user) {
    // define a channel
    let chat = new Date().getTime();
    // create a new chat with that channel
    let newChat = new this.instance.Chat(chat);
    // we need to auth ourselves before we can invite others
    newChat.on('$.connected', () => {
      // this fires a private invite to the user
      newChat.invite(user);
      // add the chat to the list
      this.chats.push(newChat);
    });
  }
}
