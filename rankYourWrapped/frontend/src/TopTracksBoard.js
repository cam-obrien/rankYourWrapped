import React from "react";

const TopTracksBoard = ({items, name}) => {
    return (
        <div className="top-tracks">
            <h1>Top Tracks</h1>
            <table id="tracks_table">
                <thead>
                    <th> Rank</th>
                    <th> Name </th>
                    <th> Artist</th>
                    <th> Popularity</th>
                </thead>
                <tbody>
                    {items.map((item, index) => {
                        return (
                            <tr key={index}>
                                <td>{index}</td>
                                <td>{item.name}</td>
                                <td>{item.artists[0].name} </td>
                                <td>{item.popularity}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );


}

export default TopTracksBoard;