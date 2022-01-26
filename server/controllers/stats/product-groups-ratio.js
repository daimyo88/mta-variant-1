const DataEntry = require("../../models/data-entry");

module.exports = async (req, res, next) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        const transportCategory = req.query.tc === "all" ? "" : req.query.tc;
        const dominantArea = req.query.da === "all" ? "" : req.query.da;

        let allData = [];
        const labels = [];
        const allDataRefined = [];

        const matchQuerySC = {
            $regex: transportCategory,
            $options: "i",
        };

        const queryOptions = {
            match: {
                $and: [{ "freightData.transportData.category": matchQuerySC }],
            },
        };

        const dataEntries = await DataEntry.aggregate()
            .match({ departureDate: { $gte: new Date(start) } })
            .match({ departureDate: { $lte: new Date(end) } })
            .sort({ departureDate: 1 })
            .match(queryOptions.match)
            .project({
                freightData: 1,
            });

        dataEntries?.forEach((dataEntry, i) => {
            const newData = {
                area: dataEntry.freightData.dominantArea,
                productGroup: dataEntry.freightData.productGroup,
            };
            allData.push(newData);
        });


        if (dominantArea) {
            allData = allData.filter((el) => el.area === dominantArea);
        }

        allData?.forEach((el) => {
            const existingProductGroup = labels.find(
                (label) => label === el.productGroup
            );
            if (!existingProductGroup) {
                labels.push(el.productGroup);
            }
        });

        if (labels.length) {
            const ratio = 100 / allData.length;
            labels.forEach((label) => {
                const allDataEntries = allData.filter(
                    (entry) => entry.productGroup === label
                );
                let value = allDataEntries.length * ratio;
                allDataRefined.push({
                    name: label,
                    value: value.toFixed(2),
                });
            });
        }

        res.json({
            all: allDataRefined,
        });
    } catch (e) {
        console.log(e);
        return next(e);
    }
};
