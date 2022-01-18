const qrcode = require('qrcode');

const User = require('../../models/user');
const HttpError = require('../../utils/http-error');

const populateUsers = async (req, res, next) => {

    try {
        let users;
        if (req.user.role === 'admin') {
            users = await User.find({status: true}, 'firstName lastName');
            users = users.map(el => {
                return {
                    _id: el._id,
                    title: `${el.firstName} ${el.lastName}` 
                }
            })
        } else if(req.user.role === 'user') {
            users = [
                {
                    _id: req.user._id,
                    title: req.user.firstName + ' ' + req.user.lastName
                }
            ]
        }

        res.json({ users }); 
            
    } catch(e) {
        return next(e);
    }

}

module.exports = populateUsers;