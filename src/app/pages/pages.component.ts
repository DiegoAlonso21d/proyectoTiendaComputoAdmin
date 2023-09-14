import { Component } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.css'],
})
export class PagesComponent {
  isOpen = false;
  constructor(private utilsService: UtilsService) {
    this.utilsService.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }
}
