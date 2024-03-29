import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialogue',
  templateUrl: './delete-dialogue.component.html',
  styleUrls: ['./delete-dialogue.component.scss']
})
export class DeleteDialogueComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteDialogueComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onConfirmClick() {
    this.dialogRef.close(true);
  }
}
