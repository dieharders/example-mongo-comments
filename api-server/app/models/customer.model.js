function CommentSchema(data) {
    return comment = {
        firstname: data.firstname || 'Joe',
        lastname: data.lastname || 'Blow',
        age: data.age || 0,
        hobbies: data.hobbies || []
    }
};

module.exports = CommentSchema;