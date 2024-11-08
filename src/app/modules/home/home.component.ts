import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  template: `<div style="font-size: 30px">Bem vindo ao Bemol OmniChannel</div>`,
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  private titleService = inject(Title);
  title = '';

  ngOnInit(): void {
    this.title = this.titleService.getTitle();
  }
}
