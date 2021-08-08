import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

	public showForm: boolean = false;

	constructor() { }

	ngOnInit() {
	}

	public newProject() {
		this.showForm = true;
	}

}
