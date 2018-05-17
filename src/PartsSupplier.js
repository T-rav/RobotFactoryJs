let PartsSupplier = function(parts, name){
    let _parts = parts;
    let _name = name;

    return {
        Get_Part_Cost: function(partName){
            let foundPart = _parts.find(part=>{
                return part.Name == partName;
            });

            if(foundPart){
                return new PartCostResponse("Found", foundPart.Cost);
            }
            
            return new PartCostResponse("Not_Found");
        },
        Purchase_Part:function(partsToPurchase){
            // simply assert this was called, logging here for demo
            console.log("Purchasing " + partsToPurchase + " from "+ _name);
        }
    }
};