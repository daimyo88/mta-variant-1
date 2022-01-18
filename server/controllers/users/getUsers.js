const HttpError = require('../../utils/http-error');
const User = require('../../models/user');

const getUsers = async (req, res, next) => {
    try {
        const itemsPerPage  = req.query.pp;
        const searchString = req.query.s || '';
        const page = req.query.p;
        let skip = (page - 1) * itemsPerPage ;
        let users;  
    
        matchQuery = {
        $regex: searchString,
        '$options': 'i'
        }

        const queryOptions = {
            match: {
                $or: [
                    { fullname: matchQuery },
                    { email: matchQuery },
                    { role: matchQuery },
                ]
            }
        }

        const facetOptions = {
        "count": [
            { $count: "total" }
        ],
        "users" : [
            { $skip: skip },
            { $limit: +itemsPerPage },
            {
                $project : {
                    fullname: 1,
                    email: 1,
                    phone: 1,
                    role: 1,
                    userCabinet: {
                    _id: 1,
                    title: 1,
                    }
                } 
            },
        ]
        }

        users = await User
            .aggregate()
            .sort({ _id: -1})
            .addFields({fullname: { $concat: ['$firstName',' ','$lastName'] }})
            .match(queryOptions.match)
            .facet(facetOptions) 

        let pages;
        if(users[0].count.length) {
            pages = Math.ceil(users[0].count[0].total / itemsPerPage);
        } else {
            pages = 0;
        }

        res.json({
            data: users,
            pages: pages,
            page: page
        });

    } catch(e) {
        return next(e);
    }
}

module.exports = getUsers;  