import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { TextProcessService } from './text-process.service';

describe('TextProcessService', () => {
    let http: HttpTestingController;
    let service: TextProcessService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [{ provide: service, useClass: TextProcessService }],
            imports: [HttpClientTestingModule, FormsModule],

        });
        service = TestBed.inject(TextProcessService);
        http = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        http.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should identify and sort the words from given text', () => {
        const givenText = 'This@is the&unit$testing,I1am)CheCking-the~frequency<of/>THE+word';
        service.wordSeparator(givenText);
        // eslint-disable-next-line max-len
        expect(service.wordSeparator(givenText)).toEqual(['am', 'checking', 'frequency', 'i', 'is', 'of', 'testing', 'the', 'the', 'the', 'this', 'unit', 'word']);
        expect(service.totalNumberOfWords).toBe(13);
    });

    it('shoud be able to ignore Non Alphabetic word from given text', () => {
        const givenText = '#@%& *() ,.~1?><:"{}';
        service.wordSeparator(givenText);
        expect(service.wordSeparator(givenText)).toEqual([]);
        expect(service.totalNumberOfWords).toBe(0);
    });

    it('Should be able to process empty given text', () => {
        const givenText = '    ';
        service.wordSeparator(givenText);
        expect(service.wordSeparator(givenText)).toEqual([]);
        expect(service.totalNumberOfWords).toBe(0);
    });
});
