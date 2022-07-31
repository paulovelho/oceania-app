import { Component, OnInit } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { Toaster } from '@services/toaster/toaster.service';
import { NavigationService } from '@services/navigation/navigation.service';
import { ClientsService } from '../clients.service';

import { ClientFormComponent } from '../client-form/client-form.component'; 

@Component({
	selector: 'app-client-list',
	templateUrl: './client-list.component.html',
	styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

	public list: Array<any> = [];
	public loading: boolean = true;
	private subscription: any;

	constructor(
		private Modal: NgbModal,
		private Navigation: NavigationService,
		private Toaster: Toaster,
		private Service: ClientsService,
	){
	}

	ngOnInit(): void {
		this.LoadList();
	}

	private LoadList(): void {
		this.loading = true;
		this.Service.getAll()
			.then(data => {
				this.loading = false;
				this.list = data;
			});
	}

	public reload() {
		this.loading = true;
		this.LoadList();
	}

	public create() {
		this.Modal
			.open(ClientFormComponent)
			.result
			.then((data) => {
				this.reload();
			});
	}

	public openItem(c: any) {
		let modalRef = this.Modal.open(ClientFormComponent);
		modalRef.componentInstance.client = c;
	}



}
