import { Injectable, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit {

  public status = new Subject();
  statusValue = true;
  dataSource!: MatTableDataSource<any>; 

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private http:HttpClient) {

    
   }

   ngOnInit(): void {

    this.productData();
    console.log(this.dataSource)

   }


  changeStatus(loginFlag)
  {
    this.status.next(loginFlag);
  }

  postData(data:any)
  {
    return this.http.post<any>("http://localhost:3000/posts",data)
  }

  getData()
  {
    return this.http.get<any>("http://localhost:3000/posts")
  }

  putData(data:any, id:number)
  {
    return this.http.put<any>("http://localhost:3000/posts/"+id, data)
  }

  deleteData(id:number)
  {
    return this.http.delete<any>("http://localhost:3000/posts/"+id)
  }

  postSignUpData(data:any)
  {
    return this.http.post<any>("http://localhost:3000/profile", data)
  }

  getSignUpData()
  {
    return this.http.get<any>("http://localhost:3000/profile")
  }

  getStatusValue()
  {
    return this.statusValue;
  }

  setStatusValue(data:boolean)
  {
    this.statusValue=data;
  }

  productData() { 
    this.getData()
      .subscribe({
        next: (res: any) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator
          // return this.dataSource
        },
        error: (err) => {
          alert("Error while fetching the data");
        }
      })
  }
}
