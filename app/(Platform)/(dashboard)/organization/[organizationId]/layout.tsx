import React from 'react';
import {OrgControl} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/org-control";

const OrganizationIdLayout = ({
                                  children
                              }: {
    children: React.ReactNode
}) => {
    return (
        <>
            <OrgControl/>
            {children}
        </>
    );
};

export default OrganizationIdLayout;
