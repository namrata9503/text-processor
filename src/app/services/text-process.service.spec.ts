import { TestBed } from '@angular/core/testing';

import { TextProcessService } from './text-process.service';

describe('TextProcessService', () => {
    let service: TextProcessService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TextProcessService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
