import {InjectionToken} from "@angular/core";
/**
 * Created by Tech Group BWL on 14/08/2018.
 */
export interface TmThemeOptions {
  name: string;
}

export const TM_THEME_OPTIONS = new InjectionToken<TmThemeOptions>('Tecnomotum theme options');
// const TM_JS_THEMES = new InjectionToken<TmThemeOptions[]>('Tecnomotum Js Themes');
export const TM_DOCUMENT = new InjectionToken<Document>('Document');