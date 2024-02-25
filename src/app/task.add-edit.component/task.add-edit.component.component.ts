import { Component, Inject, Injector, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Task } from '../models/task';
import { MessageService } from '../services/message.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-task.add-edit.component',
  templateUrl: './task.add-edit.component.component.html',
  styleUrl: './task.add-edit.component.component.scss'
})
export class TaskAddEditComponentComponent implements OnInit {

  taskForm !: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private taskService: TaskService,
    private dialogRef: DialogRef,
    private messageService: MessageService,
    @Inject(MAT_DIALOG_DATA) public data: Task
  ) {
    this.taskForm = this.formBuilder.group({
      taskID: [''],
      title: ['', Validators.required],
      description: ['', Validators.required],
      dueDate: ['', [Validators.required]],
    })

  }

  ngOnInit(): void {
    this.taskForm.patchValue(this.data)
  }

  onSubmit() {
    if (this.taskForm.valid) {
      let formData = this.taskForm.value as Task;
      formData.dueDate = new Date(this.taskForm.value['dueDate'])
      formData.createdBy = 1 // This need to replace with actual user id
      formData.createdDate = new Date();

      if (this.data) {
        this.taskService.updateTask(formData).subscribe({
          next: (val: any) => {
            this.dialogRef.close();
            this.messageService.openSnackBar('Task Updated Successfully!!');
          },
          error: (err: any) => {
            this.dialogRef.close();
            this.messageService.openSnackBar('Error occored while updating !!')
          }
        })
      }
      else {
        formData.taskID = 0;
        this.taskService.addTask(formData).subscribe({
          next: (val: any) => {
            this.dialogRef.close();
            this.messageService.openSnackBar('Task Added Successfully!!');
          },
          error: (err: any) => {
            this.dialogRef.close();
            this.messageService.openSnackBar('Error occored while adding !!')
          }
        })
      }

    }

  }

}
