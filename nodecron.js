

var cron = require('node-cron');

//O- Open
//A- assigned
//AA - aggress
//if A is not converted to AA in 4 sec move assigned to next person and make him Open
var now = Date.now();
var workinghours = "9-5" 
var jobs = [{"installer":"A", "status":"A", "assignedOn":now},
            {"installer":"B", "status":"O", "assignedOn":""},
            {"installer":"C", "status":"O", "assignedOn":""}]


 
cron.schedule('* * 9-19 * * * *', () => {
    console.log("jobs ",jobs)
    //write query to get the jobs
    jobs.map((item)=>{
        if(item.status == "A"){
            var diff = Math.abs((item.assignedOn - Date.now())/1000);
            console.log(diff)
            if(diff>4){
                console.log("assign to next person")
                reschedule(jobs, item)
            }
        }
        
    })
});

function reschedule(myarray, changeitem){
    var currindex = 0;
    myarray.map((item, indexnum)=>{
        // find the installer in the array and change the allocation
        if(item.installer === changeitem.installer){
            item.status = "O";
            item.assignedOn = "";
            currindex = indexnum;
            //update DB
        }        
    })

    
    for(var index in myarray){
        console.log("index",index, currindex)
            // find the installer in the array and change the allocation
        if((index != currindex) && (myarray[index].status==="O") ){
            myarray[index].assignedOn = Date.now();
            myarray[index].status = 'A';
            console.log("assigned to ", myarray[index].installer)
            break;

        }
    }
        
}
