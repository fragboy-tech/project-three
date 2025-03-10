import mongoose, { Model, Document } from "mongoose";
import { comSchema } from "../schema/comSchema";

interface ICom extends Document {
  content: string;
}
interface ComModel extends Model<ICom> {}
getComment({

    content,
}{
    content:string;
}):Promise<ICom>

class Com {
    static async getComment(
        this:ComModel,
            {
            content,
        }:{content:string}
    ):Promise<ICom>

}
comSchema.loadClass(Com);

export const Coms:ComModel=mongoose.model<ICom,ComModel>(
    "Com",
    comSchema
);