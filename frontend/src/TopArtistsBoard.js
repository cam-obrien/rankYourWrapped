import React from 'react';

const TopArtistsBoard = ({items}) => {
    return (
        <div className='top-artists'>
            <h1>Top Artists</h1>
            <table id="artists-table">
                <thead>
                    <th> Rank </th>
                    <th> Name </th>
                    <th> Popularity</th>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.popularity}</td>
                            </tr>
                        )
                    })}

                </tbody>

            </table>

        </div>
    );
}

export default TopArtistsBoard;