# OPSEC-Safe-macOS-Situational-Awareness-Kit
Repo of Swift and JXA projects to enumerate the following without generating any TCC popups to the user:

- TCC FDA & folder permissions (TCC-Checker.js and tcc_folder_checker-swift-main)

- Files in the user's homedir and subdirs that have been created in the last two weeks (Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)

- Files in the user's homedir and subdirs that have been modified in the last two weeks (Spotlight-RecentFiles.js and Spotlight-RecentFilesCheck-Swift)

- Files in the user's homedir and subdirs with interesting keywords ("password", "secret", and "token") in the filename or file contents (Spotlight-KeyWordSearch.js and Spotlight-KeywordSearch-Swift)

All searches above are run against the Spotlight database instead of against the file system.

**I also wrote two versions of SwiftBelt for additional enumeration (on disk keys/creds, running apps, ffox cookies, etc.):**

https://github.com/cedowens/SwiftBelt

https://github.com/cedowens/SwiftBelt-JXA


## Detection
- All of the Swift projects use the MDQuery API to perform these searches (no command line binaries used). These are the best for opsec. However, blue teams could leverage tools that hook into the Endpoint Security Framework and search for volumes of reads from the Spotlight database (/.Spotlight-V100/Store-V1/Stores...)

- All of the JXA projects use the mdfind binary to run these searches. Blue teams can search for .js files as the parent spawning /bin/sh to run various mdfind queries.

The JXA files can be easily run with Mythic in-memory:

## Mythic JXA Usage
> jsimport [file.js]

> jsimport_call Check()

## Swift Projects
Compile, drop to target, remove quarantine attribute if needed, and execute. Example methods to remove the quarantine attrib are below: 

> curl -f file:///<path> -o <new> 

> cat <file> > <new_file> 
