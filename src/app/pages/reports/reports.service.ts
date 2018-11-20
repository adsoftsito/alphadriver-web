import * as moment from 'moment';
import { HttpModule, JsonpModule } from '@angular/http';
import { Http, Response, Headers , RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ReportsService {

  // urlService: string = 'http://landcserver.dyndns.org:8090/v1/';
  urlPrintService: string = 'http://localhost:3000/screenshot/chrome';
  // urlApplicationOnlyReports: string = 'http://localhost:4200/#/reports-only';

  // urlService: string = 'http://192.168.0.111:8589/v1/';
  // urlPrintService: string = 'http://landcserver.dyndns.org:3000/screenshot/chrome';
  // urlApplicationOnlyReports: string = 'http://landcserver.dyndns.org:8282/dist/#/reports-only';

  urlService: string = 'http://192.168.0.111:8585/webservice/v1/';
  // urlPrintService: string = 'http://landcserver.dyndns.org:3000/screenshot/chrome';
  // urlApplicationOnlyReports: string = 'http://landcserver.dyndns.org:8282/dist/#/reports-only';
  urlApplicationOnlyReports: string = 'http://localhost:4200/#/reports-only';

  content: any;
  username: string = 'username';
  password: string = 'password';
  headers: Headers = new Headers();
  options: any;
  drivers: string = 'drivers';

  private PATH_VEHICLE_GENERAL_OPERATIONAL_SECURITY = 'VEHICULO/Generales/Seguridad operacional';
  private PATH_VEHICLE_GENERAL_OPERATIONAL_BEHAVIOR = 'VEHICULO/Generales/Conducta operativa';
  private PATH_OPERATOR_GENERAL_OPERATIONAL_SECURITY = 'OPERADORES/Generales/Seguridad operacional';
  private PATH_OPERATOR_GENERAL_OPERATIONAL_BEHAVIOR = 'OPERADORES/Generales/Conducta operativa';
  private PATH_FLEET_GENERAL_OPERATIONAL_BEHAVIOR = 'FLOTAS/Generales/Conducta operativa';
  constructor(private _http: Http) {
    this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
  }

  getReportPartialUrl(treeNode: any): string {
    const pathTree = this.getPathTreeAsString(treeNode);



    if (pathTree === this.PATH_VEHICLE_GENERAL_OPERATIONAL_SECURITY) {
      return 'security/vehicle';
    }
    if (pathTree === this.PATH_VEHICLE_GENERAL_OPERATIONAL_BEHAVIOR) {
      return 'conduct/vehicle';
    }
    if (pathTree === this.PATH_OPERATOR_GENERAL_OPERATIONAL_SECURITY) {
      return 'security/operator';
    }
    if (pathTree === this.PATH_OPERATOR_GENERAL_OPERATIONAL_BEHAVIOR) {
      return 'conduct/operator';
    }
    if (pathTree === this.PATH_FLEET_GENERAL_OPERATIONAL_BEHAVIOR) {
      return 'indicators/fleet/performance';
    }
    return null;
  }

  getPathTreeAsString (treeNode: any): string {
    return treeNode.isRoot ? treeNode.displayField :
    this.getPathTreeAsString(treeNode.parent) + '/' + treeNode.displayField ;
  }

  getTreeRootName (treeNode: any): string {
    return treeNode.isRoot ? treeNode.displayField :
    this.getTreeRootName(treeNode.parent);
  }

  getReportTitle(treeNode: any): string {
    return treeNode.displayField + ' ' + this.getTreeRootName(treeNode);
  }

  isValidYear(year: string): boolean {
    if (!year) return false;
    let yearInt = 0;
    try {
      yearInt = +year;
    } catch (e) {
      return false;
    }
    if (yearInt < 2017) return false; // 2017 because it does not exists previous info

    return true;
  }

  getListWeeksInYear(year: number): number[] {
    return this._listNumber(1, this._getWeeksInYear(year), []);
  }

  getListWeeksInMonth(year: number, month: number) {

    const monthMomentFormat = --month;
    let initNumberWeek = this._getNumberWeekOfDate(year, monthMomentFormat, 1);
    let listWeeks = [];
    let returnValue = [];

    if ( (initNumberWeek === 52 || initNumberWeek === 53)  && monthMomentFormat === 0) {
      listWeeks = [initNumberWeek];
      initNumberWeek = 1;
    }
    // console.info(this.getMonday(new Date()) +' '+this.getSunday(new Date()) );

    let weeksNumber = this._listNumber(initNumberWeek,
      this._getLastNumberWeekOfMonth(year, monthMomentFormat), listWeeks);

      for (let i = 0; i < weeksNumber.length; i++) {

        if (monthMomentFormat === 0
          && weeksNumber[i] >= 52 ) {
              returnValue[i] = `${weeksNumber[i]} :
              ${moment().set( { year: year - 1, isoWeek: weeksNumber[i] })
              .startOf('isoWeek').format('DD-MM-YYYY')} -
              ${moment().set( { year: year - 1 , isoWeek: weeksNumber[i] })
              .endOf('isoWeek').format('DD-MM-YYYY')}`;
          }else {
                    returnValue[i] = `${weeksNumber[i]} :
                    ${moment().set( { year: year, isoWeek: weeksNumber[i] })
                    .startOf('isoWeek').format('DD-MM-YYYY')} -
                    ${moment().set( { year: year, isoWeek: weeksNumber[i] })
                    .endOf('isoWeek').format('DD-MM-YYYY')}`;
                }
          }
          return returnValue;
        }

        printReport (printType: string, toEncode: any, partialUrl: string) {
          const encoded = this.json2Base64(toEncode);
          const urlEncoded = encodeURIComponent(`${this.urlApplicationOnlyReports}/${partialUrl}/`);
          // const uuid: string = this.createGuid();
          // const windowSize: string = '960x4000';
          const report = partialUrl.replace('/', ' ');
          const fileName = `${report}.${printType}`;
          const encoded2 = encodeURIComponent(encoded);
          // console.info(partialUrl + encoded2);
          const urlPrintMethod = `${this.urlPrintService}?target=${urlEncoded}${encoded2}&fileName=${fileName}`;
          window.open(urlPrintMethod);
        }
        json2Base64 (decoded: any): string {
          return btoa(JSON.stringify(decoded));
        }

        base2Json (encoded: string): any {
          return JSON.parse(atob(encoded));
        }

        createGuid () {
          const s4 = () => Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
          return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
        }
        isNumericString (n: any): boolean {
          return this._isNumeric(n);
        }

        private _isNumeric (n: any): any {
          return !isNaN(parseFloat(n)) && isFinite(n);
        }
        private _getWeeksInYear(year: number): number {
          return moment().set('year', year).isoWeeksInYear();
        }

        private _getNumberWeekOfDate(year: number, month: number, day: number): number {
          return moment().set({ year: year, month: month, date: day }).isoWeek();
        }

        private _getLastNumberWeekOfMonth (year: number, month: number): number {
          return moment().set({ year: year, month: month,
            date: moment().set({ year: year, month: month }).daysInMonth() }).isoWeek();
          }

          private _listNumber(initNumber: number, endNumber: number, arr: any): number[] {

            if (endNumber === 1) {
              endNumber = 53;
            }
            if (initNumber === endNumber) {
              arr.push(initNumber);
              return arr;
            }
            arr.push(initNumber);
            return this._listNumber(++initNumber, endNumber, arr);
          }

          getInfo(urlWebService, params) {

            this.headers.delete('Authorization');
            this.headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
            if (urlWebService === null && params === null) {
            }else {
              if (urlWebService !== null && params === null) {
                return this._http.get(
                  this.urlService+''+ urlWebService, { headers: this.headers })
                  .map((res: Response) => res.json());
                }else {
                  if (urlWebService !== null && params !== null) {
                    this.content = 'params='+ encodeURIComponent (btoa(JSON.stringify(params)));
                    this.options = new RequestOptions({ headers: this.headers, params: this.content });

                    return this._http.get(this.urlService+""+ urlWebService, this.options)
                    .map((res: Response) => res.json());
                  }
                }

              }
            }
            getOperators() {
              this.headers.append('Authorization', 'Basic ' + btoa(this.username + ':' + this.password));
              this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
              return this._http.get(
                this.urlService+""+ this.drivers, { headers: this.headers })
                .map((res: Response) => res.json());
              }
            }
