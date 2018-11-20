/**
 * Created by Tech Group BWL on 11/10/2018.
 */
import {Pipe, PipeTransform} from "@angular/core";
@Pipe({
  name: 'initialName'
})
export class MotumInitialNamePipe implements PipeTransform {
  private _USER_TYPE = 'NAME';
  private _CLIENT_TYPE = 'COMPANY';

  private _spanishArticles = [
    'el',
    'los',
    'la',
    'las',
    'un',
    'unos',
    'una',
    'unas',
    'al',
    'del',
    'El',
    'Los',
    'La',
    'Las',
    'Un',
    'Unos',
    'Una',
    'Unas',
    'Al',
    'Del',
    'lo',
    'Lo'
  ];
  private _onlyCharacterRegex = '[a-zA-Z]';

  transform(value: string, type: string = 'NAME'): string {
    if (type === this._USER_TYPE)
      return this._userProcess(value);
    else if (type === this._CLIENT_TYPE)
      return this._clientProcess(value);
    else
      return value;
  }

  private _userProcess(value: string): string {
    if (!value)
      return value;
    const splitVal = value.split(' ');
    if (splitVal.length < 2)
      return value;
    if (!splitVal[0] || !splitVal[1])
      return value;

    return `${splitVal[0].charAt(0)}${splitVal[1].charAt(0)}`.toUpperCase();
  }

  private _clientProcess(value: string): string {
    if (value.length < 2)
      return value;

    return `${value.charAt(0)}${value.charAt(1)}`.toUpperCase();
  }
}