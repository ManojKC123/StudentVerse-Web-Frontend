import React from "react";
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';
import TwitterIcon from '@material-ui/icons/Twitter';

function Footer() {
  return <div><footer class="site-footer">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-6">
          <h3><b>About</b></h3>
          <p class="text-justify">StudentVerse  is the delivery of a series of lessons on a web browser or mobile device,
            which can be accessed anytime and anyplace. It is designed as an online environment for convenient learning
            asynchronously. It is electronically supported learning that relies on the Internet for teacher/student
            interaction and the distribution of class materials.</p>
        </div>

        <div class="col-xs-6 col-md-3">
          <h3><b>Categories</b></h3>
          <ul class="footer-links">
            <li>Study materials</li>
            <li>Question answer</li>
            <li>Android application</li>
            <li>Comment</li>
            <li>Quiz</li>

          </ul>
        </div>

        <div class="col-xs-6 col-md-3">
        <h3><b>Quick links</b></h3>
          <ul class="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/signup">SignUp</a></li>

          </ul>
        </div>
      </div>

    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-8 col-sm-6 col-xs-12">
          <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by
            <a href="/">StudentVerse</a>.
          </p>
        </div>

        <div class="col-md-4 col-sm-6 col-xs-12">
          <ul class="social-icons">
            <li><a class="facebook" href="#"> <FacebookIcon/></a></li>
            <li><a class="twitter" href="#"><InstagramIcon/></a></li>
            <li><a class="dribbble" href="#"><EmailIcon/></a></li>
            <li><a class="linkedin" href="#"><TwitterIcon/></a></li>
          </ul>
        </div>
      </div>
    </div>
  </footer></div>;
}

export default Footer;
