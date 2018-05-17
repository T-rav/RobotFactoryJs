describe("RobotFactory", function () {
	describe("Cost_Robot",function(){
		describe("When all parts in stock", function(){
			describe("Given only 1 supply provides parts", function(){
				it("Should build robot at supplier cost", function() {
					// arrange
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Standard, 100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square, 400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,99.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier().Build();
					let supplier_3 = new CreateTestPartsSupplier().Build();
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
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Standard,100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square,400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,99.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Standard,90.99))
										.Build();
					let supplier_3 = new CreateTestPartsSupplier()
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
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Standard,100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square,400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,99.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Standard,40.91))
										.With_Part(new RobotPart(PartTypes.Body,Body.Square,410.05))
										.With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,199.00))
										.With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1135.50))
										.With_Part(new RobotPart(PartTypes.Power,Power.Biomass,990.99))
										.Build();
					let supplier_3 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Standard,110.95))
										.With_Part(new RobotPart(PartTypes.Body,Body.Square,401.05))
										.With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,95.95))
										.With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1035.55))
										.With_Part(new RobotPart(PartTypes.Power,Power.Biomass,899.90))
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
		describe("When all parts not in stock", function(){
			describe("Given all suppliers provides parts", function(){
				it("Should return costing errors", function() {
					// arrange
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Standard, 100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square, 400.05))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier().Build();
					let supplier_3 = new CreateTestPartsSupplier().Build();
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
				 	let expected = ["Could not find supplier with the requested [Arms]"];
					expect(actual.Has_Errors()).toBeTruthy();
					expect(actual.Errors).toEqual(expected);
				});
			});
		});
	});
	describe("Purchase_Robot",function(){
		describe("When all parts in stock", function(){
			describe("Given only 1 supply provides parts", function(){
				it("Should purchase robot from 1 supplier", function() {
					// arrange
					let robotPartFactory = new RobotPartFactory();
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(robotPartFactory.Create_Head(Heads.Standard, 100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square,400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,99.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier().Build();
					let supplier_3 = new CreateTestPartsSupplier().Build();
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
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Standard,100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Square,400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,99.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Tracks,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.99))
										 .With_Name("Supplier 1")
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Standard,90.99))
										.With_Name("Supplier 2")
										.Build();
					let supplier_3 = new CreateTestPartsSupplier()
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
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Body", "Square");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Arms", "Boxing Gloves");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Movement","Tracks");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Power", "Biomass");
					expect(supplier_2.Purchase_Part).toHaveBeenCalledWith("Head", "Standard Vision");
					expect(supplier_3.Purchase_Part).not.toHaveBeenCalled();
				});
			});
			describe("Given 3 suppliers provide all of the same parts at different prices", function(){
				it("Should purchase robot from 3 suppliers", function() {
					// arrange
					let supplier_1 = new CreateTestPartsSupplier()
										 .With_Part(new RobotPart(PartTypes.Head,Heads.Infrared,100.99))
										 .With_Part(new RobotPart(PartTypes.Body,Body.Triangular,400.05))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Pinchers,99.00))
										 .With_Part(new RobotPart(PartTypes.Arms,Arms.Boxing_Gloves,199.00))
										 .With_Part(new RobotPart(PartTypes.Movement,Movement.Wheels,1235.50))
										 .With_Part(new RobotPart(PartTypes.Power,Power.Solar,898.99))
										 .With_Name("Supplier 1")
										 .Build();
					let supplier_2 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Infrared,40.91))
										.With_Part(new RobotPart(PartTypes.Body,Body.Triangular,410.05))
										.With_Part(new RobotPart(PartTypes.Arms,Arms.Pinchers,199.00))
										.With_Part(new RobotPart(PartTypes.Movement,Movement.Wheels,1135.50))
										.With_Part(new RobotPart(PartTypes.Power,Power.Solar,990.99))
										.With_Name("Supplier 2")
										.Build();
					let supplier_3 = new CreateTestPartsSupplier()
										.With_Part(new RobotPart(PartTypes.Head,Heads.Infrared,110.95))
										.With_Part(new RobotPart(PartTypes.Body,Body.Triangular,401.05))
										.With_Part(new RobotPart(PartTypes.Arms,Arms.Pinchers,95.95))
										.With_Part(new RobotPart(PartTypes.Movement,Movement.Wheels,1035.55))
										.With_Part(new RobotPart(PartTypes.Power,Power.Solar,899.90))
										.With_Part(new RobotPart(PartTypes.Power,Power.Biomass,999.90))
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
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Body", "Triangular");
					expect(supplier_1.Purchase_Part).toHaveBeenCalledWith("Power", "Solar");
					expect(supplier_2.Purchase_Part).toHaveBeenCalledWith("Head", "Infrared Vision");
					expect(supplier_3.Purchase_Part).toHaveBeenCalledWith("Arms", "Pinchers");
					expect(supplier_3.Purchase_Part).toHaveBeenCalledWith("Movement", "Wheels");
				});
			});
		});
	});
});