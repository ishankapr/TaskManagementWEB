export class Task {
    taskID!: number;
    title!: string;
    description!: string;
    dueDate !: Date;
    createdDate!: Date;
    createdBy!: number;

    constructor(task: Task){
        this.taskID = task.taskID
        this.title = task.title
        this.description = task.description
        this.dueDate = task.dueDate
        this.createdBy = task.createdBy
        this.createdDate = task.createdDate
    }
}
