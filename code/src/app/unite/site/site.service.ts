import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';

import { GridLayout } from './layouts/gridLayout/grid.layout';
import { ListLayout } from './layouts/listLayout/list.layout';
import { CarouselLayout } from './layouts/carouselLayout/carousel.layout';

const componentObj =  { 'grid' : GridLayout, 'list' : ListLayout, 'carousel' : CarouselLayout };

@Injectable()
export class WidgetService {

    constructor(private _httpClient : HttpClient){}

    getPageWidgets(pageId){

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

    getPages(){
        return this._httpClient.get('/assets/pages.json');
    }

    getWidgetData(dataUrl, compoName, dataNode?){
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
                        checkArr['component'] = componentObj[compoName];

                        return checkArr;
                    })
    }
}