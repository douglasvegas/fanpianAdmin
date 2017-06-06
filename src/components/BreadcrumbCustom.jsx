import React from 'react';

import { Breadcrumb } from 'antd';

class BreadcrumbCustom extends React.Component {
    constructor (props) {
        super (props);
        this.state = {

        };
    }

    render () {
        const Breads = this.props.BreadArray.map((v,i) => {
            return (
                <Breadcrumb.Item key = {i}>{ v }</Breadcrumb.Item>
            )
        })
        return (
            <Breadcrumb style={{ margin: '12px 0' }}>
                {Breads}
            </Breadcrumb>
        )
    }
}

export default BreadcrumbCustom;