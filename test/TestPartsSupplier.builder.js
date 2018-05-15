let TestPartsSupplierBuilder = function(){
    let _parts = [];
    return {
        With_Part:function(part){
            _parts.push(part);
            return this;
        },
        Build:function(name){
            return new PartsSupplier(_parts, name);
        }
    }
}