import { IRectangle } from '../models/rectangle.model';
import { IEmotionScore } from '../models/emotion-score.model';

export interface IEmotion {
    faceRectangle: IRectangle,
    scores: IEmotionScore,
}