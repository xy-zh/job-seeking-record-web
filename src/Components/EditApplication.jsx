import React from "react";
import {useState, useContext} from "react";
import {Context} from "../Context";
import {today, dateRegex} from "../date";

function EditApplication({application}) {
    const [updatedCompany, setCompanyName] = useState(application.company);
    const [updatedUpdateDate, setUpdateDate] = useState(today);
    const [updatedJobTitle, setJobTitle] = useState(application.jobTitle);
    const [updatedJobLink, setJobLink] = useState(application.jobLink);
    const [updatedReferral, setReferral] = useState(application.referredBy);
    const [updatedStatus, setStatus] = useState(application.status);
    const [onEditing, setOnEditing] = useState(false);

    const history = {
        status: application.status,
        updateDate: application.updateDate,
    };

    const newApplication = {
        ...application,
        company: updatedCompany,
        updateDate: updatedUpdateDate,
        jobTitle: updatedJobTitle,
        jobLink: updatedJobLink,
        referredBy: updatedReferral,
        status: updatedStatus,
    };

    const {onUpdateHistory, onUpdateCollection} = useContext(Context);

    return (
        <div className='edit-application'>
            <button className='edit-application-button'
                    onClick={() => {
                        setOnEditing(!onEditing);
                    }}
            >
                Update
            </button>

            {onEditing &&
                <div>
                    <form className='edit-application-form'>
                        <input
                            value={updatedCompany}
                            onInput={(e) => {
                                setCompanyName(e.target.value);
                            }}
                            placeholder='Company Name'
                        />
                        <input
                            value={updatedJobTitle}
                            onInput={(e) => {
                                setJobTitle(e.target.value);
                            }}
                            placeholder='Job Title'
                        />
                        <input
                            value={updatedJobLink}
                            onInput={(e) => {
                                setJobLink(e.target.value);
                            }}
                            placeholder='Job Link'
                        />
                        <input
                            value={updatedUpdateDate}
                            onInput={(e) => {
                                setUpdateDate(e.target.value);
                            }}
                            placeholder='MM/DD/YYYY'
                        />
                        <input
                            value={updatedReferral}
                            onInput={(e) => {
                                setReferral(e.target.value);
                            }}
                            placeholder='Referral'
                        />
                        <input
                            value={updatedStatus}
                            onInput={(e) => {
                                setStatus(e.target.value);
                            }}
                            placeholder='status'
                        />
                    </form>
                    <div className='edit-application-shortcut'>
                        <button className='edit-application-button--no-selected'
                                onClick={() => {
                                    onUpdateCollection({
                                        ...application,
                                        status: 'Rejected',
                                        updateDate: today
                                    }, history);
                                    setOnEditing(false);
                                }
                                }>
                            NO SELECTED
                        </button>
                        <button className='edit-application-button--no-selected'
                                onClick={() => {
                                    onUpdateCollection({
                                        ...application,
                                        status: 'Withdraw',
                                        updateDate: today
                                    }, history);
                                    setOnEditing(false);
                                }
                                }>
                            Withdraw
                        </button>
                        <button className='edit-application-button--get_hired'
                                onClick={() => {
                                    onUpdateCollection({
                                        ...application,
                                        status: 'Got offer',
                                        updateDate: today
                                    }, history);
                                    setOnEditing(false);
                                }
                                }>
                            &#127881;GET OFFER!&#127881;
                        </button>
                        <button className='edit-application-button'
                                disabled={
                                    (!updatedStatus) || (!updatedJobLink && !updatedJobTitle) || (!dateRegex.test(updatedUpdateDate))
                                }
                                onClick={() => {
                                    onUpdateHistory(newApplication, history);
                                    setOnEditing(false);
                                }}
                        >Submit
                        </button>
                        <button className='edit-application-button'
                                onClick={() => {
                                    setOnEditing(false);
                                }
                                }
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}

export default EditApplication;