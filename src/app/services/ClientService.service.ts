import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private readonly http: HttpClient) {}

  getAll() {
    return this.http.get<Client[]>('http://localhost:3000/clients');
  }

  getById(id: Client['id']) {
    return this.http.get<Client>(`http://localhost:3000/clients/${id}`);
  }

  create(client: Client) {
    return this.http.post<Client>('http://localhost:3000/clients', client);
  }

  update(id: Client['id'], client: Client) {
    return this.http.put<Client>(`http://localhost:3000/clients/${id}`, client);
  }

  delete(id: string) {
    return this.http.delete<Client[]>(`http://localhost:3000/clients/${id}`);
  }
}
