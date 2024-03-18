import { Component, OnInit, OnDestroy } from '@angular/core';
import { AdminService } from '../../admin.service';
import { Category } from '../../models/category';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/Modules/auth/auth.service';
import { FormsModule, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Slot } from '../../models/slot';
import { User } from '../../models/user';
import { Room } from '../../models/room';
import { Observable, Subscription, shareReplay } from 'rxjs';
import { Session } from '../../models/session';
import { Client } from '../../models/client';
import { DatePipe } from '@angular/common';
import { Assessment } from '../../models/assessment';
import { Leaves } from '../../models/leaves';
import { LeaveSession } from '../../models/leaveSession';


interface token{
  username:String,
  role:String,
  token:String
}

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})


export class AdminHomeComponent implements OnInit,OnDestroy {

  datePipe = new DatePipe('en-US')
  weekDay : String;
  date : any;
  constructor(private fb: FormBuilder ,private _http:AdminService,private _snackBar: MatSnackBar,
    public authService: AuthService) {
    let day = new Date().toLocaleString('default',{weekday:'long'})
    this.weekDay = day
    this.date = this.datePipe.transform(new Date(), 'yyyy-MM-dd')
  }

  ngOnDestroy(): void {
    this.slotSubscription.unsubscribe()
    this.roomSubscription.unsubscribe()
    this.sessionSubscription.unsubscribe()
    this.assessmentSubscription.unsubscribe()
    this.leaveSubscription.unsubscribe()
    this.leaveSessionSubscription.unsubscribe()
  }

  categoryService$ : Observable<Category[]>
  therapistService$ : Observable<User[]>
  slotSubscription: Subscription;
  roomSubscription: Subscription;
  sessionSubscription: Subscription;
  clientSubscription: Subscription;
  assessmentSubscription: Subscription;
  leaveSubscription: Subscription;
  leaveSessionSubscription: Subscription;
  ngOnInit(): void {
    this.slotSubscription = this.getSlots();
    this.roomSubscription = this.getRooms();
    this.sessionSubscription = this.getSessions()
    this.clientSubscription = this.getClients()
    this.assessmentSubscription = this.getAssessments()
    this.leaveSubscription = this.getLeaves()
    this.leaveSessionSubscription = this.getLeaveSessions()

    this.categoryService$ = this._http.getCategory()
    this.therapistService$ = this._http.getTherapist()
  }

  slots : Slot []=[];
  freeSlots : number
  getSlots(){
    return this._http.getSlot().subscribe((s)=>{
      this.slots = s;
      this.freeSlots = this.slots.filter(x=> x.slotStatus == true && x.weekDay == this.weekDay).length

      this.slots.sort((a, b) => {
        // Compare the days first
        const dayComparison = a.weekDay.localeCompare(b.weekDay);

        if (dayComparison === 0) {
          // If the days are the same, compare the times
          return a.startTime.localeCompare(b.startTime);
        }

        return dayComparison;
      });
    })
  }

  selectSlots : Slot[]= [];
  catStatus = false;
  getSlotByCat(id:any){
   this.selectSlots = this.slots.filter(x=>x.therapyCategory.abbreviation==id)
   this.catStatus = true;
  }

  rooms : Room [] = []
  getRooms(){
    return this._http.getRoom().subscribe((room)=>{
      this.rooms = room
    })
  }

  finalSlots : Slot[] = []
  getSlotByRoom(id){
    this.finalSlots = this.selectSlots.filter(x=>x.roomName.roomName == id)

  }

  slotSession: any
  getSessionBySlot(id){
    return this.slotSession = this.session.filter(x=> x.slotName._id == id).map(x=>x.clientName.firstName)
  }

  session : Session[] = [];
  sessionNumber : number
  getSessions(){
    return this._http.getSession().subscribe((session)=>{
      this.session = session.filter(x=>x.status === false)
      this.sessionNumber = this.session.filter(x=>x.slotName.weekDay == this.weekDay).length
    })
  }

  userStatus = false
  selectSession : Session[] = [];
  getSessionByTherapist(id){
    this.selectSession = this.session.filter(x=>x.therapistName.name == id )
    this.userStatus = true
  }

  weekDays =[
    {name: 'Sunday', abbreviation: 'SUN'},
    {name: 'Monday', abbreviation: 'MON'},
    {name: 'Tuesday', abbreviation: 'TUE'},
    {name: 'Wednesday', abbreviation: 'WED'},
    {name: 'Thursday', abbreviation: 'THU'},
    {name: 'Friday', abbreviation: 'FRI'},
    {name: 'Saturday', abbreviation: 'SAT'},
  ];

  finalSession : Session[] = [];
  day: string
  getSessionByday(day){
    this.day = day;
    this.finalSession = this.selectSession.filter(x=> x.slotName.weekDay == day)
  }

  //tiles
  clientNo : Number
  getClients(){
    return this._http.getClients().subscribe((res)=>{
      this.clientNo =(res.filter(x=>x.status == 'WL')).length
    })
  }

  assessment : Assessment[] = [];
  assessmentNumber : number
  getAssessments(){
    return this._http.getAssessmentSession().subscribe((session)=>{
      this.assessment = session

      this.assessmentNumber = this.assessment.filter(x=>this.datePipe.transform(x.assessmentDate, 'yyyy-MM-dd') == this.date).length
    })
  }

  leaves : Leaves[] = [];
  leaveNumber : number;
  getLeaves(){
    return this._http.getLeave().subscribe((session)=>{
      this.leaves = session
      this.leaveNumber = this.leaves.filter(x=>{
        return (
          this.datePipe.transform(x.fromDate, 'yyyy-MM-dd') <= this.date &&
          this.datePipe.transform(x.toDate, 'yyyy-MM-dd') >= this.date
        );
      }).length
    })
  }

  leaveSessions : LeaveSession[] = [];
  leaveSessionNumber : number
  getLeaveSessions(){
    return this._http.getLeaveSession().subscribe((session)=>{
      this.leaveSessions = session
      this.leaveSessionNumber = this.leaveSessions.filter(x=>this.datePipe.transform(x.assessmentDate, 'yyyy-MM-dd') == this.date).length
    })
  }

}
