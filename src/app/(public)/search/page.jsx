import SearchView from "./search-view";

const SearchPage = ({ searchParams }) => {
    const search = searchParams?.q || '';
    return (
        <>
            <SearchView search={search} />
        </>
    );
}

export default SearchPage;
