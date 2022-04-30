import React from "react";

import InProgressApplicationRender from "./InProgressApplicationRender";
import PastApplicationRender from "./PastApplicationRender";
import OffersRender from "./OffersRender";
import AddNewApplicationForm from "./AddNewApplicationForm";

function Applications() {

    return (
        <div className='applications-panel'>
            <AddNewApplicationForm/>
            <OffersRender/>
            <InProgressApplicationRender/>
            <PastApplicationRender/>
        </div>
    );
}

export default Applications;