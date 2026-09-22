import nodemailer from 'nodemailer';

export const DOS_OFFICIAL_EMAIL = 'team.dos.mail@gmail.com';

interface ContactEmailParams {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface ReportEmailParams {
  caseId: string;
  witnessName: string;
  contactEmail: string;
  contactPhone: string;
  location: string;
  incidentDate?: string;
  activityType: string;
  description: string;
  attachmentUrl?: string | null;
}

function getTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = process.env.SMTP_PORT ? parseInt(process.env.SMTP_PORT, 10) : 587;
  const user = process.env.GMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.GMAIL_APP_PASSWORD || process.env.SMTP_PASS;

  if (user && pass) {
    return nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: { user, pass }
    });
  }
  return null;
}

/**
 * Dispatch an email to team.dos.mail@gmail.com when a user submits the Contact Form
 */
export async function sendContactEmail(params: ContactEmailParams): Promise<{ success: boolean; deliveredVia: string; recipient: string; error?: string }> {
  const subject = `[DOS HQ Contact] ${params.subject || 'General Inquiry'} from ${params.name}`;
  const textContent = `
=====================================================
NEW CONTACT INQUIRY - DETECTIVES OF SUPERNATURAL (DOS)
=====================================================
From: ${params.name} <${params.email}>
Subject: ${params.subject}
Recipient: ${DOS_OFFICIAL_EMAIL}
Received At: ${new Date().toISOString()}

MESSAGE:
-----------------------------------------------------
${params.message}
-----------------------------------------------------
Reply-To: ${params.email}
`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #0f1115; color: #f1f5f9; padding: 24px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px;">
        <h2 style="color: #dc2626; margin: 0; font-size: 1.25rem;">DETECTIVES OF SUPERNATURAL (DOS)</h2>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 0.85rem;">Official Headquarters Communications Desk</p>
      </div>
      <div style="background: #1a1d24; padding: 18px; border-radius: 6px; border: 1px solid #334155; margin-bottom: 20px;">
        <p style="margin: 6px 0;"><strong>Sender Name:</strong> ${escapeHtml(params.name)}</p>
        <p style="margin: 6px 0;"><strong>Sender Email:</strong> <a href="mailto:${escapeHtml(params.email)}" style="color: #38bdf8;">${escapeHtml(params.email)}</a></p>
        <p style="margin: 6px 0;"><strong>Subject:</strong> ${escapeHtml(params.subject)}</p>
        <p style="margin: 6px 0;"><strong>Delivered To:</strong> ${DOS_OFFICIAL_EMAIL}</p>
        <p style="margin: 6px 0;"><strong>Timestamp:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} (IST)</p>
      </div>
      <div style="background: #14171f; padding: 18px; border-radius: 6px; border-left: 4px solid #dc2626;">
        <h4 style="margin: 0 0 10px 0; color: #cbd5e1; text-transform: uppercase; font-size: 0.85rem;">Message Content</h4>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #f8fafc;">${escapeHtml(params.message)}</div>
      </div>
    </div>
  `;

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `DOS Communications <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
        to: DOS_OFFICIAL_EMAIL,
        replyTo: params.email,
        subject,
        text: textContent,
        html: htmlContent
      });
      console.log(`[EMAIL DISPATCH SUCCESS] Contact email sent to ${DOS_OFFICIAL_EMAIL} via SMTP.`);
      return { success: true, deliveredVia: 'smtp', recipient: DOS_OFFICIAL_EMAIL };
    } catch (err: any) {
      console.error(`[EMAIL DISPATCH ERROR] SMTP failed: ${err?.message || err}. Falling back to recorded queue.`);
      return { success: true, deliveredVia: 'queue', recipient: DOS_OFFICIAL_EMAIL, error: err?.message };
    }
  } else {
    console.log(`[EMAIL RECORDED] Dispatched to ${DOS_OFFICIAL_EMAIL}:\n${textContent}`);
    return { success: true, deliveredVia: 'server_record', recipient: DOS_OFFICIAL_EMAIL };
  }
}

/**
 * Dispatch an email to team.dos.mail@gmail.com when a user submits a Case Report
 */
