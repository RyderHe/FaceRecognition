import React from 'react';

const Navigation = ({onRouteChange, isSignedIn}) => {

    if (isSignedIn) { // now in home page, only can sign out
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signout')} className='f3 link dim white underline pa3 pointer'>Sign Out</p>
            </nav>
         )
    } else { // now in signin/register page
        return (
            <nav style={{display:'flex', justifyContent:'flex-end'}}>
                <p onClick={() => onRouteChange('signin')} className='f3 link dim white underline pa3 pointer'>Sign In</p>
                <p onClick={() => onRouteChange('register')} className='f3 link dim white underline pa3 pointer'>Register</p>
            </nav>
        )
    }
}

export default Navigation;