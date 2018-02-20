import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from '../../../../../environments/environment';

@Injectable()
export class SunbirdCourseDataService {
    dataUrl;
    dataNode;
    apiBase;
    sbHeaders: HttpHeaders;
    sbGetProfileUrl = ''
    sbApiHeader = {};


    constructor(private config, private _httpClient?: HttpClient) {
    }

    getData(courseName) {
        return this._httpClient.get(
            this.config.defaultConfig.baseUrl + "/private/service/v1/content/course/v1/hierarchy/do_212282810256941056178");
    }
}