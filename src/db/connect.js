import { connect } from "mongoose";
export const connection = async () => {
  try {
      await connect(
        "mongodb+srv://mysoaceh:gLeNCjeUqqVcwEC7@sal.0viv70q.mongodb.net/?retryWrites=true&w=majority"
      )
        .then(() => {
            console.log(`\x1b[3m   ⚡ Db is running\x1b[0m`);
        })
        .catch((error) => {
          console.log(error);
        });
  } catch (error) { 
    console.log(error);
  }
};
