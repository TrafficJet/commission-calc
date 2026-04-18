export interface CityData {
  city: string;
  state: string;
  stateSlug: string;
  slug: string;
  medianPrice: number;
  avgCommission: number;
}

const raw: [string, string, number, number][] = [
  ["New York","NY",850000,4.8],["Los Angeles","CA",950000,4.5],["Chicago","IL",310000,5.0],
  ["Houston","TX",295000,5.5],["Phoenix","AZ",415000,5.2],["Philadelphia","PA",280000,5.0],
  ["San Antonio","TX",275000,5.5],["San Diego","CA",850000,4.5],["Dallas","TX",370000,5.3],
  ["San Jose","CA",1200000,4.2],["Austin","TX",510000,5.0],["Jacksonville","FL",320000,5.5],
  ["Fort Worth","TX",340000,5.3],["Columbus","OH",270000,5.2],["Charlotte","NC",380000,5.2],
  ["Indianapolis","IN",260000,5.5],["San Francisco","CA",1300000,4.2],["Seattle","WA",780000,4.5],
  ["Denver","CO",560000,4.8],["Nashville","TN",470000,5.0],["Oklahoma City","OK",220000,5.5],
  ["El Paso","TX",210000,5.5],["Las Vegas","NV",420000,5.0],["Louisville","KY",235000,5.5],
  ["Memphis","TN",195000,5.5],["Portland","OR",520000,4.8],["Baltimore","MD",340000,5.0],
  ["Milwaukee","WI",245000,5.2],["Albuquerque","NM",285000,5.5],["Tucson","AZ",310000,5.2],
  ["Fresno","CA",390000,4.8],["Sacramento","CA",530000,4.8],["Mesa","AZ",410000,5.2],
  ["Kansas City","MO",275000,5.3],["Atlanta","GA",400000,5.0],["Omaha","NE",265000,5.3],
  ["Colorado Springs","CO",450000,5.0],["Raleigh","NC",420000,5.0],["Long Beach","CA",820000,4.5],
  ["Virginia Beach","VA",320000,5.0],["Minneapolis","MN",360000,5.0],["Tampa","FL",385000,5.2],
  ["New Orleans","LA",270000,5.5],["Arlington","TX",330000,5.3],["Bakersfield","CA",380000,4.8],
  ["Honolulu","HI",800000,4.5],["Anaheim","CA",870000,4.5],["Aurora","CO",500000,4.8],
  ["Santa Ana","CA",780000,4.5],["Corpus Christi","TX",230000,5.5],["Riverside","CA",530000,4.8],
  ["Lexington","KY",255000,5.5],["St. Louis","MO",220000,5.3],["Pittsburgh","PA",215000,5.2],
  ["Stockton","CA",420000,4.8],["Anchorage","AK",390000,5.0],["Cincinnati","OH",255000,5.2],
  ["St. Paul","MN",310000,5.0],["Greensboro","NC",280000,5.2],["Toledo","OH",175000,5.5],
  ["Newark","NJ",440000,4.8],["Plano","TX",440000,5.3],["Henderson","NV",450000,5.0],
  ["Orlando","FL",380000,5.2],["Chandler","AZ",480000,5.2],["Laredo","TX",190000,5.5],
  ["Madison","WI",365000,5.0],["Durham","NC",390000,5.0],["Lubbock","TX",215000,5.5],
  ["Winston-Salem","NC",265000,5.2],["Garland","TX",335000,5.3],["Glendale","AZ",395000,5.2],
  ["Hialeah","FL",420000,5.2],["Reno","NV",530000,5.0],["Baton Rouge","LA",235000,5.5],
  ["Irvine","CA",1050000,4.2],["Chesapeake","VA",335000,5.0],["Irving","TX",330000,5.3],
  ["Scottsdale","AZ",670000,4.8],["North Las Vegas","NV",380000,5.0],["Fremont","CA",1100000,4.2],
  ["Gilbert","AZ",490000,5.2],["San Bernardino","CA",430000,4.8],["Birmingham","AL",220000,5.5],
  ["Rochester","NY",195000,5.2],["Spokane","WA",380000,4.8],["Des Moines","IA",265000,5.3],
  ["Montgomery","AL",195000,5.5],["Modesto","CA",380000,4.8],["Fayetteville","NC",210000,5.5],
  ["Tacoma","WA",480000,4.8],["Fontana","CA",510000,4.8],["Columbus","GA",185000,5.5],
  ["Moreno Valley","CA",495000,4.8],["Akron","OH",175000,5.2],["Yonkers","NY",490000,4.8],
  ["Glendale","CA",860000,4.5],["Augusta","GA",205000,5.5],["Little Rock","AR",215000,5.5],
  ["Huntington Beach","CA",1050000,4.2],["Mobile","AL",200000,5.5],["Fort Wayne","IN",230000,5.5],
  ["Grand Rapids","MI",290000,5.2],["Salt Lake City","UT",520000,4.8],["Tallahassee","FL",295000,5.2],
  ["Huntsville","AL",285000,5.5],["Worcester","MA",430000,4.8],["Knoxville","TN",310000,5.0],
  ["Providence","RI",410000,4.8],["Oxnard","CA",710000,4.5],["Brownsville","TX",185000,5.5],
  ["Newport News","VA",290000,5.0],["Santa Clarita","CA",750000,4.5],["Garden Grove","CA",840000,4.5],
  ["Oceanside","CA",810000,4.5],["Fort Lauderdale","FL",480000,5.0],["Rancho Cucamonga","CA",650000,4.8],
  ["Santa Rosa","CA",720000,4.5],["Ontario","CA",560000,4.8],["Vancouver","WA",450000,4.8],
  ["Cape Coral","FL",390000,5.2],["Sioux Falls","SD",310000,5.3],["Tempe","AZ",420000,5.2],
  ["Jackson","MS",165000,5.5],["Overland Park","KS",390000,5.3],["Elk Grove","CA",560000,4.8],
  ["Peoria","IL",175000,5.3],["Pembroke Pines","FL",470000,5.2],["Eugene","OR",460000,4.8],
  ["Salinas","CA",680000,4.5],["Cary","NC",480000,5.0],["Corona","CA",630000,4.8],
  ["Springfield","MO",225000,5.5],["Fort Collins","CO",530000,4.8],["Alexandria","VA",640000,4.8],
  ["Hayward","CA",870000,4.2],["Palmdale","CA",490000,4.8],["Sunnyvale","CA",1450000,4.0],
  ["Pomona","CA",590000,4.8],["Escondido","CA",740000,4.5],["Kansas City","KS",245000,5.3],
  ["Rockford","IL",165000,5.3],["Torrance","CA",870000,4.5],["Paterson","NJ",390000,4.8],
  ["Bridgeport","CT",340000,4.8],["McAllen","TX",195000,5.5],["Mesquite","TX",310000,5.3],
  ["Savannah","GA",315000,5.2],["Syracuse","NY",180000,5.2],["Surprise","AZ",385000,5.2],
  ["Denton","TX",380000,5.3],["Roseville","CA",620000,4.8],["Pasadena","TX",245000,5.5],
  ["Macon","GA",185000,5.5],["Clarksville","TN",280000,5.0],["Killeen","TX",235000,5.5],
  ["Dayton","OH",185000,5.2],["Orange","CA",860000,4.5],["Fullerton","CA",840000,4.5],
  ["Murfreesboro","TN",400000,5.0],["Lancaster","CA",420000,4.8],["Shreveport","LA",195000,5.5],
  ["Hampton","VA",270000,5.0],["Pasadena","CA",1020000,4.2],["Visalia","CA",360000,4.8],
  ["Warren","MI",215000,5.2],["West Valley City","UT",410000,4.8],["Columbia","SC",265000,5.2],
  ["Sterling Heights","MI",265000,5.2],["New Haven","CT",330000,4.8],["Olathe","KS",395000,5.3],
  ["Miramar","FL",480000,5.0],["Gainesville","FL",275000,5.2],["Thousand Oaks","CA",890000,4.5],
  ["Waco","TX",245000,5.5],["Cedar Rapids","IA",225000,5.3],["Carrollton","TX",380000,5.3],
  ["Charleston","SC",450000,5.0],["Coral Springs","FL",490000,5.0],["Stamford","CT",540000,4.5],
  ["Hartford","CT",275000,4.8],["Concord","CA",650000,4.5],["Elizabeth","NJ",420000,4.8],
  ["Bellevue","WA",1050000,4.2],["Topeka","KS",185000,5.5],["Simi Valley","CA",780000,4.5],
  ["Columbia","MO",245000,5.3],["Victorville","CA",380000,4.8],["Abilene","TX",195000,5.5],
  ["Athens","GA",285000,5.2],["Vallejo","CA",490000,4.8],["Berkeley","CA",1200000,4.0],
  ["Ann Arbor","MI",430000,5.0],["Beaumont","TX",200000,5.5],["Inglewood","CA",710000,4.5],
  ["Allentown","PA",255000,5.0],["Peoria","AZ",420000,5.2],["Springfield","MA",265000,4.8],
  ["Provo","UT",490000,4.8],["El Monte","CA",680000,4.5],["West Jordan","UT",430000,4.8],
  ["Chattanooga","TN",310000,5.0],["Fort Myers","FL",380000,5.2],["Boise","ID",450000,4.8],
  ["Spokane Valley","WA",360000,4.8],["Frisco","TX",540000,5.0],["McKinney","TX",480000,5.0],
  ["Glendale","WI",245000,5.2],["Richmond","VA",370000,5.0],["Amarillo","TX",210000,5.5],
  ["Roanoke","VA",265000,5.0],["Durham","NC",390000,5.0],["Tempe","AZ",420000,5.2],
];

