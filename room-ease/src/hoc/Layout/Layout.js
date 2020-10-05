import React, { Component } from 'react';
import Backdrop from '../../components/Backdrop/Backdrop';
import Navbar from '../../components/Navbar/Navbar'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer';
import Auxillary from '../../hoc/Auxillary'
import Hotkeys from 'react-hot-keys';

class Layout extends Component {

    state = {
        drawerOpen: false
    }

    drawerStatusHandler = () => {
        this.setState({ drawerOpen: !this.state.drawerOpen })
    }

    render() {

        return (
            <Auxillary>
                <Navbar onDrawerClick={this.drawerStatusHandler} />

                <Hotkeys
                    keyName="o"
                    onKeyDown={this.drawerStatusHandler}
                />

                <NavigationDrawer view={this.state.drawerOpen} />

                <Backdrop
                    show={this.state.drawerOpen}
                    onClick={this.drawerStatusHandler}>
                    {this.props.children}
                </Backdrop>
            </Auxillary >
        );
    }
}

export default Layout;