import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DeleteDialogueComponent } from 'src/app/Modules/admin/components/delete-dialogue/delete-dialogue.component';
import { TherapistService } from '../../../therapist.service';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-end-session-dialogue',
  templateUrl: './end-session-dialogue.component.html',
  styleUrls: ['./end-session-dialogue.component.scss']
})
export class EndSessionDialogueComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private fb: FormBuilder, private therapistService : TherapistService,
  private adminService : AdminService, private _snackBar: MatSnackBar, private datePipe: DatePipe) { }

  ngOnDestroy() {
    this.endSub?.unsubscribe();
    this.slotSub?.unsubscribe();
    this.clientSub?.unsubscribe();
  }

  endSessionForm = this.fb.group({
    remarks : ['']
  })

  ngOnInit(): void {
  }

  endSub: Subscription;
  slotSub: Subscription;
  sessionSub: Subscription;
  endSession(){
    this.adminService.endSession(this.data.clientId, this.endSessionForm.getRawValue()).subscribe(data => {
    });
    // this.therapistService.updateSessionStatus(this.data.sessionId, this.endSessionForm.getRawValue()).subscribe((res)=>{
    //   console.log(res);

    //   this.endSub = this.adminService.getSessionByClientId(this.data.clientId).subscribe((res)=>{
    //     console.log(res);

    //     for(let i = 0; i < res.length; i++){
    //       let sessionId = res[i]._id;
    //       console.log(sessionId)
    //       this.sessionSub = this.therapistService.updateSessionStatus(sessionId, this.endSessionForm.getRawValue()).subscribe(result=>{
    //         console.log(result);
    //         let slotId = result.slotName;
    //         const data = {
    //           slotStatus : true
    //         }
    //         this.slotSub = this.adminService.updateSlotStatus(data, slotId).subscribe((x)=>{
    //           console.log(x);
    //           let clientData = {status : 'DS'}
    //           this.updateClientStatus(clientData, this.data.clientId)

    //           this._snackBar.open("Session Completed","Dismiss", {duration:3000})
    //         })
    //       })
    //     }
    //   })
    // })
  }

  clientSub: Subscription;
  updateClientStatus(data : any, id : String){
    this.clientSub = this.adminService.updateClientStatus(data,id).subscribe((res)=>{
    })
  }

}
