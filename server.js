const app = require("./app")

let port = 5000 ||  7000
app.listen(5000,(err)=>{
    if(!err){
        console.log(`Application  ronning on http://localhost:${port}`)
    }else {
        console.log("Application Running Fail =====>>>>> " , err)
    }
} )