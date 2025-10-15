import * as info from "xlsx"
export function localityReader()
{
 
    const file = info.readFile("data/localityData.xlsx")
    const sheetname = file.SheetNames[0]
    const sheet = file.Sheets[sheetname]
    const jsondata = info.utils.sheet_to_json(sheet)
    console.log(jsondata)
    return jsondata
}

export function loginReader(){
 
    const file = info.readFile("data/loginData.xlsx")
    const sheetname = file.SheetNames[0]
    const sheet = file.Sheets[sheetname]
    const jsondata = info.utils.sheet_to_json(sheet)
    console.log(jsondata)
    return jsondata
}