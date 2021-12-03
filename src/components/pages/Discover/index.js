import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import style from "./style.css"
import API from "../../../utils/api";
import { MY_DISCOVER } from "../../../utils/actions";

function Discover() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        API.getAllPlaces()
            .then(res => {
                setPlaces(res.data)
                dispatch({
                    type: MY_DISCOVER,
                    payload: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    return (
        <div>
            <div className="uk-container uk-width-4-5">
                <h1 className="uk-heading-divider uk-text-center">Discover</h1>
                <ul className="uk-list uk-list-large uk-list-divider" id='search-results'>
                    {places.map(place => {
                        const newLocation = place.location.split(",").slice(0, -2).join(",");
                        return (
                            <li
                                key={place.ref_id}
                                id={place.ref_id}>
                                {place.name} at {newLocation} {place.isJob === 'establishment' ? <span className="uk-icon-button">E</span> : <span className="uk-icon-button">J</span>}
                                <button id={place.ref_id} onClick={() =>
                                    localStorage.token ? navigate(`/discover/${place.ref_id}`) : alert("Please Log In or Create an Account First!")}>View Place</button>
                            </li>
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Discover;