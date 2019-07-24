import React from 'react';
import { Alert } from 'reactstrap';

const Error = (props) => {
    return (
        <div>
            <Alert color='danger'>
                Invalid zip code! <a href='/' className='alert-link'>Go Back Home.</a>
            </Alert>
        </div>

    )
}

export default Error;