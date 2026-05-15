import { CiLocationOn } from "react-icons/ci";
import { BsTelephone } from "react-icons/bs";
import { PiEnvelopeSimpleThin } from "react-icons/pi";
import { FaInstagram, FaYoutube, FaFacebookF } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export const LOGO_SRC =
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7GhFWiVPAAb-py74iYchtHb6DPGmKBrPqTA&s";

export const CONTACT_DETAILS = [
  {
    id: "address",
    icon: CiLocationOn,
    iconSize: 24,
    text: "321 SH street, Barcelona, Spain",
    align: "items-start",
  },
  {
    id: "phone",
    icon: BsTelephone,
    iconSize: 20,
    text: "+34 9876542",
    align: "items-center",
  },
  {
    id: "email",
    icon: PiEnvelopeSimpleThin,
    iconSize: 20,
    text: "support@sneekerhub.com",
    align: "items-center",
  },
];

export const SOCIAL_LINKS = [
  {
    href: "#",
    label: "Instagram",
    icon: FaInstagram,
    hoverClass: "hover:text-[#ec003f]",
  },
  {
    href: "#",
    label: "X",
    icon: FaXTwitter,
    hoverClass: "hover:text-gray-600",
  },
  {
    href: "#",
    label: "YouTube",
    icon: FaYoutube,
    hoverClass: "hover:text-red-600",
  },
  {
    href: "#",
    label: "Facebook",
    icon: FaFacebookF,
    hoverClass: "hover:text-blue-600",
  },
];
