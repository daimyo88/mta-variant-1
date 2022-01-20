const Transport = require("../../models/transport");

module.exports = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.pp;
    const searchString = req.query.s || "";
    const page = req.query.p;
    let skip = (page - 1) * itemsPerPage;
    let transports;

    matchQuery = {
      $regex: searchString,
      $options: "i",
    };

    const queryOptions = {
      match: {
        $or: [
          { title: matchQuery },
          { category: matchQuery },
          { "owner.fullname": matchQuery },
        ],
      },
    };

    const facetOptions = {
      count: [{ $count: "total" }],
      transports: [
        { $skip: skip },
        { $limit: +itemsPerPage },
        {
          $project: {
            vehicleModel: 1,
            maxWeight: 1,
            category: 1,
            owner: {
              _id: 1,
              fullname: 1,
            },
          },
        },
      ],
    };

    let matchOptions;

    if (req.user.role === "user") {
      matchOptions = { _id: { $in: req.user.transports } };
    }

    if (req.user.role === "admin") {
      matchOptions = {};
    }

    transports = await Transport.aggregate()
      .match(matchOptions)
      .sort({ _id: -1 })
      .lookup({
        from: "users",
        localField: "user",
        foreignField: "_id",
        as: "owner",
      })
      .unwind("owner")
      .addFields({
        "owner.fullname": {
          $concat: ["$owner.firstName", " ", "$owner.lastName"],
        },
      })
      .match(queryOptions.match)
      .facet(facetOptions);

    let pages;
    if (transports[0].count.length) {
      pages = Math.ceil(transports[0].count[0].total / itemsPerPage);
    } else {
      pages = 0;
    }

    res.json({
      data: transports,
      pages: pages,
      page: page,
    });
  } catch (e) {
    return next(e);
  }
};
