import { Assessment } from './../../admin/models/assessment';
export interface StAssessmentForm{
  _id : String
  date : Date
  updatedDate : Date
  assessmentMasterId : Assessment,
  childStrength: String,
  parentConcern : String,
  babbling : String,
  firstWord : String,
  twoWord : String,
  regression : String,
  impressionSpeech : String,
  neckControl : String,
  sitting : String,
  walking : String,
  impressionMotor : String,
  structureLip: String,
  FunctionLip : String,
  structureTounge : String,
  functionTounge : String,
  structureTeeth : String,
  functionTeeth : String,
  structureAlveolus : String,
  functionAlveolus : String,
  structurePalate : String,
  functionPalate : String,
  structureUvula : String,
  functionUvula : String,
  structureMandible : String,
  functionMandible : String,
  sucking : String,
  swallowing : String,
  biting : String,
  chewing : String,
  blowing : String,
  drooling : String,
  otherConsultation : String,
  eyeContact : String,
  attentionConcentration : String,
  sittingTolerance : String,
  speechSkills : String,
  fluencyProfile : String,
  speechRate : String,
  effort : String,
  prosody : String,
  speechRating : String,
  stimulability : String,
  phonologyProfile : String,
  pitch : String,
  loudness : String,
  quality : String,
  resonance : String,
  languageProfile : String,
  comprehension : String,
  receptionMode : String,
  expression : String,
  expressionMode : String,
  parentChildIntraction : String,
  semanticRelation: String,
  attribution : String,
  action : String,
  locativeAction : String,
  existence : String,
  nonExistence : String,
  denial : String,
  rejection : String,
  recurrence : String,
  possession : String,
  playSkills : String,
  greetingSkill : String,
  requesting : String,
  turnSkill : String,
  topicInitiation : String,
  topicMaintenance : String,
  topicTermination : String,
  socialSmile : String,
  reciprocalSmile : String,
  jointAttention : String,
  minglingPeers : String,
  temperTantrums : String,
  selfBehaviour : String,
  hyperActivity : String,
  selfHelp : String,
  toiletIndication : String,
  hungerIndication : String,
  bladderControl : String,
  parentChildIntractionBehaviour : String,
  matching : String,
  association : String,
  sequencing : String,
  categorization : String,
  logicalReasoning : String,
  problemSolving : String,
  memory : String,
  hearing : String,
  vision : String,
  testAdminstered : String,
  impression : String,
  admissionAge : String,
  academicBreakdown : String,
  communicateParticipation : String,
  provisionalDiagnosis : String,
  familyStrength : String,
  familyBarriers : String,
  counselling : String,
  goalsExplained : String,
  recommendation : String,
  overall : String
}