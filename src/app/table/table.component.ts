import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from '../services/api.service';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  title = 'AngularCrud';
  data: any
  displayedColumns: string[] = ['productName', 'productType', 'productDate', 'productFreshness', 'productPrice', 'productComments', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog, public api: ApiService) {

  }

  ngOnInit() {

    this.getAllProduct();
  }

  getAllProduct() { 
    this.api.getData()
      .subscribe({
        next: (res: any) => {
          this.api.dataSource = new MatTableDataSource(res);
          this.api.dataSource.paginator = this.paginator
          // return this.dataSource
        },
        error: (err) => {
          alert("Error while fetching the data");
        }
      })
  }

  editProduct(element: any) {
    this.dialog.open(DialogComponent, {

      width: '30%',
      height: '500px',
      data: element

    }).afterClosed().subscribe({
      next: (value) => {
        if (value === "updated") {
          this.getAllProduct();
        }
      }
    });

  }

  deleteProduct(element: number) {
    this.api.deleteData(element)
      .subscribe(
        (res) => {
          alert("Product deleted successfully")
          this.getAllProduct();
        }
      )
  }

}
