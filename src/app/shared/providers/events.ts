/**
 * Created by Tech Group BWL on 02/07/2018.
 */

import {Injectable} from "@angular/core";
/**
 * EventsService works as Events from ionic framework where events
 * are a publish-subscribe style event system for sending
 * an responding to application-level events across the app.
 *
 * url: https://ionicframework.com/docs/api/util/Events/
 */
@Injectable()
export class EventsService {

  private channels: Array<any> = [];

  constructor(){}

  /**
   * Subscribe to an event topic. Events that get posted to that topic will trigger the provided handler.
   *
   * @param {string} topic the topic to subscribe to
   * @param {function} handlers the event handler
   */
  subscribe(topic: string, ...handlers: Function[]): void {
    for (let i  = 1; i < arguments.length; i ++) {
      handlers[i - 1] = arguments[i];
    }
    if (!this.channels[topic]) {
      this.channels[topic] = [];
    }
    handlers.forEach((handler) => {
      this.channels[topic].push(handler);
    });
  }
  /**
   * Unsubscribe from the given topic. Your handler will no longer receive events published to this topic.
   *
   * @param {string} topic the topic to unsubscribe from
   * @param {function} handler the event handler
   *
   * @return true if a handler was removed
   */
  unsubscribe(topic: string, handler?: Function): boolean {
    if (handler === void 0) { handler = null; }
    let t = this.channels[topic];
    if (!t) {
      // Wasn't found, wasn't removed
      return false;
    }
    if (!handler) {
      // Remove all handlers for this topic
      delete this.channels[topic];
    }
    // We need to find and remove a specific handler
    let i = t.indexOf(handler);
    if (i < 0) {
      // Wasn't found, wasn't removed
      return false;
    }
    t.splice(i, 1);
    // If the channel is empty now, remove it from the channel map
    if (!t.length) {
      delete this.channels[topic];
    }
    return true;
  }
  /**
   * Publish an event to the given topic.
   *
   * @param {string} topic the topic to publish to
   * @param {any} args the data to send as the event
   */
  publish(topic: string, ...args: any[]): any[] {
    for(let i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
    let t = this.channels[topic];
    if (!t) {
      return null;
    }
    let responses = [];
    t.forEach(handler => {
      responses.push(handler.apply(void 0, args));
    });
    return responses;
  }
}