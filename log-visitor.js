export default async function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.headers["x-real-ip"] ||
    "Unknown";

  const userAgent = req.headers["user-agent"] || "Unknown";
  const timestamp = new Date().toISOString();
  const page = req.headers["referer"] || "Unknown";

  const DISCORD_WEBHOOK_URL = "https://discord.com/api/webhooks/1482838708146278513/l0pIIHMEJy1s3mdeLllZajY8PvbmcXLZQ-c-Tj6a1TZsqXsgGp7JAhnIDmI-Ahhwdd5-";

  try {
    await fetch(DISCORD_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        embeds: [
          {
            title: "🌐 New Visitor",
            color: 0x5865f2,
            fields: [
              { name: "IP Address", value: `\`${ip}\``, inline: true },
              { name: "Time", value: timestamp, inline: true },
              { name: "Page", value: page, inline: false },
              { name: "User Agent", value: `\`${userAgent}\``, inline: false },
            ],
          },
        ],
      }),
    });

    res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    res.status(500).json({ error: "Failed to send webhook" });
  }
}
