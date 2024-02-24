import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';
import { DialogRef } from '@angular/cdk/dialog';
import { Task } from '../models/task';
import { MessageService } from '../services/message.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task.add-edit.component',
  templateUrl: './task.add-edit.component.component.html',
  styleUrl: './task.add-edit.component.component.scss'
})
export class TaskAddEditComponentComponent {

  taskForm !: FormGroup;


  constructor(
    private formBuilder: FormBuilder, 
    private taskService: TaskService, 
    private dialogRef: DialogRef, 
    private messageService: MessageService,
    private router: Router) {
    this.taskForm = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['',Validators.required],
      dueDate: ['', [Validators.required]],
    })

  }

  onSubmit() {
    if (this.taskForm.valid) {
      let formData = this.taskForm.value as Task;
      formData.dueDate = new Date(this.taskForm.value['dueDate'])
      formData.createdBy = 1 // This need to replace with actual user id
      formData.createdDate = new Date();
      this.taskService.addTask(formData).subscribe({
        next: (val: any) => {
          this.dialogRef.close();
          this.messageService.openSnackBar('Task Added')
        },
        error: (err: any) => {
          console.log(err)
        }
      })
    }

  }

}
