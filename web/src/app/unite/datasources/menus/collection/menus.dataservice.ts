import { BaseService } from './../../../core/services/base.service';
import {Injectable} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class UniteMenusDataService extends BaseService
{
    dataUrl;
    dataNode;

    constructor(_httpClient: HttpClient) {
        super(_httpClient, 'api/menus?filter[include][source][extension]=routes');
    }

    getData()
    {
        return this.getAll();
    }
}