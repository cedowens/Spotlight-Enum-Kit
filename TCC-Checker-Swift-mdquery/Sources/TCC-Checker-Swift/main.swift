import Foundation
import Cocoa

let username = NSUserName()
let fileMan = FileManager.default
var p1 = 0
var results = ""
var out = ""

results += "##########################TCC Folder Check###############################\n"
let queryString = "kMDItemDisplayName = *TCC.db"
if let query = MDQueryCreate(kCFAllocatorDefault, queryString as CFString, nil, nil) {
    MDQueryExecute(query, CFOptionFlags(kMDQuerySynchronous.rawValue))

    for i in 0..<MDQueryGetResultCount(query) {
        if let rawPtr = MDQueryGetResultAtIndex(query, i) {
            let item = Unmanaged<MDItem>.fromOpaque(rawPtr).takeUnretainedValue()
            if let path = MDItemCopyAttribute(item, kMDItemPath) as? String {
               
                if path.hasSuffix("/Users/\(username)/Library/Application Support/com.apple.TCC/TCC.db"){
                    p1 = 1
                    results += "[+] Your app context HAS ALREADY been given full disk access (mdquery API calls can see the user's TCC database)\n"
                    results += "-----------------------------------------------------------------------------------\n"
                }
                
            }
        }
    }
    
    if p1 == 0 {
        results += "[-] Your app context has NOT yet been given full disk access. Tread carefully!!\n"
        results += "---------------------------------------------------------------\n"
    }

}

print(results)
