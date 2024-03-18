import { Component, OnDestroy, OnInit, HostListener } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { Client } from 'src/app/Modules/admin/models/client';
import { Session } from 'src/app/Modules/admin/models/session';
import { SessionMaster } from '../../../models/sessionMaster';
import { StSessionData } from '../../../models/stSessionData';
import { StSkill } from '../../../models/stSkill';
import { TherapistService } from '../../../therapist.service';
import { Wallet } from 'src/app/Modules/admin/models/wallet';
import { Subscription } from 'rxjs';
import { CompensationSession } from 'src/app/Modules/admin/models/compensation';
import { LeaveSession } from 'src/app/Modules/admin/models/leaveSession';
import { User } from 'src/app/Modules/admin/models/user';

@Component({
  selector: 'app-st-session-data',
  templateUrl: './st-session-data.component.html',
  styleUrls: ['./st-session-data.component.scss']
})

export class StSessionDataComponent implements OnInit, OnDestroy {
  stSessionForm = this.fb.group({
    session_master_id : this.activatedRoute.snapshot.params['id'],
    preLinguistic : this.fb.group({
      joinAttention: '',
      imitation:'',
      remarks:''
    }),

    linguistic : this.fb.group({
      lexicalItems: '',
      advancedConcepts:'',
      syntacticStructures:'',
      pragmaticSkills:'',
      remarks:''
    }),

    communication : this.fb.group({
      functional: '',
      gestrual:'',
      aac:'',
      assistive:'',
      remarks:''
    }),

    cognition : this.fb.group({
      basicSkills: '',
      advancedSkills:'',
      remarks:''
    }),

    play : this.fb.group({
      parallel: '',
      symbolic:'',
      constructive:'',
      pretend:'',
      physical: '',
      exploratory:'',
      sensoryStimulating:'',
      associative:'',
      onlooker:'',
      remarks:''
    }),

    articulation : this.fb.group({
      auditoryDescrimination: '',
      phonology:'',
      placement:'',
      generalization:'',
      wordLevel: '',
      phraseLevel:'',
      remarks:''
    }),

    oroMotor : this.fb.group({
      opt: '',
      hypoSensitive:'',
      mixedSensitive:'',
      hyperSensitive:'',
      sucking:'',
      blowing: '',
      chewing:'',
      remarks:''
    }),

    fluency : this.fb.group({
      fluencyShaping: '',
      fluencyModification:'',
      generalization:'',
      maintenance:'',
      remarks:''
    }),

    voice : this.fb.group({
      respiratory: '',
      resonance:'',
      pitch:'',
      loudness:'',
      relaxationExercises: '',
      strengtheningExercises:'',
      remarks:''
    })
  })

  stDataForm = this.fb.group({
    id : '',
    stDatas : this.fb.array([])
  })

  constructor(private fb: FormBuilder , private _snackBar: MatSnackBar, private therapistService: TherapistService,
    private activatedRoute: ActivatedRoute, private adminService : AdminService, private router: Router) { }

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any): void {
      this.onSubmit();
    }

  ngOnInit(): void {
    this.getUser()
    this.getWallet()
  }

  submitButtonState = false;
  async ngOnDestroy(){
    if(this.submitButtonState == false){
      await this.onSubmit();
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
    this.adminS?.unsubscribe();
  }

  keys =[
    {name:'Poor',value:'1'},
    {name:'Some Attempt',value:'2'},
    {name:'Emerging',value:'3'},
    {name:'Good',value:'4'},
    {name:'Excellent',value:'5'}
  ]

  oroKeys =[
    {name : 'Yes'},
    {name : 'No'}
  ]

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

  session : any[] = [];
  clientId : any
  wallet : Wallet
  sessionMaster : any
  sessionS: Subscription;
  sessionMS: Subscription;
  walletS: Subscription;
  getWallet(){
    this.sessionS = this.adminService.getSession().
    pipe(map((session:Session[])=>session.filter((x)=>x._id==this.activatedRoute.snapshot.params['sessionId']))).
    subscribe((y)=>{
      if(y.length === 0){
        this.sessionS = this.adminService.getLeaveSession().
        pipe(map((session:LeaveSession[])=>session.filter((x)=>x._id==this.activatedRoute.snapshot.params['sessionId']))).
        subscribe((y)=>{
          if(y.length === 0){
            this.sessionS = this.therapistService.getCompensation().
            pipe(map((session:CompensationSession[])=>session.filter((x)=>x._id==this.activatedRoute.snapshot.params['sessionId']))).
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
        this.sessionMS = this.therapistService.getSessionMasterbyId(this.activatedRoute.snapshot.params['id']).subscribe((res)=>{
          this.sessionMaster = res
        })
      })
    })
  }

  st: any;
  stData: StSessionData[] = [];
  submitS: Subscription;
  cashOutS: Subscription;
  submit: Subscription;
  onSubmit(){
    this.submitButtonState = true;
    this.submitS = this.therapistService.saveStForm(this.stSessionForm.getRawValue()).subscribe((res)=>{
      this.st = res;
      this.stData = this.st


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
            sessionMasterId : this.activatedRoute.snapshot.params['id']
          }
          this.cashOutS = this.adminService.addCashOut(this.clientId, data).subscribe((res)=>{
            let feeData = {
              sessionMasterId: this.activatedRoute.snapshot.params['id'],
              sessionType: this.sessionMaster.sessionStatus,
              recievedBy: this.userId,
              collectedAmount: amountPayed,
              paymentMode: 'Wallet',
              remarks: 'Deducted from Wallet',
              amountToBeCollected: amountPayed,
              dateAndTime: this.sessionMaster.date
            }
            this.submit = this.adminService.payFees(feeData).subscribe((res)=>{
              this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.st.session_master_id)
              // this.updateFeeStatus(data,this.route.snapshot.params['id'])
            })
            },(error=>{
              console.log(error)
              alert(error)
            }))
        }else{
          this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.st.session_master_id)
          this._snackBar.open("Submitted","" ,{duration:3000})
        }
      }else{
        this.router.navigateByUrl('/therapist/viewcompletedsessions/addtask/' + this.st.session_master_id)
      }
      this.clearControls()
   },(error=>{
    alert(error)
    }))
  }

  feeS: Subscription;
  updateFeeStatus(data : any, id : String){
    this.feeS = this.adminService.updateFeeStatus(data,id).subscribe((status)=>{
    })
  }

  clearControls(){
    this.stSessionForm.reset()
    this.stSessionForm.setErrors(null)
    Object.keys(this.stSessionForm.controls).forEach(key=>{this.stSessionForm.get(key).setErrors(null)})
  }

}

