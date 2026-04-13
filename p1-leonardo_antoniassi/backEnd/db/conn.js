import mongoose from "mongoose";
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/Reclamacoes");
  console.log("Conectou ao MongoDb (banco de reclamações)");
}
main().catch((err) => console.log(err));
export default mongoose;
