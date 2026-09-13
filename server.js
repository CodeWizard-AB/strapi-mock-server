const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 1337;

app.use(cors());
app.use(express.json());

// 1. The Daily Star Journalism Sections & Categorization Tree
const portalTaxonomy = [
	{
		section: { id: 1, name: "News", slug: "news" },
		categories: [
			{ id: 101, name: "National", slug: "national" },
			{ id: 102, name: "Politics", slug: "politics" },
			{ id: 103, name: "Governance", slug: "governance" },
			{ id: 104, name: "Crime & Justice", slug: "crime-and-justice" },
			{ id: 105, name: "City Pulse", slug: "city-pulse" },
		],
	},
	{
		section: { id: 2, name: "Business", slug: "business" },
		categories: [
			{ id: 201, name: "Economy", slug: "economy" },
			{ id: 202, name: "Banking & Finance", slug: "banking-finance" },
			{ id: 203, name: "Startups & Tech", slug: "startups" },
			{ id: 204, name: "Agriculture", slug: "agriculture" },
			{ id: 205, name: "RMG & Textiles", slug: "rmg-textiles" },
		],
	},
	{
		section: { id: 3, name: "Opinion", slug: "opinion" },
		categories: [
			{ id: 301, name: "Editorial", slug: "editorial" },
			{ id: 302, name: "Views & Columns", slug: "views" },
			{ id: 303, name: "Human Rights", slug: "human-rights" },
			{ id: 304, name: "Geopolitics", slug: "geopolitics" },
		],
	},
	{
		section: { id: 4, name: "Sports", slug: "sports" },
		categories: [
			{ id: 401, name: "Cricket", slug: "cricket" },
			{ id: 402, name: "Football", slug: "football" },
			{ id: 403, name: "Tennis", slug: "tennis" },
			{ id: 404, name: "Athletics", slug: "athletics" },
		],
	},
	{
		section: { id: 5, name: "Tech & Startup", slug: "technology" },
		categories: [
			{ id: 501, name: "Artificial Intelligence", slug: "ai" },
			{ id: 502, name: "Gadgets & Gear", slug: "gadgets" },
			{ id: 503, name: "Cybersecurity", slug: "cybersecurity" },
			{ id: 504, name: "Telecom", slug: "telecom" },
		],
	},
	{
		section: { id: 6, name: "Life & Living", slug: "lifestyle" },
		categories: [
			{ id: 601, name: "Food & Recipes", slug: "food-recipes" },
			{ id: 602, name: "Health & Fitness", slug: "health-fitness" },
			{ id: 603, name: "Travel & Heritage", slug: "travel-heritage" },
			{ id: 604, name: "Fashion & Trends", slug: "fashion-trends" },
		],
	},
	{
		section: { id: 7, name: "Environment", slug: "environment" },
		categories: [
			{ id: 701, name: "Climate Crisis", slug: "climate-crisis" },
			{ id: 702, name: "Renewable Energy", slug: "renewable-energy" },
			{ id: 703, name: "Biodiversity", slug: "biodiversity" },
			{ id: 704, name: "River Erosion", slug: "river-erosion" },
		],
	},
	{
		section: { id: 8, name: "Entertainment", slug: "entertainment" },
		categories: [
			{ id: 801, name: "Dhallywood & Cinema", slug: "dhallywood-cinema" },
			{ id: 802, name: "Music & Theatre", slug: "music-theatre" },
			{ id: 803, name: "OTT & Television", slug: "ott-tv" },
			{ id: 804, name: "Pop Culture", slug: "pop-culture" },
		],
	},
];

