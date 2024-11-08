import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { ClientFormComponent } from '../../components/client-form/client-form.component';
import { ClientService } from '../../../../services/ClientService.service';
import { Client } from '../../../../models/client.model';
import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-client-edit',
  standalone: true,
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './client-edit.component.html',
  styleUrl: './client-edit.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientEditComponent implements OnInit {
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);
  private readonly activatedRoute = inject(ActivatedRoute);

  client$: Observable<Client>;
  clientID: string;

  private getClient() {
    this.clientID = this.activatedRoute.snapshot.params['id'];

    this.client$ = this.clientService.getById(this.clientID);
  }

  edit(client: Client) {
    this.clientService.update(this.clientID, client).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Cliente atualizado com sucesso',
        timer: 2000,
      }).then(() => {
        this.router.navigate(['client']);
      });
    });
  }

  ngOnInit(): void {
    this.getClient();
  }
}
