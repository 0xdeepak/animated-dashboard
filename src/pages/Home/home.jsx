import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar/navbar";
import "./home.css";
import { fetchCurrentUser } from "../../api/user";
import { fetchProjectData } from "../../api/project";
import ProjectLayout from "../../components/ProjectLayout/projectLayout";
import ProjectVisits from "../../components/ProjectVisits/projectVisits";
import SmallGridCard from "../../components/SmallGridCard/smallGridCard";
import { MdOutlineScreenShare } from "react-icons/md";
import { BiCollection } from "react-icons/bi";
import { MdOutlineGroup } from "react-icons/md";
import { MdOutlineTimer } from "react-icons/md";
import { TbShare } from "react-icons/tb";
import { FaFacebookSquare } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import ShareofVoice from "../../components/ShareOfVoice/shareOfVoice";
import TotalShares from "../../components/TotalShares/totalShares";
import Competitors from "../../components/Competitors/competitors";

const nestedCards = {
  bounceRate: { name: "bounceRate", title: "Bounce Rate", decorator: "%", icon: MdOutlineScreenShare },
  pagesPerVisit: { name: "pagesPerVisit", title: "Pages per Visit", decorator: "", icon: BiCollection },
  monthlyVisits: {
    name: "monthlyVisits",
    title: "Total Monthly Visits",
    decorator: "K",
    icon: MdOutlineGroup,
  },
  avgVisitDuration: {
    name: "avgVisitDuration",
    title: "Avg. Visit Duration",
    decorator: "",
    icon: MdOutlineTimer,
  },
  avgSharePerArticle: {
    name: "avgSharePerArticle",
    title: "Avg Share Per Article",
    decorator: "",
    icon: TbShare,
  },
  facebookShares: {
    name: "facebookShares",
    title: "Facebook Shares",
    decorator: "",
    icon: FaFacebookSquare,
  },
  twitterShares: {
    name: "twitterShares",
    title: "Twitter Shares",
    decorator: "",
    icon: FaTwitter,
  },
  linkedInShares: {
    name: "linkedInShares",
    title: "LinkedIn Shares",
    decorator: "",
    icon: FaLinkedin,
  },
};

function Home() {
  const [currentUser, setCurrentUser] = useState({});
  const [projectData, setProjectData] = useState({});
  const [selectedTimeline, setSelectedTimeline] = useState("12 months");

  useEffect(() => {
    fetchCurrentUser().then((data) => setCurrentUser(data));
    fetchProjectData().then((data) => setProjectData(data));
  }, []);

  return (
    <div className="home-container">
      <Navbar currentUser={currentUser} currentProject={projectData.projectName} />
      <ProjectLayout selectedTimeline={selectedTimeline} setSelectedTimeline={setSelectedTimeline}>
        <ProjectVisits selectedTimeline={selectedTimeline} setSelectedTimeline={setSelectedTimeline} />
        <div className="project-grid">
          <SmallGridCard data={projectData?.bounceRate} extras={nestedCards["bounceRate"]} />
          <SmallGridCard data={projectData?.pagesPerVisit} extras={nestedCards["pagesPerVisit"]} />
          <SmallGridCard data={projectData?.monthlyVisits} extras={nestedCards["monthlyVisits"]} />
          <SmallGridCard data={projectData?.avgVisitDuration} extras={nestedCards["avgVisitDuration"]} />
        </div>
        <ShareofVoice />
        <TotalShares />
        <div className="project-grid">
          <SmallGridCard data={projectData?.avgSharePerArticle} extras={nestedCards["avgSharePerArticle"]} />
          <SmallGridCard data={projectData?.facebookShares} extras={nestedCards["facebookShares"]} />
          <SmallGridCard data={projectData?.twitterShares} extras={nestedCards["twitterShares"]} />
          <SmallGridCard data={projectData?.linkedInShares} extras={nestedCards["linkedInShares"]} />
        </div>
        <Competitors />
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </ProjectLayout>
    </div>
  );
}

export default Home;
