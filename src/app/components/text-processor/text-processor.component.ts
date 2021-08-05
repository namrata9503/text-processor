import { Component, Input, OnInit, ViewChild } from '@angular/core';
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

    @Input() text = {
        givenText: '',
        specifiedWord: '',
        mostFrequentN: '',
    };
    givenText!: string;
    specifiedWord!: string;
    mostFrequentN!: number;
    totalWordsAfterSeparator: number = 0;
    response1: number = 0;
    response2: number = 0;
    response3: WordFrequency[] = [];
    sortedKeyValue!: any;

    displayedColumns = ['word', 'frequency'];
    dataSource = new MatTableDataSource<WordFrequency>([]);
    //  @ViewChild(NgForm) myForm!: NgForm;
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

    processWordSeperate(): void {
        this.textProcessService.wordSeparator(this.givenText);
    }

    textProcessing(): void {
        // reset method
        this.textPreProcessor();
        this.response1 = this.calculateHighestFrequency();
        this.response2 = this.calculateFrequencyForWord();
        this.response3 = this.calculateMostFrequentNWords(this.givenText, this.mostFrequentN);
        this.dataSource.data = this.response3;
        this.dataSource.paginator = this.paginator;

    }

    sortedKeyValuePair(myArray: string[]): string[] {
        // convert to map
        const keyValue = myArray.reduce((acc: any, val: any) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        // convert to sorted keyValue pari; keys already sorted in array

        return Object.keys(keyValue)
            .sort((a, b) => keyValue[b] - keyValue[a])
            .reduce((acc: any, cur) => {
                acc[cur] = keyValue[cur];
                return acc;
            }, {});
    }

    textPreProcessor() {
        let myArray;
        try {
            myArray = this.textProcessService.wordSeparator(this.givenText);
            this.totalWordsAfterSeparator = myArray.length;
            this.sortedKeyValue = this.sortedKeyValuePair(myArray);

        } catch (error) {
            console.error('Operation failed due to ', error);
        }

    }
    calculateHighestFrequency(): number {
        let highestFrequencCount = 0;

        try {
            if (this.totalWordsAfterSeparator > 0) {
                const sortedMap = new Map(Object.entries(this.sortedKeyValue));

                highestFrequencCount = Number(sortedMap.get(Object.keys(this.sortedKeyValue)[0]));
            }

        } catch (error) {
            console.error('Operation failed due to ', error);
        }
        return highestFrequencCount;
    }

    calculateFrequencyForWord(): number {

        let frequencCountForGivenWord = 0;
        try {
            const sortedMap = new Map(Object.entries(this.sortedKeyValue));
            // validate if key exist
            if (! this.specifiedWord || ! sortedMap.has(this.specifiedWord.toLowerCase())) {
                frequencCountForGivenWord = 0;

            } else {
                frequencCountForGivenWord = Number(sortedMap.get(this.specifiedWord.toLowerCase()));
            }

        } catch (error) {
            console.error('Operation failed due to ', error);
        }
        return frequencCountForGivenWord;
    }

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
    get findError() {
        return this.myForm.controls;
    }
    resetForm() {
        this.myForm.reset();
        this.textProcessing();
    }

}
