function Check() {
ObjC.import('Cocoa');
ObjC.import('Foundation');
ObjC.import('stdlib');

var currentApp = Application.currentApplication();
currentApp.includeStandardAdditions = true;
var results = "";
var username = $.NSUserName().js;
var home = "/Users/" + username

//---------Check for Recently Modified Files------------------
results += "\n##################Recently Modified Files (from Spotlight db)############################\n";

var dir_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind 'kMDItemFSName=\"*.*\" && kMDItemFSContentChangeDate >= $time.this_week(-2)'"));
var dir_check2 = dir_check.split('\r');
var c1 = 0;
for(let i=0; i<dir_check2.length; i++){
	if (dir_check2[i].includes(home) && !(dir_check2[i].includes("/Application Support/")) && !(dir_check2[i].includes("/Containers/")) && !(dir_check2[i].includes("/Library/")) && !(dir_check2[i].includes("/Movies/")) && !(dir_check2[i].includes("/Pictures")) && !(dir_check2[i].includes("Xcode")) && !(dir_check2[i].includes("Homebrew")) && !(dir_check2[i].includes("/zoom")) ){
		c1 = c1 + 1;
		if (c1 <= 50){
		results += dir_check2[i];
                results += '\n';
		}
	}

}

//---------Check for Recently Created Files------------------
results += "\n\n##################Recently Created Files (from Spotlight db)############################\n";

var d_check = ObjC.deepUnwrap(currentApp.doShellScript("mdfind 'kMDItemFSName=\"*.*\" && kMDItemFSCreationDate >= $time.this_week(-2)'"));
var d_check2 = d_check.split('\r');
var c2 = 0;
for(let i=0; i<d_check2.length; i++){
        if (d_check2[i].includes(home) && !(d_check2[i].includes("/Application Support/")) && !(d_check2[i].includes("/Containers/")) && !(d_check2[i].includes("/Library/")) && !(d_check2[i].includes("/Movies/")) && !(dir_check2[i].includes("/Pictures")) && !(dir_check2[i].includes("Xcode")) && !(dir_check2[i].includes("Homebrew")) && !(dir_check2[i].includes("/zoom")) ){
		c2 = c2 + 1;
		if (c2 <= 50){
		results += d_check2[i];
                results += '\n';
		}
        }

}


return results
}

//Check()

