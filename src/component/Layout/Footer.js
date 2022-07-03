import React from "react";
import "./Footer.css";

function Footer() {
  return (
    <div>
      {/* Footer Start  */}
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-5 col-md-12 col-sm-12">
              <img src="assets/images/logo-white.png" className="logo" alt="" />
              <div className="text">Research Tool Management System</div>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <h5>Helpful Links</h5>
              <ul className="footer-nav">
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>About Us</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Features</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>FAQ’s</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Blog</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-2 col-md-4 col-sm-6 col-6">
              <h5>Support</h5>
              <ul className="footer-nav">
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Privacy Policy</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Terms of Use</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Support Center</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-angle-right"></i>
                    <span>Contact</span>
                  </a>
                </li>
              </ul>
            </div>
            <div className="col-lg-3 col-md-4 col-sm-12">
              <h5>Contact Us</h5>
              <div className="address">
                <p>
                  22A, 6th Lane,
                  <br />
                  Colombo 03, Sri Lanka
                </p>
                <p>Phone: (947) 456-7370</p>
                <p>
                  <span>E-Mail:</span>
                  <a href="#">research@tool.com</a>
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <p className="copyright">© 2022. All Rights Reserved.</p>
            </div>
          </div>
        </div>
      </footer>
      {/* Footer End */}
    </div>
  );
}
export default Footer;
