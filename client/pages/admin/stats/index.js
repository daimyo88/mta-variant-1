import React from 'react';
import Admin from '../../../layouts/Admin';

import SpotMarketFreightPrice from '../../../components/graphs/SpotMarketFreightPrice';
import ProductGroupsRatio from '../../../components/graphs/ProductGroupsRatio';

export default function Page() {

    return (
        <Admin> 
            <SpotMarketFreightPrice />
            <ProductGroupsRatio />
        </Admin>
    )
}