// 2. Real Divisional and District Registry
const geographicUnits = [
	{
		division: { id: 1, name: "Dhaka Division", slug: "dhaka-division" },
		districts: [
			"Dhaka",
			"Gazipur",
			"Narayanganj",
			"Tangail",
			"Faridpur",
			"Manikganj",
			"Munshiganj",
			"Narsingdi",
			"Gopalganj",
			"Kishoreganj",
			"Madaripur",
			"Rajbari",
			"Shariatpur",
		],
	},
	{
		division: {
			id: 2,
			name: "Chattogram Division",
			slug: "chattogram-division",
		},
		districts: [
			"Chattogram",
			"Cox's Bazar",
			"Cumilla",
			"Feni",
			"Brahmanbaria",
			"Rangamati",
			"Bandarban",
			"Khagrachhari",
			"Noakhali",
			"Chandpur",
			"Lakshmipur",
		],
	},
	{
		division: { id: 3, name: "Rajshahi Division", slug: "rajshahi-division" },
		districts: [
			"Rajshahi",
			"Bogura",
			"Pabna",
			"Sirajganj",
			"Naogaon",
			"Natore",
			"Chapai Nawabganj",
			"Joypurhat",
		],
	},
	{
		division: { id: 4, name: "Khulna Division", slug: "khulna-division" },
		districts: [
			"Khulna",
			"Jashore",
			"Kushtia",
			"Satkhira",
			"Bagerhat",
			"Jhenaidah",
			"Chuadanga",
			"Magura",
			"Meherpur",
			"Narail",
		],
	},
	{
		division: { id: 5, name: "Sylhet Division", slug: "sylhet-division" },
		districts: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
	},
	{
		division: { id: 6, name: "Barishal Division", slug: "barishal-division" },
		districts: [
			"Barishal",
			"Patuakhali",
			"Bhola",
			"Pirojpur",
			"Barguna",
			"Jhalokati",
		],
	},
	{
		division: { id: 7, name: "Rangpur Division", slug: "rangpur-division" },
		districts: [
			"Rangpur",
			"Dinajpur",
			"Kurigram",
			"Gaibandha",
			"Nilphamari",
			"Panchagarh",
			"Thakurgaon",
			"Lalmonirhat",
		],
	},
	{
		division: {
			id: 8,
			name: "Mymensingh Division",
			slug: "mymensingh-division",
		},
		districts: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"],
	},
];

// Flatten districts into normalized array
let districtCounter = 1;
const allDistricts = [];
geographicUnits.forEach((div) => {
	div.districts.forEach((distName) => {
		allDistricts.push({
			division: div.division,
			district: {
				id: districtCounter++,
				name: distName,
				slug: distName
					.toLowerCase()
					.replace(/[^a-z0-9]+/g, "-")
					.replace(/(^-|-$)+/g, ""),
			},
		});
	});
});

// 3. Authors List
const authors = [
	{
		id: 1,
		name: "Mahfuz Anam",
		email: "editor@thedailystar.net",
		role: "Editor & Publisher",
		avatarUrl:
			"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
	},
	{
		id: 2,
		name: "Syed Badrul Ahsan",
		email: "badrul.ahsan@thedailystar.net",
		role: "Senior Columnist",
		avatarUrl:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
	},
	{
		id: 3,
		name: "Naimul Karim",
		email: "naimul.karim@thedailystar.net",
		role: "Special Correspondent",
		avatarUrl:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
	},
	{
		id: 4,
		name: "Porimol Palma",
		email: "porimol.palma@thedailystar.net",
		role: "Diplomatic Affairs Lead",
		avatarUrl:
			"https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
	},
	{
		id: 5,
		name: "Shakhawat Hossain",
		email: "shakhawat.h@thedailystar.net",
		role: "Business Bureau Chief",
		avatarUrl:
			"https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
	},
	{
		id: 6,
		name: "Aflrah Tahsin",
		email: "afrah.t@thedailystar.net",
		role: "Lifestyle & Culture Desk",
		avatarUrl:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
	},
	{
		id: 7,
		name: "Mazhar Uddin",
		email: "mazhar.u@thedailystar.net",
		role: "Sports Desk Analyst",
		avatarUrl:
			"https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
	},
	{
		id: 8,
		name: "Mahmudul Hasan",
		email: "mahmudul.h@thedailystar.net",
		role: "Tech & Telecom Reporter",
		avatarUrl:
			"https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150",
	},
];

// 4. Tags Inventory
const tagsInventory = [
	{ id: 1, name: "Bangladesh Bank", slug: "bangladesh-bank" },
	{ id: 2, name: "Mega Projects", slug: "mega-projects" },
	{ id: 3, name: "BCB Cricket", slug: "bcb-cricket" },
	{ id: 4, name: "Dhaka Elevated Expressway", slug: "dhaka-expressway" },
	{ id: 5, name: "Climate Adaptation", slug: "climate-adaptation" },
	{ id: 6, name: "Foreign Reserves", slug: "foreign-reserves" },
	{ id: 7, name: "High Court Ruling", slug: "high-court-ruling" },
	{ id: 8, name: "Startup Ecosystem", slug: "startup-ecosystem" },
	{ id: 9, name: "Padma Bridge Rail Link", slug: "padma-bridge-rail" },
	{ id: 10, name: "Public Health", slug: "public-health" },
	{ id: 11, name: "Export Earnings", slug: "export-earnings" },
	{ id: 12, name: "Renewable Energy", slug: "renewable-energy" },
];

