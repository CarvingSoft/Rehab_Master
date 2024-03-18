import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BtSessionData } from '../../../models/btSessionData';
import { TherapistService } from '../../../therapist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-view-bt-session-data',
  templateUrl: './view-bt-session-data.component.html',
  styleUrls: ['./view-bt-session-data.component.scss']
})
export class ViewBtSessionDataComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private therapistService: TherapistService) { }

  ngOnDestroy(): void {
    this.infoSubscription.unsubscribe()
  }

  infoSubscription: Subscription;
  ngOnInit(): void {
    this.infoSubscription = this.getInfo()
  }

  btSessionData : BtSessionData[]=[];
  btData : BtSessionData;
  getInfo(){
    return this.therapistService.getBtSessionDataId(this.route.snapshot.params['id']).subscribe((bt)=>{
      this.btData = bt
    })
  }

}
