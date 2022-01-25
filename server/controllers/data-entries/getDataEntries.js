const DataEntry = require("../../models/data-entry");

module.exports = async (req, res, next) => {
  try {
    const itemsPerPage = req.query.pp;
    const searchString = req.query.s || "";
    const page = req.query.p;
    let skip = (page - 1) * itemsPerPage;

    matchQuery = {
      $regex: searchString,
      $options: "i",
    };

    const queryOptions = {
      match: {
        $or: [
          { shipTitle: matchQuery },
          { "owner.fullname": matchQuery },
          { "freightData.dominantArea": matchQuery },
          { "freightData.productGroup": matchQuery },
        ],
      },
    };

    const facetOptions = {
      count: [{ $count: "total" }],
      dataEntries: [
        { $skip: skip },
        { $limit: +itemsPerPage },
        {
          $project: {
            departureDate: 1,
            freightData: 1,
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
      matchOptions = { _id: { $in: req.user.dataEntries } };
    }

    if (req.user.role === "admin") {
      matchOptions = {};
    }

    const dataEntries = await DataEntry.aggregate()
      .match(matchOptions)
      .sort({ departureDate: -1 })
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
        "owner._id": "$owner._id",
      })
      .match(queryOptions.match)
      .facet(facetOptions);

    let pages;

    if (dataEntries[0].count.length) {
      pages = Math.ceil(dataEntries[0].count[0].total / itemsPerPage);
    } else {
      pages = 0;
    }

    res.json({
      data: dataEntries,
      pages: pages,
      page: page,
    });
  } catch (e) {
    return next(e);
  }
};
