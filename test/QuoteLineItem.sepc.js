describe("QuoteLineItem", function(){
    describe("Order_Part_From_Supplier",function(){
        it("Should call call supplier's Purchase_Part", function(){
            // arrange
            let part = new RobotPart(Parts.Arms, Arms.BoxingGloves, 100.99);
            let supplier = new PartsSupplier([part],"supplier 1");
            spyOn(supplier, "Purchase_Part")
            // cost, partType, partDescription, supplier
            let sut = new QuoteLineItem(99.99,PartTypes.Arms, "Boxing Gloves", supplier);
            // act
            supplier.Order_Part_From_Supplier();
            // assert
            expect(supplier.Purchase_Part).toHaveBeenCalledWith(PartTypes.Arms, "Boxing Gloves");
        });
    });
});