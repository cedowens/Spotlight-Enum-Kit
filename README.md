# Spotlight Enumeration Kit
Repo of Swift and JXA projects to leverage macOS Spotlight db data for the following:

- TCC folder permissions (TCC-Checker.js and TCC-Checker-Swift)

- Files in the user's homedir and subdirs that have been created in the last two weeks **(Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)**

- Files in the user's homedir and subdirs that have been modified in the last two weeks **(Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)**

- Files in the user's homedir and subdirs with interesting keywords ("password", "secret", and "token") in the filename or file contents **(Spotlight-KeyWordSearch.js and Spotlight-KeywordSearch-Swift)**

- A TCC-aware script to search for files with 'AKIA' strings (AWS keys beginning with AKIA are long term credentials for an IAM user, whereas keys beginning with ASIA are temporary creds granted with AWS STS operations) **(spotlight-akia-search.js)**

All searches above are run against the Spotlight database in a way that allows the checks to run without generating a TCC pop up to the user regardless of what TCC permissions Terminal does/does not have.

I recommend that you cd to a non-TCC protected directory and then run the JXA scripts/Swift binaries in this repo (just in case you run into the scenario where your payload was detonated from the ~/Downloads folder but Terminal hasn't been given any TCC accesses to ~/Downloads).

## Caveat
This script does not work when called from an installer package payload, as installer packages do not run under the context of Terminal. Likewise, this technique would not work for any other payload type that does not run under Terminal. You can use my SwiftBelt.js tool (https://github.com/cedowens/SwiftBelt-JXA) to enumerate what context you are in.

## Detection
- All of the Swift projects use the MDQuery API to perform these searches (no command line binaries used). These are the best for opsec. However, blue teams could leverage tools that hook into the Endpoint Security Framework and search for volumes of reads from the Spotlight database (/.Spotlight-V100/Store-V1/Stores...)

- All of the JXA projects use the mdfind binary to run these searches. Blue teams can search for .js files as the parent spawning /bin/sh to run various mdfind queries.


## Mythic JXA Usage
The JXA files can be easily run with Mythic in-memory:

> jsimport [file.js]

> jsimport_call Check()

## Swift Projects
Build (either through Xcode or via "swift build"), drop to target, remove quarantine attribute if needed, and execute. 
