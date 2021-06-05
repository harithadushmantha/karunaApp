import React from 'react';

const TableHeader = ({Columns}) => {
    return ( 
        <thead>
                <tr>
                    {Columns.map(c => 
                    <th 
                    key = {c.path}
                    
                    >
                    {c.lable}</th>
                    )}
                </tr>
            </thead>
     );
}
 
export default TableHeader;

/*
class TableHeader extends Component {
   
    render() {
         
        return ( 
            
            <thead>
                <tr>
                    {this.props.Columns.map(c => 
                    <th 
                    key = {c.path}
                    
                    >
                    {c.lable}</th>
                    )}
                </tr>
            </thead>
         );
    }
}
 
export default TableHeader;*/