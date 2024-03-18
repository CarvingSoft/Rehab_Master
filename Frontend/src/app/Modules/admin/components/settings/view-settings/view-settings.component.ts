import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EditClientStatusComponent } from '../edit-client-status/edit-client-status.component';
import { ManageFeesComponent } from '../manage-fees/manage-fees.component';
import { ManageConcessionComponent } from '../manage-concession/manage-concession.component';
import { EditSlotStatusComponent } from '../edit-slot-status/edit-slot-status.component';

@Component({
  selector: 'app-view-settings',
  templateUrl: './view-settings.component.html',
  styleUrls: ['./view-settings.component.scss']
})
export class ViewSettingsComponent implements OnInit {

  constructor(public dialog: MatDialog, private router: Router) {}

  currentUser : any
  currentUserString : any
  ngOnInit(): void {
    this.currentUserString = localStorage.getItem('token')
    this.currentUser = JSON.parse(this.currentUserString)
  }

  manageClientStatus(){
    const dialogRef = this.dialog.open(EditClientStatusComponent, {
      width: '600px',
      data: {}
    });
  }

  manageFees(){
    if(this.currentUser.md == true){
      const dialogRef = this.dialog.open(ManageFeesComponent, {
        width: '600px',
        data: {}
      });
    }
    else{
      alert("Access only for MD")
    }
  }

  manageConcession(){
    if(this.currentUser.md == true){
      const dialogRef = this.dialog.open(ManageConcessionComponent, {
        width: '600px',
        data: {}
      });
    }
    else{
      alert("Access only for MD")
    }
  }

  manageSlotStatus(){
    const dialogRef = this.dialog.open(EditSlotStatusComponent, {
      width: '600px',
      data: {}
    });
  }

  deleteClients(){
    this.router.navigateByUrl('/admin/settings/deleteclient')
  }
}


