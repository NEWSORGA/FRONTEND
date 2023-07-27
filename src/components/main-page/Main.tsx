import { Link } from 'react-router-dom';
import FadeUp from '../common/animate/Animate'
import './Main.css'

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
            </div>

        </>
    );
};

export default MainPage;
