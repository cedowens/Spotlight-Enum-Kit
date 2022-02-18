
function Check() {
ObjC.import('CoreServices')
ObjC.bindFunction('CFMakeCollectable', ['id', ['void *']])

var c1 = 0;
var c2 = 0;
var c3 = 0;

var results = "";
var username = $.NSUserName().js;

var queryString = "kMDItemTextContent == passw || kMDItemDisplayName = *passw* -onlyin  ~";
var queryString2 = "kMDItemTextContent == token || kMDItemDisplayName = *token* -onlyin  ~";
var queryString3 = "kMDItemTextContent == secret || kMDItemDisplayName = *secret* -onlyin  ~";

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

let query2 = $.MDQueryCreate($(), $(queryString2), $(), $());
if ($.MDQueryExecute(query2, 1)){
  results += "\n##################Token Keyword Search (from Spotlight db)############################\n";
  for(var c = 0; c < $.MDQueryGetResultCount(query2); c++){
    var mdItem2 = $.MDQueryGetResultAtIndex(query2, c);
    var mdAttrs3 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem2), $.kMDItemPath)
    var mdAttrs2 = ObjC.deepUnwrap(mdAttrs3);

     if (!(mdAttrs2.includes("/Application Support/")) && !(mdAttrs2.includes("/Library")) && !(mdAttrs2.includes("/zoom")) ){
       c2 += 1;
       if (c2 <= 30){
         results += mdAttrs2;
         results += '\n';
       }

     }


}
}


let query3 = $.MDQueryCreate($(), $(queryString3), $(), $());
if ($.MDQueryExecute(query3, 1)){
  results += "\n##################Secret Keyword Search (from Spotlight db)############################\n";
  for(var d = 0; d < $.MDQueryGetResultCount(query3); d++){
    var mdItem3 = $.MDQueryGetResultAtIndex(query3, d);
    var mdAttrs4 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem3), $.kMDItemPath)
    var mdAttrs5 = ObjC.deepUnwrap(mdAttrs4);

     if (!(mdAttrs5.includes("/Application Support/")) && !(mdAttrs5.includes("/Library")) && !(mdAttrs5.includes("/zoom")) ){
       c3 += 1;
       if (c3 <= 30){
         results += mdAttrs5;
         results += '\n';
       }

     }


}
}



return results
}

Check()
