import Cocoa
import CoreServices
import SQLite3

//kMDItemKind = Folder

let username = NSUserName()
var p1 = 0
var p2 = 0
var p3 = 0
let fileMan = FileManager.default
var c1 = 0
var c2 = 0
var c3 = 0

print("\n-------------------------Password Keyword Search--------------------------------")
let queryString = "kMDItemTextContent == passw || kMDItemDisplayName = *passw*"
if let query = MDQueryCreate(kCFAllocatorDefault, queryString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
                if (path.contains("/Users/\(username)")){
                    c1 = c1 + 1
                    if c1 <= 25 {
                        print(path)
                    }

                }
                
                
            }
        }
    }
    
}

print("-----------------------------------------------------------------------------------\n")

print("-------------------------Token Keyword Search--------------------------------")
let queryString2 = "kMDItemTextContent == token || kMDItemDisplayName = *token*"
if let query2 = MDQueryCreate(kCFAllocatorDefault, queryString2 as CFString, nil, nil) {
    MDQueryExecute(query2, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query2) {
        if let rawPtr2 = MDQueryGetResultAtIndex(query2, i) {
            let item2 = Unmanaged<MDItem>.fromOpaque(rawPtr2).takeUnretainedValue()
            if let path2 = MDItemCopyAttribute(item2, kMDItemPath) as? String {
                if (path2.contains("/Users/\(username)")) && !(path2.contains("/Library/")){
                    c2 = c2 + 1
                    if c2 <= 25 {
                        print(path2)
                    }
   
                }
                
                
            }
        }
    }
    
}

print("-----------------------------------------------------------------------------------\n")

print("-------------------------Secret Keyword Search--------------------------------")
let queryString3 = "kMDItemTextContent == secret || kMDItemDisplayName = *secret*"
if let query3 = MDQueryCreate(kCFAllocatorDefault, queryString3 as CFString, nil, nil) {
    MDQueryExecute(query3, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query3) {
        if let rawPtr3 = MDQueryGetResultAtIndex(query3, i) {
            let item3 = Unmanaged<MDItem>.fromOpaque(rawPtr3).takeUnretainedValue()
            if let path3 = MDItemCopyAttribute(item3, kMDItemPath) as? String {
                if (path3.contains("/Users/\(username)")) && !(path3.contains("/Library/")){
                    c3 = c3 + 1
                    if c3 <= 25 {
                        print(path3)
                    }

                }
                
                
            }
        }
    }
    
}

print("-----------------------------------------------------------------------------------\n")
