import '../App.css';
import React from "react";
import {useState, useReducer, useEffect} from "react";

import Reference from "./Reference";
import Login from "./Login";
import Logout from "./Logout";
import Applications from "./Applications";

import {
    fetchAddApplication,
    fetchDeleteApplication,
    fetchLogin,
    fetchLogout,
    fetchSession,
    fetchApplications,
    fetchUpdateApplicationStatus,
} from "../services";

import {initialState, reducer} from "../reducer";
import {MESSAGES} from "../messages";
import {Context} from "../Context";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const [state, dispatch] = useReducer(reducer, initialState);

    function checkForSession() {
        setIsLoading(true);
        fetchSession()
            .then(() => {
                populateApplications();
            })
            .finally(() => {
                setIsLoading(false)
            });
    }

    function populateApplications() {
        fetchApplications()
            .then(applications => {
                dispatch({
                    type: 'updateSessions',
                    applications: applications,
                });
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            });
    }

    function onLogin(username) {
        fetchLogin(username)
            .then(applications => {
                dispatch({
                    type: 'login',
                    username,
                    applications,
                });
                populateApplications();
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    function onLogout() {
        fetchLogout()
            .then(() => {
                dispatch({
                    type: 'logout',
                });
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    function onAddApplication(newApplication) {
        fetchAddApplication(newApplication)
            .then((application) => {
                dispatch({
                    type: 'addApplication',
                    id: application.id,
                    newApplication: application,
                });
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    function onUpdateHistory(application, history) {
        fetchUpdateApplicationStatus(application.id, application, history)
            .then((updatedApplication) => {
                dispatch({
                    type: 'updateHistory',
                    id: application.id,
                    application: updatedApplication,
                    status: application.status,
                });
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    function onUpdateCollection(application, history) {
        fetchUpdateApplicationStatus(application.id, application, history)
            .then(() => {
                populateApplications();
                setErrorMessage('');
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    function onDeleteApplication(id) {
        fetchDeleteApplication(id)
            .then(() => {
                dispatch({
                    type: 'deleteApplication',
                    id: id,
                });
                populateApplications();
                setErrorMessage('')
            })
            .catch(error => {
                setErrorMessage(MESSAGES[error.error]);
            })
    }

    useEffect(() => {
            checkForSession();
        },
        []
    );

    return (
        <div className="app">
            <header>
                <h1>Get Hired</h1>
                <Reference/>
            </header>
            <body>
            <Context.Provider
                value={{state, onLogin, onLogout, onAddApplication, onUpdateHistory, onUpdateCollection, onDeleteApplication}}>
                {errorMessage && <div className='error-message'>{errorMessage}</div>}
                {isLoading && <div className='isLoading'>Loading...</div>}
                {!isLoading && !state.isLoggedIn && <Login/>}
                {!isLoading && state.isLoggedIn &&
                    <div className='user-panel'>
                        <Logout/>
                        <Applications/>
                    </div>
                }
            </Context.Provider>
            </body>
        </div>
    );
}

export default App;
