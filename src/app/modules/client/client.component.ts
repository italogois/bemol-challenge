import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientComponent {}
