function diffOld (before:string, after:string){
    const[yearBefore,monthBefore,dayBefore]=before.split("-").map(Number)
    const[yearAfter,monthAfter,dayAfter]=after.split("-").map(Number)
    if(yearAfter-yearBefore >= 1)return (yearAfter-yearBefore)+"年"
    if(monthAfter-monthBefore >= 1)return (monthAfter-monthBefore)+"ヶ月"
    if(dayAfter-dayBefore >= 1)return (dayAfter-dayBefore)+"日"
}

function diff (before:string, after:string){
   const Second = (new Date(after).getTime()- new Date(before).getTime())/1000
    if(Second <=60*60*24) return"当日"
    if(Second <=60*60*24*30) return Math.floor(Second/60/60/24)+"日後"
    if(Second <=60*60*24*30*12) return Math.floor(Second/60/60/24/30)+"ヶ月後"
    return Math.floor(Second/60/60/24/30/12)+"年後"
}
console.log(diff("2025-02-19", "2025-02-22"))