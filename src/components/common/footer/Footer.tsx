import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './Footer.css'

const Footer = () => {
    return (
        <div className="Footer">
            <footer className="text-center text-lg-start text-white">
                <section className="d-flex justify-content-center justify-content-lg-between p-0 border-bottom">
                </section>
                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-2">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4 companyname">
                                    Quixify
                                </h6>
                                <p>
                                    Here you can use rows and columns to organize your footer content. Lorem ipsum
                                    dolor sit amet, consectetur adipisicing elit.
                                </p>
                            </div>
                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contacts</h6>
                                <p><i className="bi bi-house"></i>Adress</p>
                                <p> 
                                    Quixify@example.com
                                </p>
                                <p><i className="bi bi-phone"></i> + 01 234 567 88</p>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="text-center p-4">
                    © 2023 Copyright
                </div>
            </footer>
        </div>
    );
}
export default Footer;