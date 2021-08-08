import { Setup } from '@app/../tests-setup'

import { Observable } from "rxjs/Rx";

import { Botecache } from "./botecache.service";

describe("Testing StoreService", () => {

	let service: Botecache;
	var setup = new Setup();

	beforeEach(() => {
	setup.addProviders(Botecache);
		setup.start();
		service = setup.provider(Botecache);
	});

	it("should call cached function only if not cached", async () => {
		var calledFn = 0;
		let callback = () => {
			calledFn ++;
			return 42;
		};

		let data1 = await service.cache("test", callback);
		expect(data1).toBe(42);
		let data2 = await service.cache("test", callback);
		expect(data2).toBe(42);
		expect(calledFn).toBe(1);

		let stored = service.get("test");
		expect(stored.data).toBe(42);
	});

});
