import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { Task } from './models/task';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { TaskService } from './services/task.service';
import { MatDialog } from '@angular/material/dialog';
import { TaskAddEditComponentComponent } from './task.add-edit.component/task.add-edit.component.component';
import { MessageService } from './services/message.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  headerTitle = 'Tasks Management Web';
  displayedColumns: string[] = ['title', 'description', 'dueDate','actions'];
  dataSource = new MatTableDataSource<Task>;
  isAddMode: boolean | undefined;
  submitted = false;
  constructor(private _dialog: MatDialog, private taskService: TaskService, private messageService: MessageService)
  {  }

  ngOnInit(): void {
    this.getTasks()
  }

  openAddTask(){
    var dialogRef = this._dialog.open(TaskAddEditComponentComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
          this.getTasks()
      }
    })
  }

  getTasks(){
    this.taskService.getAllTasks().subscribe({
      next: (val) => {
        this.dataSource = new MatTableDataSource(val);
        this.messageService.openSnackBar('Tasks Reloaded')
      },
      error: (err: any) => {
        console.log(err)
      },
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

  }

  deleteTask(id: number){
    this.taskService.deleteTask(id).subscribe({
      next: (val) => {
        this.messageService.openSnackBar('Task deleted');
        this.getTasks()
      },
      error: (err: any) => {
        console.log(err)
      }
    })
  }

  openEditForm(data: any){
      this._dialog.open(TaskAddEditComponentComponent,{data});
  }

  logout(){

  }
}
