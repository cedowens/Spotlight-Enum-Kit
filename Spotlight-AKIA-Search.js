
function Check() {
ObjC.import('CoreServices')
ObjC.bindFunction('CFMakeCollectable', ['id', ['void *']])

var c1 = 0;
var c2 = 0;
var c3 = 0;

var results = "";
var username = $.NSUserName().js;

var queryString = "kMDItemTextContent == AKIA || kMDItemDisplayName = *AKIA* -onlyin  ~";

let query = $.MDQueryCreate($(), $(queryString), $(), $());

if ($.MDQueryExecute(query, 1)){
  results += "\n##################Password Keyword Search (from Spotlight db)############################\n";
  for(var i = 0; i < $.MDQueryGetResultCount(query); i++){
    var mdItem = $.MDQueryGetResultAtIndex(query, i);
    var mdAttrs1 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem), $.kMDItemPath)
    var mdAttrs = ObjC.deepUnwrap(mdAttrs1);

     if (!(mdAttrs.includes("/Application Support/")) && !(mdAttrs.includes("/Library")) && !(mdAttrs.includes("/zoom")) ){
       c1 += 1;
       if (c1 <= 30){
         results += mdAttrs;
         results += '\n';
       }

     }


}
}

return results
}

Check()
