"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  MapPin,
  Phone,
  Clock,
  Search,
  Building2,
  Calendar,
  Info,
  ExternalLink,
  CheckSquare,
  Square,
  XCircle,
  Printer,
} from "lucide-react"
import { WhyTrustCalculator } from "@/components/ui/WhyTrustCalculator"

interface Office {
  city: string
  state: string
  address: string
  localPhone: string
  tollFree: string
  hours: string
  zipCodes: string[]
}

const officesData: Office[] = [
  // --- ALABAMA (AL) ---
  {
    city: "Birmingham",
    state: "AL",
    address: "1200 Rev Abraham Woods Jr Blvd, Birmingham, AL 35285",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["35203", "35204", "35205", "35285"],
  },
  {
    city: "Montgomery",
    state: "AL",
    address: "4344 Carmichael Rd, Montgomery, AL 36106",
    localPhone: "(866) 593-0914",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["36104", "36106", "36117"],
  },

  // --- ALASKA (AK) ---
  {
    city: "Anchorage",
    state: "AK",
    address: "222 W 8th Ave Rm A11, Anchorage, AK 99513",
    localPhone: "(866) 772-3081",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["99501", "99502", "99513"],
  },

  // --- ARIZONA (AZ) ---
  {
    city: "Phoenix",
    state: "AZ",
    address: "250 N Seventh Ave, Phoenix, AZ 85007",
    localPhone: "(866) 964-4851",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["85003", "85004", "85007", "85012"],
  },
  {
    city: "Tucson",
    state: "AZ",
    address: "3808 N First Ave, Tucson, AZ 85719",
    localPhone: "(866) 338-4101",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["85701", "85719", "85705"],
  },

  // --- ARKANSAS (AR) ---
  {
    city: "Little Rock",
    state: "AR",
    address: "700 W Capitol Ave Rm 1201, Little Rock, AR 72201",
    localPhone: "(866) 593-0933",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["72201", "72202", "72204"],
  },

  // --- CALIFORNIA (CA) ---
  {
    city: "Los Angeles",
    state: "CA",
    address: "12440 Imperial Hwy Suite 100, Norwalk, CA 90650",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["90001", "90002", "90003", "90250", "90011", "90012", "90015", "90650"],
  },
  {
    city: "San Francisco",
    state: "CA",
    address: "1098 Valencia St, San Francisco, CA 94110",
    localPhone: "(888) 397-9803",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["94102", "94103", "94110", "94112", "94115"],
  },
  {
    city: "San Diego",
    state: "CA",
    address: "1333 Front St, San Diego, CA 92101",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["92101", "92102", "92103", "92104", "92112"],
  },
  {
    city: "San Jose",
    state: "CA",
    address: "280 S First St, San Jose, CA 95113",
    localPhone: "(866) 331-2219",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["95110", "95112", "95113", "95125"],
  },
  {
    city: "Sacramento",
    state: "CA",
    address: "8581 Folsom Blvd, Sacramento, CA 95826",
    localPhone: "(866) 931-2544",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["95814", "95816", "95825", "95826"],
  },

  // --- COLORADO (CO) ---
  {
    city: "Denver",
    state: "CO",
    address: "1500 Champa St Suite 200, Denver, CO 80202",
    localPhone: "(866) 613-2852",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["80202", "80203", "80204", "80205"],
  },

  // --- CONNECTICUT (CT) ---
  {
    city: "Hartford",
    state: "CT",
    address: "960 Main St 2nd Fl, Hartford, CT 06103",
    localPhone: "(866) 931-9101",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["06103", "06105", "06106"],
  },

  // --- DELAWARE (DE) ---
  {
    city: "Wilmington",
    state: "DE",
    address: "920 W 4th St Suite 100, Wilmington, DE 19801",
    localPhone: "(866) 964-6178",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["19801", "19802", "19805"],
  },

  // --- DISTRICT OF COLUMBIA (DC) ---
  {
    city: "Washington",
    state: "DC",
    address: "2100 M St NW, Washington, DC 20037",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["20001", "20002", "20037", "20005"],
  },

  // --- FLORIDA (FL) ---
  {
    city: "Miami",
    state: "FL",
    address: "8345 NW 12th St, Miami, FL 33126",
    localPhone: "(866) 331-5473",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["33101", "33125", "33126", "33130", "33139"],
  },
  {
    city: "Orlando",
    state: "FL",
    address: "5520 Gatlin Ave, Orlando, FL 32812",
    localPhone: "(866) 964-6141",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["32801", "32802", "32812", "32822", "32839"],
  },
  {
    city: "Tampa",
    state: "FL",
    address: "4010 Boy Scout Blvd Suite 100, Tampa, FL 33607",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["33601", "33602", "33606", "33607"],
  },
  {
    city: "Jacksonville",
    state: "FL",
    address: "1685 Leticia Ln, Jacksonville, FL 32211",
    localPhone: "(866) 331-2315",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["32201", "32202", "32211", "32225"],
  },

  // --- GEORGIA (GA) ---
  {
    city: "Atlanta",
    state: "GA",
    address: "401 W Peachtree St NW Suite 2860, Atlanta, GA 30308",
    localPhone: "(866) 593-4336",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["30303", "30308", "30309", "30313"],
  },
  {
    city: "Savannah",
    state: "GA",
    address: "120 Park Ave, Savannah, GA 31401",
    localPhone: "(866) 331-2253",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["31401", "31404", "31405"],
  },

  // --- HAWAII (HI) ---
  {
    city: "Honolulu",
    state: "HI",
    address: "300 Ala Moana Blvd Rm 1-114, Honolulu, HI 96850",
    localPhone: "(855) 572-4879",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["96813", "96850", "96815"],
  },

  // --- IDAHO (ID) ---
  {
    city: "Boise",
    state: "ID",
    address: "1249 S Vinnell Way Suite 101, Boise, ID 83709",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["83702", "83709", "83704"],
  },

  // --- ILLINOIS (IL) ---
  {
    city: "Chicago (Downtown)",
    state: "IL",
    address: "79 W Monroe St, Chicago, IL 60603",
    localPhone: "(866) 964-1721",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["60601", "60602", "60603", "60604", "60611"],
  },
  {
    city: "Aurora",
    state: "IL",
    address: "1325 N Lake St, Aurora, IL 60506",
    localPhone: "(877) 600-2856",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["60505", "60506", "60502"],
  },

  // --- INDIANA (IN) ---
  {
    city: "Indianapolis",
    state: "IN",
    address: "575 N Pennsylvania St Rm 685, Indianapolis, IN 46204",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["46204", "46202", "46208"],
  },

  // --- IOWA (IA) ---
  {
    city: "Des Moines",
    state: "IA",
    address: "210 Walnut St Rm 293, Des Moines, IA 50309",
    localPhone: "(866) 964-7416",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["50309", "50312", "50316"],
  },

  // --- KANSAS (KS) ---
  {
    city: "Wichita",
    state: "KS",
    address: "3216 N Cypress St, Wichita, KS 67226",
    localPhone: "(866) 931-9173",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["67202", "67226", "67208"],
  },

  // --- KENTUCKY (KY) ---
  {
    city: "Louisville",
    state: "KY",
    address: "601 W Broadway Rm 101, Louisville, KY 40202",
    localPhone: "(866) 755-0154",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["40202", "40203", "40208"],
  },

  // --- LOUISIANA (LA) ---
  {
    city: "New Orleans",
    state: "LA",
    address: "400 Poydras St Suite 500, New Orleans, LA 70130",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["70112", "70130", "70119"],
  },

  // --- MAINE (ME) ---
  {
    city: "Portland",
    state: "ME",
    address: "1355 Congress St, Portland, ME 04102",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["04101", "04102", "04103"],
  },

  // --- MARYLAND (MD) ---
  {
    city: "Baltimore",
    state: "MD",
    address: "1010 Park Ave, Baltimore, MD 21201",
    localPhone: "(866) 593-1473",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["21201", "21202", "21211"],
  },

  // --- MASSACHUSETTS (MA) ---
  {
    city: "Boston",
    state: "MA",
    address: "10 Causeway St Rm 148, Boston, MA 02222",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["02222", "02114", "02108"],
  },

  // --- MICHIGAN (MI) ---
  {
    city: "Detroit",
    state: "MI",
    address: "477 Michigan Ave Suite 1170, Detroit, MI 48226",
    localPhone: "(866) 563-3893",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["48226", "48201", "48202"],
  },
  {
    city: "Grand Rapids",
    state: "MI",
    address: "3100 East Beltline Ave NE, Grand Rapids, MI 49525",
    localPhone: "(877) 405-7667",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["49503", "49505", "49525"],
  },

  // --- MINNESOTA (MN) ---
  {
    city: "Minneapolis",
    state: "MN",
    address: "1811 Chicago Ave suite 2, Minneapolis, MN 55404",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["55404", "55401", "55415"],
  },

  // --- MISSISSIPPI (MS) ---
  {
    city: "Jackson",
    state: "MS",
    address: "100 W Capitol St Rm 225, Jackson, MS 39201",
    localPhone: "(866) 331-8191",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["39201", "39202", "39203"],
  },

  // --- MISSOURI (MO) ---
  {
    city: "Kansas City",
    state: "MO",
    address: "8500 Blue Pkwy, Kansas City, MO 64133",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["64106", "64133", "64111"],
  },
  {
    city: "St. Louis",
    state: "MO",
    address: "717 N 16th St, St. Louis, MO 63103",
    localPhone: "(866) 964-2631",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["63103", "63101", "63104"],
  },

  // --- MONTANA (MT) ---
  {
    city: "Billings",
    state: "MT",
    address: "2900 4th Ave N Suite 100, Billings, MT 59101",
    localPhone: "(866) 563-9180",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["59101", "59102", "59105"],
  },

  // --- NEBRASKA (NE) ---
  {
    city: "Omaha",
    state: "NE",
    address: "604 N 109th Ct, Omaha, NE 68154",
    localPhone: "(866) 704-4858",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["68102", "68154", "68114"],
  },

  // --- NEVADA (NV) ---
  {
    city: "Las Vegas",
    state: "NV",
    address: "1250 S Buffalo Dr Suite 150, Las Vegas, NV 89117",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["89101", "89117", "89104"],
  },

  // --- NEW HAMPSHIRE (NH) ---
  {
    city: "Manchester",
    state: "NH",
    address: "1100 Elm St Suite 201, Manchester, NH 03101",
    localPhone: "(866) 331-2208",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["03101", "03102", "03103"],
  },

  // --- NEW JERSEY (NJ) ---
  {
    city: "Newark",
    state: "NJ",
    address: "970 Broad St 2nd Fl, Newark, NJ 07102",
    localPhone: "(866) 964-7593",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["07102", "07103", "07104"],
  },

  // --- NEW MEXICO (NM) ---
  {
    city: "Albuquerque",
    state: "NM",
    address: "500 Lead Ave SW Suite 100, Albuquerque, NM 87102",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["87102", "87104", "87106"],
  },

  // --- NEW YORK (NY) ---
  {
    city: "Manhattan (New York City)",
    state: "NY",
    address: "123 William St 3rd Floor, New York, NY 10038",
    localPhone: "(866) 331-2363",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["10001", "10002", "10003", "10007", "10038", "10011"],
  },
  {
    city: "Brooklyn",
    state: "NY",
    address: "1545 Atlantic Ave, Brooklyn, NY 11213",
    localPhone: "(866) 593-1349",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["11201", "11211", "11213", "11215", "11225"],
  },
  {
    city: "Queens (Jamaica)",
    state: "NY",
    address: "155-10 Jamaica Ave, Jamaica, NY 11432",
    localPhone: "(866) 348-5251",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["11432", "11433", "11435"],
  },
  {
    city: "Bronx",
    state: "NY",
    address: "2501 Grand Concourse, Bronx, NY 10468",
    localPhone: "(866) 964-3401",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["10451", "10452", "10458", "10468"],
  },
  {
    city: "Buffalo",
    state: "NY",
    address: "190 Delaware Ave, Buffalo, NY 14202",
    localPhone: "(866) 964-1296",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["14201", "14202", "14203", "14204"],
  },

  // --- NORTH CAROLINA (NC) ---
  {
    city: "Charlotte",
    state: "NC",
    address: "5800 Executive Center Dr, Charlotte, NC 28212",
    localPhone: "(888) 397-5611",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["28202", "28203", "28212", "28215"],
  },
  {
    city: "Raleigh",
    state: "NC",
    address: "4701 Creedmoor Rd, Raleigh, NC 27612",
    localPhone: "(877) 803-6311",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["27601", "27603", "27612"],
  },

  // --- NORTH DAKOTA (ND) ---
  {
    city: "Fargo",
    state: "ND",
    address: "657 2nd Ave N Rm 140, Fargo, ND 58102",
    localPhone: "(866) 737-4638",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["58102", "58103"],
  },

  // --- OHIO (OH) ---
  {
    city: "Columbus",
    state: "OH",
    address: "200 N High St, Columbus, OH 43215",
    localPhone: "(866) 964-5053",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["43215", "43201", "43205", "43210"],
  },
  {
    city: "Cleveland",
    state: "OH",
    address: "1240 E 9th St, Cleveland, OH 44199",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["44114", "44115", "44199"],
  },

  // --- OKLAHOMA (OK) ---
  {
    city: "Oklahoma City",
    state: "OK",
    address: "123 Robert S Kerr Ave, Oklahoma City, OK 73102",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["73102", "73103", "73106"],
  },

  // --- OREGON (OR) ---
  {
    city: "Portland",
    state: "OR",
    address: "1538 SW Yamhill St, Portland, OR 97205",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["97201", "97205", "97209"],
  },

  // --- PENNSYLVANIA (PA) ---
  {
    city: "Philadelphia",
    state: "PA",
    address: "2 Bala Plaza Suite PL3b, Bala Cynwyd, PA 19004",
    localPhone: "(866) 695-6285",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["19102", "19103", "19104", "19107", "19004"],
  },
  {
    city: "Pittsburgh",
    state: "PA",
    address: "921 Penn Ave, Pittsburgh, PA 15222",
    localPhone: "(866) 331-2236",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["15222", "15219", "15201"],
  },

  // --- RHODE ISLAND (RI) ---
  {
    city: "Providence",
    state: "RI",
    address: "1 Empire St Suite 100, Providence, RI 02903",
    localPhone: "(866) 964-2038",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["02903", "02904", "02908"],
  },

  // --- SOUTH CAROLINA (SC) ---
  {
    city: "Columbia",
    state: "SC",
    address: "1835 Assembly St Rm 123, Columbia, SC 29201",
    localPhone: "(866) 964-7594",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["29201", "29203", "29205"],
  },

  // --- SOUTH DAKOTA (SD) ---
  {
    city: "Sioux Falls",
    state: "SD",
    address: "104 S Garfield Ave, Sioux Falls, SD 57104",
    localPhone: "(866) 331-2207",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["57104", "57103", "57105"],
  },

  // --- TENNESSEE (TN) ---
  {
    city: "Nashville",
    state: "TN",
    address: "120 SEC 1st Ave S Suite 200, Nashville, TN 37201",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["37201", "37203", "37219"],
  },

  // --- TEXAS (TX) ---
  {
    city: "Houston",
    state: "TX",
    address: "10703 Stancliff Rd, Houston, TX 77099",
    localPhone: "(866) 331-2195",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["77001", "77002", "77036", "77099", "77074"],
  },
  {
    city: "Dallas",
    state: "TX",
    address: "10824 N Central Expressway, Dallas, TX 75231",
    localPhone: "(866) 783-7473",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["75201", "75202", "75231", "75243", "75205"],
  },
  {
    city: "San Antonio",
    state: "TX",
    address: "4118 McCullough Ave, San Antonio, TX 78212",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["78201", "78212", "78205", "78209"],
  },
  {
    city: "Austin",
    state: "TX",
    address: "1029 Camino La Costa, Austin, TX 78752",
    localPhone: "(866) 338-2025",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["78701", "78702", "78751", "78752"],
  },
  {
    city: "El Paso",
    state: "TX",
    address: "11111 Gateway Blvd W, El Paso, TX 79935",
    localPhone: "(866) 964-1299",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["79901", "79925", "79935", "79936"],
  },

  // --- UTAH (UT) ---
  {
    city: "Salt Lake City",
    state: "UT",
    address: "175 E 400 S Suite 500, Salt Lake City, UT 84111",
    localPhone: "(866) 690-1947",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["84111", "84101", "84102"],
  },

  // --- VERMONT (VT) ---
  {
    city: "Burlington",
    state: "VT",
    address: "58 Pearl St, Burlington, VT 05401",
    localPhone: "(877) 840-5771",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["05401", "05408"],
  },

  // --- VIRGINIA (VA) ---
  {
    city: "Richmond",
    state: "VA",
    address: "1834 W Cary St, Richmond, VA 23220",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["23220", "23219", "23221"],
  },

  // --- WASHINGTON (WA) ---
  {
    city: "Seattle",
    state: "WA",
    address: "2201 6th Ave, Seattle, WA 98121",
    localPhone: "(866) 299-3665",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["98101", "98104", "98121", "98109"],
  },
  {
    city: "Spokane",
    state: "WA",
    address: "120 W 3rd Ave, Spokane, WA 99201",
    localPhone: "(800) 772-1213",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["99201", "99202", "99203"],
  },

  // --- WEST VIRGINIA (WV) ---
  {
    city: "Charleston",
    state: "WV",
    address: "500 Quarrier St Suite 100, Charleston, WV 25301",
    localPhone: "(866) 964-7387",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["25301", "25302"],
  },

  // --- WISCONSIN (WI) ---
  {
    city: "Milwaukee",
    state: "WI",
    address: "310 W Wisconsin Ave Suite 260, Milwaukee, WI 53203",
    localPhone: "(866) 220-7885",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["53203", "53202", "53204"],
  },

  // --- WYOMING (WY) ---
  {
    city: "Cheyenne",
    state: "WY",
    address: "3001 E Pershing Blvd Suite 140, Cheyenne, WY 82001",
    localPhone: "(866) 331-2182",
    tollFree: "1-800-772-1213",
    hours: "9:00 AM - 4:00 PM (Monday - Friday)",
    zipCodes: ["82001", "82009"],
  },
]

