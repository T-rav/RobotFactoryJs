let PartsSupplier = function(parts){
    let _parts = parts;

    // todo : test this
    return {
        Get_Part_Cost: function(partName){
            let foundPart = _parts.find(part=>{
                return part.Name == partName;
            });

            if(foundPart){
                return { Status: "Found", Cost: foundPart.Cost};
            }
            
            return {Status:"Not_Found"};
        },
        Purchase_Part:function(partsToPurchase){
            // simply assert this was called
        }
    }
};