import {useContext, useState} from "react";
import {Context} from "../Context";

import {today, dateRegex} from "../date";

function AddNewApplicationForm() {

    const [company, setCompanyName] = useState('');
    const [updateDate, setUpdateDate] = useState(today);
    const [jobTitle, setJobTitle] = useState('');
    const [jobLink, setJobLink] = useState('');
    const [referralBy, setReferral] = useState('');
    const [showForm, setShowForm] = useState(false);

    const {onAddApplication} = useContext(Context);
    const newApplication = {
        company,
        updateDate,
        jobTitle,
        jobLink,
        referralBy
    };

    return (
        <div className='add-application'>
            <button className='add-application-form-handle'
                    onClick={() => {
                        setShowForm(!showForm)
                    }}>
                Add New Application
            </button>
            {showForm &&
                <form className='add-application-form'>
                    <input
                        value={company}
                        onInput={(e) => {
                            setCompanyName(e.target.value);
                        }}
                        placeholder='Company Name'
                    />
                    <input
                        value={updateDate}
                        onInput={(e) => {
                            setUpdateDate(e.target.value);
                        }}
                        placeholder='MM/DD/YYYY'
                    />
                    <input
                        value={jobTitle}
                        onInput={(e) => {
                            setJobTitle(e.target.value);
                        }}
                        placeholder='Job Title'
                    />
                    <input
                        value={jobLink}
                        onInput={(e) => {
                            setJobLink(e.target.value);
                        }}
                        placeholder='Job Link'
                    />
                    <input
                        value={referralBy}
                        onInput={(e) => {
                            setReferral(e.target.value);
                        }}
                        placeholder='Referral'
                    />
                    <button  className='cancel-application-button'
                        onClick={() => {
                        setShowForm(false);
                    }
                    }>&#10134;
                    </button>
                    <button className='add-application-button'
                            disabled={
                                (!jobLink && !jobTitle) || (!dateRegex.test(updateDate))
                            }
                            onClick={() => {
                                onAddApplication(newApplication);
                                setCompanyName('');
                                setJobLink('');
                                setJobTitle('');
                                setReferral('');
                                setUpdateDate(today);
                                setShowForm(false);
                            }}
                    >&#10133;
                    </button>
                </form>
            }
        </div>
    );
}

export default AddNewApplicationForm;