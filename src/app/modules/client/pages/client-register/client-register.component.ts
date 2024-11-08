import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ClientFormComponent } from '../../components/client-form/client-form.component';
import { ClientService } from '../../../../services/ClientService.service';
import { Client } from '../../../../models/client.model';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-register',
  standalone: true,
  imports: [CommonModule, ClientFormComponent],
  templateUrl: './client-register.component.html',
  styleUrl: './client-register.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientRegisterComponent {
  private readonly clientService = inject(ClientService);
  private readonly router = inject(Router);

  register(client: Client) {
    this.clientService.create(client).subscribe(() => {
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: 'Cliente cadastrado com sucesso',
        timer: 2000,
      }).then(() => {
        this.router.navigate(['client']);
      });
    });
  }
}
