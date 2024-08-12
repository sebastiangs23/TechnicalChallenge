interface IUser extends Document {
    name: string,
    last_name: string,
    email: string,
    age: number,
    password: string,
};

export default IUser;