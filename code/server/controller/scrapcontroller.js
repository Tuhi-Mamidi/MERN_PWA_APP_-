const axios = require("axios");
const cheerio = require("cheerio");
const MarketPrice = require("../model/scrapmodel.js");
const translate = require('google-translate-api-x');
function formatDate(date = new Date()) {
 const day = String(date.getDate()).padStart(2, "0"); // 01, 02, ..., 31
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthNames[date.getMonth()].toLowerCase(); // lowercase: jan, feb, sep
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

/*const scrap = async (req, res) => {
  try {
    const today = formatDate(); 
    console.log(today);
    const url = `https://www.napanta.com/market-price/andhra-pradesh/krishna/tiruvuru/${today}`;
    

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let results = [];

    const rows = $("table tbody tr");

for (let i = 0; i < rows.length; i++) {
  const tds = $(rows[i]).find("td");
  const commod = $(tds[0]).text().trim();

  const commodity_te = await translate(commod, { to: 'te' })
                            .then(r => r.text)
                            .catch(() => commod);

  results.push({
    commodity: commodity_te,
    comm:commod,
    maxPrice: $(tds[3]).text().trim(),
    avgPrice: $(tds[4]).text().trim(),
    minPrice: $(tds[5]).text().trim(),
    date: today,
  });
}


    
    await MarketPrice.deleteMany({ date: { $ne: today } });

   
    await MarketPrice.insertMany(results);

    res.json({ message: "Scraped & saved today's market prices", data: results });
  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Error scraping market prices" });
  }
};
module.exports={scrap};*/
const scrap = async (req, res) => {
  try {
    const today = formatDate(); 
    console.log(today);

    const url = `https://www.napanta.com/market-price/andhra-pradesh/krishna/tiruvuru/${today}`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    let results = [];

    const rows = $("table tbody tr");

    for (let i = 0; i < rows.length; i++) {
      const tds = $(rows[i]).find("td");
      const commod = $(tds[0]).text().trim();

      const commodity_te = await translate(commod, { to: 'te' })
                                .then(r => r.text)
                                .catch(() => commod);

      results.push({
        commodity: commodity_te,
        comm: commod,
        maxPrice: $(tds[3]).text().trim(),
        avgPrice: $(tds[4]).text().trim(),
        minPrice: $(tds[5]).text().trim(),
        date: today,
      });
    }

    // DELETE ALL existing documents in the collection
    await MarketPrice.deleteMany({});
    console.log("✅ All previous market prices deleted");

    // INSERT newly scraped data
    const inserted = await MarketPrice.insertMany(results);
    console.log(`✅ Inserted ${inserted.length} new market price records`);

    // Send response
    res.json({ message: "Scraped & saved today's market prices", data: inserted });

  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ error: "Error scraping market prices" });
  }
};
module.exports={scrap};
/*const rows = $("table tbody tr");

for (let i = 0; i < rows.length; i++) {
  const tds = $(rows[i]).find("td");
  const commod = $(tds[0]).text().trim();

  const commodity_te = await translate(commod, { to: 'te' })
                            .then(r => r.text)
                            .catch(() => commod);

  results.push({
    commodity: commodity_te,
    maxPrice: $(tds[2]).text().trim(),
    avgPrice: $(tds[3]).text().trim(),
    minPrice: $(tds[4]).text().trim(),
    date: today,
  });
}
const axios = require("axios");
const cheerio = require("cheerio");
const MarketPrice = require("../model/scrapmodel.js");
const translate = require('google-translate-api-x');

function formatDate(date = new Date()) {
  const day = String(date.getDate()).padStart(2, "0");
  const monthNames = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  const month = monthNames[date.getMonth()].toLowerCase();
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
}

const scrap = async (req, res) => {
  try {
    const today = formatDate(); 
    console.log("Scraping for:", today);
    const url = `https://www.napanta.com/market-price/andhra-pradesh/krishna/tiruvuru/${today}`;

    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const rows = $("table tbody tr");
    let results = [];

    for (let i = 0; i < rows.length; i++) {
      const tds = $(rows[i]).find("td");
      const commod = $(tds[0]).text().trim();
      if (!commod) continue;
     console.log(commod);
      const commodity_te = await translate(commod, { to: 'te' })
        .then(r => r.text)
        .catch(() => commod);

      results.push({
        commodity: commodity_te,
        maxPrice: $(tds[2]).text().trim(),
        avgPrice: $(tds[3]).text().trim(),
        minPrice: $(tds[4]).text().trim(),
        date: today,
      });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "No data found for today." });
    }

    // Check if today's records already exist
    const existing = await MarketPrice.findOne({ date: today });


    // Insert new data
    await MarketPrice.insertMany(results);
    console.log("Inserted new records for", today);

    res.status(200).json({ message: "Scraped and inserted successfully", count: results });

  } catch (error) {
    console.error("Scraping error:", error.message);
    res.status(500).json({ message: "Scraping failed", error: error.message });
  }
};

module.exports = { scrap };*/
