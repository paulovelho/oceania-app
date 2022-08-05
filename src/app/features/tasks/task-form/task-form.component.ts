import { Component, Input, OnInit, OnChanges } from '@angular/core';

import { TasksService } from '../tasks.service';
import { Toaster } from '@services/toaster/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ProjectsService } from '@app/features/projects/projects.service';
import { ActivitiesService } from '@app/features/activities/activities.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss']
})
export class TaskFormComponent implements OnInit, OnChanges {

	@Input() modal: boolean = true;
	@Input() task: any = {};
	@Input() status: any;

	public title: string = "New Task";
	public loading: boolean = false;

	public projects: any[] = [];
	public activities: any[] = [];

	constructor(
		private activeModal: NgbActiveModal,
		private Toaster: Toaster,
		private Projects: ProjectsService,
		private Activities: ActivitiesService,
		private Service: TasksService,
	) { }

	ngOnInit(): void {
		if (this.task.id) {
			this.title = "Edit Task";
		} else {
			this.newTaskStart();
		}
		this.loadBaseData();
	}
	ngOnChanges(changes: any): void { }

	private newTaskStart(): void {
		this.task = {
			activity_id: 10, // unpaid
		};
		if (this.status) {
			this.task.status_id = this.status.id;
		}
		this.Projects.getStoredProject()
			.then(p => {
				this.task.project_id = p?.id;
			});
		this.Activities.getStoredActivity()
			.then(a => {
				this.task.activity_id = a?.id;
			});
	}

	private loadBaseData(): void {
		this.Projects.getProjectList()
			.then(data => {
				this.projects = data.filter((p: any) => p!= null);
			});
		this.Activities.getAll()
			.then(data => {
				this.activities = data;
			});
	}

	public async save() {
		this.loading = true;
		this.Service.save(this.task)
			.then(rs => {
				this.loading = false;
				if (rs.success) {
					this.task = rs.task;
					this.close(this.task);
				} else {
					const data = rs.data;
					this.Toaster.error(data.msg);
				}
			})
			.catch(err => {
				console.error("err: ", err);
			});
	}

	public close(data: any) {
		this.activeModal.close(data);
	}

}
