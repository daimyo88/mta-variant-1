const HttpError = require('../../utils/http-error');
const Ship = require('../../models/transport');

const getShips = async (req, res, next) => {
    try {
        const itemsPerPage  = req.query.pp;
        const searchString = req.query.s || '';
        const page = req.query.p;
        let skip = (page - 1) * itemsPerPage ;
        let ships;  
 
        matchQuery = {
            $regex: searchString,
            '$options': 'i'
        }

        const queryOptions = {
        match: {
            $or: [
                { title: matchQuery },
                { shipCategory: matchQuery },
                { productGroup: matchQuery },
                { "shipOwner.fullname": matchQuery }
            ]
        }
        }

        const facetOptions = {
        "count": [
            { $count: "total" }
        ],
        "ships" : [
            { $skip: skip },
            { $limit: +itemsPerPage },
            {
                $project : {
                    title: 1,
                    shipLength: 1,
                    shipWidth: 1,
                    productGroup: 1,
                    dwt: 1,
                    shipCategory: 1,
                    shipOwner: {
                        _id: 1,
                        fullname: 1
                    }
                } 
            },
        ]
        }

        let matchOptions;

        if (req.user.role === 'user') {
            matchOptions = { _id: { $in : req.user.ships }}
        }

        if (req.user.role === 'admin') {
          matchOptions = {}
        }

        ships = await Ship
            .aggregate()
            .match(matchOptions)
            .sort({ _id: -1})
            .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'owner' })
            .unwind('owner')
            .addFields({'shipOwner.fullname': { $concat: ['$owner.firstName',' ','$owner.lastName'] }, 'shipOwner._id': '$owner._id'})
            .match(queryOptions.match)
            .facet(facetOptions) 

        let pages;
        if(ships[0].count.length) {
            pages = Math.ceil(ships[0].count[0].total / itemsPerPage);
        } else {
            pages = 0;
        }

        res.json({
            data: ships,
            pages: pages,
            page: page
        });

    } catch(e) {
        return next(e);
    }
}

module.exports = getShips;  