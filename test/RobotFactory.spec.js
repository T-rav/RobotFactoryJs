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
										 .Build("1");
					let supplier_2 = new TestPartsSupplierBuilder()
										.With_Part({Name:Heads.Standard, Cost:90.99})
										.Build("2");
					let supplier_3 = new TestPartsSupplierBuilder().Build("3");
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
					let actual = robotCosting.Purchase_Robot(); // todo : change over to object with purchase method
					// assert
					expect(supplier_1.Purchase_Part).toHaveBeenCalled();
					expect(supplier_2.Purchase_Part).not.toHaveBeenCalled();
					expect(supplier_3.Purchase_Part).not.toHaveBeenCalled();
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
					let expected = new Number(2825.53).toFixed(2);
					expect(actual.Cost.valueOf()).toBe(expected.valueOf());
				});
			});
		});
	});
});