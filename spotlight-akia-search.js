function Search() {
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

		results += "\n[-] Terminal Does NOT have Full Disk Access...Checking key folders now...\n";


		try {
			var dir_check = currentApp.doShellScript('mdfind kMDItemKind=Folder');
			var dir_check2 = dir_check.split('\r');

			for(let p=0; p<dir_check2.length; p++){
				if (dir_check2[p] == "/Users/" + username + "/Desktop"){
					p1 = 1;




				}
				if (dir_check2[p] == "/Users/" + username + "/Documents"){
					p2 = 1;



				}
				if (dir_check2[p] == "/Users/" + username + "/Downloads"){
					p3 = 1;


				}



			}

			console.log(p1);
			console.log(p2);
			console.log(p3);

			if(p1 > 0){
				results += "[+] Terminal DOES HAVE folder access to /Users/" + username + "/Desktop. Searching this folder now for files with AKIA string matches...\n";
				var desktopcheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Desktop"));
				var desktopcheck2 = desktopcheck.split('\r');
				results += "\n----> Desktop Folder Search Results:\n";
				for(let q=0; q<desktopcheck2.length; q++){
					results += desktopcheck2[q];
					results += '\n';
				}

			}
			else {
				results += "\n[-] Terminal DOES NOT have folder access to /Users/" + username + "/Desktop. Will NOT search this folder.\n"
			}

			if(p2 > 0){
				results += "[+] Terminal DOES HAVE folder access to /Users/" + username + "/Documents. Searching this folder now for files with AKIA string matches...\n";
				var documentscheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Documents"));
				var documentscheck2 = documentscheck.split('\r');
				results += "\n----> Documents Folder Search Results:\n";
				for(let y=0; y<documentscheck2.length; y++){
					results += documentscheck2[y];
					results += '\n';

				}
			}
			else {
				results += "\n[-] Terminal DOES NOT have folder access to /Users/" + username + "/Documents. Will NOT search this folder.\n"
			}

			if(p3 > 0){
				results += "[+] Terminal DOES HAVE folder access to /Users/" + username + "/Downloads. Searching this folder now for files with AKIA string matches...\n";
				var downloadsscheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Downloads"));
				var downloadsscheck2 = downloadsscheck.split('\r');
				results += "\n----> Downloads Folder Search Results:\n";
				for(let l=0; l<downloadsscheck2.length; l++){
					results += downloadsscheck2[l];
					results += '\n';
				}
			}
			else {
				results += "\n[-] Terminal DOES NOT have folder access to /Users/" + username + "/Downloads. Will NOT search this folder.\n"
			}


			results += "\nSearching /Users/" + username + " for files with AKIA string matches...\n";
			var homecheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~"));
			var homecheck2 = homecheck.split('\r');
			results += "\n----> HomeDir Search Results:\n";
			for(let z=0; z<homecheck2.length; z++){
				results += homecheck2[z];
				results += '\n';
			}

		}
		catch(error){
			results += error
			results += '\n';
			results += "#######################################\n";
		}


	}
	else {
		results += "[+] Terminal HAS ALREADY been given FDA! Searching ~, ~/Desktop, ~/Documents, and ~/Downloads for files containing AKIA strings\n";
		results += "#######################################\n";

		try {
			var desktopcheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Desktop"));
			var desktopcheck2 = desktopcheck.split('\r');
			results += "\n----> Desktop Folder Search Results:\n";
			for(let q=0; q<desktopcheck2.length; q++){
				results += desktopcheck2[q];
				results += '\n';
			}

			var documentscheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Documents"));
			var documentscheck2 = documentscheck.split('\r');
			results += "\n----> Documents Folder Search Results:\n";
			for(let y=0; y<documentscheck2.length; y++){
				results += documentscheck2[y];
				results += '\n';
			}

			var downloadsscheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~/Downloads"));
			var downloadsscheck2 = downloadsscheck.split('\r');
			results += "\n----> Downloads Folder Search Results:\n";
			for(let l=0; l<downloadsscheck2.length; l++){
				results += downloadsscheck2[l];
				results += '\n';
			}

			var homecheck = ObjC.deepUnwrap(currentApp.doShellScript("mdfind AKIA -onlyin ~"));
			var homecheck2 = homecheck.split('\r');
			results += "\n----> HomeDir Search Results:\n";
			for(let z=0; z<homecheck2.length; z++){
				results += homecheck2[z];
				results += '\n';
			}


		}
		catch(error){
			results += error
			results += '\n';
			results += "#######################################\n";
		}




	}
}
catch(error){
		results += error
		results += '\n';
		results += "#######################################\n";

	}


results += "\n#######################################\n";

return results
}

Search()
