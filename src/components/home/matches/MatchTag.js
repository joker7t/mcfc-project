import React from 'react';
import { Link } from 'react-router-dom';

const MatchTag = ({ name, content, link, linkTo }) => {
    const template = <div className={name}>
        {content}
    </div>;

    return link ? (
        <Link to={linkTo}>
            {template}
        </Link>
    ) : template;
}

export default MatchTag;
