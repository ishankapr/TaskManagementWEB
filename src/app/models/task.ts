export class Task {
    taskID!: number;
    title!: string;
    description!: string;
    dueDate !: Date;
    createdDate!: Date;
    createdBy!: number;
    isCompleted!: boolean;
    status!: string;

    constructor(task: Task){
        this.taskID = task.taskID
        this.title = task.title
        this.description = task.description
        this.dueDate = task.dueDate
        this.createdBy = task.createdBy
        this.createdDate = task.createdDate
        this.isCompleted = task.isCompleted
        this.status = task.status
    }
}
