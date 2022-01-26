const DataEntry = require("../../models/data-entry");
const formatDate = require("../../utils/format-date");

module.exports = async (req, res, next) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        const transportCategory = req.query.tc === "all" ? "" : req.query.tc;
        const productGroup = req.query.pg === "all" ? "" : req.query.pg;
        const dominantArea = req.query.da === "all" ? "" : req.query.da;

        let allData = [];
        let userData = [];
        const labels = [];
        const allDataRefined = [];
        const userDataRefined = [];

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
                departureDate: 1,
                freightData: 1,
                user: 1,
            });

        dataEntries?.forEach((dataEntry, i) => {
            const newData = {
                date: formatDate(dataEntry.departureDate),
                price: dataEntry.freightData.pricePerTon,
                area: dataEntry.freightData.dominantArea,
                productGroup: dataEntry.freightData.productGroup,
            };

            allData.push(newData);

            if (dataEntry.user._id.toString() === req.user._id.toString()) {
                userData.push(newData);
            } else {
                userData.push({});
            }
        });

        if (productGroup) {
            allData = allData.filter((el) => el.productGroup === productGroup);
            userData = userData.filter(
                (el) => el.productGroup === productGroup
            );
        }

        if (dominantArea) {
            allData = allData.filter((el) => el.area === dominantArea);
            userData = userData.filter((el) => el.area === dominantArea);
        }

        allData?.forEach((el) => {
            const existingDate = labels.find((label) => label === el.date);
            if (!existingDate) {
                labels.push(el.date);
            }
        });

        labels?.forEach((label) => {
            let allDataSumm = 0;
            let userDataSumm = 0;
            const allDataEntries = allData.filter(
                (entry) => entry.date === label
            );
            allDataEntries.forEach((entry) => {
                allDataSumm += parseFloat(entry.price);
            });
            allDataSumm = allDataSumm / allDataEntries.length;
            allDataRefined.push(allDataSumm.toFixed(2));

            const userDataEntries = userData.filter(
                (entry) => entry.date === label
            );
            if (userDataEntries.length) {
                userDataEntries.forEach((entry) => {
                    userDataSumm += parseFloat(entry.price);
                });
                userDataSumm = userDataSumm / userDataEntries.length;
                userDataRefined.push(userDataSumm.toFixed(2));
            } else {
                userDataRefined.push(null);
            }
        });

        res.json({
            labels,
            all: allDataRefined,
            user: userDataRefined,
        });
    } catch (e) {
        console.log(e);
        return next(e);
    }
};
