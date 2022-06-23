import React, {useEffect, useState} from 'react';
import {Run} from "../remotes/shared";
import {runRemote} from "../remotes/runRemote";
import {useNavigate} from "react-router-dom";
import {formatToTimestamp} from "../util/format";
import Button from "../components/button";
import RunModal from "../components/runModal";

const RunsPage = () => {
    const navigate = useNavigate();

    function fetchRuns() {
        runRemote.getRuns()
            .then(setRuns)
            .catch(console.log);
    }

    const [runs, setRuns] = useState<Run[]>([]);
    const [openCreateRunModal, setOpenCreateRunModal] = useState<boolean>(false);

    useEffect(() => {
        fetchRuns();
    }, []);

    return (
        <div>
            <RunModal
                open={openCreateRunModal}
                onCreate={(run: Run) => {
                    setRuns([...runs, run]);
                    setOpenCreateRunModal(false);
                }}
                onClose={() => setOpenCreateRunModal(false)}
            />
            <div className={'tw-grid tw-grid-cols-2'}>
                <div>Runs</div>
                <Button onClick={() => setOpenCreateRunModal(true)}>
                    Create Run
                </Button>
            </div>
            <div className={'tw-bg-gray-700 tw-p-4'}>
                {runs.map(run => (
                    <div key={run.id} className={'tw-grid tw-grid-cols-6 tw-border tw-bg-gray-600'}>
                        <div className={'tw-col-span-2 tw-p-2 tw-border-r tw-grid tw-content-center'}>
                            {run.name}
                        </div>
                        <div className={'tw-col-span-2 tw-p-2 tw-border-r tw-grid tw-grid-cols-3 tw-content-center'}>
                            {run.accounts?.map(account =>
                                <div key={account.id} className={'tw-col-span-1'}>{account.name}</div>
                            )}
                        </div>
                        <div className={'tw-col-span-1 tw-p-2 tw-border-r tw-grid tw-content-center'}>
                            {formatToTimestamp(run.createdAt)}
                        </div>
                        <div className={'tw-col-span-1 tw-p-2 tw-text-center tw-grid tw-content-center'}>
                            <button
                                onClick={() => navigate(`/runs/${run.name}`)}
                                className={'tw-bg-green-900 tw-text-white tw-p-2 tw-rounded'}>
                                Click Me
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RunsPage;