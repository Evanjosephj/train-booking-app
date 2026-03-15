import './index.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-grid">

        <div className="footer-col">
          <h3>TrainBooking</h3>
          <p>India's trusted train ticket booking platform. Fast, easy and reliable booking experience for all passengers.</p>
        </div>

        <div className="footer-col">
          <h3>Payment Methods</h3>
          <ul>
            <li>Credit / Debit Card</li>
            <li>UPI (GPay, PhonePe)</li>
            <li>Net Banking</li>
            <li>Wallets (Paytm, Amazon Pay)</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Contact Us</h3>
          <ul>
            <li>support@trainbooking.com</li>
            <li>1800-123-4567 (Toll Free)</li>
            <li>Mon - Sat: 9AM to 6PM</li>
            <li>24/7 Online Support</li>
          </ul>
        </div>

        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Terms and Conditions</li>
            <li>Privacy Policy</li>
            <li>Refund Policy</li>
            <li>FAQ</li>
          </ul>
        </div>

      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>2026 TrainBooking. All rights reserved.</p>
        <p>Made with love in India</p>
      </div>
    </footer>
  )
}

export default Footer