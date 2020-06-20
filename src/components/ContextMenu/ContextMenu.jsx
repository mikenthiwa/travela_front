import React, {Component} from 'react';
import PropTypes from 'prop-types';

export default class ContextMenu extends Component {
    state = {
      open: false
    };

    menu = React.createRef();

    componentDidMount() {
      document.addEventListener('mousedown', this.onClickOutside);
    }

    componentWillUnmount() {
      document.removeEventListener('mousedown', this.onClickOutside);
    }

    toggleMenu = (e) => {
      e.preventDefault();
      this.setState((prevState) => ({open: !prevState.open}));
    };

    onClickOutside = (e) => {
      if (!this.menu.current.contains(e.target)) {
        this.setState({open: false});
      }
    };

    onItemClick = (e,onClick) => {
      this.toggleMenu(e);
      onClick(e);
    };

    render() {
      const {open} = this.state;
      const { children , classNames } = this.props;
      return (
        <span>
          <i
            className="fa fa-ellipsis-v on"
            role="presentation"
            onClick={this.toggleMenu}
          />
          <div
            ref={this.menu}
            className={`context-menu ${classNames} ${open && 'open'}`}
          >
            <ul className="table__menu-list">
              {
                (children instanceof Array ? children : [children]).map((child) => {
                  const onClick = child.props.onClick;
                  return React.cloneElement(child, {
                    onClick: (e) => this.onItemClick(e, onClick),
                    key: Math.random()
                  });
                })
              }
            </ul>
          </div>
        </span>
      );
    }
}

ContextMenu.defaultProps = {
  classNames: 'table__menu-container',
};

ContextMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.arrayOf(PropTypes.object),
  ]).isRequired,
  classNames: PropTypes.string
};
