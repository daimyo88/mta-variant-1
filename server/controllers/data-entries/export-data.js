const DataEntry = require('../../models/data-entry');
const { Parser } =  require('json2csv');
const formatDate = require('../../utils/format-date');

const fieldsTranslations = {
    nl: {
        yes: 'Ja',
        no: 'Nee',
        black: 'Black',
        blank: "Blank",
        dateNomination: 'Datum nominatie',
        shipOwner: 'Scheepseigenaar',
        shipTitle: 'Naam schip',
        shipLength: 'Lengte (m)',
        shipWidth: 'Breedte (m)',
        dwt: 'Tonnage (DWT)',
        shipCategory: 'Scheepscategorie',
        shipVolume: 'Inhoud (m3)',
        shipProductGroup: 'Schip productgroep',
        shipPiping: 'Leidingen',
        single: "Enkel",
        double: "Dubbel",
        shipCoated: 'Coated',
        shipHeated: 'Heated',
        shipProfile: 'Profiel',
        tanksQuantity: 'Aantal tanks',
        shipFlag: 'Vlag',
        startDateContract: 'Contract startdatum',
        endDateContract: 'Contract einddatum',
        dominantProductGroup: 'Dominante productgroep',
        "gasoil-and-gasoil-components": "Gasoil and gasoil components",
        "gasoline-and-components": "Gasoline and components",
        "chemicals": "Chemicals",
        "heavy-products": "Heavy products",
        "biodiesel": "Biodiesel",
        "other-product-group": "Andere productgroep",
        "unknown": "Onbekend",
        dominantArea: 'Dominante gebied',
        miniTC: "Mini TC",
        engineRoomFreeOfCharge: 'Gasolie vrij',
        portFees: 'Havengelden',
        channelCostsFree: 'Kanaalkosten vrij',
        rentalPriceDay: 'Huurprijs / dag',
        productGroup: 'Productgroep',
        loadedTons: 'Geladen tonnen',
        loadingPort: 'Laadhaven',
        deliveryPort: 'Loshaven',
        freightPricePerTon: 'Vrachtprijs per ton',
        lumpsumFreight: 'Lumpsum vracht',
        standbyPricePerHour: 'Liggeld prijs/uur',
        standbyHours: 'Wacht uren',
        sailingTime: 'Vaartijd',
        emptyDaysBeforeTrip: 'Aantal lege dagen voor aanvang reis',

    }
  }

