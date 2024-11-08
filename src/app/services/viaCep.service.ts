import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ViaCepService {
  constructor(private readonly http: HttpClient) {}

  getAddress(cep: string) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(`https://viacep.com.br/ws/${cep}/json/`);
  }
}
