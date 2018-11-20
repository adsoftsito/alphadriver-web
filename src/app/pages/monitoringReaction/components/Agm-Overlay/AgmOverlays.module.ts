import { NgModule } from "@angular/core"
import { CommonModule } from "@angular/common"
import { AgmOverlay } from "./AgmOverlay.component"

@NgModule({
    imports:[
        CommonModule
    ],
    declarations: [ AgmOverlay ],
    exports : [ AgmOverlay ],
    providers:[

    ]
}) export class AgmOverlays {}