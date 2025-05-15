import SearchView from "./search-view";

const SearchPage = ({ searchParams }) => {
    return (
        <>
            <SearchView search={searchParams} />
        </>
    );
}

export default SearchPage;
