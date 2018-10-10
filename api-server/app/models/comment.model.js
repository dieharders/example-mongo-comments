function CommentSchema(data) {
    return comment = {
        name: data.name || 'Joe',
        comment: data.comment || 'This is an awesome comment!',
        timestamp: data.timestamp || 'Sat Nov 11 1986',
        avatar: ':smiley:',
        votes: 0
    }
};

module.exports = CommentSchema;