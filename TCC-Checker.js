function Check() {
ObjC.import('Cocoa');
ObjC.import('Foundation');
ObjC.import('stdlib');

var currentApp = Application.currentApplication();
currentApp.includeStandardAdditions = true;
var results = "";
var p1 = 0;
var p2 = 0;
var p3 = 0;

//---------Full Disk Access Check-----------------
results += "#######################################\n";
results += "Full Disk Access Check\n";
var username = $.NSUserName().js
try{
	var dbpath = '/Users/' + username + '/Library/Application\ Support/com.apple.TCC/TCC.db'
	var handle = $.NSFileHandle.fileHandleForReadingAtPath(dbpath);
	var size = handle.seekToEndOfFile;
	var conv = this.toString(size);
	if (size == null){
		results += '[-] Terminal has NOT yet been given FDA\n';
		results += "#######################################\n";
	}
	else {
		results += '[+] Terminal HAS ALREADY been given FDA! Size of the user TCC.db file is ' + size + '\n';
		results += "#######################################\n";
	}
}
catch(error){
		results += error
		results += '\n';
		results += "#######################################\n";

	}

//---------Check for TCC Folder Accesses------------------
results += "TCC Folder Check\n";
var dir_check = currentApp.doShellScript('mdfind kMDItemKind=Folder');
var dir_check2 = dir_check.split('\r');

for(let p=0; p<dir_check2.length; p++){
	if (dir_check2[p] == "/Users/" + username + "/Desktop"){
		p1 = 1;
		results += "[+] Terminal already has folder access to /Users/" + username + "/Desktop\n";
	}
	if (dir_check2[p] == "/Users/" + username + "/Documents"){
		p2 = 1;
		results += "[+] Terminal already has folder access to /Users/" + username + "/Documents\n";
	}
	if (dir_check2[p] == "/Users/" + username + "/Downloads"){
		p3 = 1;
		results += "[+] Terminal already has folder access to /Users/" + username + "/Downloads\n";
	}
}


if (p1 == 0){
	results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Desktop. Tread carefully!!\n";
}

if (p2 == 0){
        results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Documents. Tread carefully!!\n";
}

if (p3 == 0){
        results += "[-] Terminal has NOT yet been given access to /Users/" + username + "/Downloads. Tread carefully!!\n";
}

results += "#######################################\n";

return results
}

//Check()

