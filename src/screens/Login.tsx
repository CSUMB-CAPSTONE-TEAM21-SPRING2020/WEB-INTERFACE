import React, { Component } from "react";
import '../styles/Login.css';

import * as routes from "../../src/constants/routes";
import { auth } from "../firebase";

interface InterfaceProps {
    email?: string;
    error?: any;
    history?: any;
    password?: string;
  }
  
  interface InterfaceState {
    email: string;
    error: any;
    password: string;
  }
  
  export class Login extends React.Component<InterfaceProps, InterfaceState> {
    private static INITIAL_STATE = {
      email: "",
      error: null,
      password: ""
    };
  
    private static propKey(propertyName: string, value: any): object {
      return { [propertyName]: value };
    }
  
    constructor(props: InterfaceProps) {
      super(props);
  
      this.state = { ...Login.INITIAL_STATE };
    }
  
    public onSubmit = (event: any) => {
      const { email, password } = this.state;
  
      const { history } = this.props;
  
      auth
        .doSignInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState(() => ({ ...Login.INITIAL_STATE }));
          history.push(routes.HOME);
        })
        .catch(error => {
          this.setState(Login.propKey("error", error));
        });
  
      event.preventDefault();
    };


    
    public render() {
        const { email, password, error } = this.state;
        const isInvalid = password === "" || email === "";

        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form onSubmit={event => this.onSubmit(event)}>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                placeholder="Email" 
                                value={email} 
                                onChange={event => this.setStateWithEvent(event, "email")}
                            />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                placeholder="Password" 
                                value={password} 
                                onChange={event => this.setStateWithEvent(event, "password")}
                            />
                        </div>

                        <button disabled={isInvalid} type="submit" className="btn btn-primary btn-block">
                            Sign In
                        </button>
                       
                        {error && <p>{error.message}</p>}
                    </form>
                </div>
            </div>
        
        );
    }
    
    private setStateWithEvent(event: any, columnType: string): void {
        this.setState(Login.propKey(columnType, (event.target as any).value));
    }
}
