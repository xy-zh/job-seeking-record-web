import React, {useContext, useState} from "react";
import {Context} from "../Context";
import ApplicationHistoryRender from "./ApplicationHistoryRender";
import {today} from "../date";

function OffersRender() {
    const list = [];
    const {state, onDeleteApplication, onUpdateApplication} = useContext(Context);
    const [showDetail, setShowDetail] = useState(false);
    const buttonName = showDetail? "Hide" : "Details";

    const offerCollection = state.applications.offeredCollection;

    for (let id in offerCollection) {
        const application = offerCollection[id];
        const referralName = application.referredBy ? "referred by: " + application.referredBy : "";
        const jobTitle = application.jobTitle? application.jobTitle : application.jobLink;
        const linkDisabled = application.jobLink? "job-description-link" : "disabled-link";

        const history = {
            status: application.status,
            updateDate: application.updateDate,
        };

        list.push(
            <li className='application'>
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
                                onUpdateApplication(application);
                            }}
                    >
                        History
                    </button>
                    <button className='edit-application-button'
                            onClick={() => {
                                onUpdateApplication({...application, status: 'Withdraw', updateDate: today}, history);
                            }
                            }>
                        Withdraw
                    </button>
                </div>
            </li>
        );
    }

    return (
        <div>
            <div className='collection-heading'>
                OFFERS
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

export default OffersRender;