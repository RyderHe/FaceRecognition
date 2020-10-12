import React from 'react';

const Register = ({ onRouteChange }) =>{
    return (
        <div>
            <main className="ba b--white-10 center br2 mv4 w-199 w-50-m w-25-1 mw6">
            <div className="measure mt4 mb4">
                <fieldset id="sign_up" className="ba b--transparent ph0 mh0" >
                    <legend className="f4 fw6 ph0 mh0 white">Register</legend>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="name">Name</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="text" name="name"  id="name" />
                    </div>
                    <div className="mt3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="email-address">Email</label>
                        <input className="pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="email" name="email-address"  id="email-address" />
                    </div>
                    <div className="mv3">
                        <label className="db fw6 lh-copy f6 white" htmlFor="password">Password</label>
                        <input className="b pa2 input-reset ba bg-transparent hover-bg-gray hover-white w-100" type="password" name="password"  id="password" />
                    </div>
                </fieldset>
                <div className="">
                <input onClick={() => onRouteChange('home')} className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white pointer" type="submit" value="Register" />
                </div>

            </div>
            </main>
        </div>
    );
}

export default Register;