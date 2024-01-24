import React from 'react';
import {OrgControl} from "@/app/(Platform)/(dashboard)/organization/[organizationId]/_components/org-control";
import {auth} from "@clerk/nextjs";
import {startCase} from "lodash";

export async function generateMetadata() {
    const {orgSlug} = auth();
    console.log(orgSlug)
    return {
        title: startCase(orgSlug || "organization")
    }
}

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
