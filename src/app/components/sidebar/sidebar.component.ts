import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatIconModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidebarComponent {
  canShowMenu = false;

  readonly menuList = [
    {
      name: 'Início',
      path: 'home',
    },
    {
      name: 'Cliente',
      path: 'client',
    },
  ];

  toggleMobileMenu() {
    this.canShowMenu = !this.canShowMenu;
  }

  closeMobileMenu() {
    this.canShowMenu = false;
  }
}
