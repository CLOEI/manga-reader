import React from 'react';

function Layout({ children }: { children: JSX.Element[] }) {
	return <div className="min-h-screen text-gray-50">{children}</div>;
}

export default Layout;
