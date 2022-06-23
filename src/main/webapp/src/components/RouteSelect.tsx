import React, {useEffect, useState} from 'react';
import {pokemonRemote} from "../remotes/pokemonRemote";
import {useDebounce} from "react-use";
import {Pokemon} from "../remotes/shared";
import {routeRemote} from "../remotes/routeRemote";

export interface Route {
    id: string;
    name: string;
}

interface Props {

}

const RouteSelect = (props: Props) => {

    const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
    const [routeName, setRouteName] = useState("");
    const [fetchAgain, setFetchAgain] = useState(false);
    const [filteredRoutes, setFilteredRoutes] = useState<Route[]>([]);
    const [debouncedValue, setDebouncedValue] = useState("");

    const [, cancel] = useDebounce(
        () => {
            setDebouncedValue(routeName);
        }, 300, [routeName]
    );

    useEffect(() => {
        if (debouncedValue.length <= 0 || !fetchAgain) {
            return;
        }

        routeRemote.getRoutes(debouncedValue)
            .then(routeList => {
                setFilteredRoutes(routeList);
            })
    }, [debouncedValue]);

    const handleOnSelectionClicked = (routeId: string) => {
        setFetchAgain(false);
        setFilteredRoutes([]);

        const foundRoute = filteredRoutes.filter(r => r.id === routeId)[0];
        setSelectedRoute(foundRoute);
        setRouteName(foundRoute.name);
    };

    const handleOnInputChanged = (pokemonName: string) => {
        setRouteName(pokemonName);
        setFetchAgain(true);
    }

    return (
        <div className={'tw-grid tw-grid-cols-4 tw-border tw-rounded tw-p-1'}>
            <div className={'tw-col-span-4 tw-relative'}>
                <input
                    className={'tw-border tw-rounded tw-w-full tw-p-2' + ' ' +
                        ' tw-text-white tw-bg-neutral-700 focus:tw-outline-white'
                    }
                    value={routeName}
                    onChange={e => handleOnInputChanged(e.target.value)}/>
                <div className={'tw-absolute tw-mt-1 tw-w-full'}>
                    {filteredRoutes.map(p => (
                        <div
                            className={'tw-border tw-border-red-700 tw-p-2 tw-rounded tw-bg-neutral-700 tw-text-white tw-cursor-pointer ' +
                                'hover:tw-bg-neutral-500'
                            }
                            key={p.name}
                            onClick={e => handleOnSelectionClicked(p.id)}>
                            {p.name}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default RouteSelect;