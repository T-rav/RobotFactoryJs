let RobotPartFactory=function(){

    return {
        Create_Head:function(description, price){
            return new RobotPart(PartTypes.Head,description,price);
        },
        Create_Body:function(description, price){
            return new RobotPart(PartTypes.Create_Body,description,price);
        },
        Create_Arms:function(description, price){
            return new RobotPart(PartTypes.Arms,description,price);
        },
        Create_Transport:function(description, price){
            return new RobotPart(PartTypes.Trasport,description,price);
        },
        Create_Power:function(description, price){
            return new RobotPart(PartTypes.Power,description,price);
        }
    }
}
    