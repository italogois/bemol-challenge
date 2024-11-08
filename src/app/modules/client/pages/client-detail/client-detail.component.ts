import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ClientFormComponent } from '../../components/client-form/client-form.component';
import { ClientService } from '../../../../services/ClientService.service';
import { Client } from '../../../../models/client.model';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import Swal from 'sweetalert2';
import { HistoryService } from '../../../../services/historyService.service';
import { History } from '../../../../models/history.model';
import { HistoryTableComponent } from '../../components/history-table/history-table.component';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, ClientFormComponent, MatTabsModule, RouterModule, MatButtonModule, HistoryTableComponent],
  templateUrl: './client-detail.component.html',
  styleUrl: './client-detail.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientDetailComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly historyService = inject(HistoryService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  clientDetails$: Observable<{ clientDetail: Client; history: History[] }>;

  deleteClient(id: Client['id']) {
    this.clientService.delete(id).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Cliente Removido com Sucesso',
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        this.router.navigate(['client']);
      });
    });
  }

  private getDetailsInfo() {
    const clientID = this.activatedRoute.snapshot.params['id'];

    this.clientDetails$ = forkJoin({
      clientDetail: this.clientService.getById(clientID),
      history: this.historyService.getByClientID(clientID),
    });
  }

  ngOnInit(): void {
    this.getDetailsInfo();
  }
}
