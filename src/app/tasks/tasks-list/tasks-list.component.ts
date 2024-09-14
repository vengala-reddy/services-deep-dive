import { Component, computed, inject, signal } from '@angular/core';
import { TaskItemComponent } from "./task-item/task-item.component";
import { TasksService } from '../tasks.service';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.interface';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  imports: [TaskItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  providers: [taskStatusOptionsProvider]
})
export class TasksListComponent {
  private selectedFilter = signal<string>('all'); 
  private tasksService = inject(TasksService);
  public taskStatusOptions = inject(TASK_STATUS_OPTIONS);
  public tasks = computed(() => {
    switch (this.selectedFilter()) {
      case 'open':
        return this.tasksService.allTasks().filter((task) => task.status === 'OPEN');
      case 'in-progress':
        return this.tasksService.allTasks().filter((task) => task.status === 'IN_PROGRESS');
      case 'done':
        return this.tasksService.allTasks().filter((task) => task.status === 'DONE');
      default:
        return this.tasksService.allTasks();
    }
  });

  public onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}
