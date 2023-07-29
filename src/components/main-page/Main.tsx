import { Link } from 'react-router-dom';
import FadeUp from '../common/animate/Animate'
import './Main.css'
import Footer from '../common/footer/Footer';
import { Col, Row } from 'react-bootstrap';
import BlockMain from '../common/block-marketing/blockMain';

const MainPage = () => {
    return (
        <>
            <div className="mainWrapper">
                <div className="parallax">
                    <FadeUp>
                        <div className='TextInPic'>we think the same as you</div>
                    </FadeUp>
                    <div className="BrandDiv">
                        <Link to='/' className="brand">Quixify</Link>
                    </div>
                </div>
                <Row style={{ height: "25vh", marginTop: "4rem", marginBottom: "4rem" }}>
                    <Col  className="d-flex justify-content-center">
                        <BlockMain _iconName='bi bi-browser-safari'></BlockMain>
                    </Col>
                    <Col  className="d-flex justify-content-center">
                        <BlockMain _iconName='bi bi-award-fill'></BlockMain>
                    </Col>
                    <Col  className="d-flex justify-content-center">
                        <BlockMain _iconName="bi bi-balloon-fill"></BlockMain>
                    </Col>
                </Row>
                <Footer></Footer>
            </div>

        </>
    );
};

export default MainPage;