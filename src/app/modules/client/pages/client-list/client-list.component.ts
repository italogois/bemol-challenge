import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';
import { ClientTableComponent } from '../../components/client-table/client-table.component';
import { Client } from '../../../../models/client.model';
import { ClientService } from '../../../../services/ClientService.service';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [CommonModule, ClientTableComponent, HttpClientModule, MatButtonModule, RouterModule],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  clientsList$: Observable<Client[]>;

  editEvent(id: Client['id']) {
    this.router.navigate(['client', 'edit', id]);
  }

  detailEvent(id: Client['id']) {
    this.router.navigate(['client', 'detail', id]);
  }

  deleteClient(id: Client['id']) {
    this.clientService.delete(id).subscribe(() => {
      this.getAllClients();
    });
  }

  private getAllClients() {
    this.clientsList$ = this.clientService.getAll();
  }

  ngOnInit(): void {
    this.getAllClients();
  }
}
