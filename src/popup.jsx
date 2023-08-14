import React, { useRef, useState } from 'react';
import { render } from 'react-dom';
import { Form, Button } from 'react-bootstrap';
import { formatDate, postSurvey } from './helpers';
import './popup.css';

// const onSaveClick = async (newSurvey) => {
//   const response = await postSurvey(newSurvey);
//   console.log(response);
// };

const Popup = () => {
  const companyRef = useRef();
  const topicRef = useRef();
  const paymentRef = useRef();
  const notesRef = useRef();

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleSave = async (e) => {
    e.preventDefault();
    console.log('hello');

    const newSurvey = {
      company: companyRef.current.value,
      topic: topicRef.current.value,
      payment: Number(paymentRef.current.value),
      notes: notesRef.current.value,
      date_survey_completed: formatDate(new Date()),
    };
    try {
      await postSurvey(newSurvey);
      setSubmissionStatus('success');
      e.target.reset();
    } catch (error) {
      setSubmissionStatus('error');
    }
  };

  let statusMessage = null;
  if (submissionStatus === 'success') {
    statusMessage = (
      <p className="success-message">Survey submitted successfully!</p>
    );
  } else if (submissionStatus === 'error') {
    statusMessage = (
      <p className="error-message">An error occurred. Please try again.</p>
    );
  }

  return (
    <div className="popup-container">
      <div className="logo-container">
        <a
          href="https://adom2128.github.io/front-end-fgtracker/"
          target="_blank"
          rel="noreferrer"
        >
          <img src="FGTracker_logo.png" className="logo" alt="FGTracker Logo" />
        </a>
      </div>
      <div className="popup-title">Save survey</div>
      <div className="popup-body">
        <Form onSubmit={handleSave}>
          <Form.Group className="label-and-input-container">
            <Form.Label className="label">Company</Form.Label>
            <Form.Control ref={companyRef} required className="form-input" />
          </Form.Group>

          <Form.Group className="label-and-input-container">
            <Form.Label className="label">Topic</Form.Label>
            <Form.Control ref={topicRef} required className="form-input" />
          </Form.Group>
          <Form.Group className="label-and-input-container">
            <Form.Label className="label">Payment</Form.Label>
            <Form.Control ref={paymentRef} className="form-input" />
          </Form.Group>
          <Form.Group className="label-and-input-container">
            <Form.Label className="label">Notes</Form.Label>
            <Form.Control
              ref={notesRef}
              as="textarea"
              rows={4}
              className="form-input text-area"
            />
          </Form.Group>
          {statusMessage}
          <div className="submit-btn-container">
            <Button type="submit" variant="primary" className="submit-btn">
              Save
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

render(<Popup />, document.getElementById('react-target'));
