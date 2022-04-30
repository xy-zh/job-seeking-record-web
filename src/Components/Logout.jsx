import React, {useContext} from "react";
import {Context} from "../Context";

function Logout() {
    const {onLogout} = useContext(Context);
    return (
        <div className='logout-panel'>
            <label className='username'>
                <button
                    className='logout-button'
                    type='button'
                    onClick={onLogout}
                >Log Out
                </button>
            </label>
        </div>
    );
}

export default Logout;