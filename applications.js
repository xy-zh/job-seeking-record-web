const uuid = require('uuid').v4;

function makeApplicationList() {
    const id1 = uuid();
    const id2 = uuid();
    const historyID1 = uuid();

    const applicationList = {};
    const inProgressApplications = {
        [id1]: {
            id: id1,
            company: 'Amazon',
            updateDate: '10/01/2022',
            jobTitle: 'software developer engineer',
            jobLink: 'https://www.amazon.jobs/en/jobs/986545/software-development-engineer',
            status: 'This is a sample, click History button to see more. |||',
            referredBy: null,
            history: {
                [historyID1]: {
                    id: historyID1,
                    status: 'Application submitted',
                    updateDate: '09/01/2022',
                },
            },
            showHistory: false,
        },
        [id2]: {
            id: id2,
            company: 'Google',
            updateDate: '9/01/2022',
            jobTitle: 'software engineer',
            jobLink: 'https://careers.google.com/jobs/results/107446374548546246-software-engineer-early-career/',
            status: 'Application submitted',
            referredBy: "Chris",
            history: {},
            showHistory: false,
        },
    };
    const notSelectedApplications = {};
    const offeredApplications = {};

    function getCollectionByStatus(status) {
        switch (status.toLowerCase()) {
            case 'withdraw': return 'notSelectedCollection';
            case 'rejected': return 'notSelectedCollection';
            case 'got offer': return 'offeredCollection';
            default: return 'inProgressCollection';
        }
    }

    let applications = {
        idCollection: {
            [id1]: "inProgressCollection",
            [id2]: "inProgressCollection",
        },
        inProgressCollection: inProgressApplications,
        notSelectedCollection: notSelectedApplications,
        offeredCollection: offeredApplications,
    };

    function sortHistory(application) {
        const historyList = application.history;

        let currentHistory = Object.keys(historyList);
        currentHistory.sort((history1, history2) => {
            const timeStamp1 = historyList[history1].updateDate.split("\/");
            const timeStamp2 = historyList[history2].updateDate.split("\/");
            for (let i = 0; i < 3; i++) {
                if (timeStamp1[i] !== timeStamp2[i]) {
                    return timeStamp2[i] - timeStamp1[i];
                }
            }
            return 0;
        });
        let sortedHistory = {};
        for (let key of currentHistory) {
            sortedHistory[key] = historyList[key];
        }
        application.history = sortedHistory;
        return application;
    }

    applicationList.contains = function contains(id) {
        return !!applications.idCollection[id];
    };

    applicationList.getApplications = function getApplications() {
        return applications;
    };

    applicationList.addApplication = function addApplication(newApplication) {
        const id = uuid();
        applications.inProgressCollection[id] = {
            id,
            ...newApplication,
            status: 'Application submitted',
            history: {},
            showHistory: false,
        };
        applications.idCollection[id] = getCollectionByStatus('Application submitted');
        return id;
    };

    applicationList.getApplication = function getApplication(id) {
        const collectionName = applications.idCollection[id];
        return applications[collectionName][id];
    };

    applicationList.updateApplication = function updateApplication(id, application, history) {
        const formerCollection = applications.idCollection[id];
        const targetCollection = getCollectionByStatus(application.status);

        if (history) {
            const historyId = uuid();
            application.history[historyId] = {
                id: historyId,
                ...history,
            }
            application = sortHistory(application);
        }

        delete applications[formerCollection][id];
        applications = {
            idCollection: {
                ...applications.idCollection,
                [id]: targetCollection,
            },
            ...applications,
            [targetCollection]: {
                ...applications[targetCollection],
                [id]: application,
            }
        }

        applications.idCollection[id] = targetCollection;
    };

    applicationList.deleteApplication = function deleteApplication(id) {
        const collectionName = applications.idCollection[id];

        delete applications[collectionName][id];
        delete applications.idCollection[id];
    };

    applicationList.isValidItem = function isValidItem(application) {
        if (!application) {
            return false;
        }
        const dateRegex = /^(0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])[\/\-]\d{4}$/;
        if (!dateRegex.test(application.updateDate)) {
            return false;
        }
        if (!application.jobTitle && !application.jobLink) return false;
        return true;
    }

    return applicationList;
};

module.exports = {
    makeApplicationList,
};
