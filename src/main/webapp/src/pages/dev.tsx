import React, {useEffect, useState} from 'react';
import {devRemote} from "../remotes/devRemote";

const DevPage = () => {

    return (
        <div>
            Load Dev Data
            <button className={'tw-outline'} onClick={devRemote.insertCSVData}>
                Load CSV
            </button>
        </div>
    )
}

export default DevPage;