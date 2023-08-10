import React, { useRef } from 'react';
import { render } from 'react-dom';
import { Form, Button } from 'react-bootstrap';
import { formatDate, postSurvey } from './helpers';
import './popup.css';

const onSaveClick = async (newSurvey) => {
  const response = await postSurvey(newSurvey);
  console.log(response);
};

const Popup = () => {
  const companyRef = useRef();
  const topicRef = useRef();
  const paymentRef = useRef();
  const notesRef = useRef();

  const handleSave = (e) => {
    e.preventDefault();
    console.log('hello');

    const newSurvey = {
      company: companyRef.current.value,
      topic: topicRef.current.value,
      payment: Number(paymentRef.current.value),
      notes: notesRef.current.value,
      date_survey_completed: formatDate(new Date()),
    };
    onSaveClick(newSurvey);

    e.target.reset();
  };

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
