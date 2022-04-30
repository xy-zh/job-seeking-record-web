import React, {useContext, useState} from "react";
import {Context} from "../Context";

import ApplicationHistoryRender from "./ApplicationHistoryRender";
import EditApplication from "./EditApplication";

function InProgressApplicationRender() {
    const list = [];
    const {state, onDeleteApplication, onUpdateHistory} = useContext(Context);
    const [showDetail, setShowDetail] = useState(true);
    const buttonName = showDetail? "Hide" : "Details";

    const inProgressCollection = state.applications.inProgressCollection;

    for (let id in inProgressCollection) {
        const application = inProgressCollection[id];
        const referralName = application.referredBy ? "referred by: " + application.referredBy : "";
        const jobTitle = application.jobTitle? application.jobTitle : application.jobLink;
        const linkDisabled = application.jobLink? "job-description-link" : "disabled-link";

        list.push(
            <ul className='application'>
                <h1>{application.company}-
                    <a className={linkDisabled} href={application.jobLink} target="_blank">
                        {jobTitle}
                        <span className='link-tip'>Open job description page on new tab</span>
                    </a>
                </h1>
                <p className='application-context'>{referralName}</p>
                <p className='application-context'>
                    <span className='application-status'>{application.status} </span>
                    on
                    <span className='update-date'>{application.updateDate}</span>
                </p>
                <ApplicationHistoryRender histories={application.history}
                                          show={application.showHistory}
                />
                <div className='application-activities'>
                    <button className='delete-application'
                            onClick={() => {
                                onDeleteApplication(application.id);
                            }}
                    >
                        Delete
                    </button>

                    <button className='expand-history'
                            onClick={() => {
                                application.showHistory = !application.showHistory;
                                onUpdateHistory(application);
                            }}
                    >
                        History
                    </button>
                </div>
                <EditApplication application={application}/>
            </ul>
        );
    }

    return (
        <div>
            <div className='collection-heading'>
                In Progress
                <button className='on-expand-collection'
                        onClick={() => {
                            setShowDetail(!showDetail);
                        }}
                >
                    {buttonName}
                </button>
            </div>
            {showDetail && <ul className='applications'>{list}</ul>}
        </div>
    );
}

export default InProgressApplicationRender;