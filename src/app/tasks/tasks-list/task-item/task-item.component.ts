import { Component, computed, inject, input } from '@angular/core';
import { Task, TASK_STATUS_OPTIONS, TaskStatus } from '../../task.interface';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../../tasks.service';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css'
})
export class TaskItemComponent {
  public task = input.required<Task>();
  private taskService = inject(TasksService);
  public taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  public taskStatus = computed(() => {
    switch (this.task().status) {
      case 'OPEN':
        return 'Open';
      case 'IN_PROGRESS':
        return 'Working on it';
      case 'DONE':
        return 'Completed';
      default:
        return 'Open';
    }
  });
  public onChangeTaskStatus(taskId: string, status: string) {
    let newStatus: TaskStatus='OPEN';
    switch (status) {
      case 'open':
        newStatus = 'OPEN';
        break;
      case 'in-progress':
        newStatus = 'IN_PROGRESS';
        break;
      case 'done':
        newStatus = 'DONE';
        break;
      default:
        break;
    }
    this.taskService.updateTaskStatus(taskId, newStatus);
  }
}