// 5. Curated Unsplash Media Assets
const imageCollection = [
	"https://images.unsplash.com/photo-1474487548417-781cb71495f3",
	"https://images.unsplash.com/photo-1559526324-4b87b5e36e44",
	"https://images.unsplash.com/photo-1518837695005-2083093ee35b",
	"https://images.unsplash.com/photo-1531415074868-036b107e775a",
	"https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
	"https://images.unsplash.com/photo-1509228468518-180dd4864904",
	"https://images.unsplash.com/photo-1451187580459-43490279c0fa",
	"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
	"https://images.unsplash.com/photo-1511556532299-8f662fc26c06",
	"https://images.unsplash.com/photo-1498050108023-c5249f4df085",
	"https://images.unsplash.com/photo-1540747913346-19e32dc3e97e",
	"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800",
];

// 6. Realistic Headline Matrix for The Daily Star Style
const headlineThemes = [
	"Padma Rail Line Completes Commuter Speed Trials with Zero Faults",
	"Central Bank Unveils Comprehensive Framework for Single-Digit SME Lending",
	"Tigers Announce Revamped Tactical Squad for Upcoming Multi-Nation Trophy",
	"Coastal Sluice Gates Overhauled Across Southern Belt Prior to Monsoon",
	"Local Software Giants Cross Historic Annual Revenue Milestone",
	"High Court Directs Strict Air Quality Monitoring in Metros",
	"Agri-Researchers Develop High-Yield Saline-Resistant Rice Strains",
	"National Grid Adds 200MW Solar Facility to Clean Energy Portfolio",
	"Chattogram Port Slashes Container Handling Time with Automation Suite",
	"Heritage Handloom Weavers in Tangail Seek Direct E-Commerce Corridors",
	"State Universities Implement Cloud Registration for STEM Transfer Credits",
	"Foreign Currency Inflow Climbs 14 Percent Following Remittance Rebalance",
	"RMG Manufacturers Shift Towards Recycled Fabric Standards to Meet EU Directives",
	"Dhaka Elevated Expressway Phase 3 Slated for Testing Run Next Month",
	"Health Ministry Expedites Vector Control Operations in Vulnerable City Wards",
];

// Helper: Slug Generator
const slugify = (text, id) => {
	const clean = text
		.toLowerCase()
		.replace(/[^\w\s-]/g, "")
		.trim()
		.replace(/\s+/g, "-");
	return `${clean}-${id}`;
};

// Generate EXACTLY 1,000 unique records (ID 1 through 1000)
const TOTAL_RECORDS = 1000;
const articles = [];

