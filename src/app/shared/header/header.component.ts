import { Component } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isOpen = false;
  constructor(private utilsService: UtilsService) {
    this.utilsService.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }

  toggleSidebar() {
    this.utilsService.toggleSidebar();
  }
}
