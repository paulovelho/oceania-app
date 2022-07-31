import { Component, Input, OnInit } from '@angular/core';

import { ClientsService } from '../clients.service';
import { Toaster } from '@services/toaster/toaster.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
	selector: 'app-client-form',
	templateUrl: './client-form.component.html',
	styleUrls: ['./client-form.component.scss']
})
export class ClientFormComponent implements OnInit {

	@Input() modal: boolean = true;
	@Input() client: any = { active: true };

	public title: string = "New Client";
	public loading: boolean = false;

	constructor(
		private activeModal: NgbActiveModal,
		private Toaster: Toaster,
		private Service: ClientsService,
	) { }

	ngOnInit(): void {
		if (this.client.id) {
			this.title = "Edit Client";
		}
	}

	public async save() {
		this.loading = true;
		this.Service.save(this.client)
			.then(rs => {
				this.loading = false;
				if (rs.success) {
					this.close();
				} else {
					const data = rs.data;
					this.Toaster.error(data.msg);
				}
			})
			.catch(err => {
				console.error("err: ", err);
			});
	}

	public close() {
		this.activeModal.close();
	}

}
