/* eslint-disable @next/next/no-img-element */

import React, { useContext } from 'react';
import { LayoutContext } from './context/layoutcontext';

const AppFooter = () => {
    const { layoutConfig } = useContext(LayoutContext);

    return (
        <div className="layout-footer">
            <img src={`/obi/layout/images/obi/obi-${layoutConfig.colorScheme === 'light' ? 'dark' : 'light'}.svg`} alt="Logo" height="30" className="mr-2" />
        
            <span className="font-medium ml-2"></span>
        </div>
    );
};

export default AppFooter;
