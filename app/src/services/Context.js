import React from 'react';

export const ServicesContext = React.createContext();

export function withServicesContext(WrappedComponent) {
    return function WrapperComponent(props) {
        return (
            <ServicesContext.Consumer>
                {services => <WrappedComponent {...props} services={services}/>}
            </ServicesContext.Consumer>
        );
    };
}
