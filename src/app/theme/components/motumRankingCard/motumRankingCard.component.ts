import { Component, OnInit, Input, AfterViewInit } from '@angular/core';



@Component({
    selector: 'motum-ranking-card',
    templateUrl: './motumRankingCard.component.html',
    styleUrls: ['./motumRankingCard.component.scss']
})
export class MotumRankingCardComponent implements OnInit, AfterViewInit {


    @Input() iconClass: any;
    @Input() rankingType: any;
    @Input() mainPicture: any;
    @Input() firstLbl: any;
    @Input() firstLblContent: any;
    @Input() secondLbl: any;
    @Input() secondLblContent: any;
    imageSet: String;
    date: any;
    trophyClass: any;


    constructor() {


    }

    ngOnInit() {

    }

    ngAfterViewInit(){

        if(this.rankingType=="userRanking") {
            let score = parseFloat(this.secondLblContent);
            if (score >= 0 && score < 5) {
                this.imageSet = "ranking1.svg";
                this.trophyClass = "trophy-font-1";
            } else if (score >= 5 && score < 8) {
                this.imageSet = "ranking2.svg";
                this.trophyClass = "trophy-font-2";
            } else if (score >= 8 && score < 9.1) {
                this.imageSet = "ranking3.svg";
                this.trophyClass = "trophy-font-3";
            } else {
                this.trophyClass = "trophy-font-4";
                this.imageSet = "ranking4.svg";



            }
        }



    }

}
