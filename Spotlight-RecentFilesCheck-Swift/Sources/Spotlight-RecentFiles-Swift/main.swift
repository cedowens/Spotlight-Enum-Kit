import Cocoa
import CoreServices
import SQLite3

//kMDItemKind = Folder

let username = NSUserName()
var p1 = 0
var p2 = 0
var p3 = 0
let fileMan = FileManager.default

print("##########################Recently Changed Files Check###############################")
let queryString = ##"kMDItemFSName="*.*" && kMDItemFSContentChangeDate >= $time.this_week(-2)"##
if let query = MDQueryCreate(kCFAllocatorDefault, queryString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
                if (path.contains("/Users/\(username)")) && !(path.contains("/Application Support/")) && !(path.contains("/Containers/")) && !(path.contains("/Library/")) && !(path.contains("/Movies/")) && !(path.contains("Homebrew")) && !(path.contains("Xcode")) && !(path.contains("/Pictures")) {
                    print(path)
                    
                }
                
                
            }
        }
    }
    
}

print("-----------------------------------------------------------------------------------")



print("\n##########################Recently Created Files Check###############################")
let queryString2 = ##"kMDItemFSName="*.*" && kMDItemFSContentChangeDate >= $time.this_week(-2)"##
if let query2 = MDQueryCreate(kCFAllocatorDefault, queryString2 as CFString, nil, nil) {
    MDQueryExecute(query2, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query2) {
        if let rawPtr2 = MDQueryGetResultAtIndex(query2, i) {
            let item2 = Unmanaged<MDItem>.fromOpaque(rawPtr2).takeUnretainedValue()
            if let path2 = MDItemCopyAttribute(item2, kMDItemPath) as? String {
                if (path2.contains("/Users/\(username)")) && !(path2.contains("/Application Support/")) && !(path2.contains("/Containers/")) && !(path2.contains("/Library/")) && !(path2.contains("/Movies/")) && !(path2.contains("Homebrew")) && !(path2.contains("Xcode")) && !(path2.contains("/Pictures")) {
                    print(path2)
                    
                }
                
                
            }
        }
    }
    
}

print("-----------------------------------------------------------------------------------")
