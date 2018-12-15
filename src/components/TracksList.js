import React from 'react';
import {ListGroup, ListGroupItem} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default props => (
    <div>
        {props.tracks ?
            <div>
                <ListGroup className="my-3">
                    {props.tracks.map(track => (
                        <ListGroupItem key={Object.keys(track)[0]}>
                            <div className="float-left">
                                <strong>{track[Object.keys(track)[0]].upper}</strong> /{' '}
                                <strong>{track[Object.keys(track)[0]].lower}</strong> /{' '}
                                <strong>{track[Object.keys(track)[0]].heartRate}</strong>
                                <div className="text-muted">{track[Object.keys(track)[0]].measuredOn}</div>
                            </div>

                            <button className="btn btn-danger float-right"
                                    onClick={() => props.deleteItem(Object.keys(track)[0])}>
                                <FontAwesomeIcon icon="trash"/>
                            </button>
                        </ListGroupItem>
                    ))}
                </ListGroup>
                <div className="container-fluid">
                    <button className="btn btn-danger" onClick={props.deleteAllItems}><FontAwesomeIcon
                        icon="trash"/> Delete all
                    </button>
                </div>
            </div>
            : null}
    </div>
)
