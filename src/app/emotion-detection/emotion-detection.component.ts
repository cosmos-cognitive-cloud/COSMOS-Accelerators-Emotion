import { Component, OnInit, Input, Output } from '@angular/core';
import { SafeResourceUrl, DomSanitizer, Title } from '@angular/platform-browser';

import { VisionApiComponent } from '../vision-api.component';
import { EmotionDataService } from '../services/emotion-data.service';
import { CognitiveApiService } from '../services/cognitive-api.service';
import { IEmotion } from '../models/emotion.model';

@Component({
    selector: 'emotion-detector',
    templateUrl: './emotion-detection.component.html',
    styleUrls: ['./emotion-detection.component.css']
})
export class EmotionDetectionComponent extends VisionApiComponent implements OnInit {
    emotions: Array<IEmotion>;
    apiTitle = 'Emotion Detection API';
    apiBackgroundImage = 'https://cosmosstore.blob.core.windows.net/content/COSMOS-DeeperPersonalization-NoLoop';
    apiDescription = 'Analyze faces to detect a range of feelings and personalize your app\'s responses.';
    apiReferenceUrl = 'https://dev.projectoxford.ai/docs/services/5639d931ca73072154c1ce89';

    showCodeButtons=false;
    codeOutputsizeLarge=true;

    public constructor(protected sanitizer: DomSanitizer, private titleService: Title, private emotionDataService: EmotionDataService, private cognitiveApiService: CognitiveApiService) {
        super(sanitizer);
        this.titleService.setTitle('Emotion Detection API');
    };

    ngOnInit() {
        //this.isLoading = true;
        this.imageList = this.cognitiveApiService.emotionImageUrls;
        this.internetImageUrl = this.cognitiveApiService.emotionImageUrls[0];
        this.onInternetUrlSelected();
    }

    topEmotion(index: number) {
        try {
            let emotion = this.emotions[index];
            let maxValue = 0;
            let maxKey = '';
            for(let prop in emotion.scores) {
                if(emotion.scores.hasOwnProperty(prop)) {
                    if (emotion.scores[prop] > maxValue) {
                        maxValue = emotion.scores[prop];
                        maxKey = prop;
                    }
                }
            }
            return maxKey;
        } catch (err) {
            return '';
        }
    }

    emotionColor(emotionName: string, opaque: boolean) {
        let opacity = opaque ? '1' : '.3';
        switch(emotionName) {
            case 'anger': return `rgba(255,0,0,${opacity})`;
            case 'contempt' : return `rgba(233,150,122,${opacity})`;
            case 'disgust': return `rgba(153,50,204,${opacity})`;
            case 'fear': return `rgba(0,0,0,${opacity})`;
            case 'happiness': return `rgba(255,215,0,${opacity})`;
            case 'neutral': return `rgba(128,128,128,${opacity})`;
            case 'sadness': return `rgba(65,105,225,${opacity})`;
            case 'surprise': return `rgba(255,69,0,${opacity})`;
        }
        return `rgba(255,255,255,${opacity})`;
    }

    refreshDetection() {
        this.clearFaces();
        this.errorMessage = '';

        if (!this.isLoading) {

            if (!this.selectedImageUrl) {
                this.errorMessage = 'Please provide a valid URL';
            } else {
                this.isLoading = true;
                this.emotionDataService.recognize(this.selectedImageUrl)
                    .then(emotions => {
                        this.emotions = emotions;
                        this.isLoading = false;
                        this.processFaces();
                    })
                    .catch((error) => {
                        this.errorMessage = error;
                        this.isLoading = false;
                    });
            }
        }
    }

    processFile(result: any) {
        this.isLoading = true;
        this.emotionDataService.recognize(result)
            .then(emotions => {
                this.emotions = emotions;
                this.isLoading = false;
                this.processFaces();
            })
            .catch((error) => {
                this.errorMessage = error;
                this.isLoading = false;
            });
    }

    onResize() {
        this.clearFaces();
        this.processFaces();
    }

    private processFaces(): void {
        if (!this.selectedImage) {
            return;
        }
        (this.emotions || []).forEach(emotion => {
            this.faceRectangles.push(this.processFaceRectangle(emotion.faceRectangle));
        });
    }
}