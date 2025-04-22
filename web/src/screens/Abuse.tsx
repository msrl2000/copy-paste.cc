import React from 'react';
import { Link } from 'wouter';
import { observer } from 'mobx-react-lite';

import { TextSection } from '../components/TextSection.js';
import { applicationStore } from '../stores/index.js';

export const Abuse: React.FC = observer(() => {
  const abuseEmail = applicationStore.abuseEmail;

  if (!abuseEmail) {
    return null;
  }

  return (
    <TextSection>
      <h2>דיווח על שימוש לרעה</h2>
      <p>
        <strong>יש לדווח על שימוש לרעה, אם:</strong>
      </p>
      <ul>
        <li>
          היית עד/ה לשימוש הנוגד את{' '}
              <Link to="/tos">תנאי השימוש</Link>,
        </li>
        <li>תרצה/י לדווח על הפרת זכויות יוצרים</li>
      </ul>
      <p>יש לשלוח הודעת דוא"ל לכתובת: abuse@copy-paste.cc</p>
    </TextSection>
  );
});

export default Abuse;