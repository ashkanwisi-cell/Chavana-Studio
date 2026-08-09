"use strict";

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT = 5;
const MAX_BODY_BYTES = 200 * 1024;
const rateStore = global.__chavanaBriefRateStore || (global.__chavanaBriefRateStore = new Map());

const sections = [
  ["CLIENT / اطلاعات کارفرما", ["brand","contactPerson","role","email","phone","messenger","websiteUrl","socialUrl","industry","location"]],
  ["PROJECT / مشخصات پروژه", ["projectName","projectType","projectSentence","createRequest","whyNow","campaignState"]],
  ["OBJECTIVE / هدف پروژه", ["objectiveTags","primaryObjective","audienceResponse","mainCta","successDefinition","kpi"]],
  ["AUDIENCE / مخاطب", ["primaryAudience","ageRange","gender","market","interests","customerType","audienceDesire","secondaryAudience","culturalNotes"]],
  ["MESSAGE & TONE / پیام و لحن", ["mainMessage","benefits","mandatoryClaims","forbiddenWords","tone","toneOther"]],
  ["VISUAL DIRECTION / جهت هنری", ["visualWorld","visualStyles","preferredColors","brandColors","mustVisual","avoidVisual","competitors","referenceCampaigns","referenceFilms","visualDirections","references"]],
  ["DELIVERABLES / خروجی‌ها", ["deliverableTypes","deliverableCount","mainDuration","additionalDurations","platforms","aspectRatios","resolution","languages","subtitles","subtitleDetails","voiceover","voiceoverDetails","music","musicDetails","soundDesign","soundDetails","onscreenType","typeDetails","platformVersions","technicalRequirements"]],
  ["PRODUCTION / جزئیات تولید", ["realPerson","personDetails","identityConsistency","identityDetails","productAccuracy","packagingAccuracy","locations","existingFootage","existingFootageDetails","productionMode","characterConsistency","productAngles","legalVisuals","aiMustNotChange"]],
  ["BRAND ASSETS / فایل‌ها و دارایی‌ها", ["availableAssets","assetLinks","assetNotes"]],
  ["TIMELINE & BUDGET / زمان‌بندی و بودجه", ["startDate","reviewDate","deadline","fixedDeadline","deadlineReason","budgetRange","currency","budgetFlexibility"]],
  ["APPROVAL / تأیید و بازخورد", ["decisionMaker","finalApprover","stakeholders","communication","revisionRounds","feedbackSpeed","internalApproval"]],
  ["USAGE / نحوه استفاده", ["usageChannels","territory","usageDuration","paidMedia","exclusivity","rights"]],
  ["FINAL NOTES / توضیحات نهایی", ["finalNotes"]]
];

