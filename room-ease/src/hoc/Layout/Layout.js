import React, { Component } from 'react';
import Navbar from '../../components/Navbar/Navbar'
import NavigationDrawer from '../../components/NavigationDrawer/NavigationDrawer';
import Auxillary from '../../hoc/Auxillary'

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
                <NavigationDrawer view={this.state.drawerOpen} />
            </Auxillary>
        );
    }
}

export default Layout;