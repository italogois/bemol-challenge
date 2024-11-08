import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  AfterViewInit,
  Component,
  ViewChild,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { History } from '../../../../models/history.model';

@Component({
  selector: 'app-history-table',
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
  templateUrl: './history-table.component.html',
  styleUrl: './history-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HistoryTableComponent implements AfterViewInit, OnChanges {
  @Input() historyList: History[];

  displayedColumns = ['nomeCanal', 'data', 'responsavel', 'iteracao'];
  dataSource: MatTableDataSource<History>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['historyList'] && this.historyList) {
      this.dataSource = new MatTableDataSource(this.historyList);
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
