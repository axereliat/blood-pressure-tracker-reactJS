import React, {Component} from 'react';
import {Col, Form, FormGroup, Input, Label} from "reactstrap";
import axios from '../api/Axios';
import TracksList from "./TracksList";
import moment from 'moment';
import {Auth} from '../api/Auth';
import toastr from 'toastr';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Authenticate from "./Authenticate";
import Header from "./Header";

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            upper: '',
            lower: '',
            heartRate: '',
            tracks: [],
            isAuthed: Auth.isAuthed(),
            loading: false
        }
    }

    fetchTracks = () => {
        axios.get(localStorage.getItem('localId') + '.json?auth=' + localStorage.getItem('token'))
            .then(res => {
                const newTracks = Object.keys(res.data)
                    .sort((a, b) => res.data[b].measuredOn.localeCompare(res.data[a].measuredOn))
                    .map(x => ({[x]: res.data[x]}));

                this.setState({tracks: newTracks});
            })
            .catch(err => {
                console.log('Error: ', err)
                this.setAuthed(false);
                Auth.logout();
            })
    }

    componentDidMount() {
        if (this.state.isAuthed) {
            this.fetchTracks();
        }
        this.setState({isAuthed: Auth.isAuthed()});
    }

    handleSubmit = e => {
        e.preventDefault();

        if (!this.state.lower || !this.state.upper || !this.state.heartRate) {
            toastr.error('Please fill in all fields');
            return;
        }
        if (!Number.isInteger(+this.state.heartRate) || !Number.isInteger(+this.state.upper) || !Number.isInteger(+this.state.lower)) {
            toastr.error('All fields must be numbers');
            return;
        }

        const postData = {
            upper: this.state.upper,
            lower: this.state.lower,
            heartRate: this.state.heartRate,
            measuredOn: moment(new Date()).format('YYYY-MM-DD hh:mm')
        };

        this.setState({loading: true});
        axios.post(localStorage.getItem('localId') + '.json?auth=' + localStorage.getItem('token'), postData)
            .then(res => {
            const newItemData = {
                [res.data.name]: {...postData}
            }
            this.setState({
                tracks: [newItemData, ...this.state.tracks],
                loading: false
            });
            toastr.success('Track is successfully created!');
        }).catch(err => {
            console.log('Error', err);
            toastr.error(err.message);
        });
        this.setState({
            upper: '',
            lower: '',
            heartRate: ''
        });
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    deleteItem = id => {
        if (window.confirm('Are you sure you want to delete this track?')) {
            axios.delete(localStorage.getItem('localId') + '/' + id + '/.json?auth=' + localStorage.getItem('token'))
                .then(() => {
                    this.setState({tracks: this.state.tracks.filter(x => Object.keys(x)[0] !== id)});
                })
                .catch(err => console.log(err));
        }
    }

    deleteAllItems = () => {
        if (window.confirm('Are you sure you want to delete all tracks?')) {
            axios.delete(localStorage.getItem('localId') + '.json?auth=' + localStorage.getItem('token'))
                .then(() => {
                    this.setState({tracks: []});
                })
                .catch(err => console.log(err));
        }
    }

    setAuthed = isAuthed => {
        this.setState({isAuthed});
        if (isAuthed) {
            this.fetchTracks();

            setTimeout(() => {
                this.setState({isAuthed: false});
                Auth.logout();
            }, +localStorage.getItem('expiresIn') * 1000)
        }
    }

    logout = () => {
        this.setAuthed(false);
        Auth.logout();
    }

    render() {
        if (this.state.isAuthed) {
            return (
                <div>
                    <Header logout={this.logout}/>
                    <Form className="jumbotron mb-0">
                        <FormGroup row>
                            <Label sm={2} for="upper">Upper: </Label>
                            <Col sm={10}>
                                <Input type="number" name="upper" id="upper" placeholder="Enter upper"
                                       value={this.state.upper}
                                       onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="lower">Lower: </Label>
                            <Col sm={10}>
                            <Input type="number" name="lower" id="lower" placeholder="Enter lower"
                                   value={this.state.lower}
                                   onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <FormGroup row>
                            <Label sm={2} for="heartRate">Heart Rate: </Label>
                            <Col sm={10}>
                            <Input type="number" name="heartRate" id="heartRate" placeholder="Enter heart rate"
                                   value={this.state.heartRate} onChange={this.handleChange}/>
                            </Col>
                        </FormGroup>
                        <button className="btn btn-primary" disabled={this.state.loading} onClick={this.handleSubmit}><FontAwesomeIcon
                            icon="save"/> {!this.state.loading ? 'Submit' : 'Please wait...'}
                        </button>
                    </Form>
                    <TracksList tracks={this.state.tracks} deleteItem={this.deleteItem}
                                deleteAllItems={this.deleteAllItems}/>
                </div>
            );
        } else {
            return (
                <Authenticate setAuthed={this.setAuthed}/>
            )
        }
    }
}

export default Home;
