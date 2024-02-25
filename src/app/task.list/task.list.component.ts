import { Component, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Task } from '../models/task';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent } from '@angular/material/dialog';
import { TaskService } from '../services/task.service';
import { MessageService } from '../services/message.service';
import { TaskAddEditComponentComponent } from '../task.add-edit.component/task.add-edit.component.component';
import { ConfirmationComponent } from '../confirmation/confirmation.component';

@Component({
  selector: 'app-task.list',
  templateUrl: './task.list.component.html',
  styleUrl: './task.list.component.scss'
})
export class TaskListComponent {


  displayedColumns: string[] = ['title', 'description', 'dueDate', 'status', 'actions'];
  dataSource = new MatTableDataSource<Task>;
  isAddMode: boolean | undefined;
  submitted = false;

  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];

  hidePageSize = false;
  showPageSizeOptions = true;
  showFirstLastButtons = true;
  disabled = false;

  pageEvent: PageEvent | undefined;

  handlePageEvent(e: PageEvent) {
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  constructor(private _dialog: MatDialog, private taskService: TaskService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getTasks()
    this.messageService.openSnackBar('Tasks Reloaded!')
  }

  openAddTask() {
    var dialogRef = this._dialog.open(TaskAddEditComponentComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getTasks()
      }
    })
  }

  getTasks() {
    this.taskService.getAllTasks().subscribe({
      next: (val) => {
        this.dataSource = new MatTableDataSource(val);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: (err: any) => {
        console.log(err)
        this.messageService.openSnackBar('Error in getting tasks!!');
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteTask(id: number) {
    var deleteRef = this._dialog.open(ConfirmationComponent, { data: 'Delete' })
    deleteRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.taskService.deleteTask(id).subscribe({
            next: (val) => {
              this.messageService.openSnackBar('Task Deleted Successfully!!');
              this.getTasks()
            },
            error: (err: any) => {
              console.log(err)
              this.messageService.openSnackBar('Error on Deleting Task!!');
            }
          })
        }

      }
    })

  }

  openEditForm(data: Task) {
    var dialogRef = this._dialog.open(TaskAddEditComponentComponent, { data });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        this.getTasks()
      }
    })
  }

  markAsCompleted(id: number) {
    const deleteRef = this._dialog.open(ConfirmationComponent, { data: 'Mark as Complete' });
    deleteRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.taskService.markAsCompleted(id).subscribe({
            next: (val) => {
              this.messageService.openSnackBar('Task Completed Successfully!!');
              this.getTasks()
            },
            error: (err: any) => {
              console.log(err)
              this.messageService.openSnackBar('Error on completion!!');
            }
          })
        }

      }
    })
    
  }
}
