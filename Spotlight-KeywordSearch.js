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
results += "\n##################Password Keyword Search (from Spotlight db)############################\n";

var dir_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind password -onlyin " + home));
var dir_check2 = dir_check.split('\r');
var c1 = 0;
for(let i=0; i<dir_check2.length; i++){
	if (!(dir_check2[i].includes("/Application Support/")) && !(dir_check2[i].includes("/Library")) && !(dir_check2[i].includes("/zoom")) ){
		c1 = c1 + 1;
		if (c1 <= 25){
			results += dir_check2[i];
                	results += '\n';
		}
	}

}

//---------Check for Files with Keyword Token in User's Home Dir/Subdirs------------------
results += "\n\n##################Token Keyword Search (from Spotlight db)############################\n";

var d_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind token -onlyin " + home));
var d_check2 = d_check.split('\r');
var c2 = 0;
for(let i=0; i<d_check2.length; i++){
	if (!(d_check2[i].includes("/Application")) && !(d_check2[i].includes("Containers/")) && !(d_check2[i].includes("/zoom")) ){
		c2 = c2 + 1;
		if (c2 <= 25) {
			results += d_check2[i];
                	results += '\n';
		}


        }

}

//---------Check for Files with Keyword Secret in User's Home Dir/Subdirs------------------
results += "\n\n##################Secret Keyword Search (from Spotlight db)############################\n";

var d2_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind secret -onlyin " + home));
var d2_check2 = d2_check.split('\r');
var c3 = 0;
for(let i=0; i<d2_check2.length; i++){
	if (!(d2_check2[i].includes("/Application Support/")) && !(d2_check2[i].includes("/zooom")) ){
		c3 = c3 + 1;
		if (c3 <= 25){
			results += d2_check2[i];
                	results += '\n';
		}


	}

}


return results
}

//Check()

