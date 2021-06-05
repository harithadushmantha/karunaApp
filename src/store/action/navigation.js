
export const SetCurrentPage = (currentPage) => {

    return {
        type:"TEST",
        currentPage : currentPage
    };
};
export const SetNavigationLink = (link) => {
    return {
        type:"LINK",
        l:link
    }
}