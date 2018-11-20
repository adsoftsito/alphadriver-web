import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: "filterFlotas",
    pure: false
})
export class FilterSelectionPipe implements PipeTransform {

    transform(items: any[], args: any): any {
        return items ? (items.filter(item => !item.ignoreFilter && item.checked && (args === "" || item.name.toLowerCase().indexOf(args.toLowerCase()) > -1))) : items;
    }

}