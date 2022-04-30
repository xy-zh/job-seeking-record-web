import React, {useState} from "react";

function Reference() {
    const [jobTitle, setJobTitle] = useState('');
    const [jobLocation, setJobLocation] = useState('');
    const [googleKeyWord, setGoogleKeyWord] = useState('');
    const onIndeedJobSearch = () => {
        const indeedSearchUrl = "https://www.indeed.com/jobs?q=" + jobTitle + "&l=" + jobLocation;
        window.open(indeedSearchUrl);
    }
    const onGoogleSearch = () => {
        const googleSearchUrl = "https://www.google.com/search?q=" + googleKeyWord;
        window.open(googleSearchUrl);
    }
    return (
        <div className="reference">
            <div className="job-boards-panel">
                Job Boards:
                <span className='job-board'>
                    <a href="https://www.linkedin.com/jobs/"
                       target="_blank">
                        LinkedIn
                    </a>
                </span>
                <span className='job-board'>
                    <a href="https://www.indeed.com/?from=gnav-jobsearch--jasx"
                       target="_blank">
                        Indeed
                    </a>
                </span>
                <span className='job-board'>
                    <a href="https://www.glassdoor.com/member/home/index.htm"
                       target="_blank">
                    Glassdoor
                    </a>
                </span>
            </div>
            <form className='search-form'>
                <label>Search for Jobs:
                    <input className='job-title'
                           value={jobTitle}
                           onInput={(e) => {
                               setJobTitle(e.target.value);
                           }}
                           placeholder="What"
                    />
                    <input className='job-title'
                           value={jobLocation}
                           onInput={(e) => {
                               setJobLocation(e.target.value);
                           }}
                           placeholder="Where"
                    />
                    <button onClick={onIndeedJobSearch}>Search in Indeed</button>
                </label>
                <label>Google
                    <input className='google-search'
                           value={googleKeyWord}
                           onInput={(e) => {
                               setGoogleKeyWord(e.target.value)
                           }}
                           placeholder='Google Search'
                    />
                    <button onClick={onGoogleSearch}>Google</button>
                </label>
            </form>
        </div>
    );
}

export default Reference;