import React, { Component } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import './style.css';

class Table extends Component {
    render() { 
        const {Columns,data} = this.props;
        return ( 
            
             <table className="table table-hover table-bordered">
            <TableHeader
                Columns = {Columns}
            />
            <TableBody
                Columns = {Columns}
                data = {data}
            />
            </table>
         
         );
    }
}
 
export default Table;