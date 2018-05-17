let RobotFactory = function(partsSuppliers){
  let _partsSuppliers = partsSuppliers;
  let _headType;
  let _bodyType;
  let _armType;
  let _movementType;
  let _powerType;

  let fetch_cheapest_parts = function(){
    let parts = [];

    let fetchCost = function(supplier, partType){
      let partCostResponse = supplier.Get_Part_Cost(partType);

      if(partCostResponse.Supplier_Has_Part()){
        let partIndex = parts.findIndex(part=>{
          return part.Type == partType;
        });

        let lineItem = new OrderLineItem(partCostResponse.Cost, partType, supplier);
        if(partIndex == -1){
          parts.push(lineItem)
        }else if(parts[partIndex].Cost > partCostResponse.Cost){
          parts[partIndex] = lineItem;
        }
      }
    }

    _partsSuppliers.forEach(supplier => {
      fetchCost(supplier, _headType);
      fetchCost(supplier, _bodyType);
      fetchCost(supplier, _armType);
      fetchCost(supplier, _movementType);
      fetchCost(supplier, _powerType);
    });

    return parts;
  }

  let create_cost_response = function(parts){
    let cost = 0;
    parts.forEach(part=>{
      cost += part.Cost;
    });

    return {
      Cost: cost.toFixed(2),
      Parts : parts,
      Purchase_Robot: function(){
        parts.forEach(lineItem=>{
          lineItem.Order_Part_From_Supplier();
        });
      }
    }
  }

  return{
    With_Head : function(headType){
      _headType = headType;
      return {
        With_Body:function(bodyType){
          _bodyType = bodyType;
          return {
            With_Arms:function(armType){
              _armType = armType;
              return {
                With_Movement:function(movementType){
                  _movementType = movementType;
                  return {
                    With_Power:function(powerType){
                      _powerType = powerType;
                      return {
                        Cost_Robot:function(){
                          let parts = fetch_cheapest_parts();
                          return create_cost_response(parts);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
