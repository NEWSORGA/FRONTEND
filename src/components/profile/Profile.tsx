import { Col, Form, Row } from 'react-bootstrap';
import './Profile.css'
import "/node_modules/flag-icons/css/flag-icons.min.css";
import Thought from '../common/thought/Thought';

const Profile = () => {
    return (
        <>
            <div className="ProfileWrapper d-flex justify-content-center"
                style={{ backgroundImage: "url(https://www.everwallpaper.co.uk/cdn/shop/collections/3D_Wallpaper.jpg?v=1660209305)" }}>
                <div className="ProfileBackground" style={{ backgroundColor: "rgba(25,25,25,.9)" }}>
                    <Row style={{ height: "200px" }}>
                        <Col xs="3" className='d-flex justify-content-center'>
                            <div className="ProfileAvatar"
                                style={{ backgroundImage: "url(https://i.pinimg.com/564x/ff/2c/73/ff2c73e29739c316d38f8b1000a03afc.jpg)" }}>
                            </div>
                        </Col>
                        <Col xs="9">
                            <div className="UserDataProfile m-3 mt-4">
                                <div className="NickNameProfile">
                                    <a>NickName</a>
                                </div>
                                <div className="CountryProfile">
                                    <span className="fi fi-gr"></span>
                                    <a> USA</a>
                                </div>
                                <div className="StatusProfile mt-3 w-50">
                                    <a>popular belief, Lorem Ipsum is not simply random tex</a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                    <div className="WritePost m-3 mt-5">
                        <Form.Group>
                            <Form.Label>Whatever you think</Form.Label>
                            <Form.Control
                                placeholder='What?'
                                as="textarea"
                                className='profileTextArea' />
                        </Form.Group>
                        <div className="d-flex justify-content-left">
                            <div className="btn btnProfile">Send</div>
                        </div>
                    </div>
                    <div className="AllPostsProfile">
                        <Thought avatar='https://i.pinimg.com/564x/ff/2c/73/ff2c73e29739c316d38f8b1000a03afc.jpg'
                        nick='Jocn' text='ceful the likewise received building. An fact so to that show am shed sold cold. Unaffected remarkably get y'></Thought>
                    </div>
                </div>
            </div>
        </>
    );
};
export default Profile;