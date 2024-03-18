import { validateVerticalPosition } from '@angular/cdk/overlay';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { Component , ElementRef, ViewChild} from '@angular/core';
import { FormBuilder, Validators ,FormsModule, FormControl} from '@angular/forms';
import { ClientRegistrationService } from '../client-registration.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Form } from '@angular/forms';
import { FactoryTarget } from '@angular/compiler';



@Component({
  selector: 'app-client-registration',
  templateUrl: './client-registration.component.html',
  styleUrls: ['./client-registration.component.scss']
})
export class ClientRegistrationComponent {


  @ViewChild ('stepper') stepperRef: ElementRef

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
    preferredTiming:['']
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
    babyCry: [''],
    feedingProblem: [''],
    sleepProblem: [''],
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


  constructor(private fb: FormBuilder, private _http:ClientRegistrationService , private snackBar:MatSnackBar) {

  }


  client:any;
  file:File= null;

  hasUnitNumber = false;
  personalformStatus = false;
  saveButton=false;
  nextButton=true;
  medicalformStatus = false;
  schoolformStatus = false;
  DailyRoutineformStatus = false;
  finalButton= false;
  public agreement:boolean = true;
  public saveUsername:boolean;

  public onSaveUsernameChanged(value:boolean){
    this.saveUsername = value;
  }

  genders =[
    {name: 'Male'},
    {name: 'Female'}
  ];

  
  timing =[
    {time: 'Morning'},
    {time: 'Evening'},
    {time: 'Anytime'}
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
    {name:'Urdu'},
    {name: 'Others'}
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
    {name:'Omani'},
    {name: 'Others'}
  ]

  sleeps=[
    {name:'Continuous'}, 
    {name:'disturbed'}, 
    {name:'takes time to fall asleep'}, 
    {name:'needs rocking carrying stroking etc.'},
    //{name:'Time of Sleep'}
  ];
  
  wakeup=[ 
    {name:'Independent waking up'},
    {name:'Needs to be woken up'},
    //{name:'Time of Waking Up'}
  ];
    
  homework=[
    {name:'Adult supervision'}, 
    {name:'Breaks needed'}, 
    {name:'Frequency of breaks'}, 
    {name:'Needs music'},
    {name:'Continuous verbal prompts'},
    {name:'Any other reinforcers as external supports'}
  ];
  
  difficult=[
    {name:'Parents hugs or calm voice'},
    {name:'Carrying'}, 
    {name:'Rocking, music, calm down corner'}, 
    {name:'A favourite toy or pillow'},
    {name:'Movement breaks'}];

  selections =[
    {name:'Never'},
    {name:'Sometimes'},
    {name:'Usually'},
    {name:'Always'},
    {name:'Unsure'},
  ]

  familyTypes =[
    {name: 'Nuclear'},
    {name: 'Joint'}
  ];

  familyMembers = new FormControl('');
  familyMemberList: string[] = ['Father', 'Mother','Child', 'Sister', 'Brother', 'Grand Father', 'Grand Mother'];


  onSubmit(): void {
    alert('Thanks!');
  }

  onSave() {
    this._http.saveClient(this.personalForm.getRawValue()).subscribe((res)=>{
      this.client = res;    
      this.personalformStatus = true;

      this.medicalForm.patchValue({
        clientid : this.client._id
      })

      this.schoolForm.patchValue({
        clientid : this.client._id
      })

      this.routineForm.patchValue({
        clientid : this.client._id
      })

      this.saveButton = true;
      this.nextButton=false;
    },(error=>{
      this.snackBar.open(error.error.message,"" ,{duration:3000})
    }))

  }

  onMedicalSubmit(){
    // if(this.uploadStatus){
    //   alert("Selected image is not Uploaded, Please click upload")
    // }
    // else{
      let data={medical:this.medicalForm.getRawValue()}
      this._http.updateMedicalForm(data).subscribe((res)=>{
        this.medicalformStatus = true;
      })
    // }
  }

  updateSchoolForm(){
    let data={school:this.schoolForm.getRawValue()}
    this._http.updateSchoolForm(data).subscribe((res)=>{
      this.schoolformStatus = true;
    })
  }

  updateRoutineForm()
  {
    let data={routine:this.routineForm.getRawValue()}
    this._http.updateRoutinesForm(data).subscribe((res)=>{
      this.DailyRoutineformStatus = true;
      this.resetForms();
   })
  }

  uploadStatus = false
  onFileSelected(event){
    this.uploadStatus= true
    this.file = event.target.files[0]
  }

  onUpload(){
    this.uploadStatus = false
    this._http.uploadImage(this.file).subscribe(res=>{
      this.medicalForm.patchValue({
        cloudinary_id : res.public_id,
        file_url: res.url
      })
    })
  }

  resetForms(){
    this.medicalForm.reset();
    this.personalForm.reset();
    this.routineForm.reset();
    this.schoolForm.reset();
    this.finalButton=true;
    let snabarRef=  this.snackBar.open("Successfully Updated....","", {duration:3000});
    snabarRef.afterDismissed().subscribe(()=>{
    document.location.href = 'https://www.inararehab.com'
    })    
  }
}







