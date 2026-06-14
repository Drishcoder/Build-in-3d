import { Speaker, CoreVertical, ImpactStat } from './types';

export const SPEAKERS: Speaker[] = [
  {
    id: "murthy",
    name: "N. R. Narayana Murthy",
    role: "Founder & Chief Mentor",
    organization: "Infosys",
    topic: "Engineering the Global IT Revolution: Decades of Strategic Innovation",
    bio: "Often referred to as the Father of India's IT sector, Narayana Murthy revolutionized the software development and consulting services landscape, scaling global high-performance teams and standardizing corporate ethics on an unprecedented scale.",
    initials: "NM",
    avatarColor: "from-cyan-500 to-emerald-500",
    keynoteTime: "Oct 17, 10:00 UTC+5.5",
    venue: "Main Convocation Arena"
  },
  {
    id: "somanath",
    name: "Dr. S. Somanath",
    role: "Chairman & Space Pioneer",
    organization: "ISRO (Indian Space Research Organisation)",
    topic: "The Frontier of Lunar Operations: Navigating Deep Space Exploration Missions",
    bio: "An esteemed aerospace engineer guiding India's legendary space programs, including the triumph of Chandrayaan-3 and the Aditya-L1 solar observatory. Under his leadership, ISRO is pushing bounds in affordable planetary space technologies.",
    initials: "SS",
    avatarColor: "from-violet-600 to-indigo-500",
    keynoteTime: "Oct 18, 11:30 UTC+5.5",
    venue: "Satish Dhawan Hall"
  },
  {
    id: "chauhan",
    name: "General Anil Chauhan",
    role: "Chief of Defence Staff (CDS)",
    organization: "Indian Armed Forces",
    topic: "Modern Warfare & AI Autonomy: Aligning Defence Systems with Next-Gen Intelligence",
    bio: "As India's top military officer, General Chauhan directs complex strategic modernization operations, incorporating advanced cyber defense, autonomous drones, electronic warfare networks, and machine learning into sovereign security systems.",
    initials: "AC",
    avatarColor: "from-amber-500 to-red-600",
    keynoteTime: "Oct 19, 14:00 UTC+5.5",
    venue: "Sovereign Systems Pavillion"
  },
  {
    id: "ariakwan",
    name: "Dr. Aria Kwan",
    role: "Chief AI Scientist & Epistemologist",
    organization: "NeuraLab International",
    topic: "Machine Sentience: Can Generative Architectures Cross the Threshold of Self-Reflection?",
    bio: "A renowned synthetic mind scholar conducting research in non-linear transformer feedback networks. Her breakthrough papers query whether complex neural grids simulate intelligence or achieve genuine structural awareness.",
    initials: "AK",
    avatarColor: "from-fuchsia-600 to-pink-500",
    keynoteTime: "Oct 17, 16:30 UTC+5.5",
    venue: "Neural Grid Stage"
  }
];

export const VERTICALS: CoreVertical[] = [
  {
    id: "robowars",
    title: "International Robowars",
    subtitle: "Combat Robotics Arena",
    description: "The ultimate clash of metal and code. Teams from over 15 nations deploy high-torque, structurally armored autonomous and remote-operated gladiators in a custom high-impact blast arena.",
    subSessions: ["Combustion & Heavyweight Clashes", "Autonomous Pathfinding Duels", "Structural Failure Analysis Labs"],
    iconName: "Swords",
    color: "cyan"
  },
  {
    id: "humanoid",
    title: "Global Humanoid Conclave",
    subtitle: "The Future of Bipedal Autonomy",
    description: "A specialized confluence hosting experimental humanoid machinery, biomechanical structures, and spatial pathfinders. Showcasing real-world developments in bipedal stabilization and manipulation.",
    subSessions: ["Active Balancing Demonstrations", "Neuromorphic Vision Integration Workshops", "Asimovian Humanoid Ethics Debates"],
    iconName: "Cpu",
    color: "purple"
  },
  {
    id: "techconnect",
    title: "TechConnect R&D Exhibition",
    subtitle: "Sovereign Science Showcases",
    description: "A majestic curation of cutting-edge research and corporate innovation. Witness fully functioning prototypes, patented breakthroughs, and interactive demonstrations spanning quantum and biotech.",
    subSessions: ["Quantum Sensing Prototypes", "Affordable Medical Tech Devices", "Advanced Bio-Acoustic Demonstrations"],
    iconName: "Globe",
    color: "indigo"
  },
  {
    id: "workshops",
    title: "Workshops & Summits",
    subtitle: "Immersive Skills Bootcamps",
    description: "Intimate technical workshops chaired by world-class developers, engineers, and scientists. Walk away with practical experience writing smart-contracts, compiling ROS2 code, or deploying agentic AI.",
    subSessions: ["Zero-Knowledge Proof Crypto Labs", "Autonomous Drone Flight Controllers", "Biomedical Gene Splicing Dry Runs"],
    iconName: "Atom",
    color: "amber"
  }
];

export const IMPACT_STATS: ImpactStat[] = [
  {
    label: "Festival Footfall",
    value: "175,000",
    symbol: "+",
    detail: "Enthusiasts, students, and professionals converging in a space of discovery."
  },
  {
    label: "Participating Colleges",
    value: "2,500",
    symbol: "+",
    detail: "Institutes sending premier teams to compete and exhibit emerging tech."
  },
  {
    label: "Fierce Competitions",
    value: "300",
    symbol: "+",
    detail: "Thrilling technical structures testing code, engineering, and grit under pressure."
  },
  {
    label: "Total Prize Pool",
    value: "₹4.5M",
    symbol: "+",
    detail: "Fostering grass-roots science and engineering with direct capital-grant backing."
  }
];
