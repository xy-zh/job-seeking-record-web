import React from "react";

function ApplicationHistoryRender({histories, show}) {
    let list = [];
    for (let id in histories) {
        const historyItem = histories[id];
        list.push(
            <p className='histories'>
                <span className='history-status'>{historyItem.status} </span>
                on
                <span className='submit-date'>{historyItem.updateDate}</span>
            </p>
        );
    }

    return (
        <div>
            {show &&
            <ul className='application-history'>{list}</ul>}
        </div>
    );
}

export default ApplicationHistoryRender;