for (let id = 1; id <= TOTAL_RECORDS; id++) {
	const sectionNode = portalTaxonomy[(id - 1) % portalTaxonomy.length];
	const section = sectionNode.section;
	const category =
		sectionNode.categories[(id - 1) % sectionNode.categories.length];

	const geoNode = allDistricts[(id - 1) % allDistricts.length];
	const author = authors[(id - 1) % authors.length];
	const baseTitle = headlineThemes[(id - 1) % headlineThemes.length];
	const iteration = Math.floor((id - 1) / headlineThemes.length) + 1;
	const title =
		iteration === 1 ? `${baseTitle}` : `${baseTitle} (Dispatch${iteration})`;
	const slug = slugify(title, id);
	const coverUrl = imageCollection[(id - 1) % imageCollection.length];

	const tagOne = tagsInventory[(id - 1) % tagsInventory.length];
	const tagTwo = tagsInventory[(id + 3) % tagsInventory.length];

	articles.push({
		id: id,
		documentId: `star-art-${String(id).padStart(5, "0")}`,
		title: title,
		slug: slug,
		excerpt: `Exclusive Star report from ${geoNode.district.name}: In-depth investigation exploring structural milestones, public policy developments, and socio-economic effects in${section.name}.`,
		content: [
			{
				type: "paragraph",
				children: [
					{
						type: "text",
						text: `Reporting from ${geoNode.district.name} — Comprehensive field reports and internal audits evaluate the broader implications of this development on the${category.name.toLowerCase()} sector.`,
					},
				],
			},
			{
				type: "heading",
				level: 2,
				children: [
					{
						type: "text",
						text: "Sector Implications & Ground Reality",
					},
				],
			},
			{
				type: "paragraph",
				children: [
					{
						type: "text",
						text: "Interviews with leading stakeholders reveal that rigorous policy implementation will streamline regional supply lines, enhance administrative transparency, and set an authoritative benchmark for upcoming projects.",
					},
				],
			},
		],
		coverImage: {
			id: 5000 + id,
			name: `star-media-${id}.webp`,
			alternativeText: title,
			caption: `Field capture illustrating ${category.name} in${geoNode.district.name}.`,
			width: 1920,
			height: 1080,
			formats: {
				thumbnail: { url: `${coverUrl}?w=240&auto=format&fit=crop` },
				medium: { url: `${coverUrl}?w=750&auto=format&fit=crop` },
				large: { url: `${coverUrl}?w=1200&auto=format&fit=crop` },
			},
			url: `${coverUrl}?auto=format&fit=crop&w=1920&q=80`,
		},
		imageCaption: `A view recorded in ${geoNode.district.name},${geoNode.division.name}. Photo: Star File`,
		isBreaking: id % 11 === 0,
		isFeatured: id % 7 === 0,
		author: author,
		section: section,
		category: category,
		division: geoNode.division,
		district: geoNode.district,
		tags: [tagOne, tagTwo],
		seo: {
			metaTitle: `${title} | The Daily Star`,
			metaDescription: `Read verified reportage on ${title.toLowerCase()} directly from The Daily Star investigative desk.`,
			keywords: `${category.slug}, ${section.slug},${geoNode.district.slug}, the daily star`,
			canonicalURL: `https://www.thedailystar.net/${section.slug}/${slug}`,
		},
		source: {
			name: id % 3 === 0 ? "Star Research Desk" : "Staff Correspondent",
			url: `https://www.thedailystar.net/sources/${slug}`,
			authorOrAgency: "The Daily Star Network",
		},
		createdAt: new Date(
			Date.now() - (TOTAL_RECORDS - id) * 3600000,
		).toISOString(),
		publishedAt: new Date(
			Date.now() - (TOTAL_RECORDS - id) * 3600000 + 300000,
		).toISOString(),
	});
}

// ----------------------------------------------------
// REST Endpoints matching Strapi's API Contracts
// ----------------------------------------------------

// 1. GET ALL / FILTERED ARTICLES
app.get("/api/articles", (req, res) => {
	let results = [...articles];

	// Search by text query
	if (req.query.search) {
		const q = req.query.search.toLowerCase();
		results = results.filter(
			(item) =>
				item.title.toLowerCase().includes(q) ||
				item.excerpt.toLowerCase().includes(q),
		);
	}

	// Filter by Section slug
	if (req.query.section) {
		results = results.filter(
			(item) => item.section.slug === req.query.section.toLowerCase(),
		);
	}

	// Filter by Category slug
	if (req.query.category) {
		results = results.filter(
			(item) => item.category.slug === req.query.category.toLowerCase(),
		);
	}

	// Filter by Division slug
	if (req.query.division) {
		results = results.filter(
			(item) => item.division.slug === req.query.division.toLowerCase(),
		);
	}

	// Filter by District slug
	if (req.query.district) {
		results = results.filter(
			(item) => item.district.slug === req.query.district.toLowerCase(),
		);
	}

	// Filter by Flags
	if (req.query.isBreaking !== undefined) {
		results = results.filter(
			(item) => String(item.isBreaking) === req.query.isBreaking,
		);
	}
	if (req.query.isFeatured !== undefined) {
		results = results.filter(
			(item) => String(item.isFeatured) === req.query.isFeatured,
		);
	}

	// Pagination defaults: 1 to 1000 in one go if requested
	const page = parseInt(
		req.query["pagination[page]"] || req.query.page || 1,
		10,
	);
	const pageSize = parseInt(
		req.query["pagination[pageSize]"] || req.query.pageSize || TOTAL_RECORDS,
		10,
	);

	const total = results.length;
	const pageCount = Math.ceil(total / pageSize) || 1;
	const startIndex = (page - 1) * pageSize;
	const paginatedData = results.slice(startIndex, startIndex + pageSize);

	res.json({
		data: paginatedData,
		meta: {
			pagination: {
				page: page,
				pageSize: pageSize,
				pageCount: pageCount,
				total: total,
			},
		},
	});
});

// 2. GET SINGLE ARTICLE (By ID: 1-1000 or Slug)
app.get("/api/articles/:identifier", (req, res) => {
	const { identifier } = req.params;
	const article = articles.find(
		(item) => item.id === Number(identifier) || item.slug === identifier,
	);

	if (!article) {
		return res.status(404).json({
			data: null,
			error: {
				status: 404,
				name: "NotFoundError",
				message: `Article '${identifier}' was not found in The Daily Star dataset.`,
			},
		});
	}

	res.json({
		data: article,
		meta: {},
	});
});

