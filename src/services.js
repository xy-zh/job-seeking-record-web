export const fetchSession = function () {
    return fetch('/api/session', {
        method: 'GET',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchLogout = function () {
    return fetch('/api/session', {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchLogin = function (username) {
    return fetch('/api/session', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({username}),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchAddApplication = function (application) {
    return fetch('/api/applications', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({application}),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchDeleteApplication = function (id) {
    return fetch(`/api/applications/${id}`, {
        method: 'DELETE',
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchUpdateApplicationStatus = function (id, application, history) {
    return fetch(`/api/applications/${id}`, {
        method: 'PATCH',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({application, history}),
    })
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}

export const fetchApplications = function () {
    return fetch('/api/applications', {method: 'GET'})
        .catch(() => Promise.reject({error: 'networkError'}))
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            return response.json()
                .catch(error => Promise.reject({error}))
                .then(err => Promise.reject(err));
        });
}