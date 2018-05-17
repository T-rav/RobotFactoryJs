let PartCostResponse = function(status, cost){
    return {
        Status: status,
        Cost: cost,
        Supplier_Has_Part : function(){
            return this.Status == "Found";
        }
    }
}