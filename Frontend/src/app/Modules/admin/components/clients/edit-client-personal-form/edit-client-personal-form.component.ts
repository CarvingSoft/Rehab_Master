import { Component, OnInit, OnDestroy } from '@angular/core';
import { Validators, FormControl, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client-personal-form',
  templateUrl: './edit-client-personal-form.component.html',
  styleUrls: ['./edit-client-personal-form.component.scss']
})
export class EditClientPersonalFormComponent implements OnInit,OnDestroy {

  constructor(private fb: FormBuilder, private adminService : AdminService, private route : ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.infoSubscription.unsubscribe();
    if(this.submit){
      this.submit.unsubscribe();
    }
  }

  personalForm = this.fb.group({
    firstName:[[''], Validators.required],
    emergencyNumber:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    email:[[''],[Validators.required,Validators.email]],
    dateOfBirth: [[''], Validators.required],
    gender: [[''], Validators.required],
    nationality: [[''], Validators.required],
    homeLanguage: [[''], Validators.required],
    familyType:[[''], Validators.required],
    familyMembers:[''],
    referrerDetails:[''],
    reason:[[''], Validators.required],
    fatherName:[[''], Validators.required],
    fatherOccupation:[[''], Validators.required],
    fatherMobile:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    motherName:[[''], Validators.required],
    motherOccupation:[[''], Validators.required],
    motherMobile:['',[Validators.required, Validators.pattern("^[0-9 +]*$"),Validators.minLength(10),Validators.maxLength(14)]],
    annualIncome:[''],
    siblingsDetails:[''],
    address1:[[''], Validators.required],
    address2:[''],
    pincode:['',[Validators.required, Validators.pattern("^()?[0-9]{6}$")]],
    status: [''],
    remarks: ['']
  });


  infoSubscription: Subscription;
  ngOnInit(): void {
    this.editInfo()
  }

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

  id : any;
  editInfo(){
    this.infoSubscription = this.adminService.getClientInfo(this.route.snapshot.paramMap.get('id')).subscribe((client)=>{
      this.client = client
      let firstNameEdit = this.client.firstName.toString()
      let emergencyNumberEdit = this.client.emergencyNumber
      let emailEdit = this.client.email.toString()
      let dateOfBirthEdit = this.client.dateOfBirth.toString()
      let genderEdit = this.client.gender.toString()
      let nationalityEdit = this.client.nationality.toString()
      let homeLanguageEdit = this.client.homeLanguage.toString()
      let familyTypeEdit = this.client.familyType.toString()
      let familyMembersEdit = this.client.familyMembers
      let referrerDetailsEdit = this.client.referrerDetails
      let reasonEdit = this.client.reason.toString()
      let fatherNameEdit = this.client.fatherName.toString()
      let fatherMobileEdit = this.client.fatherMobile
      let fatherOccupationEdit = this.client.fatherOccupation.toString()
      let motherNameEdit = this.client.motherName.toString()
      let motherMobileEdit = this.client.motherMobile
      let motherOccupationEdit = this.client.motherOccupation.toString()
      let annualIncomeEdit = this.client.annualIncome
      let siblingsDetailsEdit = this.client.siblingsDetails
      let address1Edit = this.client.address1.toString()
      let address2Edit = this.client.address2
      let pincodeEdit = this.client.pincode
      let statusEdit = this.client.status
      let remarksEdit = this.client.remarks

      this.personalForm.patchValue({
        firstName : firstNameEdit,
        emergencyNumber : emergencyNumberEdit,
        email : emailEdit,
        dateOfBirth : dateOfBirthEdit,
        gender : genderEdit,
        nationality : nationalityEdit,
        homeLanguage : homeLanguageEdit,
        familyType : familyTypeEdit,
        familyMembers : familyMembersEdit,
        referrerDetails : referrerDetailsEdit,
        reason : reasonEdit,
        fatherName : fatherNameEdit,
        fatherMobile : fatherMobileEdit,
        fatherOccupation : fatherOccupationEdit,
        motherName : motherNameEdit,
        motherMobile : motherMobileEdit,
        motherOccupation : motherOccupationEdit,
        annualIncome : annualIncomeEdit,
        siblingsDetails : siblingsDetailsEdit,
        address1 : address1Edit,
        address2 : address2Edit,
        pincode : pincodeEdit,
        status : statusEdit,
        remarks : remarksEdit
      })
    })
  }

  client :any
  submit: Subscription;
  onSubmit(){
    let data ={
      firstName : this.personalForm.get('firstName').value,
      emergencyNumber : this.personalForm.get('emergencyNumber').value,
      email : this.personalForm.get('email').value,
      dateOfBirth : this.personalForm.get('dateOfBirth').value,
      gender : this.personalForm.get('gender').value,
      nationality : this.personalForm.get('nationality').value,
      homeLanguage : this.personalForm.get('homeLanguage').value,
      familyType : this.personalForm.get('familyType').value,
      familyMembers : this.personalForm.get('familyMembers').value,
      referrerDetails : this.personalForm.get('referrerDetails').value,
      reason : this.personalForm.get('reason').value,
      fatherName : this.personalForm.get('fatherName').value,
      fatherMobile : this.personalForm.get('fatherMobile').value,
      fatherOccupation : this.personalForm.get('fatherOccupation').value,
      motherName : this.personalForm.get('motherName').value,
      motherMobile : this.personalForm.get('motherMobile').value,
      motherOccupation : this.personalForm.get('motherOccupation').value,
      annualIncome : this.personalForm.get('annualIncome').value,
      siblingsDetails : this.personalForm.get('siblingsDetails').value,
      address1 : this.personalForm.get('address1').value,
      address2 : this.personalForm.get('address2').value,
      pincode : this.personalForm.get('pincode').value,
      status : this.personalForm.get('status').value,
      remarks : this.personalForm.get('remarks').value
    }
    this.submit = this.adminService.editPersonalForm(data, this.route.snapshot.params['id']).subscribe((data)=>{
      history.back();
      this._snackBar.open("Updated successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
          alert(error)
        }))
  }

  clearControls(){
    this.personalForm.reset()
  }
}
