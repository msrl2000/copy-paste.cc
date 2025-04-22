import React from 'react';
import { observer } from 'mobx-react-lite';

import * as browser from '../utils/browser.js';
import { TextSection } from '../components/TextSection.js';
import { connection } from '../stores/index.js';

// Create a mapping for nicknames
const nicknames: { [key: string]: string } = {
  remoteAddress: 'כתובת ה-IP שלך',
  userAgent: 'גרסת דפדפן',
  commitHash: 'מזהה גרסה',
  deviceType: 'סוג מכשיר',
  iOS: 'אייפון/אייפד',
  isBrowserCompatible: 'דפדפן נתמך',
  isClipboardItemSupported: 'העתק/הדבק נתמך',
  isClipboardReadSupported: 'תמיכה בקריאה ישירה מהזכרון',
  isMobile: 'התחברות ממכשיר נייד',
  isFileReaderSupported: 'תמיכה בקריאת קבצים',
  isORTCSupported: 'תמיכה בקשר ישיר עם מכשירים אחרים באמצעות Java-Script בדפדפן',
  isSafari: 'שימוש במנוע Safari בדפדפן',
  isShareSupported: 'תמיכה בשיתוף',
  isTablet: 'התחברות ממכשיר טאבלט',
  isWebRTCSupported: 'תמיכה בפרוטוקול WebRTC בדפדפן',
  isWebSocketSupported: 'תמיכה ב-WebSocket בדפדפן',
  // Add more as needed...
};

export const TechnicalInformation: React.FC = observer(() => {
  const remoteAddress = connection.remoteAddress;

  const info: { [key: string]: any } = {
    remoteAddress,
    userAgent: navigator.userAgent,
    ...browser,
  };

  return (
    <TextSection>
      <h2>מידע טכני</h2>
      <ul>
        {Object.entries(info).map(([name, value]) => (
          <li key={name}>
            {/* Use nickname if available, otherwise use the original name */}
            <strong>{nicknames[name] || name}:</strong> {String(value) === "true" ? "כן" : String(value) === "false" ? "לא" : String(value)}
          </li>
        ))}
      </ul>
    </TextSection>
  );
});

export default TechnicalInformation;
