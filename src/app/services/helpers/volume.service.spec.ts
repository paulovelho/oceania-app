import { Setup } from '@app/../tests-setup'

import { Observable } from "rxjs/Rx";

import { VolumeService } from "./volume.service";

describe("Testing Volume Service", () => {

	let service: VolumeService;
	var setup = new Setup();

	beforeEach(() => {
		setup.addProviders(VolumeService).start();
		service = setup.provider(VolumeService);
	});

	it("should convert from string to liter", () => {
		expect(service.toLiter("500 ml")).toEqual(0.5);
		expect(service.toLiter("43l")).toEqual(43);
		expect(service.toLiter("355 ml")).toEqual(0.355);
		expect(service.toLiter("1,5 L")).toEqual(1.5);
	});

	it("should convert from number to string", () => {
		expect(service.toRead(0.6)).toEqual("600 ml");
		expect(service.toRead(30)).toEqual("30 l");
		expect(service.toRead(0.355)).toEqual("355 ml");
		expect(service.toRead(1.75)).toEqual("1.75 l");
	});

});
