import css from './SearchBox.module.css';

const SearchBox = ({ value, onChange }) => {
  return (
    <label className={css.SearchBox}>
      Find contacts by name
      <input
        type="text"
        className={css.input}
        placeholder="Search contact"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default SearchBox;