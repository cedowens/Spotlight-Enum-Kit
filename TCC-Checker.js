
function Check() {
ObjC.import('CoreServices')
ObjC.bindFunction('CFMakeCollectable', ['id', ['void *']])

var p1 = 0;
var p2 = 0;
var p3 = 0;
var results = "";
var username = $.NSUserName().js;

var queryString = "kMDItemKind = Folder -onlyin ~";
let query = $.MDQueryCreate($(), $(queryString), $(), $());

if ($.MDQueryExecute(query, 1)){
  for(var i = 0; i < $.MDQueryGetResultCount(query); i++){
    var mdItem = $.MDQueryGetResultAtIndex(query, i);
    var mdAttrs1 = $.MDItemCopyAttribute($.CFMakeCollectable(mdItem), $.kMDItemPath)
    var mdAttrs = ObjC.deepUnwrap(mdAttrs1);

     if (mdAttrs == "/Users/" + username + "/Desktop"){
       p1 = 1;
       results += "[+] Terminal already has folder access to /Users/" + username + "/Desktop\n";

     }

     if (mdAttrs == "/Users/" + username + "/Documents"){
       p2 = 1;
       results += "[+] Terminal already has folder access to /Users/" + username + "/Documents\n";

     }

     if (mdAttrs == "/Users/" + username + "/Downloads"){
       p3 = 1;
       results += "[+] Terminal already has folder access to /Users/" + username + "/Downloads\n";

     }

   }

   if (p1 == 0){
     results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Desktop. Tread carefully!\n";

   }

   if (p2 == 0){
     results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Documents. Tread carefully!\n";

   }

   if (p3 == 0){
     results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Downloads. Tread carefully!\n";

   }

   results += "\n##########################################\n"


}

return results
}

//Check()
