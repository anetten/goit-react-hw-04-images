import Icon from 'Images/Icon';
import css from './Searchbar.module.css';
import { useState } from 'react';

const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    onSubmit(query);
  };

  const handleChange = event => {
    setQuery(event.target.value);
  };
  return (
    <div>
      <header className={css.Searchbar}>
        <form className={css.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.SearchFormButton}>
            <Icon className={css.searchIcon} />
            <span className={css.SearchFormButtonLabel}>Search</span>
          </button>
          <input
            className={css.SearchFormInput}
            type="text"
            name="searchInput"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            required
            onChange={handleChange}
          />
        </form>
      </header>
    </div>
  );
};

export { Searchbar };
