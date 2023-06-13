import { ChangeEvent } from 'react';

interface Props {
    value: string;
    onTextChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const ExpenseSearch = ( {value, onTextChange}: Props) => {
    
    return (
        <div className="filter-search">
        <p>Filter by search:</p>
        <input
        type="text"
        name='query'
        className='form-control my-3'
        placeholder='Search...'
        value={value}
        onChange={e => onTextChange(e)}
        />
        </div>
    );
};

export default ExpenseSearch;