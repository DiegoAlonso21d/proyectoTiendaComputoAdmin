import { Component } from '@angular/core';
import { CargarScriptsService } from 'src/app/cargar-scripts.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent {
  isOpen = false;

  constructor(private utilsService: UtilsService) {
    this.utilsService.sidebarState$.subscribe((state) => {
      this.isOpen = state;
    });
  }
}
