const Region = require('../../models/region');

const getLocations = async (req, res, next) => {
    try {
        const itemsPerPage  = req.query.pp;
        const searchString = req.query.s || '';
        const page = req.query.p;
        let skip = (page - 1) * itemsPerPage ;
        let locations;  
 
        matchQuery = {
            $regex: searchString,
            '$options': 'i'
        }

        const queryOptions = {
            match: {
                $or: [
                    { name: matchQuery },
                    { "city.name": matchQuery }
                ]
            }
        }

        const facetOptions = {
        "count": [
            { $count: "total" }
        ],
        "locations" : [
            { $skip: skip },
            { $limit: +itemsPerPage },
            {
                $project : {
                    name: 1,
                    cities: {
                        _id: 1,
                        name: 1
                    }
                } 
            },
        ]
        }


        locations = await Region
            .aggregate()
            .sort({ _id: -1})
            .lookup({ from: 'cities', localField: 'cities', foreignField: '_id', as: 'cities' })
            .match(queryOptions.match)
            .facet(facetOptions) 

        let pages;
        if(locations[0].count.length) {
            pages = Math.ceil(locations[0].count[0].total / itemsPerPage);
        } else {
            pages = 0;
        }

        res.json({
            data: locations,
            pages: pages,
            page: page
        });

    } catch(e) {
        return next(e);
    }
}

module.exports = getLocations;  