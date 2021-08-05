import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TextProcessorComponent } from './text-processor.component';

describe('TextProcessorComponent', () => {
    let component: TextProcessorComponent;
    let fixture: ComponentFixture<TextProcessorComponent>;

    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [TextProcessorComponent],
            imports: [RouterTestingModule, HttpClientTestingModule, FormsModule, ReactiveFormsModule],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TextProcessorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    // Highest Frequency Word
    it('should be able to call calculateHighestFrequency() method', () => {
        const spy = spyOn(component, 'calculateHighestFrequency');

        fixture.detectChanges();
        expect(spy).toBeTruthy();
        component.calculateHighestFrequency();
        console.log(component.calculateHighestFrequency);
        expect(spy).toHaveBeenCalled();
    });

    it('should be able to show most frequent word occurance', () => {
        // eslint-disable-next-line max-len
        component.givenText = 'This is the text which will be the given text to type and it will return the frequency of highest word frequency of "the" will be 4';
        component.textProcessing();
        expect(component.givenText).not.toBe('');
        expect(component.response1).toBe(4);
    });

    it('should be able check ngModel of givenText value', () => {
        const hostElement = fixture.nativeElement;
        const givenTextInput: HTMLInputElement = hostElement.querySelector('#givenTextId');
        fixture.detectChanges();

        // eslint-disable-next-line max-len
        givenTextInput.value = 'This is the text which will be the given text to type and it will return the frequency of highect word frequency of "the"';
        givenTextInput.dispatchEvent(new Event('input'));
        // eslint-disable-next-line max-len
        expect(component.myForm.controls.givenText.value).toBe(givenTextInput.value);

    });

    it('should return zero frequency for empty text', () => {
        component.givenText = '';
        component.textProcessing();
        expect(component.response1).toBe(0);
    });

    it('should return zero frequency for Non alphabatic word', () => {
        component.givenText = '1@3#,0.13 4>?{]!$%^&*()';
        component.textProcessing();
        expect(component.response1).toBe(0);
    });

    it('should return highest frequency for given text', () => {
        component.givenText = '1@3This! is ThE&text which 4will return,highest+frequecy#of "the" word*';
        component.textProcessing();
        expect(component.response1).toBe(2);
    });

    // For specific word

    it('should check frequency of existing word in givenText', () => {
        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.specifiedWord = 'the';
        component.textProcessing();
        expect(component.response2).toBe(3);
    });

    it('should check frequency of existing incase sensitive word in givenText', () => {
        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.specifiedWord = 'tHe';
        component.textProcessing();
        expect(component.response2).toBe(3);
    });

    it('should check frequency of empty word in given text', () => {
        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.specifiedWord = '';
        component.textProcessing();
        expect(component.response2).toBe(0);
    });

    it('should check if specific word is not in given text', () => {
        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.specifiedWord = 'text';
        component.textProcessing();
        expect(component.response2).toBe(0);
    });

    it('should check frequency of  word (non alphabetic) in given text', () => {
        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.specifiedWord = '23!';
        component.textProcessing();
        expect(component.response2).toBe(0);
    });

    // For list of N frequent words

    it('should check first "N" frequent words in given text', () => {

        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.mostFrequentN = 3;
        component.textProcessing();
        component.calculateMostFrequentNWords(component.givenText, component.mostFrequentN);

        expect(component.response3.length).toBe(3);

        expect(component.response3[0].frequency).toBe(3);
        expect(component.response3[0].word).toBe('the');

        expect(component.response3[1].frequency).toBe(1);
        expect(component.response3[1].word).toBe('am');

        expect(component.response3[2].frequency).toBe(1);
        expect(component.response3[2].word).toBe('checking');
    });

    it('should check first "0" frequent words in given text', () => {

        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.mostFrequentN = 0;
        component.textProcessing();
        component.calculateMostFrequentNWords(component.givenText, component.mostFrequentN);

        expect(component.response3.length).toBe(0);
        expect(component.response3).toEqual([]);
    });

    it('should check first "NaN" frequent words in given text', () => {

        component.givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        component.mostFrequentN = NaN;
        component.textProcessing();
        component.calculateMostFrequentNWords(component.givenText, component.mostFrequentN);

        expect(component.response3.length).toBe(0);
        expect(component.response3).toEqual([]);
    });
});
