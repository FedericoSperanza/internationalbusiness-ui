import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { ApiService } from '../../http/api.service';

export interface TransactionItem {
  index: number;
  sku: string;
  amount: number;
  currency: string;
}

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css'],
})
export class DataTableComponent implements OnInit {
  tableDisplayColumns = ['index', 'sku', 'amount', 'currency'];
  pageSizes: number[] = [10, 20, 50, 100];
  displayedColumns: string[] | undefined;

  tableDataSource = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    public dataService: DataService,
    private apiService: ApiService
  ) {}

  async ngOnInit() {
    this.dataService.getSkuData().subscribe(async (skuData) => {
      this.apiService.getTableData(skuData).subscribe((result) => {
        if (result) {
          let restable: any = result;
          if (restable.data.transactionList){
            this.tableDataSource = new MatTableDataSource(
              restable.data.transactionList
            );
            this.tableDataSource.paginator = this.paginator;
          }else{
          }       
        }
      });
    });
  }

  AfterViewInit() {
    this.tableDataSource.paginator = this.paginator;
  }
}
