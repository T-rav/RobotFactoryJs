let CreateTestPartsSupplier = function(){
    let _name = "(undefined)";
    let _fetchUrl = "/un/defined";
    let _parts = [];

    return {
        With_Part:function(part){
            _parts.push(part);
            return this;
        },
        With_Name:function(name){
            _name = name;
            return this;
        },
        With_Fetch_Url:function(fetchUrl){
            _fetchUrl = fetchUrl;
            return this;
        },
        Build:function(){
            setupHttpRequestForSupplier(_fetchUrl, _parts);
            return new PartsSupplier(_name, _fetchUrl);
        }
    }
}

function setupHttpRequestForSupplier(fetchUrl, parts) {
    jasmine.Ajax.stubRequest(fetchUrl).andReturn({
        "responseText": JSON.stringify(parts)
    });
}