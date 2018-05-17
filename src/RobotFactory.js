let RobotFactory = function(partsSuppliers){
  let _partsSuppliers = partsSuppliers;
  let _headType;
  let _bodyType;
  let _armType;
  let _movementType;
  let _powerType;

  let fetch_cheapest_parts = function(){
    let order = [];

    let fetchCost = function(supplier, partDescription, partType){
      let partCostResponse = supplier.Get_Part_Cost(partDescription);

      if(partCostResponse.Supplier_Has_Part()){
        let partIndex = order.findIndex(part=>{
          return part.Description == partDescription;
        });

        let lineItem = new QuoteLineItem(partCostResponse.Cost, partType, partDescription, supplier);
        if(partIndex == -1){
          order.push(lineItem)
        }else if(order[partIndex].Cost > partCostResponse.Cost){
          order[partIndex] = lineItem;
        }
      }
    }

    _partsSuppliers.forEach(supplier => {
      fetchCost(supplier, _headType, PartTypes.Head);
      fetchCost(supplier, _bodyType, PartTypes.Body);
      fetchCost(supplier, _armType, PartTypes.Arms);
      fetchCost(supplier, _movementType, PartTypes.Movement);
      fetchCost(supplier, _powerType, PartTypes.Power);
    });

    return order;
  }

  let build_order_errors = function(partTypesFound){
    let requiredParts = [PartTypes.Head, PartTypes.Body, PartTypes.Arms, PartTypes.Movement, PartTypes.Power];
    let errors = [];

    requiredParts.forEach(type=>{
      let found = partTypesFound.includes(type);

      if(!found){
        errors.push("Could not find supplier with the requested [" + type + "]");
      }
    });

    return errors;
  };

  let create_cost_response = function(order){
    let cost = 0;
    let partTypes = [];
    order.forEach(part=>{
      cost += part.Cost;
      partTypes.push(part.Type);
    });

    let errors = build_order_errors(partTypes);

    return {
      Cost: cost.toFixed(2),
      Parts : order,
      Errors : errors,
      Purchase_Robot: function(){
        order.forEach(lineItem=>{
          lineItem.Order_Part_From_Supplier();
        });
      },
      Has_Errors:function(){
        return this.Errors.length > 0;
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
