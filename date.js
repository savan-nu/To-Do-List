exports.getDate = ()=>{
var today = new Date();
    
    var option= {
        weekday: "long",
        day :"numeric",
        month :"long"
    };
    var day = today.toDateString("en-US",option);
    return day;
}