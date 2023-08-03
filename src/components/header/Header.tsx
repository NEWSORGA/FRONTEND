import { Col, Row } from 'react-bootstrap';
import './Header.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import { IAuthUser } from '../../store/types';
import { APP_ENV } from '../../env';
import React, { ChangeEvent, useEffect, useState } from 'react';

const Header = () => {
    const { user, isAuth } = useSelector((store: any) => store.auth as IAuthUser);

    return (
        <div style={{marginTop:"5px"}}>
            <div className="HeaderWrapper">
                <Row>
                    <Col xs="4">
                        <div className="BrandDiv">
                            <Link to='/' className="brand">Quixify</Link>
                            <div className="brand-subtext">but every do you want</div>
                        </div>
                    </Col>
                    <Col xs="5">
                        <div className="icon-search-wrapper">
                            <i className="bi bi-bell"></i>
                            <div className="SearchHeader" style={{ width: "80%" }}>
                                <div className="input-group rounded">
                                    <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                </div>
                            </div>
                            <i className="bi bi-arrow-through-heart"></i>
                        </div>
                    </Col>
                    <Col xs="3">
                        <div className="AuthWrapper">
                            <div className="AvatarDiv">
                                {isAuth ? <img src={ `${APP_ENV.BASE_URL + "/images/" + user?.image}` } className="avatar" alt="Avatar" /> : <Link to="/login">Login</Link>}
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default Header;