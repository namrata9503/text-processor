import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { WordFrequency } from '@model/WordFrequency';
import { WordFrequencyAnalyzer } from 'src/app/interface/WordFrequencyAnalyzer';
import { TextProcessService } from '@services/text-process.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-text-processor',
    templateUrl: './text-processor.component.html',
    styleUrls: ['./text-processor.component.scss'],
})
export class TextProcessorComponent implements OnInit, WordFrequencyAnalyzer {

    givenText!: string;
    specifiedWord!: string;
    mostFrequentN!: number;
    response1: number = 0;
    response2: number = 0;
    response3: WordFrequency[] = [];
    sortedKeyValue!: any;

    displayedColumns = ['word', 'frequency'];
    dataSource = new MatTableDataSource<WordFrequency>([]);
    myForm!: FormGroup;

    @ViewChild(MatPaginator) paginator!: MatPaginator;

    constructor(private textProcessService: TextProcessService) {
    }

    ngOnInit(): void {
        this.myForm = new FormGroup({
            givenText: new FormControl(),
            specifiedWord: new FormControl(),
            mostFrequentN: new FormControl(),
        });
    }

    textProcessing(): void {
        this.textPreProcessor();
        this.response1 = this.calculateHighestFrequency();
        this.response2 = this.calculateFrequencyForWord(this.givenText, this.specifiedWord);
        this.response3 = this.calculateMostFrequentNWords(this.givenText, this.mostFrequentN);
        this.dataSource.data = this.response3;
        this.dataSource.paginator = this.paginator;
    }

    /* convert to map followed with descending order of frequency */
    sortedKeyValuePair(myArray: string[]): string[] {
        // convert to object
        const keyValue = myArray.reduce((acc: any, val: any) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        // descending order of frequency
        return Object.keys(keyValue)
            .sort((a, b) => keyValue[b] - keyValue[a])
            .reduce((acc: any, cur) => {
                acc[cur] = keyValue[cur];
                return acc;
            }, {});
    }

    /* process the text in such a way that calculating the all responses will be easy */
    textPreProcessor() {
        let myArray;
        try {
            myArray = this.textProcessService.wordSeparator(this.givenText);
            this.textProcessService.totalNumberOfWords = myArray.length;
            this.sortedKeyValue = this.sortedKeyValuePair(myArray);

        } catch (error) {
            console.error('Operation failed due to ', error);
        }

    }

    /* calculate highest frequency in given text */
    calculateHighestFrequency(): number {
        let highestFrequentCount = 0;

        try {
            if (this.textProcessService.totalNumberOfWords > 0) {
                const sortedMap = new Map(Object.entries(this.sortedKeyValue));

                highestFrequentCount = Number(sortedMap.get(Object.keys(this.sortedKeyValue)[0]));
            }

        } catch (error) {
            console.error('Operation failed due to ', error);
        }
        return highestFrequentCount;
    }

    /* calculate frequency for specific word in given text */
    calculateFrequencyForWord(text: string, specifiedWord: string): number {

        let frequencCountForGivenWord = 0;
        try {
            const sortedMap = new Map(Object.entries(this.sortedKeyValue));
            // validate if key exist
            if (specifiedWord && sortedMap.has(specifiedWord.toLowerCase())) {
                frequencCountForGivenWord = Number(sortedMap.get(specifiedWord.toLowerCase()));
            }

        } catch (error) {
            console.error('Operation failed due to ', error);
        }
        return frequencCountForGivenWord;
    }

    /* calculate list of N frequent words in given text */
    calculateMostFrequentNWords(text: string, mostFrequentN: number): WordFrequency[] {
        const wordsFrequency: WordFrequency[] = [];

        try {
            if (mostFrequentN >= 0) {
                const mostFrequentNwords = new Map(Object.entries(this.sortedKeyValue).slice(0, mostFrequentN));
                mostFrequentNwords.forEach((values, keys) => {
                    const wordFrequency: WordFrequency = {
                        word: keys,
                        frequency: Number(values),
                    };
                    wordsFrequency.push(wordFrequency);
                });
            }

        } catch (error) {
            console.error('Operation failed due to ', error);
        }
        return wordsFrequency;
    }

    /* Validation error on UI side */
    get findError() {
        return this.myForm.controls;
    }

    /* Reset the form and calculate updated response  */
    resetForm() {
        this.myForm.reset();
        this.textProcessing();
    }

}
