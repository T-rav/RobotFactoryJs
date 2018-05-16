describe("RobotFactory", function () {
	describe("Cost_Robot",function(){
		describe("When all parts in stock", function(){
			describe("Given only 1 supply provides parts", function(){
				it("Should build robot at supplier cost", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Standard, Cost:100.99})
										 .With_Part({Name:Body.Square, Cost:400.05})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:99.00})
										 .With_Part({Name:Movement.Tracks, Cost:1235.50})
										 .With_Part({Name:Power.Biomass, Cost:999.99})
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder().Build();
					let supplier_3 = new TestPartsSupplierBuilder().Build();
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					// act
					let actual = robotFactory
									.With_Head(Heads.Standard)
									.With_Body(Body.Square)
									.With_Arms(Arms.Boxing_Gloves)
									.With_Movement(Movement.Tracks)
									.With_Power(Power.Biomass)
									.Cost_Robot();
					// assert
				 	let expected = new Number(2835.53).toFixed(2);
					expect(actual.Cost.valueOf()).toBe(expected.valueOf());
				});
			});
			describe("Given 2 suppliers provide 1 of the same parts at different prices", function(){
				it("Should build robot at cheapest cost", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Standard, Cost:100.99})
										 .With_Part({Name:Body.Square, Cost:400.05})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:99.00})
										 .With_Part({Name:Movement.Tracks, Cost:1235.50})
										 .With_Part({Name:Power.Biomass, Cost:999.99})
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Standard, Cost:90.99})
										.Build();
					let supplier_3 = new TestPartsSupplierBuilder()
										.Build();
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					// act
					let actual = robotFactory
									.With_Head(Heads.Standard)
									.With_Body(Body.Square)
									.With_Arms(Arms.Boxing_Gloves)
									.With_Movement(Movement.Tracks)
									.With_Power(Power.Biomass)
									.Cost_Robot();
					// assert
					let expected = new Number(2825.53).toFixed(2);
					expect(actual.Cost.valueOf()).toBe(expected.valueOf());
				});
			});
			describe("Given 3 suppliers provide all of the same parts at different prices", function(){
				it("Should build robot at cheapest cost", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Standard, Cost:100.99})
										 .With_Part({Name:Body.Square, Cost:400.05})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:99.00})
										 .With_Part({Name:Movement.Tracks, Cost:1235.50})
										 .With_Part({Name:Power.Biomass, Cost:999.99})
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Standard, Cost:40.91})
										.With_Part({Name:Body.Square, Cost:410.05})
										.With_Part({Name:Arms.Boxing_Gloves, Cost:199.00})
										.With_Part({Name:Movement.Tracks, Cost:1135.50})
										.With_Part({Name:Power.Biomass, Cost:990.99})
										.Build();
					let supplier_3 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Standard, Cost:110.95})
										.With_Part({Name:Body.Square, Cost:401.05})
										.With_Part({Name:Arms.Boxing_Gloves, Cost:95.95})
										.With_Part({Name:Movement.Tracks, Cost:1035.55})
										.With_Part({Name:Power.Biomass, Cost:899.90})
										.Build();
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					// act
					let actual = robotFactory
									.With_Head(Heads.Standard)
									.With_Body(Body.Square)
									.With_Arms(Arms.Boxing_Gloves)
									.With_Movement(Movement.Tracks)
									.With_Power(Power.Biomass)
									.Cost_Robot();
					// assert
					let expected = new Number(2472.36).toFixed(2);
					expect(actual.Cost.valueOf()).toBe(expected.valueOf());
				});
			});
		});
	});
	describe("Purchase_Robot",function(){
		describe("When all parts in stock", function(){
			describe("Given only 1 supply provides parts", function(){
				it("Should purchase robot from 1 supplier", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Standard, Cost:100.99})
										 .With_Part({Name:Body.Square, Cost:400.05})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:99.00})
										 .With_Part({Name:Movement.Tracks, Cost:1235.50})
										 .With_Part({Name:Power.Biomass, Cost:999.99})
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder().Build();
					let supplier_3 = new TestPartsSupplierBuilder().Build();
					spyOn(supplier_1, "Purchase_Part");
					spyOn(supplier_2, "Purchase_Part");
					spyOn(supplier_3, "Purchase_Part");
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					let robotCosting = robotFactory
										.With_Head(Heads.Standard)
										.With_Body(Body.Square)
										.With_Arms(Arms.Boxing_Gloves)
										.With_Movement(Movement.Tracks)
										.With_Power(Power.Biomass)
										.Cost_Robot();
					// act
					let actual = robotCosting.Purchase_Robot();
					// assert
					expect(supplier_1.Purchase_Part).toHaveBeenCalled();
					expect(supplier_2.Purchase_Part).not.toHaveBeenCalled();
					expect(supplier_3.Purchase_Part).not.toHaveBeenCalled();
				});
			});
			describe("Given 2 suppliers provide 1 of the same parts at different prices", function(){
				it("Should purchase robot from 2 suppliers", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Standard, Cost:100.99})
										 .With_Part({Name:Body.Square, Cost:400.05})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:99.00})
										 .With_Part({Name:Movement.Tracks, Cost:1235.50})
										 .With_Part({Name:Power.Biomass, Cost:999.99})
										 .With_Name("Supplier 1")
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Standard, Cost:90.99})
										.With_Name("Supplier 2")
										.Build();
					let supplier_3 = new TestPartsSupplierBuilder()
										.With_Name("Supplier 3")
										.Build();
					spyOn(supplier_1, "Purchase_Part").and.callThrough();
					spyOn(supplier_2, "Purchase_Part").and.callThrough();
					spyOn(supplier_3, "Purchase_Part").and.callThrough();
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					let robotCosting = robotFactory
										.With_Head(Heads.Standard)
										.With_Body(Body.Square)
										.With_Arms(Arms.Boxing_Gloves)
										.With_Movement(Movement.Tracks)
										.With_Power(Power.Biomass)
										.Cost_Robot();
					// act
					let actual = robotCosting.Purchase_Robot(); 
					// assert
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Square");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Boxing Gloves");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Tracks");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Biomass");
					expect(supplier_2.Purchase_Part).toHaveBeenCalledWith("Standard Vision");
					expect(supplier_3.Purchase_Part).not.toHaveBeenCalled();
				});
			});
			describe("Given 3 suppliers provide all of the same parts at different prices", function(){
				it("Should purchase robot from 3 suppliers", function() {
					// arrange
					let supplier_1 = new TestPartsSupplierBuilder()
										 .With_Part({Name:Heads.Infrared, Cost:100.99})
										 .With_Part({Name:Body.Triangular, Cost:400.05})
										 .With_Part({Name:Arms.Pinchers, Cost:99.00})
										 .With_Part({Name:Arms.Boxing_Gloves, Cost:199.00})
										 .With_Part({Name:Movement.Wheels, Cost:1235.50})
										 .With_Part({Name:Power.Solar, Cost:898.99})
										 .With_Name("Supplier 1")
										 .Build();
					let supplier_2 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Infrared, Cost:40.91})
										.With_Part({Name:Body.Triangular, Cost:410.05})
										.With_Part({Name:Arms.Pinchers, Cost:199.00})
										.With_Part({Name:Movement.Wheels, Cost:1135.50})
										.With_Part({Name:Power.Solar, Cost:990.99})
										.With_Name("Supplier 2")
										.Build();
					let supplier_3 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Infrared, Cost:110.95})
										.With_Part({Name:Body.Triangular, Cost:401.05})
										.With_Part({Name:Arms.Pinchers, Cost:95.95})
										.With_Part({Name:Movement.Wheels, Cost:1035.55})
										.With_Part({Name:Power.Solar, Cost:899.90})
										.With_Part({Name:Power.Biomass, Cost:999.90})
										.With_Name("Supplier 3")
										.Build();
					spyOn(supplier_1, "Purchase_Part").and.callThrough();
					spyOn(supplier_2, "Purchase_Part").and.callThrough();
					spyOn(supplier_3, "Purchase_Part").and.callThrough();
					let suppliers = [supplier_1, supplier_2, supplier_3];
					let robotFactory = new RobotFactory(suppliers);
					let robotCosting = robotFactory
											.With_Head(Heads.Infrared)
											.With_Body(Body.Triangular)
											.With_Arms(Arms.Pinchers)
											.With_Movement(Movement.Wheels)
											.With_Power(Power.Solar)
											.Cost_Robot();
					// act
					let actual = robotCosting.Purchase_Robot();
					// assert
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Triangular");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Solar");
					expect(supplier_2.Purchase_Part).toHaveBeenCalledWith("Infrared Vision");
					expect(supplier_3.Purchase_Part).toHaveBeenCalledWith("Pinchers");
					expect(supplier_3.Purchase_Part).toHaveBeenCalledWith("Wheels");
				});
			});
		});
	});
});