let PartsSupplier = function(name, fetchUrl, purchaseUrl){

    let supplierWebRequest = function(callbackFn){
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function(args) {
            if (this.readyState == this.DONE) {
                callbackFn(this.responseText);
            }
        };
        return xhr;
    };

    return {
        Get_Part_Cost: function(partDescription){
            let result = new PartCostResponse("Not_Found");

            let costResponseCallback = function(responseText){
                let parts = JSON.parse(responseText);
                let foundPart = parts.find(part=>{
                    return part.Description == partDescription;
                });

                if(foundPart){
                    result = new PartCostResponse("Found", foundPart.Cost);
                }
            };

            let xhr = supplierWebRequest(costResponseCallback);
            xhr.open("GET", fetchUrl, true);
            xhr.send(null);

            return result;
        },
        Purchase_Part:function(partType, partDescription){

            let purchasePartCallback = function(payload){
                console.log(payload);
            };

            let purchasePayload = new PurchasePayload(partType, partDescription);

            let xhr = supplierWebRequest(purchasePartCallback);
            xhr.open("POST", purchaseUrl, true);
            xhr.send(purchasePayload);
        }
    }
};