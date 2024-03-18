import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../admin.service';
import { Client } from '../../../models/client';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.scss']
})
export class AddClientComponent implements OnInit {
  ngOnDestroy(){
    if(this.submit){
      this.submit.unsubscribe();
    }
    if(this.medicalSub){
      this.medicalSub.unsubscribe();
    }
    if(this.schoolSub){
      this.schoolSub.unsubscribe();
    }
    if(this.routineSub){
      this.routineSub.unsubscribe();
    }
  }

  constructor(private fb: FormBuilder, private adminService : AdminService, private _snackBar: MatSnackBar) { }

  personalForm = this.fb.group({
    firstName:['', Validators.required],
    emergencyNumber:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email:['',[Validators.required,Validators.email]],
    dateOfBirth: ['', Validators.required],
    gender: ['', Validators.required],
    nationality: ['', Validators.required],
    homeLanguage: ['', Validators.required],
    familyType:['', Validators.required],
    familyMembers:['',[Validators.required]],
    referrerDetails:[''],
    reason:['', Validators.required],
    fatherName:['', Validators.required],
    fatherOccupation:['', Validators.required],
    fatherMobile:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    motherName:['', Validators.required],
    motherOccupation:['', Validators.required],
    motherMobile:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    annualIncome:[''],
    siblingsDetails:[''],
    address1:['', Validators.required],
    address2:[''],
    pincode:['',[Validators.required, Validators.pattern("^()?[0-9]{6}$")]],
    preferredTiming:[''],
    remarks: ['']
  });

  medicalForm = this.fb.group({
    clientid : '',
    pregnancy: [''],
    typeOfDelivery: [''],
    alcohol: [false],
    smoking: [false],
    medications : [''],
    pregnancyComplications: [''],
    pregnancyType : [''],
    prematureMonths: [''],
    babyCry: [false],
    feedingProblem: [false],
    sleepProblem: [false],
    birthWeight: [''],
    birthCompilcation: [''],
    importantIllness : [''],
    medicalCondition : [''],
    consanguineousMarriageHistory : [''],
    history : [''],
    remarksVision : [''],
    eyeTest : [false],
    useGlass : [false],
    eyeProblem : [false],
    hearingTest : [false],
    remarksHearing : [''],
    hearingAid : [false],
    earProblem : [false],
    investigationConducted : [''],
    currentMedication : [''],
    previoustMedication : [''],
    allergies : [''],
    actualTherapies : [''],
    previousTherapies : [''],
    headRaise : [''],
    rollOver : [''],
    independentSitting : [''],
    crawled : [''],
    pulledToStand : [''],
    independentStanding :[''],
    walking : [''],
    spoon : [''],
    babbling : [''],
    saidFirstWords : [''],
    presentLanguage : [''],
    fingerFeeding:[''],
    dress:[''],
    cloudinary_id:'',
    file_url:''
  });

  schoolForm = this.fb.group({
    clientid : '',
    schoolNameAndAddress:[''],
    grade:[''],
    teacherNameDetails:[''],
    previousSchool:[''],
    generalBehaviour:[''],
    teacherNoted:[''],
    getAlongWithOthers:[''],
    mainSupport:[''],
    screenTime:[''],
    playInterest:['']
  });

  routineForm = this.fb.group({
    clientid :'',
    feedAge:[''],
    goodAppetitie:[''],
    messyEater:[''],
    foodPreference:[''],
    tasteAndTexture:[''],
    ageAppropriate:[''],
    canDoUpButtons:[''],
    canPutOnSocks:[''],
    canPutOnShoes:[''],
    toiletTrained:[''],
    dayAndNight:[''],
    accidents:[''],
    toiletPaperUse:[''],
    managingClothing:[''],
    washingHands:[''],
    bathingAndBrushing:[''],
    typicalNightSleep:[''],
    timeOfSleep:[''],
    remarksSleep:[''],
    typicalWakeup:[''],
    timeOfWakeup:[''],
    remarksWakeUp:[''],
    homework:[''],
    remarksHomework:[''],
    routineStrategies:[''],
    difficultSituation:[''],
    remarksChildBehaviour :[''],
    howYouKnowAboutUs:[''],
    agreement:false
  });


  ngOnInit(): void {
  }

  timing =[
    {time: 'Morning'},
    {time: 'Evening'},
    {time: 'Anytime'}
  ];

  genders =[
    {name: 'Male'},
    {name: 'Female'}
  ];

  languages = [
    {name: 'Malayalam'},
    {name: 'English'},
    {name: 'Tamil'},
    {name: 'Hindi'},
    {name:'Assamese'},
    {name: 'Bangla'},
    {name: 'Bodo'},
    {name: 'Dogri'},
    {name:'Gujarati'},
    {name:'Kashmiri'},
    {name:'Kannada'},
    {name:'Konkani'},
    {name:'Maithili'},
    {name:'Manipuri'},
    {name:'Marathi'},
    {name:'Nepali'},
    {name:'Oriya'},
    {name:'Punjabi'},
    {name:'Telugu'},
    {name:'Santali'},
    {name:'Sindhi'},
    {name:'Urdu'}
  ]

  nationalities =[
    {name:'Indian'},
    {name:'Australian'},
    {name:'American'},
    {name:'Bangladeshi'},
    {name:'Canadain'},
    {name:'Chinese'},
    {name:'French'},
    {name:'German'},
    {name:'Kuwaiti'},
    {name:'Nepalese'},
    {name:'Pakisthani'},
    {name:'United Arab Emirates'},
    {name:'Saudi'},
    {name:'Omani'}
  ]

  familyTypes =[
    {name: 'Nuclear'},
    {name: 'Joint'}
  ];

  familyMembers = new FormControl('');
  familyMemberList: string[] = ['Father', 'Mother','Child', 'Sister', 'Brother', 'Grand Father', 'Grand Mother'];

  client :any
  submit: Subscription;
  onSubmit(){
    this.submit = this.adminService.saveClient(this.personalForm.getRawValue()).subscribe((res)=>{
      this.client = res;

      this.medicalForm.patchValue({
        clientid : this.client._id
      })

      this.schoolForm.patchValue({
        clientid : this.client._id
      })

      this.routineForm.patchValue({
        clientid : this.client._id
      })

      this.onMedicalSubmit();
      this.updateRoutineForm();
      this.updateSchoolForm();

      this._snackBar.open("Client added successfully...","" ,{duration:3000})
      this.clearControls()
  }, (error=>{
    console.log(error)
    this._snackBar.open(error.error.message,"" ,{duration:3000})
    }));
  }

  clearControls(){
    this.personalForm.reset()
  }

  medicalSub: Subscription;
  onMedicalSubmit(){
    let data={medical:this.medicalForm.getRawValue()}
    this.medicalSub = this.adminService.updateMedicalForm(data).subscribe((res)=>{})
  }

  schoolSub: Subscription;
  updateSchoolForm(){
    let data={school:this.schoolForm.getRawValue()}
    this.schoolSub = this.adminService.updateSchoolForm(data).subscribe((res)=>{})
  }

  routineSub: Subscription;
  updateRoutineForm(){
    let data={routine:this.routineForm.getRawValue()}
    this.routineSub = this.adminService.updateRoutinesForm(data).subscribe((res)=>{})
  }
}
