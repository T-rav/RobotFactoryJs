describe("PartCostResponse",function(){
    describe("Supplier_Has_Part",function(){
        describe("When Status Found", function(){
            it("Should return true", function(){
                // arrange
                let sut = new PartCostResponse("Found");
                // act
                let actual = sut.Supplier_Has_Part();
                // assert
                expect(actual).toBeTruthy();
            });
        });
        describe("When Status Anything But Found", function(){
            ["_Found",
            "Not_Found"].forEach(response=>{
                it("Should return false", function(){
                    // arrange
                    let sut = new PartCostResponse(response);
                    // act
                    let actual = sut.Supplier_Has_Part();
                    // assert
                    expect(actual).toBeFalsy();
                });
            });
        });
    });
});