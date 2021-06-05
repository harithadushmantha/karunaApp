import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import ReactToPrint from 'react-to-print';
import { withStyles } from '@material-ui/core/styles';
import '../../../style.css';

export const defaultToolbarStyles = theme => ({
  root: {},
  left: {
    flex: '1 1 auto',
  },
  actions: {
    flex: '1 1 auto',
    textAlign: 'right',
  },
  titleRoot: {},
  titleText: {},
  icon: {
    '&:hover': {
      color: theme.palette.primary.main,
    },
  },
  iconActive: {
    color: theme.palette.primary.main,
  },
  filterPaper: {
    maxWidth: '50%',
  },
  searchIcon: {
    display: 'inline-flex',
    marginTop: '10px',
    marginRight: '8px',
  },
  [theme.breakpoints.down('sm')]: {
    titleRoot: {},
    titleText: {
      fontSize: '16px',
    },
    spacer: {
      display: 'none',
    },
    left: {
      // flex: "1 1 40%",
      padding: '8px 0px',
    },
    actions: {
      // flex: "1 1 60%",
      textAlign: 'right',
    },
  },
  [theme.breakpoints.down('xs')]: {
    root: {
      display: 'block',
    },
    left: {
      padding: '8px 0px 0px 0px',
    },
    titleText: {
      textAlign: 'center',
    },
    actions: {
      textAlign: 'center',
    },
  },
  '@media screen and (max-width: 480px)': {},
});

class TableToolbar extends React.Component {
  state = {
    iconActive: null,
    showSearch: Boolean(this.props.searchText || this.props.options.searchText || this.props.options.searchOpen),
    searchText: this.props.searchText || null,
  };

  componentDidUpdate(prevProps) {
    if (this.props.searchText !== prevProps.searchText) {
      this.setState({ searchText: this.props.searchText });
    }
  }

  setActiveIcon = iconName => {
    this.setState(
      prevState => ({
        showSearch: this.isSearchShown(iconName),
        iconActive: iconName,
        prevIconActive: prevState.iconActive,
      }),
      () => {
        const { iconActive, prevIconActive } = this.state;

        if (iconActive === 'filter') {
          this.props.setTableAction('onFilterDialogOpen');
          if (this.props.options.onFilterDialogOpen) {
            this.props.options.onFilterDialogOpen();
          }
        }
        if (iconActive === undefined && prevIconActive === 'filter') {
          this.props.setTableAction('onFilterDialogClose');
          if (this.props.options.onFilterDialogClose) {
            this.props.options.onFilterDialogClose();
          }
        }
      },
    );
  };

  isSearchShown = iconName => {
    let nextVal = false;
    if (this.state.showSearch) {
      if (this.state.searchText) {
        nextVal = true;
      } else {
        const { onSearchClose } = this.props.options;
        this.props.setTableAction('onSearchClose');
        if (onSearchClose) onSearchClose();
        nextVal = false;
      }
    } else if (iconName === 'search') {
      nextVal = this.showSearch();
    }
    return nextVal;
  };

 
  render() {
    const {

      options,
      classes,

    } = this.props;

    const {  print } = options.textLabels.toolbar;
    //const { showSearch, searchText } = this.state;

    return (
      <Toolbar className={classes.root} role={'toolbar'} aria-label={'Table Toolbar'}>
        <div className={classes.left}>
       
        </div>
        <div className={classes.actions}>
          
          
          {options.print && (
            <span className="printIcon">
              <ReactToPrint
                trigger={() => (
                  <span >
                    <Tooltip title={print}>
                      <IconButton
                        data-testid={print + '-iconButton'}
                        aria-label={print}
                        classes={{ root: classes.icon }}>
                        <PrintIcon />
                        
                      </IconButton>
                    </Tooltip>
                    
                  </span>
                )}
                content={() => this.props.tableRef()}
              />
            </span>
          )}
             
          {options.customToolbar && options.customToolbar()}
        </div>
      </Toolbar>
    );
  }
}

export default withStyles(defaultToolbarStyles, { name: 'MUIDataTableToolbar' })(TableToolbar);
