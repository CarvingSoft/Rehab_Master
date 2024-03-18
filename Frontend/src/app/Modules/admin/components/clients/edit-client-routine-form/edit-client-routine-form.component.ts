import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AdminService } from '../../../admin.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-client-routine-form',
  templateUrl: './edit-client-routine-form.component.html',
  styleUrls: ['./edit-client-routine-form.component.scss']
})
export class EditClientRoutineFormComponent implements OnInit, OnDestroy {

  constructor(private fb : FormBuilder, private adminService : AdminService, private route : ActivatedRoute,
    private _snackBar: MatSnackBar) { }

  ngOnDestroy(): void {
    this.infoSubscription.unsubscribe()
    if(this.submit){
      this.submit.unsubscribe();
    }
  }

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


  infoSubscription: Subscription;
  ngOnInit(): void {
    this.editInfo();
  }

  id : any;
  client : any;
  editInfo(){
    this.infoSubscription = this.adminService.getClientInfo(this.route.snapshot.paramMap.get('id')).subscribe((client)=>{
      this.client = client
      let feedAgeEdit = this.client.routine.feedAge.toString()
      let goodAppetitieEdit = this.client.routine.goodAppetitie.toString()
      let messyEaterEdit = this.client.routine.messyEater.toString()
      let foodPreferenceEdit = this.client.routine.foodPreference.toString()
      let tasteAndTextureEdit = this.client.routine.tasteAndTexture.toString()
      let ageAppropriateEdit = this.client.routine.ageAppropriate
      let canDoUpButtonsEdit = this.client.routine.canDoUpButtons.toString()
      let canPutOnSocksEdit = this.client.routine.canPutOnSocks.toString()
      let canPutOnShoesEdit = this.client.routine.canPutOnShoes.toString()
      let toiletTrainedEdit = this.client.routine.toiletTrained.toString()
      let dayAndNightEdit = this.client.routine.dayAndNight.toString()
      // let toiletingAndBathEdit = this.client.routine.toiletingAndBath.toString()
      // let toiletiTrainedEdit = this.client.routine.toiletiTrained.toString()
      let accidentsEdit = this.client.routine.accidents.toString()
      let toiletPaperUseEdit = this.client.routine.toiletPaperUse.toString()
      let managingClothingEdit = this.client.routine.managingClothing.toString()
      let washingHandsEdit = this.client.routine.washingHands.toString()
      let bathingAndBrushingEdit = this.client.routine.bathingAndBrushing.toString()
      let typicalNightSleepEdit = this.client.routine.typicalNightSleep.toString()
      let timeOfSleepEdit = this.client.routine.timeOfSleep.toString()
      let remarksSleepEdit = this.client.routine.remarksSleep.toString()
      let typicalWakeupEdit = this.client.routine.typicalWakeup.toString()
      let timeOfWakeupEdit = this.client.routine.timeOfWakeup.toString()
      let remarksWakeUpEdit = this.client.routine.remarksWakeUp.toString()
      let homeworkEdit = this.client.routine.homework.toString()
      let remarksHomeworkEdit = this.client.routine.remarksHomework.toString()
      let routineStrategiesEdit = this.client.routine.routineStrategies.toString()
      let difficultSituationEdit = this.client.routine.difficultSituation.toString()
      let remarksChildBehaviourEdit = this.client.routine.remarksChildBehaviour.toString()
      //let movementBreaksEdit = this.client.routine.movementBreaks.toString()
      let howYouKnowAboutUsEdit = this.client.routine.howYouKnowAboutUs.toString()

      this.routineForm.patchValue({
        feedAge : feedAgeEdit,
        goodAppetitie : goodAppetitieEdit,
        messyEater : messyEaterEdit,
        foodPreference : foodPreferenceEdit,
        tasteAndTexture : tasteAndTextureEdit,
        ageAppropriate : ageAppropriateEdit,
        canDoUpButtons : canDoUpButtonsEdit,
        canPutOnSocks : canPutOnSocksEdit,
        canPutOnShoes : canPutOnShoesEdit,
        toiletTrained : toiletTrainedEdit,
        dayAndNight : dayAndNightEdit,
        accidents : accidentsEdit,
        toiletPaperUse : toiletPaperUseEdit,
        managingClothing : managingClothingEdit,
        washingHands : washingHandsEdit,
        bathingAndBrushing : bathingAndBrushingEdit,
        typicalNightSleep : typicalNightSleepEdit,
        timeOfSleep : timeOfSleepEdit,
        remarksSleep : remarksSleepEdit,
        typicalWakeup : typicalWakeupEdit,
        timeOfWakeup : timeOfWakeupEdit,
        remarksWakeUp : remarksWakeUpEdit,
        homework : homeworkEdit,
        remarksHomework : remarksHomeworkEdit,
        routineStrategies : routineStrategiesEdit,
        difficultSituation : difficultSituationEdit,
        remarksChildBehaviour : remarksChildBehaviourEdit,
        //movementBreaks : movementBreaksEdit,
        howYouKnowAboutUs : howYouKnowAboutUsEdit,
      })
    })
  }

  submit: Subscription;
  onSubmit(){
    let data ={
      feedAge : this.routineForm.get('feedAge').value,
      goodAppetitie : this.routineForm.get('goodAppetitie').value,
      messyEater : this.routineForm.get('messyEater').value,
      foodPreference : this.routineForm.get('foodPreference').value,
      tasteAndTexture : this.routineForm.get('tasteAndTexture').value,
      ageAppropriate : this.routineForm.get('ageAppropriate').value,
      canDoUpButtons : this.routineForm.get('canDoUpButtons').value,
      canPutOnSocks : this.routineForm.get('canPutOnSocks').value,
      canPutOnShoes : this.routineForm.get('canPutOnShoes').value,
      toiletTrained : this.routineForm.get('toiletTrained').value,
      dayAndNight : this.routineForm.get('dayAndNight').value,
      accidents : this.routineForm.get('accidents').value,
      toiletPaperUse : this.routineForm.get('toiletPaperUse').value,
      managingClothing : this.routineForm.get('managingClothing').value,
      washingHands : this.routineForm.get('washingHands').value,
      bathingAndBrushing : this.routineForm.get('bathingAndBrushing').value,
      typicalNightSleep : this.routineForm.get('typicalNightSleep').value,
      timeOfSleep : this.routineForm.get('timeOfSleep').value,
      remarksSleep : this.routineForm.get('remarksSleep').value,
      typicalWakeup : this.routineForm.get('typicalWakeup').value,
      timeOfWakeup : this.routineForm.get('timeOfWakeup').value,
      remarksWakeUp : this.routineForm.get('remarksWakeUp').value,
      homework : this.routineForm.get('homework').value,
      remarksHomework : this.routineForm.get('remarksHomework').value,
      routineStrategies : this.routineForm.get('routineStrategies').value,
      difficultSituation : this.routineForm.get('difficultSituation').value,
      remarksChildBehaviour : this.routineForm.get('remarksChildBehaviour').value,
      //movementBreaks : this.routineForm.get('movementBreaks').value,
      howYouKnowAboutUs : this.routineForm.get('howYouKnowAboutUs').value

    }

    this.submit = this.adminService.editRoutineForm(data, this.route.snapshot.params['id']).subscribe((data)=>{
      history.back();
      this._snackBar.open("Updated successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
          alert(error)
        }))
  }

  clearControls(){
    this.routineForm.reset()
  }

}
