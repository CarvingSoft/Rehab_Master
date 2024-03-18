import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { StSessionData } from '../../../models/stSessionData';
import { TherapistService } from '../../../therapist.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-st-data',
  templateUrl: './edit-st-data.component.html',
  styleUrls: ['./edit-st-data.component.scss']
})
export class EditStDataComponent implements OnInit, OnDestroy {
  stSessionForm = this.fb.group({
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
      hyperSensitive:'',
      mixedSensitive:'',
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
    }),
  })


  constructor(private fb: FormBuilder , private _snackBar: MatSnackBar, private therapistService: TherapistService,
    private activatedRoute: ActivatedRoute) { }

  ngOnDestroy(): void {
    this.stSubscription.unsubscribe();
    if(this.submitS){
      this.submitS.unsubscribe();
    }
  }

  stSubscription: Subscription;
  ngOnInit(): void {
    this.stSubscription = this.editStDataSession();
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


  stSessionData : StSessionData[]=[];
  stData : StSessionData;
  id : any;
  editStDataSession(){
    return this.therapistService.getStSessionDataId(this.activatedRoute.snapshot.params['id']).subscribe((st)=>{
      this.stData = st
      this.stSessionData.push(st)
      this.id = this.stData._id


      let editJoinAttention = this.stData.preLinguistic.joinAttention.toString()
      let editImitation = this.stData.preLinguistic.imitation.toString()
      let editPreLinguistic = this.stData.preLinguistic.remarks.toString()

      let editLexicalItems = this.stData.linguistic.lexicalItems.toString()
      let editConcepts = this.stData.linguistic.advancedConcepts.toString()
      let editStructure = this.stData.linguistic.syntacticStructures.toString()
      let editSkills = this.stData.linguistic.pragmaticSkills.toString()
      let editLinguistic = this.stData.linguistic.remarks.toString()

      let editFunctional = this.stData.communication.functional.toString()
      let editGestrual = this.stData.communication.gestrual.toString()
      let editAac = this.stData.communication.aac.toString()
      let editAssistive = this.stData.communication.assistive.toString()
      let editCommunication = this.stData.communication.remarks.toString()

      let editBasic = this.stData.cognition.basicSkills.toString()
      let editAdvanced = this.stData.cognition.advancedSkills.toString()
      let editCognition = this.stData.cognition.remarks.toString()

      let editParallel = this.stData.play.parallel.toString()
      let editSymbolic = this.stData.play.symbolic.toString()
      let editConstructive = this.stData.play.constructive.toString()
      let editPretend = this.stData.play.pretend.toString()
      let editPhysical = this.stData.play.physical.toString()
      let editExploratory = this.stData.play.exploratory.toString()
      let editStimulating = this.stData.play.sensoryStimulating.toString()
      let editAssociative = this.stData.play.associative.toString()
      let editOnlooker = this.stData.play.onlooker.toString()
      let editPlay = this.stData.play.remarks.toString()

      let editDescrimination = this.stData.articulation.auditoryDescrimination.toString()
      let editPhonology = this.stData.articulation.phonology.toString()
      let editPlacement = this.stData.articulation.placement.toString()
      let editGeneralization = this.stData.articulation.generalization.toString()
      let editWordLevel = this.stData.articulation.wordLevel.toString()
      let editPhraseLevel = this.stData.articulation.phraseLevel.toString()
      let editArticulation = this.stData.articulation.remarks.toString()

      let editOpt = this.stData.oroMotor.opt.toString()
      let editHypoSensitive= this.stData.oroMotor.hypoSensitive.toString()
      let editMixedSensitive= this.stData.oroMotor.mixedSensitive.toString()
      let editHyperSensitive = this.stData.oroMotor.hyperSensitive.toString()
      let editSucking = this.stData.oroMotor.sucking.toString()
      let editBlowing = this.stData.oroMotor.blowing.toString()
      let editChewing = this.stData.oroMotor.chewing.toString()
      let editOroMotor = this.stData.oroMotor.remarks.toString()

      let editShaping = this.stData.fluency.fluencyShaping.toString()
      let editModification = this.stData.fluency.fluencyModification.toString()
      let editFluencyGeneralization = this.stData.fluency.generalization.toString()
      let editMaintenance = this.stData.fluency.maintenance.toString()
      let editFluency = this.stData.fluency.remarks.toString()

      let editRespiratory = this.stData.voice.respiratory.toString()
      let editResonance= this.stData.voice.resonance.toString()
      let editPitch = this.stData.voice.pitch.toString()
      let editLoudness = this.stData.voice.loudness.toString()
      let editRelaxation = this.stData.voice.relaxationExercises.toString()
      let editStrengthening = this.stData.voice.strengtheningExercises.toString()
      let editVoice = this.stData.voice.remarks.toString()


      this.stSessionForm.patchValue({
        preLinguistic:{
          joinAttention : editJoinAttention,
          imitation : editImitation,
          remarks : editPreLinguistic
         },

         linguistic:{
          lexicalItems : editLexicalItems,
          advancedConcepts : editConcepts,
          syntacticStructures : editStructure,
          pragmaticSkills : editSkills,
          remarks : editLinguistic
         },

         communication:{
          functional : editFunctional,
          gestrual : editGestrual,
          aac : editAac,
          assistive : editAssistive,
          remarks : editCommunication
         },

         cognition: {
          basicSkills : editBasic,
          advancedSkills : editAdvanced,
          remarks : editCognition
         },

         play:{
          parallel: editParallel,
          symbolic: editSymbolic,
          constructive: editConstructive,
          pretend: editPretend,
          physical: editPhysical,
          exploratory: editExploratory,
          sensoryStimulating : editStimulating,
          associative: editAssociative,
          onlooker: editOnlooker,
          remarks : editPlay
         },

         articulation:{
          auditoryDescrimination: editDescrimination,
          phonology: editPhonology,
          placement: editPlacement,
          generalization: editGeneralization,
          wordLevel: editWordLevel,
          phraseLevel: editPhraseLevel,
          remarks: editArticulation
         },

         oroMotor: {
          opt : editOpt,
          hypoSensitive : editHypoSensitive,
          mixedSensitive : editMixedSensitive,
          hyperSensitive : editHyperSensitive,
          sucking : editSucking,
          blowing : editBlowing,
          chewing : editChewing,
          remarks : editOroMotor
         },

         fluency : {
          fluencyShaping : editShaping,
          fluencyModification : editModification,
          generalization : editFluencyGeneralization,
          maintenance : editMaintenance,
          remarks : editFluency
         },

         voice : {
          respiratory : editRespiratory,
          resonance : editResonance,
          pitch : editPitch,
          loudness : editLoudness,
          relaxationExercises : editRelaxation,
          strengtheningExercises : editStrengthening,
          remarks : editVoice
         }
        })

    })
  }

  submitS: Subscription;
  onSubmit(){
    let data = {
      preLinguistic:{
        joinAttention : this.stSessionForm.get('preLinguistic.joinAttention').value,
        imitation : this.stSessionForm.get('preLinguistic.imitation').value,
        remarks : this.stSessionForm.get('preLinguistic.remarks').value
       },

       linguistic:{
        lexicalItems : this.stSessionForm.get('linguistic.lexicalItems').value,
        advancedConcepts : this.stSessionForm.get('linguistic.advancedConcepts').value,
        syntacticStructures : this.stSessionForm.get('linguistic.syntacticStructures').value,
        pragmaticSkills : this.stSessionForm.get('linguistic.pragmaticSkills').value,
        remarks : this.stSessionForm.get('linguistic.remarks').value,
       },

       communication:{
        functional : this.stSessionForm.get('communication.functional').value,
        gestrual : this.stSessionForm.get('communication.gestrual').value,
        aac : this.stSessionForm.get('communication.aac').value,
        assistive : this.stSessionForm.get('communication.assistive').value,
        remarks : this.stSessionForm.get('communication.remarks').value
       },

       cognition: {
        basicSkills : this.stSessionForm.get('cognition.basicSkills').value,
        advancedSkills : this.stSessionForm.get('cognition.advancedSkills').value,
        remarks : this.stSessionForm.get('cognition.remarks').value
       },

       play:{
        parallel: this.stSessionForm.get('play.parallel').value,
        symbolic: this.stSessionForm.get('play.symbolic').value,
        constructive: this.stSessionForm.get('play.constructive').value,
        pretend: this.stSessionForm.get('play.pretend').value,
        physical: this.stSessionForm.get('play.physical').value,
        exploratory: this.stSessionForm.get('play.exploratory').value,
        sensoryStimulating : this.stSessionForm.get('play.sensoryStimulating').value,
        associative: this.stSessionForm.get('play.associative').value,
        onlooker: this.stSessionForm.get('play.onlooker').value,
        remarks : this.stSessionForm.get('play.remarks').value
       },

       articulation:{
        auditoryDescrimination: this.stSessionForm.get('articulation.auditoryDescrimination').value,
        phonology:  this.stSessionForm.get('articulation.phonology').value,
        placement:  this.stSessionForm.get('articulation.placement').value,
        generalization:  this.stSessionForm.get('articulation.generalization').value,
        wordLevel:  this.stSessionForm.get('articulation.wordLevel').value,
        phraseLevel:  this.stSessionForm.get('articulation.phraseLevel').value,
        remarks:  this.stSessionForm.get('articulation.remarks').value
       },

       oroMotor: {
        opt : this.stSessionForm.get('oroMotor.opt').value,
        hypoSensitive : this.stSessionForm.get('oroMotor.hypoSensitive').value,
        mixedSensitive : this.stSessionForm.get('oroMotor.mixedSensitive').value,
        hyperSensitive : this.stSessionForm.get('oroMotor.hyperSensitive').value,
        sucking : this.stSessionForm.get('oroMotor.sucking').value,
        blowing : this.stSessionForm.get('oroMotor.blowing').value,
        chewing : this.stSessionForm.get('oroMotor.chewing').value,
        remarks : this.stSessionForm.get('oroMotor.remarks').value
       },

       fluency : {
        fluencyShaping : this.stSessionForm.get('fluency.fluencyShaping').value,
        fluencyModification : this.stSessionForm.get('fluency.fluencyModification').value,
        generalization : this.stSessionForm.get('fluency.generalization').value,
        maintenance : this.stSessionForm.get('fluency.maintenance').value,
        remarks : this.stSessionForm.get('fluency.remarks').value
       },

       voice : {
        respiratory : this.stSessionForm.get('voice.respiratory').value,
        resonance : this.stSessionForm.get('voice.resonance').value,
        pitch : this.stSessionForm.get('voice.pitch').value,
        loudness : this.stSessionForm.get('voice.loudness').value,
        relaxationExercises : this.stSessionForm.get('voice.relaxationExercises').value,
        strengtheningExercises : this.stSessionForm.get('voice.strengtheningExercises').value,
        remarks : this.stSessionForm.get('voice.remarks').value
       }
    }
    this.submitS = this.therapistService.editStSessionData(data, this.activatedRoute.snapshot.params['id']).subscribe((res)=>{
      history.back()
      this._snackBar.open("Upated successfully...","" ,{duration:3000})
      this.clearControls()
    },(error=>{
      console.log(error)
      alert(error)
    }))
  }

  clearControls(){
    this.stSessionForm.reset()
    this.stSessionForm.setErrors(null)
    Object.keys(this.stSessionForm.controls).forEach(key=>{this.stSessionForm.get(key).setErrors(null)})
  }

}
