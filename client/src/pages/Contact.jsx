import React from 'react';
import './Contact.css';

const Contact = () => {
    return (
        <div className="contact-page">
            {/* Warning Banner */}
            <div className="warning-banner">
                <p>
                    <i className="fa-solid fa-triangle-exclamation"></i>
                    Beware of Fake Accounts: Please be cautious of accounts pretending to be FUJI CARD SHOP. <a href="#">Learn more</a>
                </p>
            </div>

            <div className="contact-container container">
                <section className="hero-section">
                    <h1>We are here to help</h1>
                    <p className="subtitle">
                        If you have any questions or inquiries,<br />
                        please feel free to fill in the form.
                    </p>
                </section>

                <section className="contact-info-section">
                    <div className="info-card">
                        <p>You can also reach out to us on<br />Instagram or via email.</p>
                        <div className="info-links">
                            <div className="info-item">
                                <strong>Instagram : </strong>
                                <a href="https://instagram.com/fujicardshop" target="_blank" rel="noreferrer">@fujicardshop</a>
                            </div>
                            <div className="info-item">
                                <strong>Email : </strong>
                                <a href="mailto:fujicard@fuji-card.com">fujicard@fuji-card.com</a>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Optional: Add a subtle contact form if you want to wow the user, but for now I will stick to the screenshot precisely */}
                <div className="decorative-background"></div>
            </div>
        </div>
    );
};

export default Contact;
