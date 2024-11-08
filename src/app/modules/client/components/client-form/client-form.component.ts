import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgxMaskDirective } from 'ngx-mask';
import { ViaCepService } from '../../../../services/viaCep.service';
import { distinctUntilChanged } from 'rxjs';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { Client } from '../../../../models/client.model';

@Component({
  selector: 'app-client-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    NgxMaskDirective,
    MatButtonModule,
  ],
  templateUrl: './client-form.component.html',
  styleUrl: './client-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientFormComponent implements OnInit {
  @Input() client: Client;
  @Input() isDetailPage: boolean;
  @Output() formValueEvent = new EventEmitter<Client>();

  private readonly formBuilder = inject(FormBuilder);
  private readonly viaCepService = inject(ViaCepService);

  readonly invalidErrorMesage = 'Campo Inválido';
  formClient: FormGroup;

  submitForm() {
    this.formClient.markAllAsTouched();

    if (this.formClient.invalid) return;

    this.formValueEvent.emit(this.formClient.getRawValue());
  }

  getControl(controlName: string) {
    return this.formClient.get(controlName) as FormControl;
  }

  handlerCep(event: Event) {
    const cepSize = 9;
    const eventValue = (event.target as HTMLInputElement).value;

    if (eventValue.length < cepSize) return;

    const cepWihoutMask = eventValue.replaceAll('-', '');

    this.viaCepService
      .getAddress(cepWihoutMask)
      .pipe(distinctUntilChanged())
      .subscribe((data) => {
        if (data.erro) {
          Swal.fire({
            title: 'Erro ao buscar CEP',
            text: `O CEP ${eventValue} não existe.`,
            icon: 'error',
          });

          return;
        }

        this.updateAddressControls(data);
      });
  }

  private initializeForm() {
    this.formClient = this.formBuilder.group({
      nomeCompleto: ['', [Validators.required]],
      cpf: ['', [Validators.required]],
      telefone: ['', [Validators.required]],
      dataNascimento: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      cep: ['', [Validators.required]],
      logradouro: [{ value: '', disabled: true }, [Validators.required]],
      bairro: [{ value: '', disabled: true }, [Validators.required]],
      cidade: [{ value: '', disabled: true }, [Validators.required]],
      estado: [{ value: '', disabled: true }, [Validators.required]],
      complemento: [{ value: '', disabled: true }],
    });

    this.controlsLoadValue();
  }

  private controlsLoadValue() {
    if (!this.client) return;

    this.formClient.patchValue(this.client);
    this.getControl('logradouro').enable();
    this.getControl('complemento').enable();

    if (this.client.bairro === '') {
      this.getControl('bairro').enable();
    }

    this.formClient.updateValueAndValidity();
    this.formClient.markAllAsTouched();

    if (this.isDetailPage) this.formClient.disable();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private updateAddressControls(data: any) {
    this.getControl('logradouro').setValue(data.logradouro);
    this.getControl('bairro').setValue(data.bairro);
    this.getControl('cidade').setValue(data.localidade);
    this.getControl('estado').setValue(data.uf);

    this.getControl('logradouro').enable();
    this.getControl('complemento').enable();

    if (data.bairro === '') {
      this.getControl('bairro').enable();
    }
  }

  ngOnInit(): void {
    this.initializeForm();
  }
}
