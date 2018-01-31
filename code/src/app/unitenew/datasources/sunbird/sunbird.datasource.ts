import { SunbirdProfileDataService } from './collections/profile.dataservice';
import { SunbirdCoursesDataService } from './collections/courses.dataservice';
import { SunbirdMockDataService } from './collections/mock.dataservice';

import { SBGraphDataSource } from './collections/graph.datasource';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const ServiceCollection =  {
                            'default' : SunbirdMockDataService,
                            'mockService' : SunbirdMockDataService,
                            'sbprofile'   : SunbirdProfileDataService,
                            'sbcourses' : SunbirdCoursesDataService
                        }; 


const widgets = {
    'co1' : [
        {
            widName : 'Latest Courses',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                latest : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Course"],"objectType":["Content"],"status":["Live"]},"sort_by":{"lastPublishedOn":"desc"},"limit":10}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        },
        {
            widName : 'Popular Courses',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                popular : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Course"],"objectType":["Content"],"status":["Live"]},"sort_by":{"me_averageRating":"desc"},"limit":10, "exists":["me_averageRating", "appIcon"]}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        }
    ],
    'co3' : [
        {
            widName : 'Popular Worksheets',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                popular : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Worksheet"],"objectType":["Content"],"status":["Live"]},"sort_by":{"me_averageRating":"desc"},"limit":10, "exists":["me_averageRating", "appIcon"]}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        },
        {
            widName : 'Popular Stories',
            source : "sunbird",
            service : 'sbcourses',
            defaultConfig : {
                popular : true,
                baseUrl: "https://staging.open-sunbird.org",
                search_filter: '{"request":{"filters":{"contentType":["Story"],"objectType":["Content"],"status":["Live"]},"sort_by":{"me_averageRating":"desc"},"limit":10, "exists":["me_averageRating", "appIcon"]}}'
            },
            renderer : 'carousel',
            mapper :{
                'image_url': 'appIcon', 
                'caption': 'name',
                'description': 'description'
            }
        }
    ],
    'co2' : [
         {
             widName : 'Personal Information',
             source : "sunbird",
             service : 'sbprofile',
             defaultConfig : {
                 dataNode: "result.response"
             },
             mapper :{
                 'fname' : 'firstName',
                 'location' : 'location',
                 'lname' : 'lastName',
                 'img' : 'avatar',
                 'username' : 'loginId',
                 'lastLogin' : 'lastLogin'
             },
             renderer : 'personal'
         },
         {
            widName : 'Summary',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response"
            },
            mapper :{
                'description' : 'profileSummary',
            },
            renderer : 'divider'
        },
         {
             widName : 'Address',
             source : "sunbird",
             service : 'sbprofile',
             defaultConfig : {
                 dataNode: "result.response.address"
             },
             mapper :{
                 'image_url': 'icon', 
                 'caption': 'addType',
                 'description1': 'addressLine1',
                 'description2': 'addressLine2',
             },
             renderer : 'iconlist'
         },
        {
            widName : 'Education',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response.education"
            },
            mapper :{
                'image_url' : 'icon',
                'caption' : 'degree',
                'description1' :'grade',
                'description2' :'boardOrUniversity'
            },
            renderer : 'iconlist'
        },
        {
            widName : 'Experience',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response.jobProfile"
            },
            mapper :{
                'image_url' : 'icon',
                'caption' : 'jobName',
                'description1' :'orgName',
                'description2' :'role'
            },
            renderer : 'iconlist'
        },
        {
            widName : 'Profile Completeness',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response"
            },
            mapper :{
                'value' :'completeness',
            },
            renderer : 'progressBar'
        },
        {
            widName : 'Addition Information',
            source : "sunbird",
            service : 'sbprofile',
            defaultConfig : {
                dataNode: "result.response"
            },
            mapper :{
                'email' :'email',
                'phone' :'phone',
                'gender' :'gender',
                'dob' :'dob',
                'location' :'location',
            },
            renderer : 'additionalinfo'
        }
    ]
}

@Injectable()
export class SunbirdDataSource
{
    private dsConfigObj;

    constructor(private config, private _httpClient? : HttpClient )
    {
    }

    getData(serviceName)
    {
        let dsName = serviceName && ServiceCollection.hasOwnProperty(serviceName) 
                        ? ServiceCollection[serviceName]
                        : ServiceCollection['default'];

        let dsObj = new dsName(this.config, this._httpClient);
        return dsObj.getData().map(asdf => {
            return asdf;
        });
    }

    setRoutes(baseSegment)
    {
        let myRouteObj = [
            {path : "", service : "mockService", renderer : "sbHome"},
            {path : "courses", service : "sbcourses", renderer : "carousel", showDefault: false, widgets : widgets['co1']},
            {path : "library", service : "sbcourses", renderer : "carousel", showDefault: false, widgets : widgets['co3']},
            {path : "profile", service : "sbprofile", renderer : "personal", showDefault: false, widgets : widgets['co2']}
        ]

        return myRouteObj;
    }
}