const statesList = [
  { code: "ALL", name: "All 50 States & DC" },
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "DC", name: "District Of Columbia" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
]

const initialChecklist = [
  { id: 1, text: "Government-Issued Photo ID (Driver's License / Passport)", checked: false },
  { id: 2, text: "Original Social Security Card (if available)", checked: false },
  { id: 3, text: "Birth Certificate or proof of U.S. citizenship", checked: false },
  { id: 4, text: "Most recent W-2 forms or self-employment tax returns", checked: false },
  { id: 5, text: "Medical records or doctor details (for disability claims)", checked: false },
  { id: 6, text: "Voided check or banking info (for Direct Deposit setup)", checked: false },
]

export default function SSALocatorPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("ALL")
  const filteredOffices = useMemo(() => {
    const query = searchQuery.trim().toLowerCase()
    let results = officesData
    if (selectedState !== "ALL") results = results.filter((office) => office.state === selectedState)
    if (query) results = results.filter((office) => office.city.toLowerCase().includes(query) || office.state.toLowerCase().includes(query) || office.zipCodes.some((zip) => zip.includes(query)) || office.address.toLowerCase().includes(query))
    return results
  }, [searchQuery, selectedState])
  const [checklist, setChecklist] = useState(() => {
    if (typeof window === "undefined") return initialChecklist

    try {
      const savedChecklist = localStorage.getItem("ssa_visit_checklist")
      if (!savedChecklist) return initialChecklist
      const parsed = JSON.parse(savedChecklist)
      return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialChecklist
    } catch {
      return initialChecklist
    }
  })

  const toggleChecklist = (id: number) => {
    const updated = checklist.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    )
    setChecklist(updated)
    localStorage.setItem("ssa_visit_checklist", JSON.stringify(updated))
  }

  const resetFilters = () => {
    setSearchQuery("")
    setSelectedState("ALL")
  }

  return (
    <div className="bg-slate-50 min-h-screen py-12">
      <div className="container-site max-w-6xl mx-auto px-4">
        
        {/* Back Navigation */}
        <Link
          href="/calculators"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-amber-600 transition-colors mb-6 group"
        >
          <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" /> Back to Calculators
        </Link>

        {/* Hero Banner */}
        <div className="relative bg-[#071530] text-white p-6 sm:p-10 rounded-3xl shadow-md mb-8 overflow-hidden">
          <div className="absolute right-6 bottom-0 top-0 my-auto h-40 w-40 text-white/5 pointer-events-none hidden md:flex items-center justify-center">
            <Building2 size={160} strokeWidth={1} />
          </div>

          <div className="relative z-10 max-w-3xl text-left">
            <span className="bg-amber-500/10 text-amber-400 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-amber-500/20 inline-block mb-3">
              Real-Time National Office Finder
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold font-playfair mb-3 leading-tight tracking-tight text-white">
              Social Security Office Locator Near Me
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Find the closest official Social Security Administration (SSA) field office across all 50 states, verify working hours, access direct local telephone numbers, and secure directions.
            </p>
          </div>
        </div>

        {/* E-E-A-T Trust Card */}
        <WhyTrustCalculator />

        {/* Search & Filtering Bar */}
        <div className="bg-white border border-slate-200/70 p-6 sm:p-8 rounded-3xl shadow-sm mb-8 mt-8">
          <div className="grid md:grid-cols-12 gap-4 items-center">
            
           {/* Input Search */}
<div className="md:col-span-6 relative flex items-center">
  <label htmlFor="search-input" className="sr-only">
    Search by City or ZIP Code
  </label>

  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
    <Search size={18} />
  </div>

  <input
    id="search-input"
    type="text"
    placeholder="Enter City or ZIP Code (e.g. Houston, 90001)..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    className="w-full bg-white border-2 border-amber-500/30 rounded-xl pl-11 pr-24 py-3.5 text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-amber-500/20 focus:border-amber-600 shadow-sm hover:border-amber-400 transition-all"
  />

  {/* Clear Button */}
  {searchQuery && (
    <button
      type="button"
      onClick={() => setSearchQuery("")}
      className="absolute right-20 text-slate-400 hover:text-slate-600 transition-colors p-1"
      aria-label="Clear search input"
    >
      <XCircle size={16} />
    </button>
  )}

  {/* Action Search Button */}
  <button
    type="button"
    className="absolute right-1.5 bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-lg shadow-sm transition-all flex items-center gap-1.5"
  >
    Search
  </button>
</div>

            {/* State Select Dropdown */}
            <div className="md:col-span-4">
              <label htmlFor="state-select" className="sr-only">
                Filter by State
              </label>
              <select
                id="state-select"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full bg-slate-50/50 border border-slate-200 rounded-xl px-4 py-3.5 text-sm font-semibold text-slate-700 focus:outline-none focus:ring-4 focus:ring-amber-500/10 focus:border-amber-500 transition-all cursor-pointer"
              >
                {statesList.map((state) => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Counter & SSA Portal Link */}
            <div className="md:col-span-2 text-center md:text-right space-y-1.5">
              <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">
                {filteredOffices.length} {filteredOffices.length === 1 ? "Office" : "Offices"} Found
              </span>
              <a
                href="https://secure.ssa.gov/ICON/main.jsp"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-slate-500 hover:text-amber-600 transition-colors underline underline-offset-2"
              >
                SSA Official Portal <ExternalLink size={10} />
              </a>
            </div>

          </div>
        </div>

        {/* Office Grid Display */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {filteredOffices.length > 0 ? (
            filteredOffices.map((office, index) => (
              <div
                key={index}
                className="bg-white border border-slate-200 p-6 rounded-3xl shadow-sm flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all"
              >
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4 border-b border-slate-100 pb-3">
                    <div className="flex items-center gap-2">
                      <Building2 className="text-amber-500 bg-amber-50 p-1.5 rounded-lg shrink-0" size={28} />
                      <h3 className="font-extrabold text-[#071530] text-base sm:text-lg">{office.city} Office</h3>
                    </div>
                    <span className="text-xs bg-slate-100 text-slate-600 font-bold px-2.5 py-1 rounded-full uppercase font-mono">
                      {office.state}
                    </span>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm">
                    <div className="flex gap-2.5 items-start">
                      <MapPin className="text-slate-400 shrink-0 mt-0.5" size={16} />
                      <p className="text-slate-600 font-medium leading-relaxed">{office.address}</p>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <Phone className="text-slate-400 shrink-0" size={16} />
                      <p className="text-slate-600 font-semibold">
                        Local Phone: <span className="font-mono text-slate-800">{office.localPhone}</span>
                      </p>
                    </div>

                    <div className="flex gap-2.5 items-center">
                      <Clock className="text-slate-400 shrink-0" size={16} />
                      <p className="text-slate-600 font-medium">{office.hours}</p>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-slate-100">
                  <a
                    href={`tel:${office.localPhone.replace(/[^\d]/g, "")}`}
                    className="flex items-center justify-center gap-1.5 bg-[#071530] text-white py-2.5 rounded-xl text-xs font-bold hover:bg-amber-600 transition-colors"
                  >
                    <Phone size={13} /> Call Office
                  </a>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${office.city} Social Security Office ${office.address}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1.5 bg-slate-50 border border-slate-200 text-[#071530] py-2.5 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all"
                  >
                    <MapPin size={13} className="text-amber-500" /> Map Directions
                  </a>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 bg-slate-100/50 border border-dashed border-slate-300 p-12 rounded-3xl text-center text-slate-400">
              <Info size={40} className="mx-auto text-slate-300 mb-3" />
              <p className="font-bold text-slate-600">No results match your exact search.</p>
              <p className="text-xs max-w-sm mx-auto mt-1 leading-relaxed">
                Try clearing search parameters or check your exact ZIP code using the official SSA portal below.
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <button
                  onClick={resetFilters}
                  className="bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl transition-colors"
                >
                  Reset Filters
                </button>
                <a
                  href="https://secure.ssa.gov/ICON/main.jsp"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-[#071530] text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm"
                >
                  Official SSA Directory <ExternalLink size={12} />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Interactive Checklist Widget */}
        <div className="bg-[#071530] text-white p-6 sm:p-8 rounded-3xl shadow-sm mb-12">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4 border-b border-white/10 pb-4">
            <div className="flex items-center gap-2">
              <Calendar className="text-amber-400" size={24} />
              <h3 className="text-lg font-bold font-playfair">Interactive Office Visit Checklist</h3>
            </div>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center gap-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-3.5 py-2 rounded-xl transition-colors w-fit"
            >
              <Printer size={14} /> Print Checklist
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            Planning a trip to your local Social Security office? Check the boxes below to ensure you have collected every necessary document before stepping out of your house.
          </p>

          <div className="grid sm:grid-cols-2 gap-3">
            {checklist.map((item) => (
              <button
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className="flex items-start gap-3 p-3.5 bg-white/5 rounded-2xl border border-white/10 hover:border-white/25 text-left transition-all cursor-pointer w-full"
              >
                <span className="shrink-0 text-amber-400 mt-0.5">
                  {item.checked ? <CheckSquare size={18} /> : <Square size={18} />}
                </span>
                <span className={`text-xs sm:text-sm ${item.checked ? "line-through text-slate-400" : "text-slate-100 font-medium"}`}>
                  {item.text}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Essential Calculators Internal Linking Bar */}
<div className="mb-12 p-6 sm:p-8 bg-white rounded-3xl border border-slate-200/70 shadow-sm">
  <h3 className="font-bold text-[#071530] text-lg mb-1 font-playfair">
    Essential Retirement Tools Before Your Visit
  </h3>
  <p className="text-xs sm:text-sm text-slate-500 mb-5">
    Calculate your exact benefit figures before speaking with an official SSA representative:
  </p>
  
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
   
  <Link href="/calculators/retirement-age" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Retirement Age Calculator
    </Link>

    <Link href="/calculators/benefits-estimator" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Benefits Estimator
    </Link>

    <Link href="/calculators/break-even" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Break-Even Calculator
    </Link>

    <Link href="/calculators/medicare-cost" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Medicare Cost Calculator
    </Link>

    <Link href="/calculators/tax-calculator" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Tax Calculator
    </Link>

    <Link href="/calculators/earnings-test" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Earnings Test Calculator
    </Link>

    <Link href="/calculators/ssdi-eligibility" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      SSDI Eligibility Calculator
    </Link>

    <Link href="/calculators/medicare-plan-finder" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Medicare Plan Finder
    </Link>

    <Link href="/calculators/survivor-benefits" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Survivor Benefits Calculator
    </Link>

    <Link href="/calculators/wep-gpo-calculator" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      WEP / GPO Calculator
    </Link>

    <Link href="/calculators/couples-divorced-strategy-optimizer" className="p-4 bg-slate-50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-600 hover:bg-slate-100 border border-slate-200/60 transition-all text-center block">
      Couples & Divorced Strategy
    </Link>
  </div>
</div>

        {/* SEO Article Section */}
<div className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-10 shadow-sm">
  <article className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-sm sm:text-[15px]">
    
    {/* Article Header */}
    <header className="mb-8">
      <div className="inline-block px-3 py-1 bg-amber-100 text-amber-900 font-semibold text-xs rounded-full mb-3">
        Official 2026 SSA Field Office Guide
      </div>
      <h2 className="text-2xl sm:text-4xl font-bold font-playfair text-[#071530] mb-4 tracking-tight">
        How to Locate & Visit Your Local Social Security Office: Direct Contacts, Hours & Checklist
      </h2>
      <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
        Navigating the U.S. Social Security Administration (SSA) system can be overwhelming. Whether you are filing for retirement benefits, applying for Social Security Disability Insurance (SSDI/SSI), updating direct deposit details, or replacing a lost card, this comprehensive guide provides everything you need to locate your local field office, skip long wait lines, and prepare required legal documentation.
      </p>
    </header>

    <hr className="border-slate-100 my-8" />

    {/* Section 1: Appointment vs Walk-in */}
    <section className="mb-10">
      <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#071530] mb-4">
        Do You Need an Appointment to Visit an SSA Office?
      </h3>
      <p className="mb-4 text-slate-600">
        While local Social Security offices accept walk-ins, scheduling an appointment in advance is strongly recommended. Unscheduled walk-ins frequently face wait times exceeding 2 to 3 hours, particularly during peak operating hours (mid-day) and early in the week or month.
      </p>
      
      <div className="bg-slate-50 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl my-6">
        <h4 className="font-bold text-[#071530] text-sm sm:text-base mb-1">
          📞 How to Schedule Your Office Visit:
        </h4>
        <p className="text-xs sm:text-sm text-slate-600 mb-2">
          Call the official toll-free SSA customer support line or contact your local field office directly:
        </p>
        <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-700 space-y-1">
          <li><strong>National Toll-Free:</strong> 1-800-772-1213 (TTY: 1-800-325-0778)</li>
          <li><strong>Live Hours:</strong> Monday through Friday, 8:00 AM – 7:00 PM (Local Time)</li>
          <li><strong>Best Time to Call:</strong> Wednesday through Friday, late afternoon, or early morning.</li>
        </ul>
      </div>
    </section>

    {/* Section 2: Services Provided Table */}
    <section className="mb-10">
      <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#071530] mb-4">
        In-Person Services vs. Online Alternatives
      </h3>
      <p className="mb-4 text-slate-600">
        Before traveling to a physical SSA location, review which services require an in-person representative and which tasks can be completed faster online:
      </p>

      <div className="overflow-x-auto my-6 border border-slate-200 rounded-2xl">
        <table className="w-full text-left text-xs sm:text-sm text-slate-600">
          <thead className="bg-[#071530] text-white">
            <tr>
              <th className="p-3 sm:p-4 font-semibold">Service Type</th>
              <th className="p-3 sm:p-4 font-semibold">In-Person Office Visit</th>
              <th className="p-3 sm:p-4 font-semibold">Online Portal (My SSA)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 bg-white">
            <tr>
              <td className="p-3 sm:p-4 font-semibold text-slate-900">Replacement SS Card</td>
              <td className="p-3 sm:p-4">Required if identity verification fails online</td>
              <td className="p-3 sm:p-4 text-emerald-700 font-semibold">Fastest (Most States)</td>
            </tr>
            <tr>
              <td className="p-3 sm:p-4 font-semibold text-slate-900">Applying for Retirement</td>
              <td className="p-3 sm:p-4">Accepted by appointment</td>
              <td className="p-3 sm:p-4 text-emerald-700 font-semibold">Recommended (Takes ~15 mins)</td>
            </tr>
            <tr>
              <td className="p-3 sm:p-4 font-semibold text-slate-900">Name Change (Marriage/Legal)</td>
              <td className="p-3 sm:p-4 text-amber-700 font-semibold">Mandatory (Requires original docs)</td>
              <td className="p-3 sm:p-4 text-slate-400">Not Available</td>
            </tr>
            <tr>
              <td className="p-3 sm:p-4 font-semibold text-slate-900">SSDI / SSI Document Submission</td>
              <td className="p-3 sm:p-4 text-amber-700 font-semibold">Recommended for physical evidence</td>
              <td className="p-3 sm:p-4">Partial Upload Support</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-amber-50 border border-amber-200 text-amber-950 p-4 rounded-2xl text-xs sm:text-sm leading-relaxed">
        <strong>💡 Pro Tip:</strong> Save hours by setting up a free account on the official{" "}
        <a href="https://www.ssa.gov/myaccount/" target="_blank" rel="noopener noreferrer" className="underline font-bold text-[#071530] hover:text-amber-700">
          My Social Security Portal
        </a>{" "}
        to print benefit verification letters, check application status, and order replacement tax forms (1099/1042S).
      </div>
    </section>

    {/* Section 3: Required Document Checklist */}
    <section className="mb-10">
      <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#071530] mb-4">
        Pre-Visit Document Checklist: What to Bring
      </h3>
      <p className="mb-4 text-slate-600">
        The Social Security Administration strictly enforces documentation rules. <strong>All documents must be originals or certified copies</strong> issued by the signing agency. Uncertified photocopies or notarized copies are NOT accepted.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 my-6">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <h4 className="font-bold text-[#071530] mb-2 text-sm sm:text-base">1. Proof of Identity & Age</h4>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
            <li>U.S. Driver&apos;s License or State Photo ID card</li>
            <li>U.S. Passport or Passport Card</li>
            <li>Original Birth Certificate</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <h4 className="font-bold text-[#071530] mb-2 text-sm sm:text-base">2. Citizenship & Status</h4>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
            <li>U.S. Citizenship Certificate / Naturalization Certificate</li>
            <li>Permanent Resident Card (Green Card, I-551)</li>
            <li>Current Unexpired Work Authorization (I-766)</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <h4 className="font-bold text-[#071530] mb-2 text-sm sm:text-base">3. Financial & Work Records</h4>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
            <li>Most recent W-2 forms or Tax Returns (Self-Employed Schedule SE)</li>
            <li>Bank Routing and Account Numbers (for direct deposit setup)</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
          <h4 className="font-bold text-[#071530] mb-2 text-sm sm:text-base">4. Marital & Legal Changes</h4>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-slate-600 space-y-1">
            <li>Original Marriage License or Divorce Decree</li>
            <li>Court Order for legal name change</li>
          </ul>
        </div>
      </div>
    </section>

    {/* Section 4: Internal Links to Essential Calculators */}
    <section className="mb-10">
      <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#071530] mb-4">
        Calculate Your Exact Benefits Before Your Representative Visit
      </h3>
      <p className="mb-4 text-slate-600">
        Before filing official claims during your local field office visit, calculate your exact estimates using our suite of free, privacy-focused financial tools:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6">
        <Link href="/calculators/retirement-age" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          Full Retirement Age (FRA) Calc →
        </Link>
        <Link href="/calculators/break-even" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          Early Claiming Penalty Calc →
        </Link>
        <Link href="/calculators/benefits-estimator" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          Spousal Benefits Estimator →
        </Link>
        <Link href="/calculators/survivor-benefits" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          Survivor Benefits Calculator →
        </Link>
        <Link href="/calculators/earnings-test" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          Retirement Earnings Test Calc →
        </Link>
        <Link href="/calculators/wep-gpo-calculator" className="p-4 bg-slate-50 hover:bg-amber-50/50 rounded-2xl text-xs sm:text-sm font-bold text-[#071530] hover:text-amber-700 border border-slate-200/80 transition-all text-center block">
          WEP / GPO Reduction Tool →
        </Link>
      </div>
    </section>

    {/* Section 5: Official Directory Disclaimer Box */}
    <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 flex items-start gap-3">
      <Info size={20} className="text-amber-600 shrink-0 mt-0.5" />
      <p className="text-xs sm:text-sm text-amber-950 leading-relaxed">
        <strong>Official SSA Directory Reference:</strong> Looking for specialized local units, card centers, or rural offices? You can access the official federal field office search tool anytime directly at{" "}
        <a
          href="https://secure.ssa.gov/ICON/main.jsp"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-bold hover:text-amber-700"
        >
          secure.ssa.gov/ICON
        </a>
        .
      </p>
    </div>

    {/* Footer Disclaimer */}
    <footer className="mt-8 pt-6 border-t border-slate-100 text-xs text-slate-400 italic leading-relaxed">
      Disclaimer: Social Security Guide is an independent educational platform and is not affiliated with, endorsed by, or connected to the Social Security Administration (SSA) or any federal agency. Office locations, operating hours, and direct telephone lines listed in this directory are gathered from public domain records and updated periodically. Always verify operational status via the{" "}
      <a href="https://secure.ssa.gov/ICON/main.jsp" target="_blank" rel="noopener noreferrer" className="underline not-italic font-semibold text-slate-500 hover:text-amber-600">
        official SSA Office Locator
      </a>{" "}
      before traveling.
    </footer>

  </article>
</div>
      </div>
    </div>
  )
}