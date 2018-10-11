function CommentSchema(data) {
    // We assign the values from our incoming data OR,
    // if no property is defines, assign a default value
    return comment = {
        name: data.name || 'Joe',
        comment: data.comment || 'This is an awesome comment!',
        timestamp: data.timestamp || Date.now(),
        avatar: data.avatar || '😄',
        likes: data.likes || 0
    }
};

module.exports = CommentSchema;