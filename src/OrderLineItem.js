let OrderLineItem = function(cost, partType, partDescription, supplier){
    return {
        Type : partType,
        Description : partDescription,
        Cost : cost,
        Supplier : supplier,
        Order_Part_From_Supplier:function(){
            supplier.Purchase_Part(partType, partDescription); 
        }
    }
}