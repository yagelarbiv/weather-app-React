export default function Search({ Search, setSearch, handleSearch }) {
  return (
    <div className="search-engine">
      <input
        type="text"
        placeholder="Enter City"
        name="Search"
        value={Search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleSearch}>search Weather</button>
    </div>
  );
  
}
