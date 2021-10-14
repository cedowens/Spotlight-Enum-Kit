# Spotlight Enumeration Kit
Repo of Swift and JXA projects to leverage macOS Spotlight db data for the following:

- TCC folder permissions (TCC-Checker.js and tcc_folder_checker-swift-main)

- Files in the user's homedir and subdirs that have been created in the last two weeks (Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)

- Files in the user's homedir and subdirs that have been modified in the last two weeks (Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)

- Files in the user's homedir and subdirs with interesting keywords ("password", "secret", and "token") in the filename or file contents (Spotlight-KeyWordSearch.js and Spotlight-KeywordSearch-Swift)

All searches above are run against the Spotlight database instead of against the file system, which allows the checks to run without generating a TCC pop up to the user regardless of what TCC permissions Terminal does/does not have.


## Detection
- All of the Swift projects use the MDQuery API to perform these searches (no command line binaries used). These are the best for opsec. However, blue teams could leverage tools that hook into the Endpoint Security Framework and search for volumes of reads from the Spotlight database (/.Spotlight-V100/Store-V1/Stores...)

- All of the JXA projects use the mdfind binary to run these searches. Blue teams can search for .js files as the parent spawning /bin/sh to run various mdfind queries.


## Mythic JXA Usage
The JXA files can be easily run with Mythic in-memory:

> jsimport [file.js]

> jsimport_call Check()

## Swift Projects
Compile, drop to target, remove quarantine attribute if needed, and execute. Example methods to remove the quarantine attrib are below: 

> curl -f file:///[path] -o [new_file_with_no_quarantine_attrib] 

> cat [file] > [new_file_with_no_quarantine_attrib] 