// 3. AUXILIARY LOOKUP ENDPOINTS
app.get("/api/sections", (req, res) => {
	const sectionsOnly = portalTaxonomy.map((item) => item.section);

	res.json({
		data: sectionsOnly,
		meta: {
			total: sectionsOnly.length,
		},
	});
});

app.get("/api/sections-with-categories", (req, res) => {
	const structuredTree = portalTaxonomy.map((item) => ({
		id: item.section.id,
		name: item.section.name,
		slug: item.section.slug,
		categories: item.categories.map((cat) => ({
			id: cat.id,
			name: cat.name,
			slug: cat.slug,
		})),
	}));

	res.json({
		data: structuredTree,
		meta: {
			total: structuredTree.length,
		},
	});
});

app.get("/api/sections/:sectionIdentifier/categories", (req, res) => {
	const { sectionIdentifier } = req.params;

	const targetNode = portalTaxonomy.find(
		(item) =>
			item.section.slug === sectionIdentifier.toLowerCase() ||
			item.section.id === Number(sectionIdentifier),
	);

	if (!targetNode) {
		return res.status(404).json({
			data: null,
			error: {
				status: 404,
				name: "NotFoundError",
				message: `Section '${sectionIdentifier}' not found.`,
			},
		});
	}

	res.json({
		section: targetNode.section,
		data: targetNode.categories,
		meta: {
			total: targetNode.categories.length,
		},
	});
});

app.get("/api/categories", (req, res) => {
	const flattenedCategories = portalTaxonomy.flatMap((item) =>
		item.categories.map((cat) => ({
			...cat,
			section: item.section, // includes parent section reference
		})),
	);

	res.json({
		data: flattenedCategories,
		meta: {
			total: flattenedCategories.length,
		},
	});
});

// 1. GET ALL DIVISIONS (Plain flat list)
// Matches Strapi: /api/divisions
app.get("/api/divisions", (req, res) => {
	const divisionsOnly = geographicUnits.map((item) => item.division);

	res.json({
		data: divisionsOnly,
		meta: {
			total: divisionsOnly.length,
		},
	});
});

// 2. GET ALL DIVISIONS WITH NESTED DISTRICTS
// Matches Strapi relational populate: /api/divisions?populate=districts
// Ideal for nested dropdowns, state/district cascading selectors, and location filters
app.get("/api/divisions-with-districts", (req, res) => {
	const structuredGeoTree = geographicUnits.map((divItem) => {
		// Collect all districts belonging to this division from allDistricts registry
		const divisionDistricts = allDistricts
			.filter((entry) => entry.division.id === divItem.division.id)
			.map((entry) => entry.district);

		return {
			id: divItem.division.id,
			name: divItem.division.name,
			slug: divItem.division.slug,
			districts: divisionDistricts,
		};
	});

	res.json({
		data: structuredGeoTree,
		meta: {
			total: structuredGeoTree.length,
		},
	});
});

// 3. GET DISTRICTS UNDER A SPECIFIC DIVISION (By Slug or ID)
// Examples: /api/divisions/dhaka-division/districts OR /api/divisions/1/districts
app.get("/api/divisions/:divisionIdentifier/districts", (req, res) => {
	const { divisionIdentifier } = req.params;

	const targetDivisionNode = geographicUnits.find(
		(item) =>
			item.division.slug === divisionIdentifier.toLowerCase() ||
			item.division.id === Number(divisionIdentifier),
	);

	if (!targetDivisionNode) {
		return res.status(404).json({
			data: null,
			error: {
				status: 404,
				name: "NotFoundError",
				message: `Division '${divisionIdentifier}' was not found.`,
			},
		});
	}

	const matchingDistricts = allDistricts
		.filter((entry) => entry.division.id === targetDivisionNode.division.id)
		.map((entry) => entry.district);

	res.json({
		division: targetDivisionNode.division,
		data: matchingDistricts,
		meta: {
			total: matchingDistricts.length,
		},
	});
});

// 4. GET ALL 64 DISTRICTS (Flat list with parent division reference)
// Matches Strapi: /api/districts
app.get("/api/districts", (req, res) => {
	const flattenedDistricts = allDistricts.map((entry) => ({
		id: entry.district.id,
		name: entry.district.name,
		slug: entry.district.slug,
		division: entry.division,
	}));

	res.json({
		data: flattenedDistricts,
		meta: {
			total: flattenedDistricts.length,
		},
	});
});