const labels = {
  brand:"Brand / نام برند", contactPerson:"Contact Person / شخص رابط", role:"Role / سمت", email:"Email / ایمیل", phone:"Phone / تلفن", messenger:"Telegram or WhatsApp / تلگرام یا واتساپ", websiteUrl:"Website / وب‌سایت", socialUrl:"Social URL / شبکه اجتماعی", industry:"Industry / حوزه فعالیت", location:"Country or City / کشور یا شهر",
  projectName:"Project Name / نام پروژه", projectType:"Project Type / نوع پروژه", projectSentence:"One-sentence description / توصیف یک‌جمله‌ای", createRequest:"Requested creation / خروجی مورد نظر", whyNow:"Why now / دلیل اجرا در این زمان", campaignState:"Campaign state / وضعیت کمپین",
  primaryObjective:"Primary Objective / هدف اصلی", primaryAudience:"Primary Audience / مخاطب اصلی", mainMessage:"Main Message / پیام اصلی", deadline:"Final Deadline / ددلاین نهایی"
};
Object.assign(labels, {
  objectiveTags:"Objectives / هدف‌ها", audienceResponse:"Desired Audience Response / واکنش مطلوب مخاطب", mainCta:"Main CTA / دعوت به اقدام", successDefinition:"Success Definition / تعریف موفقیت", kpi:"KPI or Target / شاخص یا هدف",
  ageRange:"Age Range / بازه سنی", gender:"Gender / جنسیت", market:"Market / بازار", interests:"Interests and Lifestyle / علایق و سبک زندگی", customerType:"Customer Type / نوع مخاطب", audienceDesire:"Audience Problem or Desire / مسئله یا خواسته مخاطب", secondaryAudience:"Secondary Audience / مخاطب ثانویه", culturalNotes:"Cultural Notes / نکات فرهنگی",
  benefits:"Key Benefits / مزیت‌های اصلی", mandatoryClaims:"Mandatory Claims / ادعاهای اجباری", forbiddenWords:"Forbidden Words or Messages / کلمات یا پیام‌های ممنوع", tone:"Tone / لحن", toneOther:"Other Tone / لحن دیگر",
  visualWorld:"Visual World / دنیای بصری", visualStyles:"Preferred Visual Styles / سبک‌های بصری", preferredColors:"Preferred Colors / رنگ‌های ترجیحی", brandColors:"Brand Colors / رنگ‌های برند", mustVisual:"Must-have Elements / عناصر ضروری", avoidVisual:"Elements to Avoid / عناصر ممنوع", competitors:"Competitors or Similar Brands / رقبا یا برندهای مشابه", referenceCampaigns:"Reference Campaigns / کمپین‌های مرجع", referenceFilms:"Reference Films or Videos / فیلم‌ها یا ویدیوهای مرجع", visualDirections:"Visual Direction / جهت بصری", references:"Reference URLs / لینک‌های مرجع",
  deliverableTypes:"Deliverables / خروجی‌ها", deliverableCount:"Deliverable Count / تعداد خروجی", mainDuration:"Main Film Duration / مدت فیلم اصلی", additionalDurations:"Additional Durations / مدت نسخه‌های دیگر", platforms:"Platforms / پلتفرم‌ها", aspectRatios:"Aspect Ratios / نسبت‌های تصویر", resolution:"Resolution / رزولوشن", languages:"Languages / زبان‌ها", subtitles:"Subtitles / زیرنویس", subtitleDetails:"Subtitle Details / جزئیات زیرنویس", voiceover:"Voice-over / نریشن", voiceoverDetails:"Voice-over Details / جزئیات نریشن", music:"Music / موسیقی", musicDetails:"Music Details / جزئیات موسیقی", soundDesign:"Sound Design / طراحی صدا", soundDetails:"Sound Details / جزئیات صدا", onscreenType:"On-screen Typography / تایپوگرافی روی تصویر", typeDetails:"Typography Details / جزئیات تایپوگرافی", platformVersions:"Platform-specific Versions / نسخه‌های مخصوص پلتفرم", technicalRequirements:"Technical Requirements / الزامات فنی",
  realPerson:"Real Person / فرد واقعی", personDetails:"Person Details / جزئیات فرد", identityConsistency:"Identity Consistency / ثبات هویت", identityDetails:"Identity Requirements / الزامات هویت", productAccuracy:"Product Accuracy / دقت محصول", packagingAccuracy:"Packaging and Logo Accuracy / دقت بسته‌بندی و لوگو", locations:"Locations or Environments / لوکیشن‌ها یا محیط‌ها", existingFootage:"Existing Footage / فوتیج موجود", existingFootageDetails:"Footage Details / جزئیات فوتیج", productionMode:"Production Approach / روش تولید", characterConsistency:"Character Consistency / ثبات کاراکتر", productAngles:"Required Product Angles / زوایای ضروری محصول", legalVisuals:"Sensitive or Restricted Visuals / عناصر حساس یا محدود", aiMustNotChange:"AI Must Not Change / موارد ممنوع برای تغییر با هوش مصنوعی",
  availableAssets:"Available Assets / دارایی‌های موجود", assetLinks:"Asset Links / لینک دارایی‌ها", assetNotes:"Asset Access Notes / توضیحات دسترسی",
  startDate:"Desired Start Date / تاریخ شروع مطلوب", reviewDate:"First Review Date / تاریخ اولین بازبینی", fixedDeadline:"Fixed Deadline / ددلاین قطعی", deadlineReason:"Deadline Reason / دلیل ددلاین", budgetRange:"Budget Range / محدوده بودجه", currency:"Currency / واحد پول", budgetFlexibility:"Budget Flexibility / انعطاف بودجه",
  decisionMaker:"Main Decision Maker / تصمیم‌گیرنده اصلی", finalApprover:"Final Approver / تأییدکننده نهایی", stakeholders:"Stakeholder Count / تعداد افراد درگیر", communication:"Preferred Communication / روش ارتباط", revisionRounds:"Revision Rounds / دورهای بازبینی", feedbackSpeed:"Feedback Speed / سرعت بازخورد", internalApproval:"Internal Approval / تأیید داخلی",
  usageChannels:"Usage Channels / محل‌های استفاده", territory:"Territory or Countries / محدوده جغرافیایی", usageDuration:"Usage Duration / مدت استفاده", paidMedia:"Paid Media / رسانه پولی", exclusivity:"Exclusivity / انحصار", rights:"Rights or Licensing / حقوق یا لایسنس", finalNotes:"Final Notes / توضیحات نهایی"
});

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.end(JSON.stringify(body));
}

function clientIp(req) {
  return String(req.headers["x-forwarded-for"] || req.socket?.remoteAddress || "unknown").split(",")[0].trim().slice(0, 80);
}

function isRateLimited(ip) {
  const now = Date.now();
  const recent = (rateStore.get(ip) || []).filter(time => now - time < RATE_WINDOW_MS);
  recent.push(now); rateStore.set(ip, recent);
  if (rateStore.size > 1000) for (const [key, times] of rateStore) if (!times.some(time => now - time < RATE_WINDOW_MS)) rateStore.delete(key);
  return recent.length > RATE_LIMIT;
}

function cleanString(value, limit = 5000) {
  return String(value ?? "").replace(/\0/g, "").replace(/\r\n?/g, "\n").trim().slice(0, limit);
}

