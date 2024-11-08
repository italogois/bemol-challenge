import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Client } from '../../../../models/client.model';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
  ],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientTableComponent implements AfterViewInit, OnChanges {
  @Input() clientList: Client[];
  @Output() editEvent = new EventEmitter<Client['id']>();
  @Output() deleteEvent = new EventEmitter<Client['id']>();
  @Output() detailEvent = new EventEmitter<Client['id']>();

  displayedColumns = ['nomeCompleto', 'cpf', 'telefone', 'email', 'acoes'];
  dataSource: MatTableDataSource<Client>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clientList'] && this.clientList) {
      this.dataSource = new MatTableDataSource(this.clientList);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
