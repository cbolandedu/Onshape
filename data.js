/* =========================================================
   EDIT THIS FILE TO ADD TUTORIALS — nothing else needs to change.
   ========================================================= */

const SITE = {
  title: "Onshape Tutorials",
  subtitle: "Watch me model it, then practice it yourself — and learn to read the drawing.",
  course: "ENGR 114 · Engineering Graphics · Whatcom Community College",
  instructor: "Chloe",
};

/*
  One block per tutorial. Fields:
    id          short unique name, no spaces (used in the page URL)
    title       shown on the card and page
    unit        groups tutorials (used for the filter buttons)
    level       "Beginner" | "Intermediate" | "Advanced"
    duration    e.g. "14 min"
    description one or two sentences
    youtube     the video ID only — for https://youtu.be/AbC123xyz it's "AbC123xyz"
                (upload as Unlisted if you don't want it public). Leave "" until ready.
    onshape     link to the public Onshape document (optional)
    drawing     path to the drawing file in the drawings/ folder (.pdf, .png or .svg). Leave "" until ready.
    skills      list of tools/skills covered
    chapters    timestamps students can click to jump in the video
    questions   "read the drawing" practice; answers stay hidden until clicked
    challenge   a try-it-yourself extension task (optional)
*/

const TUTORIALS = [
  {
    id: "01-sketch-basics",
    title: "Sketch Basics: Constraining a Profile",
    unit: "Unit 1 · Sketching",
    level: "Beginner",
    duration: "12 min",
    description: "Create a fully defined 2D sketch using lines, arcs, dimensions, and geometric constraints.",
    youtube: "",
    onshape: "",
    drawing: "",
    skills: ["Line", "Center-point arc", "Dimension", "Coincident", "Tangent", "Horizontal/Vertical"],
    chapters: [
      { t: "0:00", label: "Starting a new Part Studio" },
      { t: "1:30", label: "Picking a sketch plane" },
      { t: "3:10", label: "Rough sketch of the profile" },
      { t: "6:45", label: "Adding constraints" },
      { t: "9:20", label: "Dimensioning until fully defined (black lines)" },
    ],
    questions: [
      { q: "How can you tell in Onshape that a sketch is fully defined?", a: "All sketch geometry turns black. Blue geometry is still under-defined and can move." },
      { q: "Why constrain before you dimension?", a: "Constraints capture design intent (parallel, tangent, equal) so you need fewer dimensions and the sketch updates predictably." },
    ],
    challenge: "Re-create the profile from scratch without watching, then change the overall width and check that the sketch updates cleanly.",
  },
  {
    id: "02-mounting-bracket",
    title: "L-Bracket: Extrude, Fillet, Holes",
    unit: "Unit 2 · Part Modeling",
    level: "Beginner",
    duration: "18 min",
    description: "Model a mounting bracket with extrudes, fillets, and a hole pattern, then check it against its drawing.",
    youtube: "",
    onshape: "",
    drawing: "",
    skills: ["Extrude", "Fillet", "Hole", "Linear pattern", "Measure tool"],
    chapters: [
      { t: "0:00", label: "Reading the drawing before modeling" },
      { t: "2:15", label: "Base profile and extrude" },
      { t: "7:40", label: "Holes with the Hole feature" },
      { t: "11:05", label: "Patterning the holes" },
      { t: "14:30", label: "Fillets and final check" },
    ],
    questions: [
      { q: "What is the overall height of the bracket?", a: "Replace with your answer once the drawing is uploaded, e.g. 2.50 in." },
      { q: "How many holes are there, and what is their diameter?", a: "Replace with your answer, e.g. 4X Ø.250 — the '4X' means the callout applies to four identical holes." },
      { q: "Which view shows the true shape of the fillet?", a: "Replace with your answer — the view looking straight down the fillet's axis." },
    ],
    challenge: "Add a third mounting hole to the vertical leg and update your own drawing to show it.",
  },
  {
    id: "03-drawing-from-part",
    title: "Making the Drawing: Views, Dimensions, Title Block",
    unit: "Unit 3 · Drawings",
    level: "Intermediate",
    duration: "20 min",
    description: "Turn a part into a properly dimensioned multiview drawing using third-angle projection.",
    youtube: "",
    onshape: "",
    drawing: "",
    skills: ["Insert views", "Projected views", "Section view", "Dimensions", "Centerlines", "Title block"],
    chapters: [
      { t: "0:00", label: "Creating a drawing from a Part Studio" },
      { t: "2:40", label: "Choosing the front view" },
      { t: "5:30", label: "Projected and isometric views" },
      { t: "9:15", label: "Dimensioning without duplicates" },
      { t: "15:00", label: "Section view and centerlines" },
      { t: "18:10", label: "Filling in the title block" },
    ],
    questions: [
      { q: "What projection does this drawing use, and how can you tell?", a: "Third-angle (US standard). Check the projection symbol in the title block; the top view sits above the front view and the right view sits to its right." },
      { q: "Why shouldn't the same dimension appear in two views?", a: "Duplicate dimensions can conflict if one is updated and the other isn't. Each feature should be dimensioned once, in the view that shows it most clearly." },
    ],
    challenge: "Make a drawing of the L-Bracket from Tutorial 2 and compare it with mine. What did you dimension differently?",
  },
];
