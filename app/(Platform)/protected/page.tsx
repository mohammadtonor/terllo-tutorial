import {currentUser, UserButton} from "@clerk/nextjs";

const ProtectedPage = async () => {
    return (
        <UserButton afterSignOutUrl='/'/>
    );
};

export default ProtectedPage;