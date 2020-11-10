import React from 'react';

class SignIn extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            signInEmail: '',
            signInPassword: ''
        }
    }

    onEmailChange = (event) => {
        this.setState({signInEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({signInPassword: event.target.value})
    }

    onSubmitSignIn = () => {
        console.log(this.state);
        fetch('https://safe-chamber-28409.herokuapp.com/signin', {
            method:'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: this.state.signInEmail,
                password:this.state.signInPassword
            })
        })
        .then(response => response.json())
        .then(user => {
            if (user.id) { // check if user exists
                this.props.loadUser(user);
                this.props.onRouteChange('home');
            }
        })
    }

    render() {
        const {onRouteChange } = this.props;
        return (
            <div>
                <main className="ba b--white-10 center br2 mv4 w-199 w-50-m w-25-1 mw6">
                <div className="measure mt4 mb4">
                    <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                    <legend className="f4 fw6 ph0 mh0 white">Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                            <input 
                                className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" 
                                type="email" 
                                name="email-address"  
                                id="email-address" 
                                onChange={this.onEmailChange}
                            />
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                            <input 
                                className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" 
                                type="password" 
                                name="password"  
                                id="password" 
                                onChange={this.onPasswordChange}
                            />
                        </div>
                    </fieldset>
                    <div className="">
                        <input 
                            onClick={this.onSubmitSignIn /*() => /*onRouteChange('home')*/} 
                            className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" 
                            type="submit" 
                            value="Sign in" 
                        />
                    </div>
                    <div className="lh-copy mt3">
                        <p onClick={() => onRouteChange("register")} className="f6 link dim white db pointer">Register</p>
                    </div>
                </div>
                </main>
            </div>
        );
    }
}

export default SignIn;