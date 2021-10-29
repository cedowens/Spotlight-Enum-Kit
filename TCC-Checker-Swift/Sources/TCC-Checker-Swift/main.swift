import Cocoa
import CoreServices
import SQLite3

let username = NSUserName()
var p1 = 0
var p2 = 0
var p3 = 0
let fileMan = FileManager.default

//FDA Check
let dbpath = "/Users/\(username)/Library/Application Support/com.apple.TCC/TCC.db"
var db : OpaquePointer?
var dbURL = URL(fileURLWithPath: dbpath)
if sqlite3_open(dbURL.path, &db) != SQLITE_OK {
    print("##########################FDA Check###############################")
    print("[-] Terminal HAS NOT been grated full disk access - Cannot open the user's TCC db.")
    print("##################################################################")
    }
else {
    print("##########################FDA Check###############################")
    print("[+] Terminal HAS ALREADY been grated full disk access - Can open the user's TCC db")
    print("##################################################################")
}

print("##########################TCC Folder Check###############################")
let queryString = "kMDItemKind = Folder"
if let query = MDQueryCreate(kCFAllocatorDefault, queryString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
                if path == "/Users/\(username)/Desktop" {
                    p1 = 1
                    print("[+] Terminal HAS ALREADY been granted TCC access to \(path)")
                    print("-----------------------------------------------------------------------------------")
                }
                if path == "/Users/\(username)/Documents"{
                    p2 = 1
                    print("[+] Terminal HAS ALREADY been granted TCC access to \(path)")
                    print("-----------------------------------------------------------------------------------")
                }
                if path == "/Users/\(username)/Downloads"{
                    p3 = 1
                    print("[+] Terminal HAS ALREADY been granted TCC access to \(path)")
                    print("-----------------------------------------------------------------------------------")
                }
                
            }
        }
    }
    
    if p1 == 0 {
        print("[-] Terminal has NOT yet been given access to /Users/\(username)/Desktop. Tread carefully!!")
        print("---------------------------------------------------------------")
    }

    if p2 == 0 {
        print("[-] Terminal has NOT yet been given access to /Users/\(username)/Documents. Tread carefully!!")
        print("---------------------------------------------------------------")
    }

    if p3 == 0 {
        print("[-] Terminal has NOT yet been given access to /Users/\(username)/Downloads. Tread carefully!!")
        print("---------------------------------------------------------------")
    }
}

