import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class TextProcessService {

    totalNumberOfWords!: number;

    /* this method filters alphabetcal letters , sort them in ascending order and convert it into lowercase  */
    wordSeparator(text: string): string[] {
        let words: string[] = [];
        if (! text) {
            this.totalNumberOfWords = 0;
        } else {
            words = text.toLowerCase().split(/[^A-Za-z]/).filter((e) => e).sort();
            this.totalNumberOfWords = words.length;
        }
        return words;
    }

}
