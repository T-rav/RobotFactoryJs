let PartsSupplier = function(name, fetchUrl){
    return {
        Get_Part_Cost: function(partDescription){
            let result = new PartCostResponse("Not_Found");

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(args) {
                if (this.readyState == this.DONE) {

                    let parts = JSON.parse(this.responseText);
                    let foundPart = parts.find(part=>{
                        return part.Description == partDescription;
                    });

                    if(foundPart){
                        result = new PartCostResponse("Found", foundPart.Cost);
                    }
                }
            };
            xhr.open("GET", fetchUrl, true);
            xhr.send(null);

            return result;
        },
        Purchase_Part:function(partType, partDescription){
            // simply assert this was called, logging here for demo
            console.log("Purchasing " + partType + " with " + partDescription + " from "+ name);
        }
    }
};