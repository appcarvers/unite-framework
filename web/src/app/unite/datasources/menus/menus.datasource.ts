import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UniteMenusDataService } from './collection/menus.dataservice';
const ServiceCollection =  {
                            'menus' : UniteMenusDataService,
                            'menu': '',
                        };
                        
@Injectable()
export class MenusDataSource
{
    private dsConfigObj;
    constructor(private config, private _httpClient? : HttpClient)
    {
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['menus'];

        let dsObj = new dsName(this._httpClient);
        return dsObj.getData().map(result => {
            return result;
        });
    }
}