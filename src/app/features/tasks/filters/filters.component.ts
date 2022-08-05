import { Component, Output, OnInit, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { AppState } from '@app/app.state';

import { ActivitiesService } from '@app/features/activities/activities.service';
import { ProjectsService } from '@app/features/projects/projects.service';

import { BulkAddComponent } from '../bulk-add/bulk-add.component';

export interface FilterData {
	project_id: number | null,
	activity_id: number | null,
};

@Component({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

	@Output() filter: EventEmitter<FilterData> = new EventEmitter<FilterData>();
	@Output() refresh: EventEmitter<any> = new EventEmitter<any>();

	public loading: boolean = true;

	public filters: any = {
		activity_id: null, project_id: null
	};

	public activitiesSelect: any[] | null = null;
	public projectsSelect: any[] | null = null;
	public project: any = null;
	public activity_id: any = null;

	public showBulkTasks: boolean = false;

	constructor(
		private AppState: AppState,
		private Modal: NgbModal,
		private ActivitiesService: ActivitiesService,
		private ProjectsService: ProjectsService,
	) { }

	ngOnInit(): void {
		this.buildFilters()
			.then(() => {
				this.showBulkTasks = (this.project?.id != null);
				this.emitFilter();
			});
	}

	public emitFilter(): void {
		this.filter.emit(this.filters);
		this.AppState.emit('filter-updated', this.filters);
	}
	public refreshClick(): void {
		this.refresh.emit(null);
		this.AppState.emit('filter-refresh', null);
	}

	public filterChange(): void {
		this.loading = true;
		this.showBulkTasks = false;
		if (this.project) {
			this.showBulkTasks = true;
			this.filters.project_id = this.project.id;
			this.ProjectsService.storeProject({ id: this.project.id, name: this.project.name });
		}
		if (this.activity_id) {
			this.filters.activity_id = this.activity_id;
			this.ActivitiesService.storeActivity({ id: this.activity_id });
		}
		this.emitFilter();
	}

	public async buildFilters(): Promise<any> {
		await this.ActivitiesService.getAllList()
			.then(data => {
				this.activitiesSelect = data.filter((a: any) => a != null);
				this.ActivitiesService.getStoredActivity()
					.then(a => {
						this.activity_id = a?.id;
						this.filters.activity_id = a?.id;
					});
			});
		await this.ProjectsService.getProjectList()
			.then(data => {
				this.projectsSelect = data.filter((p: any) => p!= null);
				this.ProjectsService.getStoredProject()
					.then(p => {
						this.project = { id: p?.id, name: p?.name };
						this.filters.project_id = p?.id;
					});
			});
	}
	public compareProjects(o1: any, o2: any): boolean {
		return o1.id === o2.id;
	}
	public clearFilters(): void {
		this.project = null;
		this.activity_id = null;
		this.ProjectsService.clearStoredProject();
		this.ActivitiesService.clearStoredActivity();
		this.filters = { project_id: null, activity_id: null };
		this.emitFilter();
	}

	public addBulkTasks(): void {
		let modalRef = this.Modal.open(BulkAddComponent, { windowClass: 'modal-large' });
		modalRef.componentInstance.project = this.project;
		modalRef.componentInstance.activity_id = this.activity_id;
	}

}
