import { Component, OnInit } from '@angular/core';
import { TextProcessService } from '@services/text-process.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    // totalNumberOfWords!: number;

    constructor(private textProcessService: TextProcessService) { }

    ngOnInit(): void {
    }
    public get displayTotal(): number {
        return this.textProcessService.totalNumberOfWords;
    }
}
