import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.interface";
import { LoggingService } from "../logging.service";

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    private tasks = signal<Task[]>([]);
    public allTasks = this.tasks.asReadonly();
    private loggingService = inject(LoggingService);

    public addTask(taskData: { title: string, description: string }) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this.loggingService.log('Added Task with Title' + taskData.title);
    }

    public updateTaskStatus(taskId: string, newStatus: TaskStatus) {
        this.tasks.update((oldTasks) =>
            oldTasks.map((task) =>
                task.id === taskId ?
                    { ...task, status: newStatus } :
                    task));
        this.loggingService.log('Task status updated' + newStatus);
    }
}