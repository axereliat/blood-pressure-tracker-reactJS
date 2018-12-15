import React, { Component } from 'react';
import {Form, FormGroup, Input, Label} from "reactstrap";
import {parseError} from '../utils/Utils';
import {Service} from "../api/Service";
import toastr from 'toastr';
import {Auth} from "../api/Auth";

class Authenticate extends Component {

    constructor(props) {
        super(props);

        this.state = {
            authMode: 'login',
            email: localStorage.getItem('email') || '',
            password: ''
        }
    }

    handleChange = e => {
        this.setState({[e.target.name]: e.target.value});
    }

    handleRegister = e => {
        e.preventDefault();

        Service.register(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
                Auth.login(res.data);
                this.props.setAuthed(true);
            })
            .catch(err => {
                toastr.error(parseError(err), 'Error');
            });
    }

    handleLogin = e => {
        e.preventDefault();

        Service.login(this.state.email, this.state.password)
            .then(res => {
                console.log(res);
                Auth.login(res.data);
                this.props.setAuthed(true);
            })
            .catch(err => {
                toastr.error(parseError(err), 'Error');
            });
    }

    render() {
        return (
            <div>
                {this.state.authMode === 'login' ?
                    <Form className="jumbotron alert-warning">
                        <h4>Log in</h4>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email" onChange={this.handleChange} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={this.handleChange} value={this.state.password}/>
                        </FormGroup>
                        <button className="btn btn-primary" onClick={this.handleLogin}>Log in</button>
                    </Form>
                :
                    <Form className="jumbotron">
                        <h4>Register</h4>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" placeholder="Enter your email" onChange={this.handleChange} value={this.state.email}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="password">Password</Label>
                            <Input type="password" name="password" id="password" placeholder="Enter your password" onChange={this.handleChange} value={this.state.password}/>
                        </FormGroup>
                        <button className="btn btn-primary" onClick={this.handleRegister}>Register</button>
                    </Form>
                }
                <div className="container-fluid">
                    {this.state.authMode === 'login' ?
                        <button className="btn btn-warning mt-2" onClick={() => this.setState({authMode: 'register'})}>Register</button> :
                        <button className="btn btn-warning mt-2" onClick={() => this.setState({authMode: 'login'})}>Login</button>
                    }
                </div>
            </div>
        );
    }
}

export default Authenticate;
