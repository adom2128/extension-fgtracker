import { format } from 'date-fns';
import axios from 'axios';

// const baseUrl = 'http://127.0.0.1:5000';
const baseUrl = 'https://back-end-fgtracker.onrender.com';

const convertFromApi = (apiSurvey) => {
    const {
      company,
      date_fg_completed,
      date_survey_completed,
      notes,
      payment,
      payment_expiration_date,
      payment_left,
      payment_received,
      stage,
      id,
      topic,
      last_four,
      link,
    } = apiSurvey;
  
    const extractLocalDate = (dateString) => {
      if (!dateString) {
        return '';
      }
  
      const dateObject = new Date(dateString);
  
      const timezoneOffset = dateObject.getTimezoneOffset();
  
      const dateLocal = new Date(
        dateObject.getTime() + timezoneOffset * 60 * 1000
      );
  
      return format(dateLocal, 'MMMM d, yyyy');
    };
  
    return {
      company,
      dateFGCompleted: extractLocalDate(date_fg_completed),
      dateSurveyCompleted: extractLocalDate(date_survey_completed),
      notes,
      payment,
      paymentExpirationDate: extractLocalDate(payment_expiration_date),
      paymentLeft: payment_left,
      paymentReceived: payment_received,
      stage,
      id,
      topic,
      lastFour: last_four,
      link,
    };
  };

  export const formatDate = (date) => {
    if (!date) {
      return null;
    }
  
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  export const postSurvey = async (newSurvey) => {
    try {
      const response = await axios.post(`${baseUrl}/surveys`, newSurvey);
      return convertFromApi(response.data);
    } catch (error) {
      console.log(error);
    }
  };