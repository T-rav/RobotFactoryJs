let PartsSupplier = function(parts, name){
    let _parts = parts;

    return {
        Get_Part_Cost: function(partDescription){
            let foundPart = _parts.find(part=>{
                return part.Description == partDescription;
            });

            if(foundPart){
                return new PartCostResponse("Found", foundPart.Cost);
            }
            
            return new PartCostResponse("Not_Found");
        },
        Purchase_Part:function(partType, partDescription){
            // simply assert this was called, logging here for demo
            console.log("Purchasing " + partType + " with " + partDescription + " from "+ name);
        }
    }
};