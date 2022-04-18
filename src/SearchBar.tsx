import React from 'react';

interface SearchBarProps {
    title: string;
    setTitle: (title: string) => void;
    setType: (type: string) => void;
    onKeyDown: (event: React.KeyboardEvent<HTMLInputElement>) => void;
    onSubmit: () => void;
}

export function SearchBar({title, setTitle, setType, onKeyDown, onSubmit}: SearchBarProps) {
    return (
        <div className={'search-bar'}>
            <input className={'search-input'} type="text" placeholder="Search for movie title" value={title}
                   onChange={event => setTitle(event.target.value)}
                   onKeyDown={onKeyDown}/>
            <div className={'type-select-container'}>
                <label>Type:</label>
                <select className={'type-select'} name={"type"}
                        onChange={(event) => setType(event.target.value)}>
                    <option value={""}>all</option>
                    <option value={"movie"}>movie</option>
                    <option value={"series"}>series</option>
                    <option value={"episode"}>episode</option>
                </select>
            </div>

            <button className="search-button" onClick={onSubmit}>Search</button>

        </div>
    );
};