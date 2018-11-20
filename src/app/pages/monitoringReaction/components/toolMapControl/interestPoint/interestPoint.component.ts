import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MonitoringReactionService } from '../../../montoringReaction.service';
import { Subscription } from 'rxjs';


/**
 * Created by Tech Group BWL on 30/07/2018.
 */

@Component({
  selector: 'mr-interest-point',
  templateUrl: './interestPoint.component.html',
  styleUrls: ['./interestPoint.component.scss']
})
export class MonitoringReactionInterestPointComponent implements OnInit,OnDestroy {
isAutomatic: boolean = true;

  @Output() listOfPoints: EventEmitter<Array<any>> = new EventEmitter<Array<any>>();

  interestPoint: Array<any> = [];
  interestPoint1:Array<any> = [];
  private $subscriptionInterestPoints:Subscription;
  constructor(private _serviceMR:MonitoringReactionService) { 
  }

  ngOnInit() {
    this.$subscriptionInterestPoints = this._serviceMR.getInterestPoints().subscribe(
      res =>{
        const body = JSON.parse(res['_body']);
        this.interestPoint = body.interestPoints;    
      },
      err =>{
        console.log(err);
      }
    );
  }

  ngOnDestroy(){
    this.$subscriptionInterestPoints.unsubscribe();      
  }

  /**
   * select all checkboxes
   */
  selectAll( point, event){

    let flagCheck = event.target.checked;

    for(let i in this.interestPoint){      
      // let position = this.interestPoint[i].points.indexOf(point);
      let position = this.interestPoint[i].points.indexOf(point);      

      if(position != -1){ // Found position of selected checkbox
        if(point.paths)
        {
          //one interestPoint
          this.interestPoint[i].points[position].selected = flagCheck;
          this.sendDataToMap(point);
        }
        else{
          this.interestPoint[i].points[position].selected = flagCheck;

          for(let w in this.interestPoint[i].points[position].points){
            this.interestPoint[i].points[position].points[w].selected = flagCheck;            
            this.sendDataToMap(this.interestPoint[i].points[position].points[w]);
          }

        }
        let nameLineCheck = this.interestPoint[i].points[position].label.substr(-3);
        document.getElementById(nameLineCheck).className = '';
      }
    } //End For interestPoint

  }


  sendDataToMap(data){

      this.listOfPoints.emit(data);

      //console.log(data);

  }

  selectCheck(point, subPoint, event){
    let positionSP = -1;
    let flagSubPoint = event.target.checked;
    let a = 0;

    if (point.paths)
    {
     
      this.sendDataToMap(point);
      
    }else
    {//subpoints
      for (let i in this.interestPoint) {
        while (a < this.interestPoint[i].points.length) {
          if (point.points) {
            try{//To ignore points of interest that do not contain subcategories
            
              positionSP = this.interestPoint[i].points[a].points.indexOf(subPoint);
            if (positionSP != -1) {
              this.interestPoint[i].points[a].points[positionSP].selected = flagSubPoint;
              this.validation(this.interestPoint[i].points[a].points, point);

              this.sendDataToMap(this.interestPoint[i].points[a].points[positionSP]);
              //console.log(this.interestPoint[i].points[a].subPoints[positionSP]);
            }
            }catch(error){
              
            }
          }
          a++;
        } //End While
        a = 0;
      }//End For
    }
    
 

  }

  /**
   * Checkbox validation to select the parent checkbox
   */
  validation(subPoints, point){
    let NoItems = subPoints.length-1;
    let NoItem = -1;

    for(let i in subPoints){

      if(subPoints[i].selected === true){
        NoItem++;
      }

      if(NoItem === -1){
        for(let x in this.interestPoint){
          let positionP = this.interestPoint[x].points.indexOf(point);

          if(positionP != -1){
            let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
            document.getElementById(nameLineCheck).className = '';
          }
        }
      }else{
        if(NoItem > -1 && NoItem < NoItems){
          for(let x in this.interestPoint){
            let positionP = this.interestPoint[x].points.indexOf(point);
  
            if(positionP != -1){
              let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
              document.getElementById(nameLineCheck).className = 'lineInCheckbox';
            }
          }
        }
      }
      if(NoItem === NoItems){
        for(let x in this.interestPoint){
          let positionP = this.interestPoint[x].points.indexOf(point);

          if(positionP != -1){
            let nameLineCheck = this.interestPoint[x].points[positionP].label.substr(-3);
            document.getElementById(nameLineCheck).className = '';
            this.interestPoint[x].points[positionP].selected = true;
          }
        }
      }else{
        for(let i in this.interestPoint){
          let positionP = this.interestPoint[i].points.indexOf(point);

          if(positionP != -1){
            this.interestPoint[i].points[positionP].selected = false;
          }
        }
      }

    } //End For Validation subPoints

  } //End Method Validation

}
