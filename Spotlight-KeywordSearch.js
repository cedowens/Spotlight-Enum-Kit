function Check() {
ObjC.import('Cocoa');
ObjC.import('Foundation');
ObjC.import('stdlib');

var currentApp = Application.currentApplication();
currentApp.includeStandardAdditions = true;
var results = "";
var username = $.NSUserName().js;
var home = "/Users/" + username

//---------Check for Files With Keyword Password In User's Home Dir/Subdirs------------------
results += "##################Password Keyword Search (from Spotlight db)############################\n";

var dir_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind password -onlyin " + home));
var dir_check2 = dir_check.split('\r');
for(let i=0; i<dir_check2.length; i++){
	if (!(dir_check2[i].includes("/Application Support/")) && !(dir_check2[i].includes("/Library"))){
		results += dir_check2[i];
        	results += '\n';
	}

}

//---------Check for Files with Keyword Token in User's Home Dir/Subdirs------------------
results += "\n\n##################Token Keyword Search (from Spotlight db)############################\n";

var d_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind token -onlyin " + home));
var d_check2 = d_check.split('\r');
for(let i=0; i<d_check2.length; i++){
	if (!(d_check2[i].includes("/Application")) && !(d_check2[i].includes("Containers/")) ){
                results += d_check2[i];
                results += '\n';


        }

}

//---------Check for Files with Keyword Secret in User's Home Dir/Subdirs------------------
results += "\n\n##################Secret Keyword Search (from Spotlight db)############################\n";

var d2_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind secret -onlyin " + home));
var d2_check2 = d2_check.split('\r');
for(let i=0; i<d2_check2.length; i++){
	if (!(d2_check2[i].includes("/Application Support/"))){
		results += d2_check2[i];
        	results += '\n';


	}

}


return results
}

//Check()
