let TestPartsSupplierBuilder = function(){
    let _parts = [];
    let _name = "(undefined)";
    return {
        With_Part:function(part){
            _parts.push(part);
            return this;
        },
        With_Name:function(name){
            _name = name;
            return this;
        },
        Build:function(){
            return new PartsSupplier(_parts, _name);
        }
    }
}