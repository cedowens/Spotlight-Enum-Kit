
function Check() {
ObjC.import('CoreServices')
ObjC.bindFunction('CFMakeCollectable', ['id', ['void *']])

var c1 = 0;
var c2 = 0;

var results = "";
var username = $.NSUserName().js;
var home = "/Users/" + username

var queryString = "kMDItemFSName=\"*.*\" && kMDItemFSCreationDate >= $time.this_week(-2)";
var queryString2 = "kMDItemFSName=\"*.*\" && kMDItemFSContentChangeDate >= $time.this_week(-2)";

let query = $.MDQueryCreate($(), $(queryString), $(), $());

if ($.MDQueryExecute(query, 1)){
  results += "\n##################Recently Created Files Search (from Spotlight db)############################\n";
  for(var i = 0; i < $.MDQueryGetResultCount(query); i++){
    var mdItem = $.MDQueryGetResultAtIndex(query, i);
    var mdAttrs1 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem), $.kMDItemPath)
    var mdAttrs = ObjC.deepUnwrap(mdAttrs1);

     if (mdAttrs.includes(home) && !(mdAttrs.includes("/Application Support/")) && !(mdAttrs.includes("/Containers/")) && !(mdAttrs.includes("/Library/")) && !(mdAttrs.includes("/Movies/")) && !(mdAttrs.includes("/Pictures")) && !(mdAttrs.includes("Xcode")) && !(mdAttrs.includes("Homebrew")) && !(mdAttrs.includes("/zoom")) ){
       c1 += 1;
       if (c1 <= 50){
         results += mdAttrs;
         results += '\n';
       }

     }


}
}

let query2 = $.MDQueryCreate($(), $(queryString2), $(), $());
if ($.MDQueryExecute(query2, 1)){
  results += "\n##################Recently Modified Files Search (from Spotlight db)############################\n";
  for(var c = 0; c < $.MDQueryGetResultCount(query2); c++){
    var mdItem2 = $.MDQueryGetResultAtIndex(query2, c);
    var mdAttrs3 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem2), $.kMDItemPath)
    var mdAttrs2 = ObjC.deepUnwrap(mdAttrs3);

     if (mdAttrs2.includes(home) && !(mdAttrs2.includes("/Application Support/")) && !(mdAttrs2.includes("/Containers/")) && !(mdAttrs2.includes("/Library/")) && !(mdAttrs2.includes("/Movies/")) && !(mdAttrs2.includes("/Pictures")) && !(mdAttrs2.includes("Xcode")) && !(mdAttrs2.includes("Homebrew")) && !(mdAttrs2.includes("/zoom")) ){
       c2 += 1;
       if (c2 <= 30){
         results += mdAttrs2;
         results += '\n';
       }

     }


}
}



return results
}

//Check()
