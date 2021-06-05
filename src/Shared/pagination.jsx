import React from 'react';
import _ from 'lodash'; //underscore
import PropType from 'prop-types';

const Pagination = ({ itemCount, pageSize, currentPage, onPageChange, url }) => {
    const pagesCount = Math.ceil(itemCount / pageSize);
    if (pagesCount === 1) return null;

    const pages = _.range(1, pagesCount + 1);
    var integer = parseInt(currentPage, 10);

    console.log("pagesCount",url)

    // if(pagesCount <= 3)
    // {
    return (

        <nav>
            <ul className="pagination">
                {pages.map(page => (

                    <li key={page} className={page === integer ? 'page-item active' : 'page-item'}>

                        <a href={url} className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>
                ))}

            </ul>
        </nav>

    );
    // else{
    //     return null;
    // }
}

Pagination.propTypes = {
    itemCount: PropType.number.isRequired,
    pageSize: PropType.number.isRequired,
    curruntPage: PropType.number.isRequired,
    onPageChange: PropType.func.isRequired
}

export default Pagination;
