import { app } from "./app";

app.listen(8800, ()=>{
    console.log("server is running on port 8800")
})

module.exports = app;