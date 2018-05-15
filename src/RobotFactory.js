let RobotFactory = function(partsSuppliers){
  let _partsSuppliers = partsSuppliers;
  let _headType;
  let _bodyType;
  let _armType;
  let _movementType;
  let _powerType;

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
                        
                          // todo: store cheapest parts with supplier to contact
                          let parts = []; // collect all cost
                          let cost = 0;

                          let fetchCost = function(supplier, partType){
                            let partCostResponse = supplier.Get_Part_Cost(partType);
                            if(partCostResponse.Status == "Found"){
                              cost += partCostResponse.Cost;
                              parts.push({type:partType, cost:partCostResponse.Cost, supplier:supplier});
                            }
                          }

                          _partsSuppliers.forEach(supplier => {
                            fetchCost(supplier, _headType);
                            fetchCost(supplier, _bodyType);
                            fetchCost(supplier, _armType);
                            fetchCost(supplier, _movementType);
                            fetchCost(supplier, _powerType);
                          });

                          // todo : find cheapest for each type and add 
                          return {
                            Cost: cost.toFixed(2),
                            Parts : parts,
                            Purchase_Robot: function(){
                              //parts[0].supplier.Purchase_Part();
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
  }
}
