import { ObjectId } from "mongoose"

interface IUsersRequests extends Document {
    id_user: ObjectId,
    request_number: number,
    day: Date
};

export default IUsersRequests;