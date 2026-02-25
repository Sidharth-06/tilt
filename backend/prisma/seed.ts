import { PrismaClient, CampaignStatus, EventType } from "@prisma/client";
import bcrypt from "bcryptjs";
import { nanoid } from "nanoid";

const prisma = new PrismaClient();

async function main() {
    console.log("🌱 Seeding database...\n");

    // Clean existing data
    await prisma.event.deleteMany();
    await prisma.campaign.deleteMany();
    await prisma.user.deleteMany();

    // Create demo user
    const passwordHash = await bcrypt.hash("password123", 12);
    const user = await prisma.user.create({
        data: {
            email: "demo@example.com",
            passwordHash,
            name: "Demo User",
        },
    });
    console.log(`✅ Created user: ${user.email}`);

    // Create sample campaigns
    const campaignData = [
        { name: "Summer Referral Blast", description: "Drive summer signups with a generous referral bonus.", status: CampaignStatus.ACTIVE, basePayout: 25.0 },
        { name: "Partner Program Q1", description: "Q1 partner referral campaign targeting enterprise users.", status: CampaignStatus.ACTIVE, basePayout: 50.0 },
        { name: "Beta Launch Promo", description: "Early-adopter referral program for our beta launch.", status: CampaignStatus.PAUSED, basePayout: 15.0 },
    ];

    const campaigns = [];
    for (const data of campaignData) {
        const campaign = await prisma.campaign.create({
            data: {
                ...data,
                userId: user.id,
                referralToken: nanoid(12),
            },
        });
        campaigns.push(campaign);
        console.log(`✅ Created campaign: ${campaign.name} (token: ${campaign.referralToken})`);
    }

    // Generate random events
    const userAgents = [
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0",
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 14_2) Safari/605.1",
        "Mozilla/5.0 (iPhone; CPU iPhone OS 17_2) Mobile/15E148",
        "Mozilla/5.0 (Linux; Android 14) Chrome/120.0",
    ];

    let totalEvents = 0;

    for (const campaign of campaigns) {
        // Generate 10-30 clicks per campaign
        const clickCount = Math.floor(Math.random() * 21) + 10;
        for (let i = 0; i < clickCount; i++) {
            const daysAgo = Math.floor(Math.random() * 30);
            await prisma.event.create({
                data: {
                    campaignId: campaign.id,
                    type: EventType.CLICK,
                    ipHash: nanoid(16),
                    userAgent: userAgents[Math.floor(Math.random() * userAgents.length)],
                    createdAt: new Date(Date.now() - daysAgo * 86400000),
                },
            });
            totalEvents++;
        }

        // Generate 2-8 conversions per campaign
        const conversionCount = Math.floor(Math.random() * 7) + 2;
        for (let i = 0; i < conversionCount; i++) {
            const daysAgo = Math.floor(Math.random() * 30);
            await prisma.event.create({
                data: {
                    campaignId: campaign.id,
                    type: EventType.CONVERSION,
                    referenceId: nanoid(20),
                    ipHash: nanoid(16),
                    createdAt: new Date(Date.now() - daysAgo * 86400000),
                },
            });
            totalEvents++;
        }
    }

    console.log(`✅ Created ${totalEvents} events across ${campaigns.length} campaigns`);
    console.log("\n🎉 Seed complete!");
    console.log("   Login: demo@example.com / password123");
}

main()
    .catch((e) => {
        console.error("❌ Seed error:", e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
