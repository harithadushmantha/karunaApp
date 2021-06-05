import React, { Component } from 'react';
import _ from 'lodash';
import './style.css';
class TableBody extends Component {
    renderCell =  (item, column) =>
    {
        if(column.content) return column.content(item);
        return _.get(item, column.path);
    }
    render() { 
        const {data,Columns} = this.props
        return ( 
            <tbody>
                {data.map(item => (
                <tr className = "table-row" key = {item._id}>
                 {Columns.map(column => (
                    <td className = "table-col" key = {column.path}>{this.renderCell(item,column)}</td>
                 ))}
                 </tr>
                ))}
                
            </tbody>
         );
    }
}
 
export default TableBody;