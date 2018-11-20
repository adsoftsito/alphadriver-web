import { Injectable } from '@angular/core';

@Injectable()
export class DataChartsService {
  data: any;
  constructor() { }

  getDataCharts(idItemChart) {

    switch(idItemChart){
      case 0: 
          this.data = [{
            "country": "USA-r",
            "visits": 50
          }, {
            "country": "China",
            "visits": 31
          }, {
            "country": "Japan",
            "visits": 36
          }, {
            "country": "Germany",
            "visits": 45
          }, {
            "country": "UK",
            "visits": 36
          }, {
            "country": "France",
            "visits": 30
          }, {
            "country": "India",
            "visits": 35
          }, {
            "country": "Spain",
            "visits": 52
          }, {
            "country": "Netherlands",
            "visits": 36
          }, {
            "country": "Russia-a",
            "visits": 18
          }]; return this.data;
      case 1:
          this.data = [{
            "country": "Lithuania22",
            "litres": 501.9
          }, {
            "country": "Czech",
            "litres": 301.9
          }, {
            "country": "Ireland",
            "litres": 201.1
          }, {
            "country": "Germany",
            "litres": 165.8
          }, {
            "country": "Australia22",
            "litres": 139.9
          }]; return this.data;
      case 2:
          this.data = [{
            "year": "1972",
            "value": 10
        }, {
            "year": "1973",
            "value": 13
        }, {
            "year": "1974",
            "value": 16
        }, {
            "year": "1975",
            "value": 17
        }, {
            "year": "1976",
            "value": 18
        }, {
            "year": "1977",
            "value": 16
        }, {
            "year": "1978",
            "value": 14
        }]; return this.data;
      case 3:
          this.data = [{
            "year": 1966,
            "italy": 5,
            "germany": 10,
            "uk": 5
        }, {
            "year": 1970,
            "italy": 4,
            "germany": 9,
            "uk": 2
        }, {
            "year": 1974,
            "italy": 6,
            "germany": 15,
            "uk": 6
        }, {
            "year": 1978,
            "italy": 7,
            "germany": 18,
            "uk": 4
        }]; return this.data;
      case 4:
        this.data = [{
          "country": "USA-r",
          "visits": 50
        }, {
          "country": "China",
          "visits": 31
        }, {
          "country": "Japan",
          "visits": 36
        }, {
          "country": "Germany",
          "visits": 45
        }, {
          "country": "UK",
          "visits": 36
        }, {
          "country": "France",
          "visits": 30
        }, {
          "country": "India",
          "visits": 35
        }, {
          "country": "Spain",
          "visits": 52
        }, {
          "country": "Netherlands",
          "visits": 36
        }, {
          "country": "Russia-a",
          "visits": 18
        }]; return this.data;
    case 5:
      this.data = [{
        "country": "Lithuania22",
        "litres": 501.9
      }, {
        "country": "Czech",
        "litres": 301.9
      }, {
        "country": "Ireland",
        "litres": 201.1
      }, {
        "country": "Germany",
        "litres": 165.8
      }, {
        "country": "Australia22",
        "litres": 139.9
      }]; return this.data;
    }
  }

}
