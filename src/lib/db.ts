const mongodbUrl=process.env.MONGODB_URI
import mongoose from "mongoose";
if(!mongodbUrl){
    throw new Error("db url not found!")
}


let cached=global.mongooseConn

if(!cached){
    cached=global.mongooseConn={conn:null,promise:null}
}

const connectDb=async ()=> {
    if(cached.conn){
        console.log("cached connection")
        return cached.conn
    }

    if(cached.promise){
        console.log("cached conn return")
    }

    if(!cached.promise){
        console.log("new connection")
        cached.promise = mongoose.connect(mongodbUrl).then((m) => m.connection);
    }

  try{
    const conn=await cached.promise
    return conn
  }catch(err){
    console.log(err);
  }
}
export default connectDb