/**
 * Created by root on 16-1-8.
 */


var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * User Schema
 */
var UserSchema = new Schema({
    username : { type: String, index: true, unique: true},
    password : String,
    nickname : String,
    sex : String,
    online: { type: Boolean, default: false},
    created_time: { type: Date, default: Date.now },
    lasted_login_time: { type: Date, default: Date.now }
});

/**
 * Validations
 */
var validatePresenceOf = function (value) {
    return value && value.length;
}

// Validate username
UserSchema.path('username').validate(function(value, respond) {
        this.constructor.findOne({username: value}, function(err, user) {
            if(err) {
                console.error(err);
                throw err;
            }

            if(user) {
                return respond(false);
            } else {
                return respond(true);
            }

        });
    }, 'the username has already registered');

// Validate password
UserSchema.path('password').validate(function (password) {
    return password.length;
    //return false
}, 'Password cannot be blank');


/**
 * Pre-save hook
 */
UserSchema.pre('save', function(next) {
    //if (!this.isNew) return next();

    //if (!validatePresenceOf(this.password)) {
    //    next(new Error('Invalid password'))
    //} else {
        next();
    //}
});

mongoose.model('User', UserSchema);