function toSlug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
}

const STATE_NAMES: Record<string,string> = {
  AL:"Alabama",AK:"Alaska",AZ:"Arizona",AR:"Arkansas",CA:"California",CO:"Colorado",
  CT:"Connecticut",FL:"Florida",GA:"Georgia",HI:"Hawaii",ID:"Idaho",IL:"Illinois",
  IN:"Indiana",IA:"Iowa",KS:"Kansas",KY:"Kentucky",LA:"Louisiana",MD:"Maryland",
  MA:"Massachusetts",MI:"Michigan",MN:"Minnesota",MS:"Mississippi",MO:"Missouri",
  NE:"Nebraska",NV:"Nevada",NJ:"New Jersey",NM:"New Mexico",NY:"New York",
  NC:"North Carolina",OH:"Ohio",OK:"Oklahoma",OR:"Oregon",PA:"Pennsylvania",
  RI:"Rhode Island",SC:"South Carolina",SD:"South Dakota",TN:"Tennessee",TX:"Texas",
  UT:"Utah",VA:"Virginia",WA:"Washington",WI:"Wisconsin",
};

export const cities: CityData[] = raw.map(([city, state, medianPrice, avgCommission]) => ({
  city,
  state,
  stateSlug: toSlug(STATE_NAMES[state] || state),
  slug: `${toSlug(city)}-${state.toLowerCase()}`,
  medianPrice,
  avgCommission,
}));

export function getStateName(abbr: string): string {
  return STATE_NAMES[abbr] || abbr;
}
