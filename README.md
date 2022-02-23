# Spotlight Enumeration Kit
**NOTE: THIS REPO DOES NOT CONTAIN ANY TCC BYPASSES. INSTEAD THIS REPO CONTAINS EXAMPLE SCRIPTS OF SEARCHING THE SPOTLIGHT DB FOR INTERESTING INFO**

Repo of Swift and JXA projects to leverage macOS Spotlight db data for the following:

- View TCC folder permissions **(TCC-Checker.js and TCC-Checker-Swift)**

- List files in the user's homedir and subdirs that have been created in the last two weeks. Will only return results from ~/Desktop, ~/Documents, or ~/Downloads if Terminal has permissions to those respective dirs. **(Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)**

- List files in the user's homedir and subdirs that have been modified in the last two weeks. Will only return results from ~/Desktop, ~/Documents, or ~/Downloads if Terminal has permissions to those respective dirs. **(Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)**

- List files in the user's homedir and subdirs with interesting keywords ("password", "secret", and "token") in the filename or file contents. Will only return results from ~/Desktop, ~/Documents, or ~/Downloads if Terminal has permissions to those respective dirs. **(Spotlight-KeyWordSearch.js and Spotlight-KeywordSearch-Swift)**

- List files in the user's homedir and subdirs containing "AKIA" (likely an AWS access key). Will only return results from ~/Desktop, ~/Documents, or ~/Downloads if Terminal has permissions to those respective dirs. **(Spotlight-AKIA-Search.js)**

All searches above are run against the Spotlight database in a way that allows the checks to run without generating a TCC pop up to the user. 

I recommend that you cd to a non-TCC protected directory and then run the JXA scripts/Swift binaries in this repo (just in case you run into the scenario where your payload was detonated from the ~/Downloads folder but Terminal hasn't been given any TCC accesses to ~/Downloads).

## Caveat
The TCC Checker script is intended to be run from a Terminal context. If using Mythic, you can use my SwiftBelt.js tool (https://github.com/cedowens/SwiftBelt-JXA) to enumerate what context you are in.

## Detection
- All of the included Swift and JXA projects use the MDQuery API to perform these searches (no command line binaries used). These are the best for opsec. However, blue teams could leverage tools that hook into the Endpoint Security Framework and search for volumes of reads from the Spotlight database (/.Spotlight-V100/Store-V1/Stores...)

## Mythic JXA Usage
The JXA files can be easily run with Mythic in-memory:

> jsimport [file.js]

> jsimport_call Check()

## Running JXA locally
1. comment out the //Check() line at the bottom of each script
2. > osascript [file].js
3. results will be returned to stdout

## Swift Projects
Build (either through Xcode or via "swift build"), drop to target, remove quarantine attribute if needed, and execute. 
