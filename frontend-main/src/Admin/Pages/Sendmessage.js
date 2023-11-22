import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function SendMessage() {
  const [recipients, setRecipients] = useState([]);


  const [formData, setFormData] = useState({
    id: '',
    recipient: "",
    message: "",
    date: ""
  });

  useEffect(() => {

    axios.get('http://localhost:8003/users')
      .then(res => {
        const filteredFacilities = res.data.filter(facility => facility.role === "owner");
        setRecipients(filteredFacilities);
      })
  }, []);


  const handlesubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:8003/adminmessage`, formData)
      .then(res => {
        toast.success('successfully send');
        setFormData({
          id: '',
          recipient: '',
          message: '',
          date: ''
        });
      })
  }


  return (
    <div style={{ marginLeft: '240px', padding: '20px' }}>
      <div className="offset-lg-3 col-lg-6">
        <form className="container" onSubmit={handlesubmit} style={{ alignItems: "center", marginTop: "100px" }}>
          <div className="card">
            <div className="card-header bg-dark text-white">
              <h2>Send message to hotel owners</h2>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label>Recipient <span className="errmsg">*</span></label>
                <select
                  className="form-control"
                  value={formData.recipient}
                  onChange={(e) => setFormData({ ...formData, recipient: e.target.value })}
                >
                  <option value="">Select recipient</option>
                  {recipients.map((recipient) => (
                    <option key={recipient.id} value={recipient.username}>
                      {recipient.username}
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label>Enter the date</label>
                <input value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder='Enter you date' type="date" className="form-control" />
              </div>
              <div className="form-group">
                <label>Message <span className="errmsg">*</span></label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Enter your message"
                  className="form-control"
                  rows="4"
                />
              </div>
            </div>
            <div className="card-footer" style={{ textAlign: 'center' }}>
              <button type="submit" className="btn btn-primary">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SendMessage;
