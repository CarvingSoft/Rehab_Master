import { Ideation } from './../../../../therapist/models/otSessionData';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AdminService } from '../../../admin.service';
import { DialogRef } from '@angular/cdk/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA)public data: any, private adminService: AdminService,
  private dialogRef: DialogRef, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getClient()
  }

  userName: String;
  password: string;
  getClient(){
    this.adminService.getClientInfo(this.data.id).subscribe(data => {
      this.userName = data.emergencyNumber;
      const year = data.dateOfBirth.toString();
      const yearSubstring = year.substring(0, 4);
      this.password = data.firstName + yearSubstring;
    })
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onSubmit(){
      let data = {
        clientId: this.data.id,
        phoneNumber: this.userName,
        password: this.password
      }
      this.adminService.activateClientLogin(data).subscribe(res=>{
        this._snackBar.open("Login Ativated...","" ,{duration:3000})
      })
  }

}
