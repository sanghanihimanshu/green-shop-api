import { config } from "dotenv";
import { connect } from "mongoose";
config()
export const connection = async () => {
  try {
      await connect(
        process.env.MONGO_URL
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
