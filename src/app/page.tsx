import CategoryAccordion from "@/components/design/CategoryAccordion";
import type { Category } from "@/types";
import { Sofa, Lamp, Palette, Ruler, Armchair, Bed, PaintRoller } from "lucide-react"; // Example icons

// Sample Data - In a real app, this would come from an API or state management
const sampleCategories: Category[] = [
  {
    id: "furniture",
    name: "Furniture Selection",
    icon: Sofa,
    description: "Choose the main furniture pieces for your room.",
    options: [
      { id: "sofa-1", name: "Modern Velvet Sofa", description: "A plush velvet sofa with clean lines.", imageUrl: "https://picsum.photos/seed/sofa1/400/300", tags: ["sofa", "modern", "living room"], price: 899.99 },
      { id: "armchair-1", name: "Leather Wingback Chair", description: "Classic leather armchair for a cozy corner.", imageUrl: "https://picsum.photos/seed/armchair1/400/300", tags: ["armchair", "classic", "leather"], price: 450.00 },
      { id: "bed-1", name: "King Size Platform Bed", description: "Minimalist platform bed with wooden frame.", imageUrl: "https://picsum.photos/seed/bed1/400/300", tags: ["bed", "bedroom", "minimalist"], price: 600.00 },
      { id: "table-1", name: "Round Dining Table", description: "Seats 4, perfect for small spaces.", imageUrl: "https://picsum.photos/seed/table1/400/300", tags: ["table", "dining", "round"], price: 320.00 },
    ],
  },
  {
    id: "lighting",
    name: "Lighting Fixtures",
    icon: Lamp,
    description: "Illuminate your space with stylish lighting options.",
    options: [
      { id: "lamp-1", name: "Industrial Floor Lamp", description: "Adjustable floor lamp with a metal shade.", imageUrl: "https://picsum.photos/seed/lamp1/400/300", tags: ["lamp", "industrial", "floor lamp"], price: 120.50 },
      { id: "pendant-1", name: "Geometric Pendant Light", description: "Modern pendant light for over a dining table.", imageUrl: "https://picsum.photos/seed/pendant1/400/300", tags: ["pendant", "modern", "dining light"], price: 85.00 },
    ],
  },
  {
    id: "colors",
    name: "Wall Colors & Accents",
    icon: Palette,
    description: "Select paint colors and accent wall treatments.",
    options: [
      { id: "paint-1", name: "Soothing Sage Green", description: "A calming green for main walls.", imageUrl: "https://picsum.photos/seed/paint1/400/300?color=sage", tags: ["paint", "green", "wall color"], price: 45.00 },
      { id: "wallpaper-1", name: "Botanical Print Wallpaper", description: "Elegant wallpaper for an accent wall.", imageUrl: "https://picsum.photos/seed/wallpaper1/400/300?pattern=botanical", tags: ["wallpaper", "botanical", "accent wall"], price: 70.00 },
    ],
  },
  {
    id: "decor",
    name: "Decorative Items",
    icon: PaintRoller, // Using PaintRoller as a generic decor icon
    description: "Add personality with rugs, curtains, and art.",
    options: [
      { id: "rug-1", name: "Abstract Area Rug", description: "Colorful rug to tie the room together.", imageUrl: "https://picsum.photos/seed/rug1/400/300", tags: ["rug", "abstract", "colorful"], price: 250.00 },
      { id: "curtains-1", name: "Linen Curtains", description: "Light and airy linen curtains.", imageUrl: "https://picsum.photos/seed/curtains1/400/300", tags: ["curtains", "linen", "window"], price: 90.00 },
    ],
  },
];


export default function HomePage() {
  return (
    <div 
      className="relative min-h-full p-4 md:p-8 bg-background text-foreground"
      // The leopard print overlay aesthetic - applied as a very subtle repeating pattern
      // This could be an SVG pattern for better performance and scalability
      style={{
        backgroundImage: "url('https://picsum.photos/seed/leopardsubtle/50/50?grayscale&blur=2&random=1')", // Placeholder for subtle pattern
        backgroundRepeat: 'repeat',
        backgroundBlendMode: 'overlay', // Blends with background
        backgroundColor: 'hsla(var(--background), 0.5)', // Make sure background color is semi-transparent if blend mode is overlay
      }}
    >
      <div className="relative z-[1] isolate"> {/* Ensure content is above the pattern and backdrop-filter works */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Interactive Room Designer
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-foreground/80 sm:text-xl">
            Welcome! Start by selecting options from the categories below to visualize your perfect room.
            Use the sidebar to navigate through different stages of your design.
          </p>
        </header>

        <section className="max-w-5xl mx-auto">
          <CategoryAccordion categories={sampleCategories} />
        </section>

        {/* Placeholder for comparison view and summary */}
        <section className="mt-12 max-w-5xl mx-auto space-y-8">
            <div className="p-6 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Comparison View (Coming Soon)</h2>
                <p className="text-muted-foreground">Compare your favorite options side-by-side to make the best choice.</p>
            </div>
            <div className="p-6 bg-card/60 backdrop-blur-lg border border-card-foreground/10 rounded-lg shadow-lg">
                <h2 className="text-2xl font-semibold mb-4">Design Summary & Export (Coming Soon)</h2>
                <p className="text-muted-foreground">Review your complete design and export it as a PDF.</p>
            </div>
        </section>
      </div>
    </div>
  );
}
