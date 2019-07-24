/* eslint-disable react/destructuring-assignment */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import './index.scss';
import ContextMenu from '../../ContextMenu/ContextMenu';
import MenuItem from '../../ContextMenu/MenuItem';
import Pagination from '../../Pagination/Pagination';
import pluralize from '../../../helper/pluralize';

class ChecklistConfigurations extends React.Component{

   state = {
     searchTerm: '',
     currentPage: 1,
     pageStart: 0,
     hover: {
       name: '',
     },
   }

   handleChange = (e) => {
     this.setState({searchTerm: e.target.value});
   }

   onPageChange = (page) => {
     this.setState((prevState) => {
       const addition = prevState.currentPage < page ? 10 : -10;
       return {
         currentPage: page,
         pageStart: prevState.pageStart + addition,
       };
     });
   }

   renderConfigSearch = () => {
     const {searchTerm} = this.state;
     return (
       <div className="search-container">
         <span className="icon">Nationality</span>
         <input 
           className="input-field" 
           type="text" placeholder="Search" 
           value={searchTerm} 
           onChange={this.handleChange} />
         <button type="button"><span className="fa fa-search search-icon" /></button>
       </div>
     );
   };

   formatDestinations = (destinations) => {
     return destinations.reduce((acc, curr, index, array) => {
       let place;
       place = (!curr.country) ? curr.region.region :curr.country.country;
       if (!index) {
         return place;
       }
       if (!array[index + 1]) {
         return `${acc} and ${place}`;
       }
       return `${acc}, ${place}`;
     }, '');
   }

   showExtraDestination = (name) => {
     this.setState({ hover: { name } });
   }

   removeExtraDestination = () => {
     this.setState({hover: { name: '' }});
   }

   renderChecklistConfig = (id, name, config, createdBy, createdAt, destinations) => {
     const numOfItems = config.length;
     const { hover } = this.state;
     return (
       <div className="checklist-card" key={id}>
         <div className="card-header">
           <div className="card-title">{name}</div>
           <div className="travel_stipend_menu">
             <ContextMenu classNames="table__menu-container">
               <MenuItem 
                 classNames="edit"
                 onClick={()=>{}}
               >
                Edit
               </MenuItem>
               <MenuItem 
                 classNames="delete"
                 onClick={()=>{}}
               >
                Delete
               </MenuItem>
             </ContextMenu>
           </div>
         </div>
         <div className="card-body">
           <div>
             <div className="subtitle-heading">No of items</div>
             <div className="subtitle-text">{numOfItems}</div>
           </div>
           <div className="destination-wrapper">
             <div className="subtitle-heading">Applicable to</div>
             <div
               className="subtitle-text" 
               onMouseEnter={() => (this.showExtraDestination(name))}
               onMouseLeave={this.removeExtraDestination}
             >
               {pluralize(destinations.length, 'destination')}
             </div>
             {hover.name === name && <div className="expanded-destination">{this.formatDestinations(destinations)}</div>}
           </div>
           <div>
             <div className="subtitle-heading">Created On</div>
             <div className="subtitle-text">{moment(createdAt).format('DD/MM/YYYY')}</div>
           </div>
           <div>
             <div className="subtitle-heading">Created by</div>
             <div className="subtitle-text">{createdBy}</div>
           </div>
         </div>
       </div>
     );
   };

   render() {
     const {checklists} = this.props;
     const {searchTerm, pageStart, currentPage} = this.state;
     const list = checklists.filter(checklist => checklist.name.toLowerCase()
       .includes(searchTerm.toLowerCase()));
     const filteredList = list.slice(pageStart, pageStart + 10);
     const pageCount= Math.ceil(list.length / 10);
     return (
       <div>
         {this.renderConfigSearch()}
         <div className="checklist-cards">
           {filteredList.map(({id, name, config, createdBy, createdAt, destinations}) => (
             this.renderChecklistConfig(id, name, config, createdBy.fullName, createdAt, destinations)
           ))}
         </div>
         {pageCount > 0 ? (
           <Pagination
             currentPage={currentPage}
             pageCount={pageCount}
             onPageChange={this.onPageChange}
           />
         ) : (<div>No Checklist found</div>)
         }
       </div>
     );
   }
}

ChecklistConfigurations.propTypes = {
  checklists: PropTypes.array.isRequired
};

export default ChecklistConfigurations;
