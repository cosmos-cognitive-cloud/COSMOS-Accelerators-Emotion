import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { SafeResourceUrl } from '@angular/platform-browser';

import { CognitiveApiService } from '../services/cognitive-api.service';
import { DataService } from '../services/data.service';
import { IEmotion } from '../models/emotion.model';
import { IRectangle } from '../models/rectangle.model';

@Injectable()
export class EmotionDataService extends DataService {

    constructor(protected http: Http, private cognitiveApiService: CognitiveApiService) {
        super(http)
    }

    recognize(imageUrlOrData: SafeResourceUrl | ArrayBuffer): Promise<IEmotion[]> {
        let url = this.apiServer + 'emotion/v1.0/recognize';

        if (typeof imageUrlOrData === 'string') {
            let body = { url: imageUrlOrData };
            return this.postAsPromise<IEmotion[]>(url, body, this.cognitiveApiService.subscriptionKeys.emotion);
        }
        else {
            return this.postBinaryData<IEmotion[]>(url, <ArrayBuffer>imageUrlOrData, this.cognitiveApiService.subscriptionKeys.emotion);
        }
    }

    recognizeWithRectangles(imageUrlOrData: SafeResourceUrl | ArrayBuffer, faceRectangles: Array<IRectangle>): Promise<IEmotion[]> {
        // A face rectangle is in the form “left,top,width,height”. Delimited multiple face rectangles with a “;”.
        let apiUrl = this.apiServer + 'emotion/v1.0/recognize';
        if (faceRectangles) {
            let rectangleParams = '';
            let count = 0;
            faceRectangles.forEach(rectangle => {
                if (count != 0) {
                    rectangleParams += ';';
                }
                rectangleParams += rectangle.left + ',' + rectangle.top + ',' + rectangle.width + ',' + rectangle.height;
                count++;
            });
            apiUrl += `?faceRectangles=${rectangleParams}`;
        }
        if (typeof imageUrlOrData === 'string') {
            let body = { url: imageUrlOrData };
            return this.postAsPromise<IEmotion[]>(apiUrl, body, this.cognitiveApiService.subscriptionKeys.emotion);
        }
        else {
            return this.postBinaryData<IEmotion[]>(apiUrl, <ArrayBuffer>imageUrlOrData, this.cognitiveApiService.subscriptionKeys.emotion);
        }
         
    }

    //recognizeInVideo()
}
