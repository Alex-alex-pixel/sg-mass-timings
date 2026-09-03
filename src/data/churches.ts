// All 32 parishes of the Archdiocese of Singapore.
// area = deanery grouping (City / East / North / Serangoon / West) per Archdiocese conventions.
// times/confession are populated only where sourced directly from an official parish schedule.

export interface Church {
  name: string;
  address: string;
  area: string;
  website: string;
  times: string[];
  confession: string[];
}

export const churches: Church[] = [
  { name: "Church of the Holy Cross", address: "450 Clementi Avenue 1", area: "West", website: "", times: [], confession: [] },
  { name: "Church of St Mary of the Angels", address: "5 Bukit Batok East Avenue 2", area: "West", website: "stmary.sg", times: [], confession: [] },
  { name: "Church of St Ignatius", address: "120 King's Road", area: "West", website: "", times: [], confession: [] },
  { name: "Church of St Francis of Assisi", address: "200 Boon Lay Avenue", area: "West", website: "", times: [], confession: [] },
  { name: "Church of the Blessed Sacrament", address: "1 Commonwealth Drive", area: "West", website: "", times: [], confession: [] },
  { name: "Church of St Joseph (Bukit Timah)", address: "620 Upper Bukit Timah Road", area: "West", website: "", times: [], confession: [] },
  { name: "Church of the Holy Trinity", address: "20 Tampines Street 11", area: "East", website: "", times: [], confession: [] },
  {
    name: "Church of the Holy Family",
    address: "6 Chapel Road",
    area: "East",
    website: "holyfamily.org.sg",
    times: [
      "Saturday: 5:30pm, 7:30pm (Mandarin)",
      "Sunday: 7:30am, 9:30am, 11:30am, 5:30pm",
      "Weekdays (Mon–Fri): 6:30am, 6:30pm",
      "Saturday (daily): 6:30am",
    ],
    confession: ["30 minutes before each weekend Mass"],
  },
  { name: "Church of Divine Mercy", address: "19 Pasir Ris Street 72", area: "East", website: "", times: [], confession: [] },
  { name: "Church of St Stephen", address: "30 Sallim Road", area: "East", website: "", times: [], confession: [] },
  { name: "Church of Our Lady Queen of Peace", address: "4 Sandy Lane", area: "East", website: "", times: [], confession: [] },
  { name: "Church of Our Lady of Perpetual Succour", address: "31 Siglap Hill", area: "East", website: "", times: [], confession: [] },
  { name: "Church of the Risen Christ", address: "91 Toa Payoh Central", area: "North", website: "", times: [], confession: [] },
  { name: "Church of the Holy Spirit", address: "248 Upper Thomson Road", area: "North", website: "", times: [], confession: [] },
  {
    name: "Church of St Anthony",
    address: "25 Woodlands Avenue 1",
    area: "North",
    website: "saint-anthony.org",
    times: [
      "Weekdays (Mon–Fri): 6:30pm (7:30am on public holidays, no evening Mass)",
      "Saturday sunset: 5:30pm",
      "Sunday: 9:15am, 11:15am, 5:30pm; Mandarin 7:30am (1st & 2nd Sundays)",
    ],
    confession: [],
  },
  { name: "Cathedral of the Good Shepherd", address: "A Queen Street, Singapore 188533", area: "City", website: "cathedral.catholic.sg", times: [], confession: [] },
  { name: "Church of Christ the King", address: "2221 Ang Mo Kio Avenue 8, Singapore 569809", area: "North", website: "", times: [], confession: [] },
  { name: "Church of the Immaculate Heart of Mary", address: "24 Highland Road, Singapore 549115", area: "Serangoon", website: "ihm.sg", times: [], confession: [] },
  { name: "Church of the Nativity of the Blessed Virgin Mary", address: "1259 Upper Serangoon Road, Singapore 534795", area: "Serangoon", website: "", times: [], confession: [] },
  { name: "Church of Our Lady of Lourdes", address: "50 Ophir Road, Singapore 188690", area: "City", website: "lourdes.sg", times: [], confession: [] },
  { name: "Church of Our Lady Star of the Sea", address: "10 Yishun Street 22, Singapore 768579", area: "North", website: "olss.sg", times: [], confession: [] },
  { name: "Church of the Sacred Heart", address: "111 Tank Road, Singapore 238069", area: "City", website: "churchofthesacredheart.sg", times: [], confession: [] },
  { name: "Church of St Alphonsus (Novena Church)", address: "300 Thomson Road, Singapore 307653", area: "City", website: "novenachurch.com", times: [], confession: [] },
  {
    name: "Church of St Anne",
    address: "66 Sengkang East Way, Singapore 548593",
    area: "Serangoon",
    website: "stanne.catholic.sg",
    times: ["Saturday sunset: 4:30pm", "Sunday: 7:30am, 9:30am, 11:30am, 4:30pm"],
    confession: ["20 minutes before English weekend Masses"],
  },
  { name: "Church of St Bernadette", address: "12 Zion Road, Singapore 247731", area: "City", website: "stbernadette.org.sg", times: [], confession: [] },
  { name: "Church of St Francis Xavier", address: "63A Chartwell Drive, Singapore 558758", area: "Serangoon", website: "sfxchurch.sg", times: [], confession: [] },
  { name: "Church of St Joseph (Victoria Street)", address: "143 Victoria Street, Singapore 188020", area: "City", website: "", times: [], confession: [] },
  { name: "Church of St Michael", address: "17 St Michael's Road, Singapore 327976", area: "City", website: "stmichael.catholic.sg", times: [], confession: [] },
  { name: "Church of Sts Peter and Paul", address: "225A Queen Street, Singapore 188551", area: "City", website: "sppchurch.org.sg", times: [], confession: [] },
  { name: "Church of St Teresa", address: "510 Kampong Bahru Road, Singapore 099446", area: "City", website: "stteresa.org.sg", times: [], confession: [] },
  { name: "Church of St Vincent de Paul", address: "", area: "", website: "", times: [], confession: [] },
  { name: "Church of the Transfiguration", address: "51 Punggol Central, Singapore 828725", area: "Serangoon", website: "transfiguration.sg", times: [], confession: [] },
];

export const isComplete = (c: Church) => !!c.address;
export const hasTimes = (c: Church) => c.times.length > 0;

export const areas = [
  "All",
  ...Array.from(new Set(churches.filter(isComplete).map((c) => c.area))).sort(),
  "Needs info",
];

export const CONTACT_EMAIL = "hello@example.com";

export function editMailto(church: Church): string {
  const subject = encodeURIComponent(`Mass Times SG — update for ${church.name}`);
  const body = encodeURIComponent(
    `Parish: ${church.name}\n\nAddress: \nWebsite: \nSunday Mass times: \nSaturday Vigil: \nWeekday Mass: \nConfession times: \n\nSubmitted via Mass Times SG`
  );
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}