const exportData = async (req, res, next) => {
    try {
        const language  = req.query.language;
        const itemsPerPage  = req.query.itemsPerPage;
        const searchString = req.query.search || '';
        const page = req.query.page;
        const type = req.query.type;
        let skip = (page - 1) * itemsPerPage ;
        
        let exportData, basicFields, fields; 

        matchQuery = {
            $regex: searchString,
            '$options': 'i' 
        }

        const queryOptions = {
            match: {
                $or: [
                    { freightType: matchQuery },
                    { shipTitle: matchQuery },
                    { "owner.fullname": matchQuery },
                    { "freightData.dominantArea": matchQuery },
                    { "freightData.dominantProductGroup": matchQuery },
                    { "freightData.dominantProductGroupOther": matchQuery }
                ]
            }
        }

        let matchOptions;

        if (req.user.role === 'user') {
            matchOptions = { _id: { $in : req.user.dataEntries }}
        }

        if (req.user.role === 'admin') {
            matchOptions = {}
        }
  

        const dataEntries = await DataEntry
            .aggregate()
            .match({ freightType: type })
            .match(matchOptions)
            .sort({ dateNomination: -1})
            .skip(skip)
            .lookup({ from: 'users', localField: 'user', foreignField: '_id', as: 'owner' })
            .unwind('owner')
            .addFields({'owner.fullname': { $concat: ['$owner.firstName',' ','$owner.lastName'] }, 'owner._id': '$owner._id'})
            .match(queryOptions.match)
            .project({
                freightType: 1,
                dateNomination: 1,
                'owner.fullname': 1,
                shipTitle: 1,
                shipLength: 1,
                shipWidth: 1,
                dwt: 1,
                shipCategory: 1,
                shipVolume: 1,
                shipProductGroup: 1,
                shipPiping: 1,
                shipCoated: 1,
                shipHeated: 1,
                shipProfile: 1,
                tanksQuantity: 1,
                shipFlag: 1,
                freightData: 1
            }) 

 

        dataEntries.forEach((el) => {
                el.date = formatDate(el.dateNomination);
                el.shipProductGroup = fieldsTranslations[language][el.shipProductGroup];
                el.shipPiping = fieldsTranslations[language][el.shipPiping];
                if(el.freightType === 'time-charter') {
                    el.freightData.startDateContract = formatDate(el.freightData.startDateContract);
                    el.freightData.endDateContract = formatDate(el.freightData.endDateContract);
                    el.freightData.dominantProductGroup = el.freightData.dominantProductGroupOther || fieldsTranslations[language][el.freightData.dominantProductGroup];
                }
             //   el.shipCoated = el.shipCoated ? fieldsTranslations[language]['yes'] : fieldsTranslations[language]['no'];
             //   el.shipHeated = el.shipCoated ? fieldsTranslations[language]['yes'] : fieldsTranslations[language]['no'];
            }
        );

        basicFields = [
            {
                label: fieldsTranslations[language].dateNomination,
                value: 'date'
            },
            {
                label: fieldsTranslations[language].shipOwner,
                value: 'owner.fullname'
            },
            {
                label: fieldsTranslations[language].shipTitle,
                value: 'shipTitle'
            },
            {
                label: fieldsTranslations[language].shipLength,
                value: 'shipLength'
            },
            {
                label: fieldsTranslations[language].shipWidth,
                value: 'shipWidth'
            },
            {
                label: fieldsTranslations[language].dwt,
                value: 'dwt'
            },
            {
                label: fieldsTranslations[language].shipCategory,
                value: 'shipCategory'
            },
            {
                label: fieldsTranslations[language].shipVolume,
                value: 'shipVolume'
            },
            {
                label: fieldsTranslations[language].shipProductGroup,
                value: 'shipProductGroup'
            },
            {
                label: fieldsTranslations[language].shipPiping,
                value: 'shipPiping'
            },
            {
                label: fieldsTranslations[language].shipCoated,
                value: 'shipCoated'
            },
            {
                label: fieldsTranslations[language].shipHeated,
                value: 'shipHeated'
            },
            {
                label: fieldsTranslations[language].shipProfile,
                value: 'shipProfile'
            },
            {
                label: fieldsTranslations[language].tanksQuantity,
                value: 'tanksQuantity'
            },
            {
                label: fieldsTranslations[language].shipFlag,
                value: 'shipFlag'
            },
        ];

        if(type === 'time-charter') {
            fields = [
                ...basicFields,
                {
                    label: fieldsTranslations[language].startDateContract,
                    value: 'freightData.startDateContract'
                },
                {
                    label: fieldsTranslations[language].endDateContract,
                    value: 'freightData.endDateContract'
                },
                {
                    label: fieldsTranslations[language].dominantProductGroup,
                    value: 'freightData.dominantProductGroup'
                },
                {
                    label: fieldsTranslations[language].dominantArea,
                    value: 'freightData.dominantArea'
                },
                {
                    label: fieldsTranslations[language].miniTC,
                    value: 'freightData.miniTC'
                },
                {
                    label: fieldsTranslations[language].engineRoomFreeOfCharge,
                    value: 'freightData.engineRoomFreeOfCharge'
                },
                {
                    label: fieldsTranslations[language].portFees,
                    value: 'freightData.portFees'
                },
                {
                    label: fieldsTranslations[language].channelCostsFree,
                    value: 'freightData.channelCostsFree'
                },
                {
                    label: fieldsTranslations[language].rentalPriceDay,
                    value: 'freightData.rentalPriceDay'
                },
                {
                    label: fieldsTranslations[language].sailingTime,
                    value: 'freightData.sailingTime'
                },
                {
                    label: fieldsTranslations[language].emptyDaysBeforeTrip,
                    value: 'freightData.emptyDaysBeforeTrip'
                },
            ];

            exportData = dataEntries;
        }

        if(type === 'spot-market') {
            fields = [
                ...basicFields,
                {
                    label: fieldsTranslations[language].productGroup,
                    value: 'freightData.productGroup'
                },
                {
                    label: fieldsTranslations[language].loadedTons,
                    value: 'freightData.loadedTons'
                },
                {
                    label: fieldsTranslations[language].loadingPort,
                    value: 'freightData.loadingPort'
                },
                {
                    label: fieldsTranslations[language].deliveryPort,
                    value: 'freightData.deliveryPort'
                },
                {
                    label: fieldsTranslations[language].dominantArea,
                    value: 'freightData.area'
                },
                {
                    label: fieldsTranslations[language].freightPricePerTon,
                    value: 'freightData.freightPricePerTon'
                },
                {
                    label: fieldsTranslations[language].lumpsumFreight,
                    value: 'freightData.lumpsumFreight'
                },
                {
                    label: fieldsTranslations[language].standbyPricePerHour,
                    value: 'freightData.standbyPricePerHour'
                },
                {
                    label: fieldsTranslations[language].standbyHours,
                    value: 'freightData.standbyHours'
                },
                {
                    label: fieldsTranslations[language].sailingTime,
                    value: 'freightData.sailingTime'
                },
                {
                    label: fieldsTranslations[language].emptyDaysBeforeTrip,
                    value: 'freightData.emptyDaysBeforeTrip'
                },

            ];

            exportData = [];
            dataEntries.forEach(dataEntry => {
                dataEntry.freightData.forEach((data, i) => {
                    let newData = {};
                    if (i === 0) {
                        newData = { ...dataEntry };
                    } 
                    newData.freightData = { ...data }
                    newData.freightData.productGroup = newData.freightData.productGroupOther || fieldsTranslations[language][newData.freightData.productGroup];
                    exportData.push(newData);
                })
            });

        }

        const data = exportData;
        const json2csv = new Parser({ fields });
        const csv = json2csv.parse(data);


    res.header('Content-Type', 'text/csv');
    return res.send(csv);

  } catch(err) {
        console.log(err)
        return next(err);
  }
}

module.exports = exportData;