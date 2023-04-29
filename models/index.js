// DB RELATIONSHIPS

const user = require('user');
const blogpost = require('blogpost');
const comment = require('comment');

user.hasMany(blogpost, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

user.hasMany(comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

blogpost.belongsTo(user, {
    foreignKey: 'user_id',
});

blogpost.hasMany(comment, {
    foreignKey: 'blogpost_id',
    onDelete: 'CASCADE',
});

comment.belongsTo(user, {
    foreignKey: 'blogpost_id',
});

comment.belongsTo(blogpost, {
    foreignKey: 'blogpost_id',
});

module.exports = {user, blogpost, comment};