function sanitizeAnswers(input) {
  if (!input || typeof input !== "object" || Array.isArray(input)) return null;
  const safe = {};
  const allowed = new Set(sections.flatMap(([, keys]) => keys));
  for (const [key, value] of Object.entries(input)) {
    if (!allowed.has(key)) continue;
    if (Array.isArray(value)) safe[key] = value.slice(0, 30).map(item => cleanString(item, 500)).filter(Boolean);
    else safe[key] = cleanString(value);
  }
  return safe;
}

function filled(value) { return Array.isArray(value) ? value.length > 0 : Boolean(cleanString(value)); }

function validate(answers) {
  const missing = ["brand","contactPerson","projectName","projectType","primaryObjective","primaryAudience","mainMessage","deadline"].filter(key => !filled(answers[key]));
  if (!["email","phone","messenger"].some(key => filled(answers[key]))) missing.push("contactMethod");
  if (answers.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(answers.email)) return { ok: false, error: "Invalid email" };
  return missing.length ? { ok: false, error: "Missing required fields", fields: missing } : { ok: true };
}

function displayLabel(key) {
  if (labels[key]) return labels[key];
  return key.replace(/([a-z])([A-Z])/g, "$1 $2").replace(/^./, char => char.toUpperCase());
}

function buildBriefText({ briefId, language, submittedAt, answers }) {
  const line = "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━";
  const blocks = sections.map(([title, keys], index) => {
    const rows = keys.filter(key => filled(answers[key])).map(key => `${displayLabel(key)}:\n${Array.isArray(answers[key]) ? answers[key].join(", ") : answers[key]}`);
    return rows.length ? `${line}\n${String(index + 1).padStart(2, "0")} — ${title}\n${line}\n${rows.join("\n\n")}` : "";
  }).filter(Boolean).join("\n\n");
  return `CHAVANA STUDIO\nPROJECT BRIEF\n\nBRIEF ID: ${briefId}\nSUBMITTED: ${submittedAt}\nLANGUAGE: ${language.toUpperCase()}\nBRAND: ${answers.brand}\nPROJECT: ${answers.projectName}\n\n${blocks}\n\n${line}\nCHAVANA STUDIO — PROJECT INTAKE\nBrief ID: ${briefId}\n${line}\n`;
}

function makeId() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = "";
  for (let i = 0; i < 5; i += 1) value += chars[Math.floor(Math.random() * chars.length)];
  return `CHV-${String(new Date().getUTCFullYear()).slice(-2)}-${value}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") { res.setHeader("Allow", "POST"); return json(res, 405, { success: false, error: "Method not allowed" }); }
  const length = Number(req.headers["content-length"] || 0);
  if (length > MAX_BODY_BYTES) return json(res, 413, { success: false, error: "Request too large" });
  if (isRateLimited(clientIp(req))) return json(res, 429, { success: false, error: "Too many requests. Please try again later." });

  let body;
  try { body = typeof req.body === "string" ? JSON.parse(req.body) : req.body; }
  catch { return json(res, 400, { success: false, error: "Malformed JSON" }); }
  if (!body || typeof body !== "object") return json(res, 400, { success: false, error: "Malformed request" });
  if (cleanString(body.honeypot, 200)) return json(res, 400, { success: false, error: "Submission rejected" });

  const answers = sanitizeAnswers(body.answers);
  if (!answers) return json(res, 400, { success: false, error: "Invalid answers" });
  const validation = validate(answers);
  if (!validation.ok) return json(res, 422, { success: false, error: validation.error, fields: validation.fields });

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return json(res, 503, { success: false, error: "Brief delivery is not configured" });

  const requestedId = cleanString(body.briefId, 30);
  const briefId = /^CHV-\d{2}-[A-Z2-9]{5}$/.test(requestedId) ? requestedId : makeId();
  const language = body.language === "en" ? "en" : "fa";
  const submittedAt = new Date().toISOString().replace("T", " ").slice(0, 19) + " UTC";
  const text = buildBriefText({ briefId, language, submittedAt, answers });
  const safeBrand = answers.brand.replace(/[^\p{L}\p{N}_-]+/gu, "-").slice(0, 40) || "Brand";
  const filename = `Chavana-Brief_${safeBrand}_${submittedAt.slice(0, 10)}_${briefId}.txt`;

  try {
    const form = new FormData();
    form.append("chat_id", chatId);
    form.append("caption", `CHAVANA NEW BRIEF\nBrand: ${answers.brand}\nProject: ${answers.projectName}\nBrief ID: ${briefId}\nSubmitted: ${submittedAt}`.slice(0, 1000));
    form.append("document", new Blob([text], { type: "text/plain;charset=utf-8" }), filename);
    const telegram = await fetch(`https://api.telegram.org/bot${token}/sendDocument`, { method: "POST", body: form, signal: AbortSignal.timeout(15000) });
    const telegramResult = await telegram.json().catch(() => ({}));
    if (!telegram.ok || telegramResult.ok !== true) return json(res, 502, { success: false, error: "Telegram did not accept the brief" });
    return json(res, 200, { success: true, briefId, submittedAt });
  } catch {
    return json(res, 502, { success: false, error: "Delivery service unavailable" });
  }
};

module.exports._test = { sanitizeAnswers, validate, buildBriefText };
