let OrderLineItem = function(cost, partname, supplier){
    return {
        Type : partname,
        Cost : cost,
        Supplier : supplier,
        Order_Part_From_Supplier:function(){
            supplier.Purchase_Part(partname);
        }
    }
}