import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { History } from '../models/history.model';

@Injectable({
  providedIn: 'root',
})
export class HistoryService {
  constructor(private readonly http: HttpClient) {}

  getByClientID(id: Client['id']) {
    const param = {
      clientID: id,
    };
    const httpParams = new HttpParams({ fromObject: param });

    return this.http.get<History[]>(`http://localhost:3000/history/`, { params: httpParams });
  }
}
