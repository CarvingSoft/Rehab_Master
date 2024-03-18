import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AdminService } from 'src/app/Modules/admin/admin.service';
import { DeleteDialogueComponent } from 'src/app/Modules/admin/components/delete-dialogue/delete-dialogue.component';
import { Category } from 'src/app/Modules/admin/models/category';
import { TherapistService } from '../../../therapist.service';
import { ParentService } from 'src/app/Modules/parent/parent.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss']
})
export class TaskComponent implements OnInit {

  // ngOnDestroy(){
  //   this.cat.unsubscribe();
  //   if(this.submit){
  //     this.submit.unsubscribe();
  //   }
  //   if(this.edit){
  //     this.edit.unsubscribe();
  //   }
  //   if(this.delete){
  //     this.delete.unsubscribe();
  //   }
  // }

  constructor(private fb: FormBuilder , private datepipe: DatePipe, private router: Router,
    private activatedRoute: ActivatedRoute, private parentService: ParentService) {}

  ngOnInit(): void {
    this.addTask()
  }

  taskForm = this.fb.group({
    sessionMasterId: this.activatedRoute.snapshot.params['id'],
    tasks: this.fb.array([])
  });

  task()  {
    return this.taskForm.get("tasks") as FormArray
  }

  newTask() {
    return this.fb.group({
      date: [''],
      task: [''],
    })
  }

  addTask() {
    this.task().push(this.newTask());
  }

  removeTask(i:number) {
    this.task().removeAt(i);
  }

  onSubmit(){
    let form = {
        ...this.taskForm.value
    }
    this.parentService.addTask(form).subscribe(task => {
      this.router.navigateByUrl('/therapist')
    })
  }

  cancel(){
    this.router.navigateByUrl('/therapist')
  }
}
