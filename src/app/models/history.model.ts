import { Client } from './client.model';

export interface History {
  clientID: Client['id'];
  id: string;
  nomeCanal: string;
  data: string;
  responsavel: string;
  iteracao: string;
}
