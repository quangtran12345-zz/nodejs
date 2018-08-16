const common ={
stringToTimestamp : function  (strDate) {
    var d = strDate.trim().split('/') // date have format dd/mm/yyyy
   
    var t = ['00', '00']
  
    var s = d[1] + '/' + d[0] + '/' + d[2] // format mm/dd/yyyy
   
    var date = new Date(Date.parse(s))
   
    date.setHours(parseInt(t[0]), parseInt(t[1]))
   
    return Math.round(date.getTime())
    }
}