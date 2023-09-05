import React, { useEffect, useRef, useState } from 'react'
import { IUserView } from '../../profile/types';
import { formHttp } from '../../../http';
import './SearchInput.css';
import { Link, useNavigate } from 'react-router-dom';
import { APP_ENV } from '../../../env';
import { MutatingDots } from 'react-loader-spinner';
export default function SearchInput() {
    const [visible, setVisible] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);
    const [loading, setLoading] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const [list, setList] = useState<IUserView[]>([]);
    const navigate = useNavigate();
    // click away listener
    useEffect(() => {
        document.addEventListener('mousedown', handleClick, false);
        return () => document.removeEventListener('mousedown', handleClick, false);
    }, []);

    const handleClick = (e: any) => {
        if (dropdownRef.current != null) {
            if (dropdownRef.current.contains(e.target)) {
                return;
            }
        }

        setVisible(false);
    };

    const handleChange = (e: any) => {
        setSearchValue(e.target.value);
        const settings: ISearchSetting = {
            filterText: searchValue
        }
        setLoading(true);
        formHttp.get("auth/searchUser?filterText=" + searchValue).then(res => {
            setList(res.data)
            setLoading(false);
        })
    };

    const selectItem = (item: any) => {
        setSearchValue(item.name);
        setSelectedItem(item.id);
        setVisible(false);
    };

    const selectChange = (e: any) => {
        console.log(e.target.value);
    };

    return (
        <div className='SearchBlock'>
            <div className="input-group rounded">
                <input type="search" value={searchValue} onChange={handleChange} onFocus={() => setVisible(true)} className="form-control rounded searchInput" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
            </div>
            <div ref={dropdownRef} className={`dropdownMenu ${visible ? 'v' : ''}`}  style={{display: visible ? "block" : "none"}}>
                {visible && (
                    <ul>
                        {list.length == 0 && !loading && (
                            <li key="zxc" className="dropdown_item">
                                no result
                            </li>
                        )}
                        {/* you can remove the searchFilter if you get results from Filtered API like Google search */}
                        {list.length > 0 &&
                            list.map(x => (
                                <li onClick={() => { navigate("/profile/"+x.id); navigate(0);}} className='dropdown_item'>
                                    <div className="DataUserThought">

                                        <img src={`${APP_ENV.BASE_URL + "/images/" + x.image}`} className="rounded-circle" />


                                        <div className='nickAndTime'>
                                            <span className="NickThought">{x.name}</span>
                                        </div>

                                    </div>
                                </li>

                            ))}
                        
                        {loading &&
                            <li className='dropdown_item loading'>
                                <MutatingDots
                                    height="100"
                                    width="100"
                                    color="#EB4C42"
                                    secondaryColor='#EB4C42'
                                    radius={10}
                                    ariaLabel="mutating-dots-loading"
                                    wrapperStyle={{}}


                                />
                            </li>

                        }

                    </ul>
                )}
            </div>

        </div>

    )
}
