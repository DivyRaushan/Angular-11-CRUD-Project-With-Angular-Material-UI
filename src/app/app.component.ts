import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';
  data: any
  displayedColumns: string[] = ['productName', 'productType', 'productDate', 'productFreshness', 'productPrice', 'productComments', 'actions'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;


  constructor(public dialog: MatDialog, private api: ApiService) {

  }
  ngOnInit() {
    this.getAllProduct();
  }

  getAllProduct() {
    this.api.getData()
      .subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator
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


  openDialog() {
    this.dialog.open(DialogComponent, {

      width: '30%',
      height: '500px'

    }).afterClosed().subscribe({
      next: (value) => {
        if (value === "added") {
          this.getAllProduct();
        }
      }
    })
  }

}