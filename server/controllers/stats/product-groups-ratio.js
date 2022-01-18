const DataEntry = require('../../models/data-entry');

const controller = async (req, res, next) => {
    try {
        const start = req.query.start;
        const end = req.query.end;
        const shipCategory = req.query.sc === 'all' ? '' : req.query.sc;
        const freightType = req.query.ft === 'all' ? '' : req.query.ft;
        const dominantArea = req.query.da === 'all' ? '' : req.query.da;
        
        let allData = [];
        const labels = [];
        const allDataRefined = [];

        const matchQuerySC = {
            $regex: shipCategory,
            '$options': 'i'
        }

        const matchQueryFT = {
            $regex: freightType,
            '$options': 'i'
        }

        const queryOptions = {
            match: {
                $and: [
                    { shipCategory: matchQuerySC  },
                    { freightType: matchQueryFT  },
                ]
            }
        }

        const dataEntries = await DataEntry
            .aggregate()
            .match({ dateNomination: { $gte : new Date(start) }})
            .match({ dateNomination: { $lte : new Date(end) }})
            .sort({ dateNomination: 1 })
            .match(queryOptions.match)
            .project({
                freightType: 1,
                freightData: 1,
            })

        dataEntries?.forEach((dataEntry, i) => {
            if(dataEntry.freightType === 'spot-market') {
                dataEntry.freightData?.forEach(data => {
                    const newData = {
                        area: data.area,
                        productGroup: data.productGroup
                    }
                    allData.push(newData);
                });
            }
            if(dataEntry.freightType === 'time-charter') {
                const newData = {
                    area: dataEntry.freightData.dominantArea,
                    productGroup: dataEntry.freightData.dominantProductGroup
                }
                allData.push(newData);
            }

        });
  
        if(dominantArea) {
            allData = allData.filter(el => el.area === dominantArea);
        }

        allData?.forEach(el => {
            const existingProductGroup = labels.find(label => label === el.productGroup);
            if (!existingProductGroup) {
                labels.push(el.productGroup);
            }
        });

        if(labels.length) {
            const ratio = 100 / allData.length;
            labels.forEach(label => {
                const allDataEntries = allData.filter(entry => entry.productGroup === label);
                let value = allDataEntries.length * ratio;
                allDataRefined.push({
                    name: label,
                    value: value.toFixed(2)
                })   
            }); 
        }

        res.json({
            all: allDataRefined,
        });


    } catch(e) {
        console.log(e)
        return next(e);
    }
}

module.exports = controller;  