import React from 'react';

export const Icon = ({ children }) => (
    <div style={{ width: 20, height: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
    </div>
);

export const HomeIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L2 12h3v8h6v-6h2v6h6v-8h3L12 2zm0 3.71l5 5V18h-2v-6H9v6H7v-7.29l5-5z"/>
        </svg>
    </Icon>
);

export const ScriptIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 15h-10v-2h10v2zm0-4H7v-2h10v2zm0-4H7V8h10v2z"/>
        </svg>
    </Icon>
);

export const ProfileIcon = () => (
    <Icon>
        <svg fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.38 0 2.5 1.12 2.5 2.5S13.38 10 12 10 9.5 8.88 9.5 7.5 10.62 5 12 5zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
        </svg>
    </Icon>
);