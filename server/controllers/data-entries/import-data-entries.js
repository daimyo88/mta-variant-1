const User = require('../../models/user');
const DataEntry = require('../../models/data-entry');
const mongoose = require('mongoose');

require('dotenv').config();

const freightTypes = {
    nl: {
        'Spotmarkt': 'spot-market',
        'Time charter': 'time-charter'
    }
}

const shipProductGroups = {
    nl: {
        'Black': 'black',
        'Blank': 'blank'
    }
}

const pipings = {
    nl: {
        'Enkel': 'single',
        'Dubbel': 'double'
    }
}

const productGroups = {
    nl: {
        "Gasoil and gasoil components": "gasoil-and-gasoil-components",
        "Gasoline and components": "gasoline-and-components",
        "Chemicals": "chemicals",
        "Heavy products": "heavy-products",
        "Biodiesel": "biodiesel",
        "Andere": "other",
        "Other": "other",
        "Onbekend": "unknown",
    }
}

const controller = async (req, res, next) => {
    try {

        const {
            fieldsSet,
            files,
            language
        } = req.body;

        const userField = fieldsSet['user'];

        const users = await User.find({});
        const dataEntries = [];

        for(const file of files) {

            try {
                const userFullName = file[userField];
    
                if(userFullName) {
                    const firstName = userFullName.split(' ')[0]?.trim();
                    const lastName = userFullName.split(' ')[1]?.trim();
                    const user = users.find((el) => { return el.firstName === firstName && el.lastName === lastName });

                    if(user) {
                        const newDataEntry = {};
                        newDataEntry.freightType = freightTypes[language][file[fieldsSet['freightType']]];

                        if(!['spot-market', 'time-charter'].includes(newDataEntry.freightType)) {
                            throw new Error('invalid-data');
                        }

                        newDataEntry.user = user;
                        newDataEntry.dateNomination = file[fieldsSet['dateNomination']];
                        newDataEntry.createdAt = file[fieldsSet['commentDate']] || new Date();
                        newDataEntry.comment = file[fieldsSet['comment']] || '';
                        newDataEntry.shipTitle = file[fieldsSet['ship']] || '';
                        newDataEntry.shipLength = file[fieldsSet['shipLength']] || '';
                        newDataEntry.dwt = file[fieldsSet['dwt']] || '';
                        newDataEntry.shipCategory = file[fieldsSet['shipCategory']] || '';
                        newDataEntry.shipWidth = file[fieldsSet['shipWidth']] || '';
                        newDataEntry.shipVolume = file[fieldsSet['shipVolume']] || '';
                        newDataEntry.shipProductGroup = shipProductGroups[language][file[fieldsSet['shipProductGroup']]] || '';
                        newDataEntry.shipCoated = ['true','yes','ja'].includes(file[fieldsSet['shipCoated']]) ? true : false; 
                        newDataEntry.shipHeated = ['true','yes','ja'].includes(file[fieldsSet['shipHeated']]) ? true : false; 
                        newDataEntry.shipPiping = pipings[language][file[fieldsSet['shipPiping']]] || '';
                        newDataEntry.shipProfile = file[fieldsSet['shipProfile']] || '';
                        newDataEntry.tanksQuantity = file[fieldsSet['tanksQuantity']] || '';
                        newDataEntry.shipFlag = file[fieldsSet['shipFlag']] || '';

                        let freightData;

                        if(newDataEntry.freightType === 'time-charter') {
                            freightData = {}
                            freightData.startDateContract = file[fieldsSet['startDateContract']] || '';
                            freightData.endDateContract = file[fieldsSet['endDateContract']] || '';
                            freightData.dominantProductGroup = productGroups[language][file[fieldsSet['productGroup']]] || 'undefined';
                            freightData.dominantProductGroupOther = productGroups[language][file[fieldsSet['productGroupOther']]] || '';
                            freightData.dominantArea = file[fieldsSet['dominantArea']] || '';
                            freightData.miniTC = ['true','yes','ja'].includes(file[fieldsSet['miniTC']]) ? true : false; 
                            freightData.engineRoomFreeOfCharge = ['true','yes','ja'].includes(file[fieldsSet['engineRoomFreeOfCharge']]) ? true : false; 
                            freightData.portFees = ['true','yes','ja'].includes(file[fieldsSet['portFees']]) ? true : false; 
                            freightData.channelCostsFree = ['true','yes','ja'].includes(file[fieldsSet['channelCostsFree']]) ? true : false; 
                            freightData.rentalPriceDay = file[fieldsSet['rentalPriceDay']] || '';
                            freightData.sailingTime = file[fieldsSet['sailingTime']] || '';
                            freightData.emptyDaysBeforeTrip = file[fieldsSet['emptyDaysBeforeTrip']] || '';

                            newDataEntry.freightData = freightData; 
                        }

                        if(newDataEntry.freightType === 'spot-market') {
                            freightData = {}
                            freightData.productGroup = productGroups[language][file[fieldsSet['productGroup']]] || 'undefined';
                            freightData.productGroupOther = productGroups[language][file[fieldsSet['productGroupOther']]] || '';
                            freightData.area = file[fieldsSet['dominantArea']] || '';
                            freightData.loadedTons = file[fieldsSet['loadedTons']] || '';
                            freightData.loadingPort = file[fieldsSet['loadingPort']] || '';
                            freightData.deliveryPort = file[fieldsSet['deliveryPort']] || '';
                            freightData.freightPricePerTon = file[fieldsSet['freightPricePerTon']] || '';
                            freightData.lumpsumFreight = file[fieldsSet['lumpsumFreight']] || '';
                            freightData.standbyPricePerHour = file[fieldsSet['standbyPricePerHour']] || '';
                            freightData.standbyHours = file[fieldsSet['standbyHours']] || '';
                            freightData.sailingTime = file[fieldsSet['sailingTime']] || '';
                            freightData.emptyDaysBeforeTrip = file[fieldsSet['emptyDaysBeforeTrip']] || '';
                            newDataEntry.freightData = []; 
                            newDataEntry.freightData.push(freightData); 
                        }

                        const dataEntry = new DataEntry(newDataEntry);
                        user.dataEntries.push(dataEntry);
                        dataEntries.push(dataEntry);


                    }
                } 

            } catch(e) {
                console.log(e);
            }  

        };

        const sess = await mongoose.startSession();
        sess.startTransaction();
        await DataEntry.insertMany(dataEntries, { session: sess });
        for (const u of users) {
            await u.save({ session: sess })
        }
        await sess.commitTransaction();
  
        res.json({successMessage: 'data-imported'});

    } catch(err) {
        return next(err);
    } 
}

module.exports = controller;