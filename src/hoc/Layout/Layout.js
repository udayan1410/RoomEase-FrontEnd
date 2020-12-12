import React, { Component } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import Navbar from '../../components/Navbar/Navbar'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer';
import Auxillary from '../../hoc/Auxillary'
import Hotkeys from 'react-hot-keys';
import ProfileMenu from '../../components/ProfileMenu/ProfileMenu';
import { connect } from 'react-redux';
import { CHECK_AUTH_STATE } from '../../store/Actions/ActionConstants';

class Layout extends Component {

    state = {
        drawerOpen: false,
        profileMenuOpen: false,
        userLoggedIn: false,
    }

    drawerStatusHandler = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    profileStatusHandler = () => {
        this.setState({ profileMenuOpen: !this.state.profileMenuOpen })
    }


    componentDidMount() {
        this.props.checkAuthState();
    }


    render() {

        return (
            <Auxillary>
                <Navbar
                    onDrawerClick={this.drawerStatusHandler}
                    onProfileClick={this.profileStatusHandler}
                    profileMenuview={this.state.profileMenuOpen}
                />

                <Hotkeys
                    keyName="o"
                    onKeyDown={this.drawerStatusHandler}
                />

                <Hotkeys
                    keyName="m"
                    onKeyDown={this.profileStatusHandler}
                />

                <NavigationDrawer view={this.state.drawerOpen} closeMenu={this.drawerStatusHandler} />
                <ProfileMenu view={this.state.profileMenuOpen} />

                <Backdrop
                    show={this.state.drawerOpen}
                    onClick={this.drawerStatusHandler}>
                </Backdrop>
                {this.props.children}
            </Auxillary >
        );
    }
}

let mapStateToProps = state => {
    return {
        userLoggedIn: state.userID != null
    }
};

let mapDispatchToProps = dispatch => {
    return {
        checkAuthState: () => dispatch({ type: CHECK_AUTH_STATE })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);