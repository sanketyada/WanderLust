const mongoose=require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listing.js")

main()
.then((res)=>{
    console.log("connect to DB");
})
.catch(err => console.log(err));
async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/wanderlust');

}
const initDB = async ()=>{
    await Listing.deleteMany({});
    initData.data=initData.data.map((obj)=>({
      ...obj,
      owner:'66cf3282741d8b81bc731f8b',
    }));
    await Listing.insertMany(initData.data);
    console.log("Inserted");
    
}
initDB();