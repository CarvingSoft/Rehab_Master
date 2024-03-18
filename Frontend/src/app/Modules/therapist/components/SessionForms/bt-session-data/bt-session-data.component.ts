import { SessionMaster } from '../../../models/sessionMaster';
import { Wallet } from '../../../../admin/models/wallet';
import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Session } from 'src/app/Modules/admin/models/session';
import { BtSessionData } from '../../../models/btSessionData';
import { TherapistService } from '../../../therapist.service';
import { Subscription } from 'rxjs';
import { CompensationSession } from 'src/app/Modules/admin/models/compensation';
import { LeaveSession } from 'src/app/Modules/admin/models/leaveSession';
import { User } from 'src/app/Modules/admin/models/user';

@Component({
  selector: 'app-bt-session-data',
  templateUrl: './bt-session-data.component.html',
  styleUrls: ['./bt-session-data.component.scss']
})
export class BtSessionDataComponent implements OnInit, OnDestroy {

  constructor(private fb : FormBuilder, private route : ActivatedRoute, private therapistService : TherapistService, private _snackBar: MatSnackBar,
    private adminService : AdminService, private router: Router) { }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any): void {
      this.onSubmit();
    }

  btSessionForm = this.fb.group({
    session_master_id : this.route.snapshot.params['id'],
    sitting : [''],
    remarksSitting : [''],
    eyeContact : [''],
    remarksEyeContact : [''],
    attention : [''],
    remarksAttention : [''],
    mood : [''],
    remarksMood : [''],
    activities : [''],
    remarksActivities : [''],
    comprehensionInstructions : [''],
    remarksComprehensionInstructions : [''],
    responseInstructions : [''],
    remarksResponseInstructions :[''],
    waiting : [''],
    remarksWaiting : [''],
    compliance : [''],
    remarksCompliance : [''],
    behaviour : [''],
    remarksBehaviour : [''],
    communication : [''],
    remarksCommunication :[''],
    throwThings : [''],
    remarksThrowThings : [''],
    tearsThings : [''],
    remarksTearsThings : [''],
    angryProne : [''],
    remarksAngryProne : [''],
    selfInjurious : [''],
    remarksSelfInjurious : [''],
    repetitive : [''],
    remarksRepetitive : [''],
    tantrums : [''],
    remarksTantrums : [''],
    climbsFurniture : [''],
    remarksClimbsFurniture : [''],
    disruptiveBehaviour : [''],
    remarksDisruptiveBehaviour : ['']
    });

  walletSubscription: Subscription;
  ngOnInit(): void {
    this.getWallet();
    this.getUser();
  }

  submitButtonState = false;
  async ngOnDestroy(){
    if(this.submitButtonState == false){
       this.onSubmit();
    }
    if(this.submitS){
      this.submitS.unsubscribe();
    }
    if(this.cashOutS){
      this.cashOutS.unsubscribe();
    }
    if(this.feeS){
      this.feeS.unsubscribe();
    }
    this.sessionS.unsubscribe();
    this.sessionMS.unsubscribe();
    this.walletS.unsubscribe();
    this.submit?.unsubscribe();
    this.adminS?.unsubscribe ();
  }

  keys =[
    {name:'Poor',value:'1'},
    {name:'Some Attempt',value:'2'},
    {name:'Emerging',value:'3'},
    {name:'Good',value:'4'},
    {name:'Excellent',value:'5'}
  ]

  grades =[
    {name:'Never',value:'1'},
    {name:'Rarely',value:'2'},
    {name:'Occasional',value:'3'},
    {name:'Sometimes',value:'4'},
    {name:'Always',value:'5'}
  ]

  session : any[] = [];
  clientId : any
  wallet : Wallet
  sessionMaster : any
  sessionS: Subscription;
  sessionMS: Subscription;
  walletS: Subscription;
  getWallet(){
    this.sessionS = this.adminService.getSession().
    pipe(map((session:Session[])=>session.filter((x)=>x._id==this.route.snapshot.params['sessionId']))).
    subscribe((y)=>{
      if(y.length === 0){
        this.sessionS = this.adminService.getLeaveSession().
        pipe(map((session:LeaveSession[])=>session.filter((x)=>x._id==this.route.snapshot.params['sessionId']))).
        subscribe((y)=>{
          if(y.length === 0){
            this.sessionS = this.therapistService.getCompensation().
            pipe(map((session:CompensationSession[])=>session.filter((x)=>x._id==this.route.snapshot.params['sessionId']))).
            subscribe((y)=>{
              this.session = y
              this.clientId = this.session[0].clientName._id
            })
          }else{
            this.session = y
            this.clientId = this.session[0].clientName._id
          }
        })
      }else{
        this.session = y
        this.clientId = this.session[0].clientName._id
      }

      //get wallet
      this.walletS = this.adminService.getWalletByClient(this.clientId).subscribe((res)=>{
        this.wallet = res

        //get session master
        this.sessionMS = this.therapistService.getSessionMasterbyId(this.route.snapshot.params['id']).subscribe((res)=>{
          this.sessionMaster = res
        })
      })
    })
  }

  user : any
  therapist : User[] = []
  currentUser : any
  userId : String
  adminS: Subscription;
  getUser(){
    let token = localStorage.getItem('token')
      this.user = JSON.parse(token)?.username

      this.adminS = this.adminService.getTherapist().subscribe((res)=>{
        this.therapist = res

        this.currentUser = this.therapist.find(x => x.name == this.user)

        if(this.currentUser){
          this.userId = this.currentUser._id
        }
      })
  }

  bt: any;
  btData: BtSessionData[] = [];
  submitS: Subscription;
  cashOutS: Subscription;
  submit: Subscription;
  onSubmit(){
    this.submitButtonState = true;
    this.therapistService.saveBtForm(this.btSessionForm.getRawValue()).subscribe((res)=>{
      this.bt = res;
      this.btData = this.bt
      this._snackBar.open("Submitted","" ,{duration:3000})

      if(this.wallet){
         //check wallet is enough for fees
        let walletAmount : any
        let sessionFee : any
        let concession : any
        let amountPayed : any

        walletAmount = this.wallet.balanceAmount
        sessionFee = this.sessionMaster.sessionFee
        concession = this.sessionMaster.concession
        amountPayed = sessionFee - concession

        if(walletAmount >= amountPayed){
          let data = {
            amount : amountPayed,
            sessionMasterId : this.route.snapshot.params['id']
          }
          this.cashOutS = this.adminService.addCashOut(this.clientId, data).subscribe((res)=>{
            let data = {feeStatus : true}
            let feeData = {
              sessionMasterId: this.route.snapshot.params['id'],
              sessionType: this.sessionMaster.sessionStatus,
              recievedBy: this.userId,
              collectedAmount: amountPayed,
              paymentMode: 'Wallet',
              remarks: 'Deducted from Wallet',
              amountToBeCollected: amountPayed,
              dateAndTime: this.sessionMaster.date
            }
            this.submit = this.adminService.payFees(feeData).subscribe((res)=>{
              this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.bt.session_master_id)
              // this.updateFeeStatus(data,this.route.snapshot.params['id'])
            })
            },(error=>{
              console.log(error)
              alert(error)
            }))
        }else{
          this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.bt.session_master_id)
        }
      }else {
        this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.bt.session_master_id)
      }
      this.clearControls()
   },(error=>{
    console.log(error)
    alert(error.error.message)
    }))
  }

  feeS: Subscription;
  updateFeeStatus(data : any, id : String){
    this.feeS = this.adminService.updateFeeStatus(data,id).subscribe((status)=>{

    })
  }

  clearControls(){
    this.btSessionForm.reset()
    this.btSessionForm.setErrors(null)
    Object.keys(this.btSessionForm.controls).forEach(key=>{this.btSessionForm.get(key).setErrors(null)})
  }
}