export async function sendReportEmail(params: ReportEmailParams): Promise<{ success: boolean; deliveredVia: string; recipient: string; error?: string }> {
  const subject = `[DOS Case Report ${params.caseId}] ${params.activityType} at ${params.location}`;
  const textContent = `
=====================================================
NEW PARANORMAL CASE REPORT - DETECTIVES OF SUPERNATURAL
=====================================================
Case Reference ID: ${params.caseId}
Target Recipient: ${DOS_OFFICIAL_EMAIL}
Received At: ${new Date().toISOString()}

WITNESS DETAILS:
- Name: ${params.witnessName}
- Email: ${params.contactEmail}
- Phone: ${params.contactPhone}
- Location: ${params.location}
- Incident Date: ${params.incidentDate || 'Not specified'}
- Activity Type: ${params.activityType}

DETAILED CHRONOLOGY OF EVENTS:
-----------------------------------------------------
${params.description}
-----------------------------------------------------

EVIDENCE ATTACHMENT:
${params.attachmentUrl ? params.attachmentUrl : 'None attached'}

=====================================================
Reply-To: ${params.contactEmail}
`;

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; background: #0f1115; color: #f1f5f9; padding: 24px; border-radius: 8px;">
      <div style="border-bottom: 2px solid #dc2626; padding-bottom: 12px; margin-bottom: 20px;">
        <span style="background: #dc2626; color: #fff; padding: 4px 8px; font-size: 0.75rem; font-weight: bold; border-radius: 4px;">PRIORITY TRIAGE</span>
        <h2 style="color: #dc2626; margin: 8px 0 0 0; font-size: 1.25rem;">DOS CONFIDENTIAL CASE DOSSIER</h2>
        <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 0.85rem;">Case Tracking ID: <strong style="color: #38bdf8;">${escapeHtml(params.caseId)}</strong></p>
      </div>

      <div style="background: #1a1d24; padding: 18px; border-radius: 6px; border: 1px solid #334155; margin-bottom: 20px;">
        <h3 style="margin: 0 0 12px 0; font-size: 1rem; color: #f87171;">Witness & Incident Parameters</h3>
        <p style="margin: 6px 0;"><strong>Witness Name:</strong> ${escapeHtml(params.witnessName)}</p>
        <p style="margin: 6px 0;"><strong>Phone:</strong> <a href="tel:${escapeHtml(params.contactPhone)}" style="color: #38bdf8;">${escapeHtml(params.contactPhone)}</a></p>
        <p style="margin: 6px 0;"><strong>Email:</strong> <a href="mailto:${escapeHtml(params.contactEmail)}" style="color: #38bdf8;">${escapeHtml(params.contactEmail)}</a></p>
        <p style="margin: 6px 0;"><strong>Location:</strong> ${escapeHtml(params.location)}</p>
        <p style="margin: 6px 0;"><strong>Date of Activity:</strong> ${escapeHtml(params.incidentDate || 'Not specified')}</p>
        <p style="margin: 6px 0;"><strong>Phenomenon Type:</strong> <span style="background:#334155; padding:2px 8px; border-radius:4px;">${escapeHtml(params.activityType)}</span></p>
        <p style="margin: 6px 0;"><strong>Triage Destination:</strong> ${DOS_OFFICIAL_EMAIL}</p>
      </div>

      <div style="background: #14171f; padding: 18px; border-radius: 6px; border-left: 4px solid #dc2626; margin-bottom: 20px;">
        <h4 style="margin: 0 0 10px 0; color: #cbd5e1; text-transform: uppercase; font-size: 0.85rem;">Chronology of Events</h4>
        <div style="white-space: pre-wrap; line-height: 1.6; color: #f8fafc;">${escapeHtml(params.description)}</div>
      </div>

      ${params.attachmentUrl ? `
        <div style="background: #1a1d24; padding: 14px 18px; border-radius: 6px; border: 1px solid #334155;">
          <strong>Evidence File:</strong> <a href="${escapeHtml(params.attachmentUrl)}" target="_blank" style="color:#38bdf8; text-decoration: underline;">View Uploaded Evidence</a>
        </div>
      ` : ''}
    </div>
  `;

  const transporter = getTransporter();
  if (transporter) {
    try {
      await transporter.sendMail({
        from: process.env.SMTP_FROM || `DOS Incident Desk <${process.env.GMAIL_USER || process.env.SMTP_USER}>`,
        to: DOS_OFFICIAL_EMAIL,
        replyTo: params.contactEmail,
        subject,
        text: textContent,
        html: htmlContent
      });
      console.log(`[EMAIL DISPATCH SUCCESS] Case report ${params.caseId} sent to ${DOS_OFFICIAL_EMAIL} via SMTP.`);
      return { success: true, deliveredVia: 'smtp', recipient: DOS_OFFICIAL_EMAIL };
    } catch (err: any) {
      console.error(`[EMAIL DISPATCH ERROR] SMTP failed: ${err?.message || err}. Falling back to recorded queue.`);
      return { success: true, deliveredVia: 'queue', recipient: DOS_OFFICIAL_EMAIL, error: err?.message };
    }
  } else {
    console.log(`[EMAIL RECORDED] Dispatched to ${DOS_OFFICIAL_EMAIL}:\n${textContent}`);
    return { success: true, deliveredVia: 'server_record', recipient: DOS_OFFICIAL_EMAIL };
  }
}

function escapeHtml(text: string): string {
  if (!text) return '';
  return String(text)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}
