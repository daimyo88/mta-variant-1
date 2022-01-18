const HttpError = require('../../utils/http-error');
const DataEntry = require('../../models/data-entry');
const formatDate = require('../../utils/format-date');

const controller = async (req, res, next) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        const shipCategory = req.query.sc === 'all' ? '' : req.query.sc;
        const productGroup = req.query.pg === 'all' ? '' : req.query.pg;
        const dominantArea = req.query.da === 'all' ? '' : req.query.da;
        
        let allData = [];
        let userData = [];
        const labels = [];
        const allDataRefined = [];
        const userDataRefined = [];

        const matchQuerySC = {
            $regex: shipCategory,
            '$options': 'i'
        }

        const queryOptions = {
            match: {
                $and: [
                    { shipCategory: matchQuerySC  }
                ]
            }
        }

        const dataEntries = await DataEntry
            .aggregate()
            .match({ freightType: 'spot-market' })
            .match({ dateNomination: { $gte : new Date(start) }})
            .match({ dateNomination: { $lte : new Date(end) }})
            .sort({ dateNomination: 1 })
            .match(queryOptions.match)
            .project({
                dateNomination: 1,
                shipTitle: 1,
                freightData: 1,
                user: 1 
            })

        dataEntries?.forEach((dataEntry, i) => {
            dataEntry.freightData?.forEach(data => {
                const newData = {
                    date: formatDate(dataEntry.dateNomination),
                    price: data.freightPricePerTon,
                    area: data.area,
                    productGroup: data.productGroup
                }
                allData.push(newData);
                
                if(dataEntry.user._id.toString() === req.user._id.toString()) {
                    userData.push(newData);       
                } else {
                    userData.push({})
                }
            });
        });

        if(productGroup) {
            allData = allData.filter(el => el.productGroup === productGroup);
            userData = userData.filter(el => el.productGroup === productGroup);
        }

        if(dominantArea) {
            allData = allData.filter(el => el.area === dominantArea);
            userData = userData.filter(el => el.area === dominantArea);
        }
   
        allData?.forEach(el => {
            const existingDate = labels.find(label => label === el.date);
            if (!existingDate) {
                labels.push(el.date);
            }
        });

        labels?.forEach(label => {
            let allDataSumm = 0;
            let userDataSumm = 0;
            const allDataEntries = allData.filter(entry => entry.date === label);
            allDataEntries.forEach(entry => {
                allDataSumm += parseFloat(entry.price);
            });
            allDataSumm = allDataSumm / allDataEntries.length;
            allDataRefined.push(allDataSumm.toFixed(2));
            
            const userDataEntries = userData.filter(entry => entry.date === label);
            if(userDataEntries.length) {
                userDataEntries.forEach(entry => {
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
            user: userDataRefined
        });

    } catch(e) {
        console.log(e)
        return next(e);
    }
}

module.exports = controller;  