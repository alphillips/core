module.exports = function (app) {

  let countryOptions = [{ "label": "Afghanistan", "value": "AF" }, { "label": "Åland Islands", "value": "AX" }, { "label": "Albania", "value": "AL" }, { "label": "Algeria", "value": "DZ" }, { "label": "American Samoa", "value": "AS" }, { "label": "Andorra", "value": "AD" }, { "label": "Angola", "value": "AO" }, { "label": "Anguilla", "value": "AI" }, { "label": "Antarctica", "value": "AQ" },
  { "label": "Antigua and Barbuda", "value": "AG" }, { "label": "Argentina", "value": "AR" }, { "label": "Armenia", "value": "AM" }, { "label": "Aruba", "value": "AW" }, { "label": "Australia", "value": "AU" }, { "label": "Austria", "value": "AT" }, { "label": "Azerbaijan", "value": "AZ" }, { "label": "Bahamas", "value": "BS" }, { "label": "Bahrain", "value": "BH" }, { "label": "Bangladesh", "value": "BD" }, { "label": "Barbados", "value": "BB" }, { "label": "Belarus", "value": "BY" }, { "label": "Belgium", "value": "BE" }, { "label": "Belize", "value": "BZ" }, { "label": "Benin", "value": "BJ" }, { "label": "Bermuda", "value": "BM" },
  { "label": "Bhutan", "value": "BT" }, { "label": "Bolivia, Plurinational State of", "value": "BO" }, { "label": "Bonaire, Sint Eustatius and Saba", "value": "BQ" }, { "label": "Bosnia and Herzegovina", "value": "BA" }, { "label": "Botswana", "value": "BW" }, { "label": "Bouvet Island", "value": "BV" }, { "label": "Brazil", "value": "BR" }, { "label": "British Indian Ocean Territory", "value": "IO" }, { "label": "Brunei Darussalam", "value": "BN" }, { "label": "Bulgaria", "value": "BG" },
  { "label": "Burkina Faso", "value": "BF" }, { "label": "Burundi", "value": "BI" }, { "label": "Cambodia", "value": "KH" }, { "label": "Cameroon", "value": "CM" }, { "label": "Canada", "value": "CA" }, { "label": "Cape Verde", "value": "CV" }, { "label": "Cayman Islands", "value": "KY" }, { "label": "Central African Republic", "value": "CF" }, { "label": "Chad", "value": "TD" }, { "label": "Chile", "value": "CL" }, { "label": "China", "value": "CN" }, { "label": "Christmas Island", "value": "CX" },
  { "label": "Cocos (Keeling) Islands", "value": "CC" }, { "label": "Colombia", "value": "CO" }, { "label": "Comoros", "value": "KM" }, { "label": "Congo", "value": "CG" }, { "label": "Congo, the Democratic Republic of the", "value": "CD" }, { "label": "Cook Islands", "value": "CK" }, { "label": "Costa Rica", "value": "CR" }, { "label": "Côte d'Ivoire", "value": "CI" }, { "label": "Croatia", "value": "HR" }, { "label": "Cuba", "value": "CU" }, { "label": "Curaçao", "value": "CW" }, { "label": "Cyprus", "value": "CY" },
  { "label": "Czech Republic", "value": "CZ" }, { "label": "Denmark", "value": "DK" }, { "label": "Djibouti", "value": "DJ" }, { "label": "Dominica", "value": "DM" }, { "label": "Dominican Republic", "value": "DO" }, { "label": "Ecuador", "value": "EC" }, { "label": "Egypt", "value": "EG" }, { "label": "El Salvador", "value": "SV" }, { "label": "Equatorial Guinea", "value": "GQ" }, { "label": "Eritrea", "value": "ER" }, { "label": "Estonia", "value": "EE" }, { "label": "Ethiopia", "value": "ET" }, { "label": "Falkland Islands (Malvinas)", "value": "FK" },
  { "label": "Faroe Islands", "value": "FO" }, { "label": "Fiji", "value": "FJ" }, { "label": "Finland", "value": "FI" }, { "label": "France", "value": "FR" }, { "label": "French Guiana", "value": "GF" }, { "label": "French Polynesia", "value": "PF" },
  { "label": "French Southern Territories", "value": "TF" }, { "label": "Gabon", "value": "GA" }, { "label": "Gambia", "value": "GM" }, { "label": "Georgia", "value": "GE" }, { "label": "Germany", "value": "DE" }, { "label": "Ghana", "value": "GH" }, { "label": "Gibraltar", "value": "GI" }, { "label": "Greece", "value": "GR" }, { "label": "Greenland", "value": "GL" }, { "label": "Grenada", "value": "GD" }, { "label": "Guadeloupe", "value": "GP" }, { "label": "Guam", "value": "GU" }, { "label": "Guatemala", "value": "GT" }, { "label": "Guernsey", "value": "GG" },
  { "label": "Guinea", "value": "GN" }, { "label": "Guinea-Bissau", "value": "GW" }, { "label": "Guyana", "value": "GY" }, { "label": "Haiti", "value": "HT" }, { "label": "Heard Island and McDonald Islands", "value": "HM" }, { "label": "Holy See (Vatican City State)", "value": "VA" }, { "label": "Honduras", "value": "HN" }, { "label": "Hong Kong", "value": "HK" }, { "label": "Hungary", "value": "HU" }, { "label": "Iceland", "value": "IS" }, { "label": "India", "value": "IN" }, { "label": "Indonesia", "value": "ID" },
  { "label": "Iran, Islamic Republic of", "value": "IR" }, { "label": "Iraq", "value": "IQ" }, { "label": "Ireland", "value": "IE" }, { "label": "Isle of Man", "value": "IM" }, { "label": "Israel", "value": "IL" }, { "label": "Italy", "value": "IT" }, { "label": "Jamaica", "value": "JM" }, { "label": "Japan", "value": "JP" }, { "label": "Jersey", "value": "JE" }, { "label": "Jordan", "value": "JO" }, { "label": "Kazakhstan", "value": "KZ" }, { "label": "Kenya", "value": "KE" }, { "label": "Kiribati", "value": "KI" },
  { "label": "Korea, Democratic People's Republic of", "value": "KP" }, { "label": "Korea, Republic of", "value": "KR" }, { "label": "Kuwait", "value": "KW" }, { "label": "Kyrgyzstan", "value": "KG" },
  { "label": "Lao People's Democratic Republic", "value": "LA" }, { "label": "Latvia", "value": "LV" }, { "label": "Lebanon", "value": "LB" }, { "label": "Lesotho", "value": "LS" }, { "label": "Liberia", "value": "LR" }, { "label": "Libya", "value": "LY" }, { "label": "Liechtenstein", "value": "LI" }, { "label": "Lithuania", "value": "LT" }, { "label": "Luxembourg", "value": "LU" }, { "label": "Macao", "value": "MO" },
  { "label": "Macedonia, the Former Yugoslav Republic of", "value": "MK" }, { "label": "Madagascar", "value": "MG" }, { "label": "Malawi", "value": "MW" }, { "label": "Malaysia", "value": "MY" }, { "label": "Maldives", "value": "MV" }, { "label": "Mali", "value": "ML" }, { "label": "Malta", "value": "MT" }, { "label": "Marshall Islands", "value": "MH" }, { "label": "Martinique", "value": "MQ" }, { "label": "Mauritania", "value": "MR" }, { "label": "Mauritius", "value": "MU" }, { "label": "Mayotte", "value": "YT" }, { "label": "Mexico", "value": "MX" },
  { "label": "Micronesia, Federated States of", "value": "FM" }, { "label": "Moldova, Republic of", "value": "MD" }, { "label": "Monaco", "value": "MC" }, { "label": "Mongolia", "value": "MN" }, { "label": "Montenegro", "value": "ME" }, { "label": "Montserrat", "value": "MS" }, { "label": "Morocco", "value": "MA" }, { "label": "Mozambique", "value": "MZ" }, { "label": "Myanmar", "value": "MM" }, { "label": "Namibia", "value": "NA" }, { "label": "Nauru", "value": "NR" }, { "label": "Nepal", "value": "NP" },
  { "label": "Netherlands", "value": "NL" }, { "label": "New Caledonia", "value": "NC" }, { "label": "New Zealand", "value": "NZ" }, { "label": "Nicaragua", "value": "NI" }, { "label": "Niger", "value": "NE" }, { "label": "Nigeria", "value": "NG" }, { "label": "Niue", "value": "NU" }, { "label": "Norfolk Island", "value": "NF" }, { "label": "Northern Mariana Islands", "value": "MP" }, { "label": "Norway", "value": "NO" }, { "label": "Oman", "value": "OM" }, { "label": "Pakistan", "value": "PK" }, { "label": "Palau", "value": "PW" },
  { "label": "Palestine, State of", "value": "PS" }, { "label": "Panama", "value": "PA" }, { "label": "Papua New Guinea", "value": "PG" }, { "label": "Paraguay", "value": "PY" }, { "label": "Peru", "value": "PE" }, { "label": "Philippines", "value": "PH" }, { "label": "Pitcairn", "value": "PN" }, { "label": "Poland", "value": "PL" }, { "label": "Portugal", "value": "PT" }, { "label": "Puerto Rico", "value": "PR" }, { "label": "Qatar", "value": "QA" }, { "label": "Réunion", "value": "RE" }, { "label": "Romania", "value": "RO" },
  { "label": "Russian Federation", "value": "RU" }, { "label": "Rwanda", "value": "RW" }, { "label": "Saint Barthélemy", "value": "BL" }, { "label": "Saint Helena, Ascension and Tristan da Cunha", "value": "SH" }, { "label": "Saint Kitts and Nevis", "value": "KN" }, { "label": "Saint Lucia", "value": "LC" }, { "label": "Saint Martin (French part)", "value": "MF" }, { "label": "Saint Pierre and Miquelon", "value": "PM" }, { "label": "Saint Vincent and the Grenadines", "value": "VC" }, { "label": "Samoa", "value": "WS" },
  { "label": "San Marino", "value": "SM" }, { "label": "Sao Tome and Principe", "value": "ST" }, { "label": "Saudi Arabia", "value": "SA" }, { "label": "Senegal", "value": "SN" }, { "label": "Serbia", "value": "RS" }, { "label": "Seychelles", "value": "SC" }, { "label": "Sierra Leone", "value": "SL" }, { "label": "Singapore", "value": "SG" }, { "label": "Sint Maarten (Dutch part)", "value": "SX" }, { "label": "Slovakia", "value": "SK" }, { "label": "Slovenia", "value": "SI" }, { "label": "Solomon Islands", "value": "SB" },
  { "label": "Somalia", "value": "SO" }, { "label": "South Africa", "value": "ZA" }, { "label": "South Georgia and the South Sandwich Islands", "value": "GS" }, { "label": "South Sudan", "value": "SS" }, { "label": "Spain", "value": "ES" }, { "label": "Sri Lanka", "value": "LK" }, { "label": "Sudan", "value": "SD" }, { "label": "Surilabel", "value": "SR" }, { "label": "Svalbard and Jan Mayen", "value": "SJ" }, { "label": "Swaziland", "value": "SZ" }, { "label": "Sweden", "value": "SE" }, { "label": "Switzerland", "value": "CH" },
  { "label": "Syrian Arab Republic", "value": "SY" }, { "label": "Taiwan, Province of China", "value": "TW" }, { "label": "Tajikistan", "value": "TJ" }, { "label": "Tanzania, United Republic of", "value": "TZ" }, { "label": "Thailand", "value": "TH" }, { "label": "Timor-Leste", "value": "TL" }, { "label": "Togo", "value": "TG" }, { "label": "Tokelau", "value": "TK" }, { "label": "Tonga", "value": "TO" }, { "label": "Trinidad and Tobago", "value": "TT" }, { "label": "Tunisia", "value": "TN" }, { "label": "Turkey", "value": "TR" }, { "label": "Turkmenistan", "value": "TM" },
  { "label": "Turks and Caicos Islands", "value": "TC" }, { "label": "Tuvalu", "value": "TV" }, { "label": "Uganda", "value": "UG" }, { "label": "Ukraine", "value": "UA" }, { "label": "United Arab Emirates", "value": "AE" }, { "label": "United Kingdom", "value": "GB" }, { "label": "United States", "value": "US" }, { "label": "United States Minor Outlying Islands", "value": "UM" }, { "label": "Uruguay", "value": "UY" }, { "label": "Uzbekistan", "value": "UZ" }, { "label": "Vanuatu", "value": "VU" },
  { "label": "Venezuela, Bolivarian Republic of", "value": "VE" }, { "label": "Viet Nam", "value": "VN" }, { "label": "Virgin Islands, British", "value": "VG" }, { "label": "Virgin Islands, U.S.", "value": "VI" }, { "label": "Wallis and Futuna", "value": "WF" }, { "label": "Western Sahara", "value": "EH" }, { "label": "Yemen", "value": "YE" }, { "label": "Zambia", "value": "ZM" }, { "label": "Zimbabwe", "value": "ZW" }]

  let commodityOptions = [{ "value": "D", "label": "DAIRY" }, { "value": "E", "label": "EGGS" }]

  let productOptions = [
  { "label": "Biscuit - Rice Cracker", "value": "BJC" },

  { "label": "Biscuit - Table Cracker", "value": "BTC" },

  { "label": "Chocolate Coated Biscut", "value": "BCC" },

  { "label": "Chocolate Chip Biscuit", "value": "BCH" },

  { "label": "Butter Shortbread Biscuit", "value": "BSB" },

  { "label": "Vanilla Shortbread", "value": "VSB" },

  { "label": "Choc Orange Shortbread", "value": "COS" },

  { "label": "Almond Shortbread", "value": "ASB" },

  { "label": "Choc chip Shortbread", "value": "CSS" },

  { "label": "Water Cracker", "value": "WCB" },

  { "label": "Macadamia Shortbread Biscuit", "value": "MSB" },

  { "label": "Coffee Beans", "value": "CBS" },

  { "label": "Coffee Powder", "value": "CPD" },

  { "label": "Coffee Pods", "value": "CPS" },

  { "label": "Coffee Capsules", "value": "CCP" },

  { "label": "Coffee Liquid", "value": "CLQ" },

  { "label": "Mango Chicken Sauce", "value": "MCS" },

  { "label": "Pad Thai Stir Fry Sauce", "value": "PTS" },

  { "label": "Honey Mustard Sauce", "value": "HMS" },

  { "label": "Satay Chicken Sauce", "value": "SCS" },

  { "label": "Demi-Glace Beef Brown Sauce", "value": "DBS" },

  { "label": "Horseradish Sauce", "value": "HS" },

  { "label": "Hot Chilli Sauce", "value": "HCS" },

  { "label": "Dijon Mustard", "value": "DM" },

  { "label": "Worcestershire Sauce", "value": "WS" },

  { "label": "Butter Chicken Sauce", "value": "BCS" },

  { "label": "Pepperberry Sauce", "value": "PS" },

  { "label": "Marinade Teriyaki", "value": "MT" },

  { "label": "Barbeque (BBQ) Sauce", "value": "BBS" },

  { "label": "Thai Basil and Sweet Chilli Sauce", "value": "TBS" },

  { "label": "Honey Mustard Sauce", "value": "HMD" },

  { "label": "Korma Curry Sauce", "value": "KCS" },

  { "label": "Tikka Masala Sauce", "value": "TMS" },

  { "label": "Coconut Cashew Sauce", "value": "CCS" },

  { "label": "Orange Juice", "value": "OJ" },

  { "label": "Apple Juice", "value": "AJ" },

  { "label": "Apple Manago Banana Juice", "value": "AMB" },

  { "label": "Apple Blackcurrent Juice", "value": "ABJ" },

  { "label": "Canberry Juice", "value": "CJ" },

  { "label": "Diet Cranberry Juice", "value": "DCJ" },

  { "label": "Apple Manago Juice", "value": "AMJ" },

  { "label": "Mango Juice", "value": "MJ" },

  { "label": "Prune Juice", "value": "PJ" },

  { "label": "Prune plus Calcium and Folate Juice", "value": "PCF" },

  { "label": "Carrot, Orange and Apple Juice", "value": "COA" },

  { "label": "Pineapple Juice", "value": "PAJ" },

  { "label": "Pear, Pineapple, Orange and Passionfruit Juice", "value": "PPO" },

  { "label": "Lemon Myrtle Shortbread", "value": "LMS" }
  ]

  let packageTypeOptions = [

  { "value": "BG", "label": "BAGS" },
  { "value": "BI", "label": "BULK BINS" },
  { "value": "BL", "label": "BALES" },
  { "value": "BO", "label": "BOTTLES" },
  { "value": "BT", "label": "GREG BT PACKAGE TYPE" },
  { "value": "CA", "label": "CANS" },
  { "value": "CC", "label": "CCC" },
  { "value": "CD", "label": "SIDES" },
  { "value": "CK", "label": "CASKS" },
  { "value": "CN", "label": "CONTAINER" },
  { "value": "CQ", "label": "QUARTERS" },
  { "value": "CT", "label": "CARTONS" },
  { "value": "CW", "label": "CARCASES" },
  { "value": "DR", "label": "DRUMS" },
  { "value": "FL", "label": "FLASKS" },
  { "value": "MX MIXED SHIPMENT" },
  { "value": "PB", "label": "POLYSTYRENE BOXES" },
  { "value": "PF", "label": "PALLETS" },
  { "value": "PI", "label": "PIECES" },
  { "value": "PL", "label": "PAILS" },
  { "value": "PM", "label": "PLANTS" },
  { "value": "PS", "label": "PERSON" },
  { "value": "PT", "label": "PALLET" },
  { "value": "PU", "label": "TRAY PACK" },
  { "value": "PX", "label": "POYLSTRYENE BOXES" },
  { "value": "SP", "label": "SHATTER PACK" },
  { "value": "TK", "label": "TANK, RECTANGULAR" },
  { "value": "TP", "label": "TRAY PACKED" },
  { "value": "TY", "label": "TANK, CYLINDRICAL" },
  { "value": "VR", "label": "BULK" },
  { "value": "ZP", "label": "PEMS PACKAGE" }
]

  let weightUnitOptions = [
    { "value": "kg", "label": "kilogram" },
    { "value": "g", "label": "gram" },
    { "value": "mg", "label": "milligram" },
    { "value": "t", "label": "tonne" }
  ]

  let currencyOptions = [
    { "value": "AFN", "label": "Afghani (AFN)" },
    { "value": "ALL", "label": "Lek (ALL)" },
    { "value": "DZD", "label": "Algerian Dinar (DZD)" },
    { "value": "USD", "label": "US Dollar (USD)" },
    { "value": "EUR", "label": "Euro (EUR)" },
    { "value": "AUD", "label": "Australian Dollar (AUD)" },
    { "value": "JPY", "label": "Yen (JPY)" }
  ]

  let other = [
    { "value": "ABC", "label": "ABC" },
    { "value": "EFG", "label": "EFG" },
    { "value": "HIJ", "label": "HIJ" },
    { "value": "KLM", "label": "KLM" }
  ]

  let port = [
    { "value": "sy", "label": "Sydney" },
    { "value": "bb", "label": "Botany Bay" },
    { "value": "ch", "label": "Coffs Harbour" },
    { "value": "lh", "label": "Lord Howe Island" },
    { "value": "nc", "label": "Newcastle" },
    { "value": "pk", "label": "Port Kembla" },
    { "value": "jb", "label": "Jervis Bay" },
    { "value": "dn", "label": "Darwin" }
  ]


  let portjp = [
  { "value": "JPAAM", "label": "Ama, Shimane" },
  { "value": "JPABA", "label": "Abashiri" },
  { "value": "JPABO", "label": "Aboshi/Himeji" },
  { "value": "JPABS", "label": "Abohshita" },
  { "value": "JPABT", "label": "Abuto" },
  { "value": "JPABU", "label": "Aburatsu" },
  { "value": "JPACH", "label": "Ajisu" },
  { "value": "JPADE", "label": "Ade" },
  { "value": "JPADO", "label": "Ado" },
  { "value": "JPAGJ", "label": "Aguni" },
  { "value": "JPAGN", "label": "Agenosho" },
  { "value": "JPAGR", "label": "Agonoura" },
  { "value": "JPAGS", "label": "Ageshima" },
  { "value": "JPAIA", "label": "Ainouraaoki/Naru" },
  { "value": "JPAII", "label": "Aio" },
  { "value": "JPAIK", "label": "Aikawa, Niigata" },
  { "value": "JPAIM", "label": "Aishima" },
  { "value": "JPAIN", "label": "Ainoura/Sasebo" },
  { "value": "JPAIO", "label": "Aioi" },
  { "value": "JPAIW", "label": "Aikawa, Nagasaki" },
  { "value": "JPAIZ", "label": "Aizu, Kumamoto" },
  { "value": "JPAJI", "label": "Aji" },
  { "value": "JPAJK", "label": "Ajigasawa" },
  { "value": "JPAJN", "label": "Ajino" },
  { "value": "JPAJO", "label": "Anjo" },
  { "value": "JPAJR", "label": "Ajiro, Shizuoka" },
  { "value": "JPAJX", "label": "Aja" },
  { "value": "JPAKA", "label": "Akashi" },
  { "value": "JPAKB", "label": "Akohbaru" },
  { "value": "JPAKD", "label": "Akadomari" },
  { "value": "JPAKE", "label": "Akkeshi" },
  { "value": "JPAKG", "label": "Akakina" },
  { "value": "JPAKH", "label": "Akehama" },
  { "value": "JPAKI", "label": "Aikakita" },
  { "value": "JPAKJ", "label": "Asahikawa" },
  { "value": "JPAKK", "label": "Akasaki, Kumamoto" },
  { "value": "JPAKM", "label": "Akamizu" },
  { "value": "JPAKN", "label": "Akune" },
  { "value": "JPAKO", "label": "Akoh" },
  { "value": "JPAKT", "label": "Akitsu" },
  { "value": "JPAKW", "label": "Azako" },
  { "value": "JPAKZ", "label": "Aika" },
  { "value": "JPAMA", "label": "Amagasaki" },
  { "value": "JPAMG", "label": "Asamogawa" },
  { "value": "JPAMI", "label": "Atami" },
  { "value": "JPAMJ", "label": "Amaji" },
  { "value": "JPAMM", "label": "Ama, Hyogo" },
  { "value": "JPAMR", "label": "Arimura" },
  { "value": "JPAMS", "label": "Amasaki" },
  { "value": "JPAMT", "label": "Amatsuke" },
  { "value": "JPAMU", "label": "Amura" },
  { "value": "JPAMX", "label": "AmagasakiNishinomiyaAshiya" },
  { "value": "JPAMY", "label": "Amiya" },
  { "value": "JPANA", "label": "Anan" },
  { "value": "JPANB", "label": "Anbo" },
  { "value": "JPANE", "label": "Anegasaki" },
  { "value": "JPANM", "label": "Anamizu" },
  { "value": "JPAOE", "label": "Aoe" },
  { "value": "JPAOG", "label": "Aogashima" },
  { "value": "JPAOI", "label": "Aoki" },
  { "value": "JPAOJ", "label": "Aomori" },
  { "value": "JPAOK", "label": "Aokata" },
  { "value": "JPAOM", "label": "Omi" },
  { "value": "JPAON", "label": "Aonae" },
  { "value": "JPAOS", "label": "Aoshima" },
  { "value": "JPARA", "label": "Arari" },
  { "value": "JPARG", "label": "Amurogama" },
  { "value": "JPARK", "label": "Arikawa" },
  { "value": "JPARO", "label": "Arao" },
  { "value": "JPARZ", "label": "Arouzu" },
  { "value": "JPASA", "label": "Asa" },
  { "value": "JPASB", "label": "Ashibe" },
  { "value": "JPASH", "label": "Ashinoura" },
  { "value": "JPASI", "label": "Asahimachi" },
  { "value": "JPASJ", "label": "Amamioshima" },
  { "value": "JPASK", "label": "Akasaki, Tottori" },
  { "value": "JPASM", "label": "Asami" },
  { "value": "JPASR", "label": "Ashizuri" },
  { "value": "JPAST", "label": "Ashitoku" },
  { "value": "JPASW", "label": "Asakawa" },
  { "value": "JPASZ", "label": "Ashiya, Fukuoka" },
  { "value": "JPATA", "label": "Ataka" },
  { "value": "JPATK", "label": "Atsuki" },
  { "value": "JPATM", "label": "Atsumi" },
  { "value": "JPATT", "label": "Atatajima" },
  { "value": "JPAWA", "label": "Awa" },
  { "value": "JPAWM", "label": "Awashimanishi" },
  { "value": "JPAWS", "label": "Awashima" },
  { "value": "JPAWZ", "label": "Awazu" },
  { "value": "JPAXT", "label": "Akita" },
  { "value": "JPAYS", "label": "Ayase-Shi" },
  { "value": "JPAYU", "label": "Ayukawa" },
  { "value": "JPAZJ", "label": "Ajiro, Tottori" },
  { "value": "JPAZR", "label": "Ajiro, Okayama" },
  { "value": "JPAZU", "label": "Azu" },
  { "value": "JPBDM", "label": "Bohdomari" },
  { "value": "JPBEP", "label": "Beppu, Shimane" },
  { "value": "JPBFS", "label": "Beppushinko" },
  { "value": "JPBOM", "label": "Boma" },
  { "value": "JPBPU", "label": "Beppu, Oita" },
  { "value": "JPBYO", "label": "Byobu" },
  { "value": "JPCAU", "label": "Chiyoda-ku" },
  { "value": "JPCHB", "label": "Chiba" }
  ]






  let refData = {
    country: countryOptions,
    commodity: commodityOptions,
    product: productOptions,
    /*weightUnit: weightUnitOptions,*/
    packageType: packageTypeOptions,
    productCategoryCode:productOptions,
    supplementaryCode:other,
    preservation:other,
    unitOfMeasurement:weightUnitOptions,
    treatment:other,
    ahecc:other,
    currency: currencyOptions,
    port:port,
    portjp:portjp
  }

  app.get('/refdata/:type/:value', function (req, res) {
    let { type, value } = req.params;
    res.json(refData[type].find(option => option.value === value).label);
  })

  app.get('/refdata/:value', function (req, res) {
    let { value } = req.params;
    res.json(refData[value]);
  })

};
