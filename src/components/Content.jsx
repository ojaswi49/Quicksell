import React, { useEffect, useState } from 'react';
import '../css/content.css';
import Card from './Card';
import icons from '../assets/exo';

const stats = [
    { name: 'Backlog', icon: icons.blackList },
    { name: 'Todo', icon: icons.circle },
    { name: 'In progress', icon: icons.progress },
    { name: 'Done', icon: icons.done },
    { name: 'Canceled', icon: icons.cancel },
];

const prio = [
    { name: 'No priority', num: 0, icon: icons.more },
    { name: 'Urgent', num: 4, icon: icons.urgent },
    { name: 'High', num: 3, icon: icons.fullSignal },
    { name: 'Medium', num: 2, icon: icons.halfSignal },
    { name: 'Low', num: 1, icon: icons.lowSignal }
];

const userIcons = {
    'usr-1': icons.user1,
    'usr-2': icons.user2,
    'usr-3': icons.user3,
    'usr-4': icons.user4,
    'usr-5': icons.user5,
}

const Content = ({ grouping, sorting, dataFromApi }) => {

    const [arrangedData, setArrangedData] = useState([]);

    useEffect(() => {
        let newData = [];
        if (grouping === 'status') {
            stats.forEach((ele) => {
                let con = [];
                dataFromApi.tickets.forEach((el) => {
                    if (el.status === ele.name) {
                        con.push(el);
                    }
                })

                con.forEach((i) => {
                    i['userIcon'] = userIcons[i.userId];
                    let desiredObject = dataFromApi.users.find(obj => obj.id === i.userId);
                    i['available'] = desiredObject.available;
                })

                if (sorting === 'priority') {
                    con.sort((a, b) => b.priority - a.priority);
                }
                else {
                    con.sort((a, b) => a.title.localeCompare(b.title));
                }
                let singleEle = { heading: ele.name, content: con, icon: ele.icon };
                newData.push(singleEle);
            })

        }
        else if (grouping === 'priority') {
            prio.forEach((ele) => {
                let con = [];
                dataFromApi.tickets.forEach((el) => {
                    if (el.priority === ele.num) {
                        con.push(el);
                    }
                })

                con.forEach((i) => {
                    i['userIcon'] = userIcons[i.userId];
                    let desiredObject = dataFromApi.users.find(obj => obj.id === i.userId);
                    i['available'] = desiredObject.available;
                })

                if (sorting === 'priority') {
                    con.sort((a, b) => b.priority - a.priority);
                }
                else {
                    con.sort((a, b) => a.title.localeCompare(b.title));
                }
                let singleEle = { heading: ele.name, content: con, icon: ele.icon };
                newData.push(singleEle);
            })

        }
        else {
            let userIds = [];
            dataFromApi.users.forEach((ele) => {
                let temp = {
                    userId: ele.id,
                    name: ele.name,
                    available: ele.available,
                }

                temp['icon'] = userIcons[ele.id];

                userIds.push(temp);
            })

            userIds.sort((a, b) => a.name.localeCompare(b.name));

            userIds.forEach((ele) => {
                let con = [];
                dataFromApi.tickets.forEach((el) => {
                    if (el.userId === ele.userId) {
                        con.push(el);
                    }
                })

                con.forEach((i) => {
                    i['userIcon'] = userIcons[i.userId];
                    let desiredObject = dataFromApi.users.find(obj => obj.id === i.userId);
                    i['available'] = desiredObject.available;
                })

                if (sorting === 'priority') {
                    con.sort((a, b) => b.priority - a.priority);
                }
                else {
                    con.sort((a, b) => a.title.localeCompare(b.title));
                }



                let singleEle = { heading: ele.name, content: con, icon: ele.icon, avail: ele.available};
                newData.push(singleEle);
            })
        }
        setArrangedData(newData);
    }, [grouping, dataFromApi, sorting]);

    useEffect(() => {
        if (arrangedData) {
            arrangedData.forEach((ele) => {
                if (sorting === 'priority') {
                    ele.content.sort((a, b) => b.priority - a.priority);
                }
                else {
                    ele.content.sort((a, b) => a.title.localeCompare(b.title));
                }
            })
        }
    }, [sorting, arrangedData])

    return (
        <div className='content'>
            <ul className='groups'>
                {arrangedData?.map((ele, ind) => (
                    <li className='single-group' key={ind}>
                        <div className='heading-container'>
                            <div className='left-container'>

                                {grouping === 'user' ? 
                                    <div className='main-img-cont'>
                                        <img className='src-icon' src={ele.icon} alt="" />
                                        <div className={ele.avail ? 'g-dot' : 'y-dot'}></div>
                                    </div>
                                :
                                    <img
                                        src={ele.icon}
                                        alt=""
                                    />
                                }

                                <p className='first'>{ele.heading}</p>
                                <p className='second'>{ele.content.length}</p>
                            </div>
                            <div className='right-container'>
                                <img src={icons.plus} alt="" />
                                <img src={icons.more} alt="" />
                            </div>
                        </div>
                        {/* id={el.id} title={el.title} tag={el.tag} */}
                        <ul className='card-container'>
                            {ele.content.map((el, ind) => (
                                <div key={ind}>
                                    <Card grouping={grouping} sorting={sorting} element={el} stats={stats} prio={prio} />
                                </div>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Content