// 5. GET SINGLE DISTRICT DETAILS (By Slug or ID)
// Examples: /api/districts/dhaka OR /api/districts/coxs-bazar OR /api/districts/1
app.get("/api/districts/:districtIdentifier", (req, res) => {
	const { districtIdentifier } = req.params;

	const found = allDistricts.find(
		(entry) =>
			entry.district.slug === districtIdentifier.toLowerCase() ||
			entry.district.id === Number(districtIdentifier),
	);

	if (!found) {
		return res.status(404).json({
			data: null,
			error: {
				status: 404,
				name: "NotFoundError",
				message: `District '${districtIdentifier}' was not found.`,
			},
		});
	}

	res.json({
		data: {
			id: found.district.id,
			name: found.district.name,
			slug: found.district.slug,
			division: found.division,
		},
		meta: {},
	});
});

// Launch server
app.listen(PORT, () => {
	console.log(
		`\n======================================================================`,
	);
	console.log(
		`🚀 The Daily Star Mock Server Active on http://localhost:${PORT}`,
	);
	console.log(
		`📦 Dataset: Loaded 1,000 Articles | 8 Sections | 33 Categories | 64 Districts`,
	);
	console.log(
		`======================================================================\n`,
	);

	console.log(`📰 ARTICLES (Strapi API Format):`);
	console.log(
		`  • All 1,000 Articles:     http://localhost:${PORT}/api/articles`,
	);
	console.log(
		`  • Single (By ID):         http://localhost:${PORT}/api/articles/1`,
	);
	console.log(
		`  • Single (Last ID 1000):  http://localhost:${PORT}/api/articles/1000`,
	);
	console.log(
		`  • Single (By Slug):       http://localhost:${PORT}/api/articles/padma-rail-line-completes-commuter-speed-trials-with-zero-faults-1`,
	);
	console.log(
		`  • Pagination Example:     http://localhost:${PORT}/api/articles?page=1&pageSize=20`,
	);
	console.log(
		`  • Search by Keyword:      http://localhost:${PORT}/api/articles?search=rail`,
	);
	console.log(
		`  • Filter by Section:      http://localhost:${PORT}/api/articles?section=sports`,
	);
	console.log(
		`  • Filter by Category:     http://localhost:${PORT}/api/articles?category=economy`,
	);
	console.log(
		`  • Filter by Division:     http://localhost:${PORT}/api/articles?division=dhaka-division`,
	);
	console.log(
		`  • Filter by District:     http://localhost:${PORT}/api/articles?district=chattogram`,
	);
	console.log(
		`  • Breaking News Only:     http://localhost:${PORT}/api/articles?isBreaking=true`,
	);
	console.log(
		`  • Featured News Only:     http://localhost:${PORT}/api/articles?isFeatured=true\n`,
	);

	console.log(`🗂️  SECTIONS & CATEGORIES:`);
	console.log(
		`  • Flat Sections:          http://localhost:${PORT}/api/sections`,
	);
	console.log(
		`  • Nested Tree (Menu/Nav): http://localhost:${PORT}/api/sections-with-categories`,
	);
	console.log(
		`  • Section's Categories:   http://localhost:${PORT}/api/sections/sports/categories`,
	);
	console.log(
		`  • Section's Categories:   http://localhost:${PORT}/api/sections/business/categories`,
	);
	console.log(
		`  • All Flat Categories:    http://localhost:${PORT}/api/categories\n`,
	);

	console.log(`📍 GEOGRAPHY (DIVISIONS & DISTRICTS):`);
	console.log(
		`  • Flat Divisions:         http://localhost:${PORT}/api/divisions`,
	);
	console.log(
		`  • Nested Geo Tree:        http://localhost:${PORT}/api/divisions-with-districts`,
	);
	console.log(
		`  • Division's Districts:   http://localhost:${PORT}/api/divisions/dhaka-division/districts`,
	);
	console.log(
		`  • Division's Districts:   http://localhost:${PORT}/api/divisions/chattogram-division/districts`,
	);
	console.log(
		`  • All 64 Districts:       http://localhost:${PORT}/api/districts`,
	);
	console.log(
		`  • Single District:        http://localhost:${PORT}/api/districts/coxs-bazar\n`,
	);
	console.log(
		`======================================================================\n`,
	);
});
