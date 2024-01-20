import React from 'react';
import {Navbar} from "@/app/(Platform)/(dashboard)/_components/navbar";

const DashboardLayout = ({
                             children
                         }: {
    children: React.ReactNode
}) => {
    return (
        <div>
            <Navbar/>
            {children}
        </div>
    );
};

export default DashboardLayout;
