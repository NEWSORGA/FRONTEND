import { Col, Row } from 'react-bootstrap';
import './Header.css'
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const Header = () => {
    return (
        <>
            <div className="HeaderWrapper">
                <Row>
                    <Col xs="4">
                        <div className="BrandDiv">
                            <div className="brand">Quixify</div>
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
                                <img src="https://i.pinimg.com/564x/ff/2c/73/ff2c73e29739c316d38f8b1000a03afc.jpg" className="rounded-circle" style={{ width: "50px" }} alt="Avatar" />
                            </div>
                        </div>
                    </Col>
                </Row>
            </div>
        </>
    );
}
export default Header;