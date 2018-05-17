describe("PartsSupplier", function () {
    describe("Get_Part_cost", function(){
        describe("When Part Not Found", function(){
            it("Should return Status of Not_Found", function(){
                
                // arrange
                let parts = [];
                let sut = CreatePartsSupplier(parts);
                // act
                let acutal = sut.Get_Part_Cost(Heads.Standard);
                // assert
                const expected = "Not_Found";
                expect(acutal.Status).toBe(expected);
            });
            it("Should return Cost as undefined", function(){
                
                // arrange
                let parts = [];
                let sut = CreatePartsSupplier(parts);
                // act
                let actual = sut.Get_Part_Cost(Heads.Standard);
                // assert
                const expected = "Not_Found";
                expect(actual.Cost).toBeUndefined(actual.Cost);
            });
        });
        describe("When Part Found", function(){
            it("Should return Status of Found", function(){
                
                // arrange
                let parts = [new RobotPart(Heads.Infrared, 999.99)];
                let sut = CreatePartsSupplier(parts);
                // act
                let actual = sut.Get_Part_Cost(Heads.Infrared);
                // assert
                const expected = "Found";
                expect(actual.Status).toBe(expected);
            });
            it("Should return Cost as part price", function(){
                
                // arrange
                let parts = [new RobotPart(Heads.Infrared,999.99)];
                let sut = CreatePartsSupplier(parts);
                // act
                let actual = sut.Get_Part_Cost(Heads.Infrared);
                // assert
                const expected = 999.99;
                expect(actual.Cost).toBe(expected);
            });
        });
    });
});

function CreatePartsSupplier(parts) {
    return new PartsSupplier(parts);
}
