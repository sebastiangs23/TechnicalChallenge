import mongoose, { Schema, Model, mongo } from "mongoose";
import IUsersRequests from "../../interfaces/IUsersRequestsDay";

class UserRequestsDayModel {};

const UserRequestDaySchema = new Schema<IUsersRequests>({
    id_user: { types: Schema.Types.ObjectId, ref: 'User', required: true },
    request_number: { type: Number, required: true },
    day: { type: Date, required: true },
});

UserRequestDaySchema.loadClass(UserRequestsDayModel);

const UserRequestDay: Model<IUsersRequests> = mongoose.model<IUsersRequests>('user_request_per_day', UserRequestDaySchema);

export default UserRequestDay;