import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({ component: Comp, user, restricted, ...otherProps }) => {
    return (
        <Route {...otherProps} component={(props) =>
            restricted ?
                (user ?
                    <Redirect to='/dashboard' />
                    :
                    <Comp {...props} user={user} />
                )
                :
                <Comp {...props} user={user} />
        } />
    );
}

export default PublicRoute;
