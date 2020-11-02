import React from 'react';
import Layout from './Layout';
import { connect } from 'react-redux';

const withLayout = OriginalComponent => {

    return class extends React.Component {

        render() {

            return (
                <Layout>
                    <OriginalComponent {...this.props} />
                </Layout>
            )
        }
    }
}

export { withLayout };


