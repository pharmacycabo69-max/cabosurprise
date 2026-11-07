// Sends the real deposit emails with sample data, to check the design and the Resend setup.
// Usage: RESEND_API_KEY=re_... EMAIL_FROM="Rancho McCoy <reservas@cabosurprise.com>" npx tsx scripts/send-test-email.ts you@example.com
import { sendEmail } from "../src/lib/email";
import { customerEmail, ownerEmail, type DepositMail } from "../src/lib/emailTemplates";

const to = process.argv[2];
if (!to) throw new Error("Pass the recipient: npx tsx scripts/send-test-email.ts you@example.com");

const date = new Date(Date.now() + 75 * 86400000).toISOString().slice(0, 10);
const sample: DepositMail = {
  name: "Test Customer",
  email: to,
  paid: 4750,
  currency: "USD",
  service: "Exclusive Ranch Wedding Reception",
  date,
  guests: 45,
  packageUsd: 9500,
  balanceDays: 30,
  addons: "Open bar, Two-horse experience",
  transport: true,
  venue: "Hotel or villa name",
  extra: {},
  sessionId: "cs_test_sample",
};

async function main() {
  const c = customerEmail(sample);
  const o = ownerEmail(sample);
  await sendEmail({ to: to!, subject: "[TEST] Deposit received | Cabo Surprise", html: c.html, text: c.text, idempotencyKey: `test-customer-${Date.now()}` });
  await sendEmail({ to: to!, subject: "[TEST] Deposit received: USD 4,750.00 · Exclusive Ranch Wedding Reception", html: o.html, text: o.text, idempotencyKey: `test-owner-${Date.now()}` });
  console.log(`Sent 2 test emails to ${to}`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
