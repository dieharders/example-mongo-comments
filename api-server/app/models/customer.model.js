const CustomerSchema = {
    _id: String,
    firstname: String,
    lastname: String,
    age: { type: Number, min: 18, max: 65, required: true },
    hobbies: String['']
};

module.exports = CustomerSchema;