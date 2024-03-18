import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatAccordion } from '@angular/material/expansion';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { StSessionData } from '../../../models/stSessionData';
import { TherapistService } from '../../../therapist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-st-session-data',
  templateUrl: './view-st-session-data.component.html',
  styleUrls: ['./view-st-session-data.component.scss']
})
export class ViewStSessionDataComponent implements OnInit, OnDestroy {

  @ViewChild(MatAccordion) accordion: MatAccordion;

  constructor(private fb: FormBuilder ,private _http:AdminService,private _snackBar: MatSnackBar,
    private therapistService:TherapistService, private route: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.infoSubscription.unsubscribe()
  }

  infoSubscription: Subscription;
  ngOnInit(): void {
    this.infoSubscription = this.getInfo()
  }

  stSessionData : StSessionData[]=[];
  stData : StSessionData;
  getInfo(){
    return this.therapistService.getStSessionDataId(this.route.snapshot.params['id']).subscribe((st)=>{
      this.stData = st
      this.stSessionData.push(st)
    })
  }

  logRemarks(){
  }
}
