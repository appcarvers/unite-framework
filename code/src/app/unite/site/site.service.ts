import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { GridComponent } from './layouts/gridComponent/grid.component';
import { ListComponent } from './layouts/listComponent/list.component';
import { CarouselComponent } from './layouts/carouselComponent/carousel.component';

const componentObj =  { 'grid' : GridComponent, 'list' : ListComponent, 'carousel' : CarouselComponent };

import { DataSource } from './dataSource.collection';

@Injectable()
export class WidgetService {

    dataSouceCollection = DataSource;

    constructor(private _httpClient : HttpClient){}

    getPages()
    {
        return this._httpClient.get('/assets/pages.json');
    }

    getPageWidgets(pageId)
    {
        return this._httpClient
                    .get("/assets/widgets.json")
                    .map((data : Array<any>) => {
                        let finalArray = [];
                        data.forEach(element => {
                            if(element['page_id'] == pageId)
                            {
                                finalArray.push(element);
                            }
                        });

                        return finalArray;
                    });
    }

    getDataSource(source)
    {
        if(this.dataSouceCollection[source.name])
        {
            let ds = this.dataSouceCollection[source.name];
            return new ds(source.config, this._httpClient);
        }
    }

    getWidgetData(dataUrl, widgetObj, dataNode?)
    {
        return this._httpClient
                    .get(dataUrl)
                    .map((data) => {

                        if(dataNode)
                        {
                            let dataNodeArr = dataNode.split(".");
                            let myFinalArray = data;

                            dataNodeArr.forEach(element => {
                                myFinalArray = myFinalArray[element];
                            });
                            
                            data = myFinalArray;
                        }

                        var checkArr = {};

                        checkArr['data'] = data;
                        checkArr['mapper'] = widgetObj['params'];
                        checkArr['component'] = componentObj[widgetObj.renderer_name];

                        return checkArr;
                    })
    }
}