import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  fG !: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder, private api: ApiService, public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData: any) { }
  productCondition: string[] = ["Brand New", "Second Hand", "Refurbished"];

  ngOnInit(): void {

    this.fG = this.formBuilder.group({

      productName: ['', Validators.required],
      productType: ['', Validators.required],
      productDate: ['', Validators.required],
      productFreshness: [''],
      productPrice: ['', Validators.required],
      productComments: ['']
    })

    if (this.editData) {
      this.actionBtn = "Update"

      this.fG.controls['productName'].setValue(this.editData.productName)
      this.fG.controls['productType'].setValue(this.editData.productType)
      this.fG.controls['productDate'].setValue(this.editData.productDate)
      this.fG.controls['productFreshness'].setValue(this.editData.productFreshness)
      this.fG.controls['productPrice'].setValue(this.editData.productPrice)
      this.fG.controls['productComments'].setValue(this.editData.productComments)
    }
  }
  updateProduct() {
    this.api.putData(this.fG.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Product Updated Successfully")
          this.fG.reset();
          this.dialogRef.close('updated')
        },
        error: (err) => {
          alert("Error while updating the product")
        }
      })
  }
  addProduct() {
    if (!this.editData) {
      if (this.fG.valid) {

        this.api.postData(this.fG.value)
          .subscribe({
            next: (res) => {
              alert("Product added successfully")
              this.fG.reset();
              this.dialogRef.close("added");
              this.api.productData()

            },
            error: () => {
              console.log("Error while saving the product")
            }
          })
      }

    }
    else {
      this.updateProduct();
    }



  }
}
