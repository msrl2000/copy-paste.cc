import React from 'react';

import { TextSection } from '../components/TextSection.js';

export const Privacy: React.FC = () => {
  return (
    <TextSection>
      <h2>מדיניות הפרטיות</h2>
      <p>המידע הבא מעובד ע"י האתר:</p>
      <ul>
        <li>מטא-נתונים של הקבצים כגון: שם הקובץ, גודלו וסוגו,</li>
        <li>
          נתוני WebRTC מהדפדפן שלכם כגון: בקשות ותשובות המקושרות ל-WebRTC,
        </li>
        <li>כתובת ה-IP שלכם.</li>
      </ul>
      <p>
        אף פרט מהמידע הנ"ל לא נשמר באתר או בשרתי השירות בשום צורה, ברגע שהחיבור לאתר מסתיים (חיבור WebSocket) או שפג תוקפו, כל המידע הזמני שקושר לחיבור הספציפי נמחק ללא יכולת שחזור.
      </p>
      <p>
        עבור מכשירים התומכים בהצפנה מקצה לקצה, נתוני ה-WebRTC ומטא-הנתונים של הקבצים יהיו מוצפנים ולא יהיו ידועים לאתר.
      </p>
      <p>
        במקרים מסוימים (כששני המכשירים נמצאים ברשתות הנמצאות מאחורי NAT) יתכן והמידע הבינארי של הקובץ יעבור באמצעות שרת ה-TURN של אתר זה. המידע לא נשמר בשום צורה. המידע גם לא מעובד בשום צורה אחרת מאשר שליחתו למכשיר היעד.
      </p>
      <p>
        במקרים מסוימים (כששני המכשירים נמצאים ברשתות הנמצאות מאחורי NAT) יתכן והמידע הבינארי של הקובץ יעבור באמצעות שרת ה-TURN של אתר זה. המידע לא נשמר בשום צורה. המידע גם לא מעובד בשום צורה אחרת מאשר שליחתו למכשיר היעד.
      </p>
      <p>
       האתר שומר "עוגיות" על מחשבכם לצרכי סטטיסטיקה כלליים בלבד. מידע זה נאסף ברגע הכניסה לאתר בלבד ולא נאסף מידע נוסף מעבר לכך, לא נאסף מידע באף מסגרת של שימוש באתר או בהעברת הקבצים מעבר לרישום עצם הכניסה כאמור. האתר לא אוסף שום מידע אודות הקבצים שמועברים במסגרת השימוש בו. האתר שומר על מחשבכם את הידיעה על כך שמסך "ברוכים הבאים" נצפה במחשבכם. מידע זה לא ישמש ולא יכול לשמש למעקב אחריכם.
      </p>
	  <p>
          יתכן וכתובת ה-IP שלכם תשותף עם מכשירים אחרים המעורבים בתהליך העברת הקבצים לאחר אישור מצידכם לקבל קובץ או אישור הצד השני לקבל קובץ ששלחתם. מידע זה משמש ליצירת חיבור בין המשתמשים.
       </p>
    </TextSection>
  );
};

export default Privacy;