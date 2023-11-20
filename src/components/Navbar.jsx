import React, { useState } from 'react';
import '../css/navbar.css';
import icons from '../assets/exo.js';

const Navbar = ({grouping, setGrouping, sorting, setSorting}) => {

    const [showDisplay, setShowDisplay] = useState(false);

    const handleGrouping = (e) => {
        setGrouping(e.target.value);
        localStorage.setItem('grouping', e.target.value);
    }

    const handleSorting = (e) => {
        setSorting(e.target.value);
        localStorage.setItem('sorting', e.target.value);
    }

    return (
        <div className='navb'>
            <div className='navigate' onClick={() => setShowDisplay(!showDisplay)}>
                <img className='assetIcon' src={icons.slider} alt="" />
                <p>Display</p>
                <img className='assetIcon' src={icons.arrowDown} alt="" />
            </div>
            {showDisplay &&
                <div className='drop-menu'>
                    <div className='func-container'>
                        <label htmlFor="grouping">Grouping</label>
                        <select name="grouping" value={grouping} id="" onChange={handleGrouping}>
                            <option value="status">Status</option>
                            <option value="user">User</option>
                            <option value="priority">Priority</option>
                        </select>
                    </div>
                    <div className='func-container'>
                        <label htmlFor="sorting">Ordering</label>
                        <select name="sorting" value={sorting} id="" onChange={handleSorting}>
                            <option value="priority">Priority</option>
                            <option value="title">Title</option>
                        </select>
                    </div>
                </div>
            }
        </div>
    )
}

export default Navbar
