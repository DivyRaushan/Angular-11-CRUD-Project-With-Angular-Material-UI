import { Component, OnInit } from '@angular/core';
import { DialogComponent } from './dialog/dialog.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table'
import { ApiService } from './services/api.service';
import { TableComponent } from './table/table.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'AngularCrud';
  data: any
  loginStatus = true;
  

  @ViewChild('childView')child:TableComponent;


  constructor(public dialog: MatDialog, public api: ApiService) {

    // this.api.status.subscribe((resData:boolean)=>
    // {
    //   this.loginStatus = resData
    //   console.log(this.loginStatus)
    // })

  }
  ngOnInit():void {

    // this.loginStatus = localStorage.getItem("session") ==="true"? false:true
    // this.api.status.subscribe((resData:boolean)=>
    // {
    //   this.loginStatus = resData
    //   console.log(this.loginStatus)
    // })

    // this.api.changeStatus(true)

    

    // this.api.getStatus();

    // this.api.status.subscribe((data:boolean)=>
    // {
    //   console.log(data)
    // })
  
  } 
  openDialog() {
    this.dialog.open(DialogComponent, {

      width: '30%',
      height: '500px'

    })
    // .afterClosed().subscribe({
    //   next: (value) => {
    //     if (value === "added") {
    //       this.child.getAllProduct();
    //     }
    //   }
    // })
  }

  logOutHide(){
    this.api.setStatusValue(true)
  }

  // logOut()
  // {
  //   this.api.changeStatus()
  //   this.api.getStatus()
  //   this.api.status.subscribe((data:boolean)=>
  //   {
  //     this.loginStatus=data;
  //   })
  // }

  // logoutFlag()
  // {
  //   this.api.changeFlag
  // }

}