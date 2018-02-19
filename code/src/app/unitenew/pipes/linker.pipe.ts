import { Pipe, PipeTransform } from '@angular/core';
import { UniteRouting } from '../uniteServices/routingService';
import { UniteMapperPipe } from './mapper.pipe';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({
    name: 'uniteLinker'
})
export class UniteLinkerPipe implements PipeTransform {

    constructor(private _uniteRouting: UniteRouting, private _uniteMapper: UniteMapperPipe) { }

    transform(value, node): string {

        if (node) {
            const pages = this._uniteRouting.finalMenus;
            console.log("this is the nodeeeeee ", node, this._uniteRouting.finalMenus);

            pages.forEach(page => {
                if (node.page_id == page.page_id) {
                    let pagePathArr = page.path.split("/");
                    let nodePathParam = node['urlParams'];

                    pagePathArr.forEach((element, index) => {
                        if (element.indexOf(":") === 0 && nodePathParam.hasOwnProperty(element.replace(/^(:)/, ""))) {
                            pagePathArr[index] = this._uniteMapper.transform(value, nodePathParam[element.replace(/^(:)/, "")]);
                        }
                    });

                    return "/" + pagePathArr.join("/");
                }
            });
        }
    }
}