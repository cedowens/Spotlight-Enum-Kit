import Foundation
import Cocoa

let username = NSUserName()
let fileMan = FileManager.default
var p1 = 0
var p2 = 0
var p3 = 0
var results = ""
var out = ""

let qString = "kMDItemDisplayName = *TCC.db"
if let query = MDQueryCreate(kCFAllocatorDefault, qString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
               
                if path.hasSuffix("/Users/\(username)/Library/Application Support/com.apple.TCC/TCC.db"){
                    p1 = p1 + 1
                    
                }
                
            }
        }
    }
    
    if p1 > 0 {
        print("[+] Your app context HAS ALREADY been given full disk access (mdquery API calls can see the user's TCC database)")
    }
    else {
        print("[-] Your app context HAS NOT been given full disk access yet (mdquery API calls cannot see the user's TCC database)")
    }

}

results += "##########################TCC Folder Check###############################\n"
let queryString = "kMDItemKind = Folder -onlyin /Users/\(username)"
if let query = MDQueryCreate(kCFAllocatorDefault, queryString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
               
                if path.hasSuffix("/Users/\(username)/Desktop"){
                    p1 = 1
                    results += "[+] This app HAS ALREADY been granted TCC access to \(path)\n"
                    results += "-----------------------------------------------------------------------------------\n"
                }
                if path.hasSuffix("/Users/\(username)/Documents"){
                    p2 = 1
                    results += "[+] This app HAS ALREADY been granted TCC access to \(path)\n"
                    results += "-----------------------------------------------------------------------------------\n"
                }
                if path.hasSuffix("/Users/\(username)/Downloads"){
                    p3 = 1
                    results += "[+] This app HAS ALREADY been granted TCC access to \(path)\n"
                    results += "-----------------------------------------------------------------------------------\n"
                }
                
            }
        }
    }
    
    if p1 == 0 {
        results += "[-] This app has NOT yet been given access to /Users/\(username)/Desktop. Tread carefully!!\n"
        results += "---------------------------------------------------------------\n"
    }

    if p2 == 0 {
        results += "[-] This app has NOT yet been given access to /Users/\(username)/Documents. Tread carefully!!\n"
        results += "---------------------------------------------------------------\n"
    }

    if p3 == 0 {
        results += "[-] This app has NOT yet been given access to /Users/\(username)/Downloads. Tread carefully!!\n"
        results += "---------------------------------------------------------------\n"
    }
}

print(results)
