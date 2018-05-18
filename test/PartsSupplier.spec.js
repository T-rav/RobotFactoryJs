describe("PartsSupplier", function () {
    beforeEach(function(){
        jasmine.Ajax.install();
    });
    afterEach(function(){
        jasmine.Ajax.uninstall();
    });
    describe("Get_Part_cost", function(){
        describe("When Part Not Found", function(){
            it("Should return Status of Not_Found", function(){
                // arrange
                let parts = [];
                let fetchUrl = "/fetch/inventory";
                setupHttpRequestForSupplier(fetchUrl, parts);
                let sut = CreatePartsSupplier(fetchUrl);
                // act
                let acutal = sut.Get_Part_Cost(Heads.Standard);
                // assert
                const expected = "Not_Found";
                expect(acutal.Status).toBe(expected);
            });
            it("Should return Cost as undefined", function(){
                // arrange
                let parts = [];
                let fetchUrl = "/fetch/inventory";
                setupHttpRequestForSupplier(fetchUrl, parts);
                let sut = CreatePartsSupplier(fetchUrl);
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
                let parts = [new RobotPart(PartTypes.Head, Heads.Infrared, 999.99)];
                let fetchUrl = "/fetch/inventory";
                setupHttpRequestForSupplier(fetchUrl, parts);
                let sut = CreatePartsSupplier(fetchUrl);
                // act
                let actual = sut.Get_Part_Cost(Heads.Infrared);
                // assert
                const expected = "Found";
                expect(actual.Status).toBe(expected);
            });
            it("Should return Cost as part price", function(){
                // arrange
                let parts = [new RobotPart(PartTypes.Head, Heads.Infrared,999.99)];
                let fetchUrl = "/fetch/inventory";
                setupHttpRequestForSupplier(fetchUrl, parts);
                let sut = CreatePartsSupplier(fetchUrl);
                // act
                let actual = sut.Get_Part_Cost(Heads.Infrared);
                // assert
                const expected = 999.99;
                expect(actual.Cost).toBe(expected);
            });
        });
    });
    describe("Purchase_Part", function(){
        describe("When purchasing", function(){
            it("Should POST a PurchasePayload to order url", function(){
                // arrange
                let purchaseResponse = {TransactionId:"abc-123",PurchaseTotal:99.45};
                let orderUrl = "/order";
                let costUrl = "/cost";
                setupHttpRequestForSupplier(orderUrl, purchaseResponse);
                let sut = CreatePartsSupplier(costUrl,orderUrl);
                // act
                sut.Purchase_Part(PartTypes.Power, Power.Solar);
                const request = jasmine.Ajax.requests.mostRecent();
                // assert
                const expectedPurchasePayload = new PurchasePayload(PartTypes.Power, Power.Solar);
                const expectedMethod = "POST";
                const expectedUrl = "/order";
                expect(request.url).toBe(expectedUrl);
                expect(request.method).toBe(expectedMethod);
                expect(request.params).toEqual(expectedPurchasePayload);
            });
        });
        describe("When purchase successful", function(){
            it("Should return transactionId and total", function(){
                // arrange
                let purchaseResponse = {TransactionId:"abc-123",PurchaseTotal:99.45};
                let orderUrl = "/order";
                let costUrl = "/cost";
                setupHttpRequestForSupplier(orderUrl, purchaseResponse);
                let sut = CreatePartsSupplier(costUrl,orderUrl);
                // act
                sut.Purchase_Part(PartTypes.Power, Power.Solar);
                const request = jasmine.Ajax.requests.mostRecent();
                // assert
                const expectedPurchaseResponse = JSON.stringify(purchaseResponse);
                expect(request.responseText).toBe(expectedPurchaseResponse);
            });
        });
    });
});

function setupHttpRequestForSupplier(fetchUrl, payload) {
    jasmine.Ajax.stubRequest(fetchUrl).andReturn({
        "responseText": JSON.stringify(payload)
    });
}

function CreatePartsSupplier(fetchUrl, orderUrl) {
    return new PartsSupplier("no-name", fetchUrl, orderUrl);
}
