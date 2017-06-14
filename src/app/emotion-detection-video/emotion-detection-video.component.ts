import { Component, OnInit, Input, Output } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { CognitiveApiService } from '../services/cognitive-api.service';
import { CognitiveApiComponent } from '../cognitive-api.component';
import IsMobile from '../shared/isMobile';

@Component({
    selector: 'emotion-detection-video',
    templateUrl: './emotion-detection-video.component.html',
    styleUrls: ['./emotion-detection-video.component.css']
})
export class EmotionDetectionVideoComponent extends CognitiveApiComponent implements OnInit {
    posterList: Array<string>;
    selectedPoster: string;
    imageList: Array<string>;
    selectedImageUrl: SafeResourceUrl;
    internetImageUrl: string;
    isMobile: boolean = IsMobile();

    public constructor(protected sanitizer: DomSanitizer, private cognitiveApiService: CognitiveApiService) {
        super();
    }

    ngOnInit() {
        this.isLoading = true;
        this.imageList = this.cognitiveApiService.emotionVideoUrls;
        this.posterList = this.cognitiveApiService.emotionVideoPosters;
        this.selectedPoster = this.posterList[0];
        this.internetImageUrl = this.cognitiveApiService.emotionVideoUrls[0];
        this.onInternetUrlSelected();
    }

    onInternetUrlSelected(): void {
        this.selectedImageUrl = this.internetImageUrl;
    }

    selectStockImage(imagePath: string) {
        this.selectedImageUrl = imagePath;
        this.internetImageUrl = imagePath;
        this.selectedPoster = this.posterList[this.imageList.indexOf(this.internetImageUrl)];
    }
}