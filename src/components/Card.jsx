import React, { useEffect, useState } from 'react';
import '../css/card.css';
import icons from '../assets/exo.js';

const Card = ({ grouping, sorting, element, stats, prio }) => {

    const [prioIcon, setPrioIcon] = useState();
    const [statusIcon, setStatusIcon] = useState();

    useEffect(() => {
        stats.forEach((ele) => {
            if(ele.name === element.status){
                setStatusIcon(ele.icon);
            }
        });

        prio.forEach((ele) => {
            if(ele.num === element.priority){
                setPrioIcon(ele.icon);
            }
        })
    }, [grouping, sorting, element.priority, element.status, prio, stats])

    return (
        <div className='card'>
            <div className='one'>
                <p>{element.id}</p>
                {grouping !== 'user' && 
                    <div className='profile-pic-cont'>
                        <img className='profile-pic' src={element.userIcon} alt="" />
                        <div className={element.available ? 'green-dot' : 'yellow-dot'}></div>
                    </div>
                }
            </div>
            <div className='two'>
                {grouping !== 'status' && 
                    <img src={statusIcon} alt="" />
                }
                <p>{element.title}</p>
            </div>
            <div className='three'>
                {grouping !== 'priority' && 
                    <img className='prio-cont' src={prioIcon} alt="" />
                }
                <div className='feature-cont'>
                    <img src={icons.circleFilled} alt="" />
                    <p>{element.tag[0]}</p>
                </div>
            </div>
        </div>
    )
}

export default Card
