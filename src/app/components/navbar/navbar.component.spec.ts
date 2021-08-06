import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextProcessorComponent } from '@components/text-processor/text-processor.component';
import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let textComponent: TextProcessorComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let fixture1: ComponentFixture<TextProcessorComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [NavbarComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(NavbarComponent);
        fixture1 = TestBed.createComponent(TextProcessorComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

        textComponent = fixture1.componentInstance;
        fixture1.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should be able to show total of words in given text', () => {
        textComponent.givenText = 'This$is 1the@text~which*(will75848give#$the total  words<>,./of!@#$given text.';
        textComponent.textProcessing();
        expect(component.displayTotal).toBe(13);
    });
});
