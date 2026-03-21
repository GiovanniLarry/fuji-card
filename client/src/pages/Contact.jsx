import React, { useState } from 'react';
import './Contact.css';

const Contact = () => {
    const [submitted, setSubmitted] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Storing in memory (React State simulated)
        console.log('[Contact Form] In-memory submission received:', formData);
        setSubmitted(true);
        // Reset form after delay
        setTimeout(() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', subject: '', message: '' });
        }, 5000);
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="contact-page">
            {/* Warning Banner - Professional spacing handled in CSS */}
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

                <section className="form-section">
                    {submitted ? (
                        <div className="success-card">
                            <i className="fa-solid fa-circle-check"></i>
                            <h2>Form Submitted Successfully!</h2>
                            <p>Thank you for reaching out. We will get back to you shortly.</p>
                        </div>
                    ) : (
                        <form className="premium-contact-form" onSubmit={handleSubmit}>
                            <div className="form-grid">
                                <div className="form-group">
                                    <label>Full Name</label>
                                    <input type="text" name="name" placeholder="John Doe" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label>Email Address</label>
                                    <input type="email" name="email" placeholder="john@example.com" value={formData.email} onChange={handleChange} required />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" name="subject" placeholder="Order Inquiry" value={formData.subject} onChange={handleChange} required />
                            </div>
                            <div className="form-group">
                                <label>Your Message</label>
                                <textarea name="message" rows="5" placeholder="How can we help you today?" value={formData.message} onChange={handleChange} required></textarea>
                            </div>
                            <button type="submit" className="submit-btn-premium">Send Message</button>
                        </form>
                    )}
                </section>

                <section className="contact-info-section">
                    <div className="info-card">
                        <p>You can also reach out to us on<br />Instagram or via email.</p>
                        <div className="info-links">
                            <div className="info-item">
                                <i className="fa-brands fa-instagram" style={{ color: '#E1306C', marginRight: '10px' }}></i>
                                <strong>Instagram : </strong>
                                <a href="https://www.instagram.com/fuji_cards?igsh=MXZybHY2anNwenJrZw%3D%3D&utm_source=qr" target="_blank" rel="noreferrer">@fuji_cards</a>
                            </div>
                            <div className="info-item">
                                <i className="fa-solid fa-envelope" style={{ color: '#3b82f6', marginRight: '10px' }}></i>
                                <strong>Email : </strong>
                                <a href="mailto:fujicard@fuji-card.com">fujicard@fuji-card.com</a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
