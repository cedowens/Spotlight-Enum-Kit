function Check() {
ObjC.import('CoreServices')
ObjC.bindFunction('CFMakeCollectable', ['id', ['void *']])

var p1 = 0;
var results = "";
results += "\n##########################################\n"
var username = $.NSUserName().js;

var queryString = "kMDItemDisplayName = *TCC.db";
let query = $.MDQueryCreate($(), $(queryString), $(), $());

if ($.MDQueryExecute(query, 1)){
  for(var i = 0; i < $.MDQueryGetResultCount(query); i++){
    var mdItem = $.MDQueryGetResultAtIndex(query, i);
    var mdAttrs1 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem), $.kMDItemPath)
    var mdAttrs = ObjC.deepUnwrap(mdAttrs1);

     if (mdAttrs.endsWith("/Users/" + username + "/Library/Application Support/com.apple.TCC/TCC.db")){
       p1 = 1;
       results += "[+] This app context already has full disk access (mdquery can see the user's TCC.db file)\n";

     }


   }

   if (p1 == 0){
     results += "[-] This app context has NOT yet been given full disk access. Tread carefully!\n";

   }

   results += "\n##########################################\n"


}

return results
}

Check()
