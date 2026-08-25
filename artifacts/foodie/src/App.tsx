import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import {
  ArrowRight,
  Bike,
  Check,
  ChevronDown,
  ChevronRight,
  Clock3,
  Compass,
  Headphones,
  Heart,
  Leaf,
  MapPin,
  Menu,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Star,
  Store,
  Utensils,
  X,
  type LucideIcon,
} from 'lucide-react';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

type Category = 'All' | 'South Indian' | 'Biryani' | 'Pizza' | 'Burgers' | 'Healthy';
type Restaurant = {
  id: number;
  name: string;
  cuisine: string;
  time: string;
  rating: string;
  reviews: string;
  image: string;
  color: string;
  tags: string[];
  category: Category;
};
type Dish = {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  image: string;
  category: Category;
  description: string;
};
type CartItem = Dish & { quantity: number };

const restaurants: Restaurant[] = [
  {
    id: 1,
    name: 'Sree Annapoorna',
    cuisine: 'South Indian · Vegetarian',
    time: '25–30 min',
    rating: '4.8',
    reviews: '2.4k',
    image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=900',
    color: '#f3d365',
    tags: ['Bestseller', 'Pure veg'],
    category: 'South Indian',
  },
  {
    id: 2,
    name: 'Junior Kuppanna',
    cuisine: 'Kongu · Chettinad',
    time: '35–40 min',
    rating: '4.7',
    reviews: '1.8k',
    image: 'https://images.pexels.com/photos/5638732/pexels-photo-5638732.jpeg?auto=compress&cs=tinysrgb&w=900',
    color: '#ed8d65',
    tags: ['Local favourite', 'Spicy'],
    category: 'Biryani',
  },
  {
    id: 3,
    name: 'Bird on Tree',
    cuisine: 'Artisan · Continental',
    time: '20–25 min',
    rating: '4.6',
    reviews: '924',
    image: 'https://images.pexels.com/photos/376464/pexels-photo-376464.jpeg?auto=compress&cs=tinysrgb&w=900',
    color: '#a9d6c1',
    tags: ['New in town', 'Brunch'],
    category: 'Healthy',
  },
  {
    id: 4,
    name: 'Biggy Burger',
    cuisine: 'Burgers · American',
    time: '30–35 min',
    rating: '4.5',
    reviews: '1.1k',
    image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=900',
    color: '#f0b36f',
    tags: ['Free delivery', 'Popular'],
    category: 'Burgers',
  },
];

const dishes: Dish[] = [
  { id: 101, name: 'Ghee Roast Dosa', restaurant: 'Sree Annapoorna', price: 110, image: 'https://images.pexels.com/photos/5560763/pexels-photo-5560763.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'South Indian', description: 'Paper-crisp, brushed with house ghee and served with three chutneys.' },
  { id: 102, name: 'Kongu Chicken Biryani', restaurant: 'Junior Kuppanna', price: 280, image: 'https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'Biryani', description: 'Seeraga samba rice, tender chicken and a slow-roasted masala.' },
  { id: 103, name: 'Coimbatore Club Sandwich', restaurant: 'Bird on Tree', price: 245, image: 'https://images.pexels.com/photos/1603901/pexels-photo-1603901.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'Healthy', description: 'Toasted sourdough layered with greens, egg and a bright herb aioli.' },
  { id: 104, name: 'The Biggy Smash', restaurant: 'Biggy Burger', price: 299, image: 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'Burgers', description: 'Two caramelised patties, sharp cheddar and a secret house sauce.' },
  { id: 105, name: 'Pepper Chicken 65', restaurant: 'Junior Kuppanna', price: 220, image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'Biryani', description: 'Curry leaf, cracked pepper and a proper Coimbatore kick.' },
  { id: 106, name: 'Mushroom Pepper Fry', restaurant: 'Sree Annapoorna', price: 185, image: 'https://images.pexels.com/photos/16743486/pexels-photo-16743486.jpeg?auto=compress&cs=tinysrgb&w=700', category: 'South Indian', description: 'Wok-tossed button mushrooms with shallots, pepper and coriander.' },
];

const categories: { label: Category; icon: LucideIcon; note: string }[] = [
  { label: 'All', icon: Compass, note: 'The whole spread' },
  { label: 'South Indian', icon: Utensils, note: 'Crisp & comforting' },
  { label: 'Biryani', icon: Sparkles, note: 'Slow cooked joy' },
  { label: 'Pizza', icon: Store, note: 'Cheesy & hot' },
  { label: 'Burgers', icon: ShoppingBag, note: 'Big, juicy energy' },
  { label: 'Healthy', icon: Leaf, note: 'Freshly made' },
];

const queryClient = new QueryClient();

function money(value: number) {
  return `₹${value.toLocaleString('en-IN')}`;
}

function AppShell() {
  const [location, setLocation] = useState('RS Puram');
  const [locationOpen, setLocationOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<Category>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [menuRestaurant, setMenuRestaurant] = useState<Restaurant | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileNav, setMobileNav] = useState(false);
  const [toast, setToast] = useState('');
  const [claimed, setClaimed] = useState(false);

  const showToast = (message: string) => setToast(message);
  const jumpTo = (id: string) => {
    setMobileNav(false);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const filteredRestaurants = useMemo(() => {
    const value = query.trim().toLowerCase();
    return restaurants.filter((restaurant) => {
      const matchesQuery = !value || `${restaurant.name} ${restaurant.cuisine} ${restaurant.category}`.toLowerCase().includes(value);
      const matchesCategory = category === 'All' || restaurant.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const filteredDishes = useMemo(() => {
    const value = query.trim().toLowerCase();
    return dishes.filter((dish) => {
      const matchesQuery = !value || `${dish.name} ${dish.restaurant} ${dish.description}`.toLowerCase().includes(value);
      const matchesCategory = category === 'All' || dish.category === category;
      return matchesQuery && matchesCategory;
    });
  }, [query, category]);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const addToCart = (dish: Dish) => {
    setCart((current) => {
      const existing = current.find((item) => item.id === dish.id);
      if (existing) return current.map((item) => item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...dish, quantity: 1 }];
    });
    showToast(`${dish.name} added to your bag`);
  };

  const updateQuantity = (id: number, amount: number) => {
    setCart((current) => current.flatMap((item) => item.id === id
      ? (item.quantity + amount > 0 ? [{ ...item, quantity: item.quantity + amount }] : [])
      : [item]));
  };

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(''), 2600);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <div className="grain min-h-[100dvh] overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-[#d9cfba]/70 bg-[#f8f3e8]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] max-w-[1240px] items-center justify-between px-5 lg:px-8">
          <button data-testid="button-logo" onClick={() => jumpTo('top')} className="flex items-center gap-2.5 text-left">
            <span className="grid h-10 w-10 rotate-[-7deg] place-items-center rounded-[13px] bg-primary text-primary-foreground shadow-[4px_4px_0_hsl(44_93%_61%)]">
              <Utensils size={21} strokeWidth={2.4} />
            </span>
            <span className="serif text-[25px] font-bold leading-none tracking-[-.04em]">foodie<span className="text-primary">.</span></span>
          </button>

          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary navigation">
            <button data-testid="link-discover" onClick={() => jumpTo('discover')} className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-primary">Discover</button>
            <button data-testid="link-restaurants" onClick={() => jumpTo('restaurants')} className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-primary">Restaurants</button>
            <button data-testid="link-dishes" onClick={() => jumpTo('dishes')} className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-primary">Popular food</button>
            <button data-testid="link-how-it-works" onClick={() => jumpTo('how-it-works')} className="text-[13px] font-semibold text-foreground/70 transition-colors hover:text-primary">How it works</button>
          </nav>

          <div className="flex items-center gap-2.5">
            <div className="relative hidden sm:block">
              <button data-testid="button-location" onClick={() => setLocationOpen((open) => !open)} className="flex items-center gap-2 rounded-full px-3 py-2 text-[13px] font-bold transition-colors hover:bg-[#eee5d5]">
                <MapPin size={16} className="text-primary" fill="currentColor" />
                <span>{location}</span>
                <ChevronDown size={14} className={locationOpen ? 'rotate-180 transition-transform' : 'transition-transform'} />
              </button>
              {locationOpen && (
                <div className="absolute right-0 top-12 w-52 rounded-2xl border border-border bg-card p-2 shadow-[0_15px_40px_hsl(188_42%_16%/.14)]">
                  <p className="px-3 pb-2 pt-1 text-[10px] font-bold uppercase tracking-[.16em] text-muted-foreground">Delivering to</p>
                  {['RS Puram', 'Race Course', 'Saibaba Colony'].map((area) => (
                    <button data-testid={`button-location-${area.replaceAll(' ', '-').toLowerCase()}`} key={area} onClick={() => { setLocation(area); setLocationOpen(false); showToast(`Delivering to ${area}`); }} className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-left text-sm font-semibold hover:bg-muted">
                      {area} {location === area && <Check size={15} className="text-primary" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <button data-testid="button-cart-header" onClick={() => setCartOpen(true)} className="relative grid h-10 w-10 place-items-center rounded-full border border-border bg-card transition-all hover:-translate-y-0.5 hover:border-primary hover:text-primary">
              <ShoppingBag size={18} />
              {cartCount > 0 && <span data-testid="text-cart-count" className="absolute -right-1 -top-1 grid min-h-5 min-w-5 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-primary-foreground">{cartCount}</span>}
            </button>
            <button data-testid="button-mobile-menu" onClick={() => setMobileNav((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full border border-border bg-card md:hidden">
              {mobileNav ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
        {mobileNav && (
          <nav className="border-t border-border bg-[#f8f3e8] px-5 py-3 md:hidden">
            <button data-testid="mobile-link-discover" onClick={() => jumpTo('discover')} className="block w-full border-b border-border/70 py-3 text-left text-sm font-bold">Discover</button>
            <button data-testid="mobile-link-restaurants" onClick={() => jumpTo('restaurants')} className="block w-full border-b border-border/70 py-3 text-left text-sm font-bold">Restaurants</button>
            <button data-testid="mobile-link-dishes" onClick={() => jumpTo('dishes')} className="block w-full border-b border-border/70 py-3 text-left text-sm font-bold">Popular food</button>
            <button data-testid="mobile-link-how-it-works" onClick={() => jumpTo('how-it-works')} className="block w-full border-b border-border/70 py-3 text-left text-sm font-bold">How it works</button>
            <button data-testid="mobile-button-location" onClick={() => { setLocationOpen((open) => !open); setMobileNav(false); }} className="flex w-full items-center gap-2 py-3 text-left text-sm font-bold text-primary"><MapPin size={15} /> Deliver to {location}</button>
          </nav>
        )}
      </header>

      <main id="top">
        <section id="discover" className="relative mx-auto grid min-h-[650px] max-w-[1240px] items-center gap-10 px-5 pb-16 pt-14 lg:grid-cols-[.93fr_1.07fr] lg:px-8 lg:pb-24 lg:pt-20">
          <div className="relative z-10 max-w-[560px]">
            <div className="reveal mb-6 inline-flex items-center gap-2 rounded-full border border-[#e7c46e] bg-[#fff1bd] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[.15em] text-[#825d1b]">
              <Sparkles size={14} /> Coimbatore, your table is ready
            </div>
            <h1 data-testid="text-hero-title" className="reveal delay-1 serif max-w-[620px] text-[clamp(3.8rem,7.4vw,6.8rem)] font-extrabold leading-[.91] tracking-[-.07em] text-secondary">
              Good Food.<br /><span className="text-primary">Great Mood.</span><br /><em className="font-normal text-secondary">Delivered.</em>
            </h1>
            <p className="reveal delay-2 mt-7 max-w-[420px] text-[16px] leading-7 text-muted-foreground">The best of Coimbatore, brought to your door. Find your next favourite meal, from the local legend to the hidden gem.</p>
            <div className="reveal delay-3 mt-8 flex max-w-[510px] items-center rounded-2xl border border-border bg-card p-2 shadow-[0_15px_35px_hsl(188_42%_16%/.08)] focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/10">
              <Search size={21} className="ml-3 shrink-0 text-primary" />
              <input data-testid="input-food-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search dishes, restaurants, cravings..." className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm font-medium outline-none placeholder:text-muted-foreground/70" />
              <button data-testid="button-search" onClick={() => jumpTo(query ? 'restaurants' : 'dishes')} className="rounded-xl bg-primary px-4 py-3 text-xs font-bold text-primary-foreground transition-transform hover:scale-[1.03]">Find food</button>
            </div>
            <div className="reveal delay-4 mt-5 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="grid h-7 w-7 place-items-center rounded-full bg-secondary text-accent"><Check size={14} strokeWidth={3} /></span>
              <span><strong className="text-foreground">30% off</strong> your first order · Use code <strong className="text-primary">HELLOFOOD</strong></span>
            </div>
          </div>

          <div className="relative mx-auto h-[510px] w-full max-w-[590px] lg:h-[570px]">
            <div className="absolute right-[3%] top-[4%] h-[78%] w-[75%] rounded-[47%_53%_42%_58%/46%_40%_60%_54%] bg-[#f2cf5b]"></div>
            <div className="absolute bottom-[7%] left-[4%] h-[30%] w-[45%] rounded-[50%] bg-[#b7d6bd]"></div>
            <div className="absolute left-[4%] top-[13%] z-10 rounded-full bg-secondary px-4 py-2 text-xs font-bold text-[#fff1bd] shadow-lg rotate-[-8deg]">Made for sharing</div>
            <div className="float-soft absolute right-[3%] top-[4%] z-10 h-[205px] w-[205px] overflow-hidden rounded-[39%_61%_55%_45%/53%_38%_62%_47%] border-[10px] border-[#f8f3e8] shadow-[0_24px_50px_hsl(188_42%_16%/.18)]">
              <img src="https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg?auto=compress&cs=tinysrgb&w=600" alt="colourful salad bowl" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-[11%] left-[8%] z-10 h-[335px] w-[335px] overflow-hidden rounded-[54%_46%_42%_58%/44%_52%_48%_56%] border-[12px] border-[#f8f3e8] shadow-[0_28px_60px_hsl(188_42%_16%/.2)]">
              <img src="https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800" alt="biryani served with herbs" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-[8%] right-[3%] z-20 flex items-center gap-2 rounded-2xl border border-border bg-card px-3 py-2 shadow-xl rotate-[4deg]">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#d6eee0] text-secondary"><Bike size={19} /></span>
              <span className="pr-2 text-[11px] font-bold leading-4">At your door<br /><span className="font-normal text-muted-foreground">in under 30 min</span></span>
            </div>
            <div className="absolute left-[5%] top-[43%] z-20 grid h-14 w-14 place-items-center rounded-full border-4 border-[#f8f3e8] bg-primary text-[#fff1bd] shadow-lg rotate-[-15deg]"><Heart size={23} fill="currentColor" /></div>
          </div>
        </section>

        <div className="overflow-hidden border-y border-secondary/20 bg-secondary py-3 text-[#f8f3e8]">
          <div className="marquee-track flex w-max items-center gap-7 whitespace-nowrap text-[11px] font-bold uppercase tracking-[.2em]">
            {Array.from({ length: 2 }).flatMap((_, index) => ['Dosa for breakfast', 'Biryani for lunch', 'Cake for no reason', 'Good food, good people', 'Coimbatore eats'].map((item, itemIndex) => <span key={`${index}-${itemIndex}`} className="flex items-center gap-7">{item}<Sparkles size={12} className="text-accent" /></span>))}
          </div>
        </div>

        <section className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-9 flex items-end justify-between gap-6">
            <div>
              <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-primary">A little something for everyone</p>
              <h2 className="serif text-4xl font-bold tracking-[-.05em] text-secondary sm:text-5xl">What are you in the mood for?</h2>
            </div>
            <p className="hidden max-w-[210px] text-right text-sm leading-6 text-muted-foreground sm:block">Your cravings called. We picked up.</p>
          </div>
          <div className="hide-scrollbar -mx-5 flex gap-3 overflow-x-auto px-5 pb-3 lg:mx-0 lg:grid lg:grid-cols-6 lg:gap-4 lg:overflow-visible lg:px-0">
            {categories.map(({ label, icon: Icon, note }) => (
              <button data-testid={`button-category-${label.replaceAll(' ', '-').toLowerCase()}`} key={label} onClick={() => { setCategory(label); jumpTo('dishes'); }} className={`group min-w-[145px] rounded-[22px] border p-4 text-left transition-all hover:-translate-y-1 lg:min-w-0 ${category === label ? 'border-secondary bg-secondary text-[#f8f3e8] shadow-[0_12px_25px_hsl(188_42%_16%/.16)]' : 'border-border bg-card hover:border-primary/50'}`}>
                <span className={`mb-8 grid h-11 w-11 place-items-center rounded-[14px] ${category === label ? 'bg-accent text-secondary' : 'bg-[#f9e3d5] text-primary'}`}><Icon size={21} /></span>
                <span className="block text-sm font-bold">{label}</span>
                <span className={`mt-1 block text-[11px] ${category === label ? 'text-[#f8f3e8]/70' : 'text-muted-foreground'}`}>{note}</span>
              </button>
            ))}
          </div>
        </section>

        <section id="restaurants" className="bg-[#ebe7d9] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-10 flex items-end justify-between gap-5">
              <div>
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-primary">People are talking</p>
                <h2 className="serif text-4xl font-bold tracking-[-.05em] text-secondary sm:text-5xl">Popular near you</h2>
              </div>
              <button data-testid="button-clear-filters" onClick={() => { setQuery(''); setCategory('All'); }} className="hidden items-center gap-2 text-xs font-bold text-secondary underline decoration-primary decoration-2 underline-offset-4 sm:flex">Reset filters <X size={14} /></button>
            </div>
            {filteredRestaurants.length > 0 ? (
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {filteredRestaurants.map((restaurant, index) => (
                  <article data-testid={`card-restaurant-${restaurant.id}`} key={restaurant.id} className={`reveal delay-${Math.min(index + 1, 4)} group overflow-hidden rounded-[25px] border border-[#d8cfbf] bg-card transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_35px_hsl(188_42%_16%/.12)]`}>
                    <div className="relative h-52 overflow-hidden">
                      <img src={restaurant.image} alt={restaurant.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
                        <div className="flex gap-1.5">{restaurant.tags.map((tag) => <span key={tag} className="rounded-full bg-[#f8f3e8]/90 px-2.5 py-1 text-[10px] font-bold text-secondary">{tag}</span>)}</div>
                        <button data-testid={`button-favorite-restaurant-${restaurant.id}`} onClick={() => showToast(`${restaurant.name} saved to favourites`)} className="grid h-8 w-8 place-items-center rounded-full bg-[#f8f3e8]/90 text-secondary transition-colors hover:text-primary"><Heart size={15} /></button>
                      </div>
                      <span className="absolute bottom-3 left-3 rounded-full bg-secondary px-2.5 py-1 text-[10px] font-bold text-[#f8f3e8]"><Clock3 size={11} className="mr-1 inline" /> {restaurant.time}</span>
                    </div>
                    <div className="p-4.5 p-5">
                      <div className="flex items-start justify-between gap-2">
                        <div><h3 className="font-bold text-secondary">{restaurant.name}</h3><p className="mt-1 text-[11px] text-muted-foreground">{restaurant.cuisine}</p></div>
                        <span className="flex items-center gap-1 text-xs font-bold"><Star size={13} fill="#f0b632" className="text-[#d4931d]" /> {restaurant.rating}</span>
                      </div>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                        <span className="text-[11px] text-muted-foreground">{restaurant.reviews} reviews</span>
                        <button data-testid={`button-view-menu-${restaurant.id}`} onClick={() => setMenuRestaurant(restaurant)} className="flex items-center gap-1 text-xs font-bold text-primary transition-transform hover:translate-x-0.5">View menu <ArrowRight size={14} /></button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : <EmptyResults query={query} />}
          </div>
        </section>

        <section id="dishes" className="mx-auto max-w-[1240px] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mb-10 flex items-end justify-between">
            <div><p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-primary">Worth the napkins</p><h2 className="serif text-4xl font-bold tracking-[-.05em] text-secondary sm:text-5xl">The good stuff</h2></div>
            <button data-testid="button-dishes-next" onClick={() => showToast('More delicious things are coming soon')} className="grid h-10 w-10 place-items-center rounded-full border border-border transition-colors hover:border-primary hover:text-primary"><ChevronRight size={18} /></button>
          </div>
          {filteredDishes.length > 0 ? (
            <div className="grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
              {filteredDishes.map((dish) => (
                <article data-testid={`card-dish-${dish.id}`} key={dish.id} className="group relative flex gap-4">
                  <div className="relative h-[116px] w-[116px] shrink-0 overflow-hidden rounded-[22px] bg-muted">
                    <img src={dish.image} alt={dish.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" />
                    <button data-testid={`button-add-dish-${dish.id}`} onClick={() => addToCart(dish)} className="absolute bottom-2 right-2 grid h-8 w-8 place-items-center rounded-xl bg-card text-secondary shadow-lg transition-all hover:scale-110 hover:bg-primary hover:text-primary-foreground"><Plus size={16} strokeWidth={2.5} /></button>
                  </div>
                  <div className="flex min-w-0 flex-1 flex-col justify-between py-1">
                    <div><div className="flex items-start justify-between gap-2"><h3 className="font-bold leading-5 text-secondary">{dish.name}</h3><span className="shrink-0 text-sm font-bold text-primary">{money(dish.price)}</span></div><p className="mt-1 text-[11px] font-semibold text-muted-foreground">{dish.restaurant}</p><p className="mt-2 line-clamp-2 text-xs leading-5 text-muted-foreground">{dish.description}</p></div>
                    <button data-testid={`button-add-text-${dish.id}`} onClick={() => addToCart(dish)} className="mt-2 w-fit text-[11px] font-bold text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">Add to order</button>
                  </div>
                </article>
              ))}
            </div>
          ) : <EmptyResults query={query} />}
        </section>

        <section id="offers" className="px-5 pb-20 lg:px-8 lg:pb-28">
          <div className="relative mx-auto max-w-[1240px] overflow-hidden rounded-[32px] bg-primary px-7 py-12 text-primary-foreground sm:px-12 lg:px-20 lg:py-16">
            <div className="absolute -right-16 -top-28 h-80 w-80 rounded-full border-[45px] border-[#f3d365]/30"></div>
            <div className="absolute -bottom-28 right-[28%] h-64 w-64 rounded-full border-[35px] border-[#b7d6bd]/30"></div>
            <div className="relative z-10 max-w-[590px]">
              <div className="mb-5 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#fff1bd]"><Sparkles size={15} /> A little nudge</div>
              <h2 className="serif text-4xl font-bold leading-[1.02] tracking-[-.05em] sm:text-6xl">Your first bite<br /><em className="font-normal">is on us.</em></h2>
              <p className="mt-5 max-w-[400px] text-sm leading-6 text-primary-foreground/80">Take 30% off your first order, because good things should start with a generous hello.</p>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button data-testid="button-claim-offer" onClick={() => { setClaimed(true); showToast('Offer claimed — HELLOFOOD is ready at checkout'); }} className="rounded-xl bg-[#f8f3e8] px-5 py-3.5 text-sm font-bold text-secondary transition-transform hover:scale-[1.03]">{claimed ? 'Offer claimed' : 'Claim offer'} <ArrowRight size={16} className="ml-2 inline" /></button>
                <span className="rounded-xl border border-primary-foreground/30 px-4 py-3 text-sm font-bold tracking-widest text-[#fff1bd]">HELLOFOOD</span>
              </div>
            </div>
            <div className="absolute bottom-[-14px] right-[8%] hidden rotate-[7deg] lg:block"><div className="h-52 w-40 rotate-[-7deg] rounded-[45%_45%_20%_20%] border-[9px] border-[#f8f3e8] bg-[#d6eee0] shadow-2xl"></div><div className="absolute left-[-30px] top-10 h-36 w-36 overflow-hidden rounded-full border-8 border-[#f8f3e8]"><img src="https://images.pexels.com/photos/1099680/pexels-photo-1099680.jpeg?auto=compress&cs=tinysrgb&w=400" alt="fresh meal bowl" className="h-full w-full object-cover" /></div></div>
          </div>
        </section>

        <section id="how-it-works" className="bg-[#dcebe2] px-5 py-20 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-[1240px]">
            <div className="mb-12 max-w-[560px]"><p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-primary">No complicated choreography</p><h2 className="serif text-4xl font-bold tracking-[-.05em] text-secondary sm:text-5xl">From craving to comfort in three taps.</h2></div>
            <div className="grid gap-10 md:grid-cols-3">
              <Step number="01" icon={Compass} title="Find your flavour" text="Search the neighbourhood, browse a mood, or let us surprise you. Your next favourite is close." />
              <Step number="02" icon={ShoppingBag} title="Make it yours" text="Add a dish, make a note, and build a meal that feels exactly like what you wanted." />
              <Step number="03" icon={Bike} title="Meet at the door" text="Follow your order from kitchen to doorstep. We keep the in-between bit beautifully simple." />
            </div>
          </div>
        </section>

        <section className="mx-auto grid max-w-[1240px] items-center gap-12 px-5 py-20 lg:grid-cols-[.85fr_1.15fr] lg:px-8 lg:py-32">
          <div className="relative mx-auto h-[420px] w-full max-w-[420px]">
            <div className="absolute inset-4 rounded-[38%] bg-[#f3d365] rotate-[-7deg]"></div>
            <div className="absolute left-[14%] top-[8%] h-[370px] w-[245px] overflow-hidden rounded-[32px] border-[9px] border-secondary bg-secondary shadow-[15px_22px_0_hsl(12_79%_57%/.85)] rotate-[7deg]">
              <div className="h-6 bg-secondary px-3"><div className="mx-auto mt-2 h-1 w-12 rounded-full bg-[#f8f3e8]/40"></div></div>
              <div className="h-full bg-[#f8f3e8] p-3"><div className="rounded-2xl bg-primary p-3 text-[#f8f3e8]"><p className="text-[9px] font-bold uppercase tracking-widest">Good morning</p><p className="serif mt-2 text-2xl font-bold leading-none">What are<br />you craving?</p><div className="mt-3 h-20 overflow-hidden rounded-xl"><img src="https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&cs=tinysrgb&w=300" alt="coffee and breakfast" className="h-full w-full object-cover" /></div></div><p className="mt-4 text-[9px] font-bold uppercase tracking-wider text-secondary">Popular near you</p><div className="mt-2 grid grid-cols-2 gap-2"><div className="h-16 rounded-xl bg-[#f3d365]"></div><div className="h-16 rounded-xl bg-[#d6eee0]"></div></div></div>
            </div>
            <div className="absolute bottom-[1%] right-[4%] grid h-16 w-16 place-items-center rounded-full border-4 border-[#f8f3e8] bg-primary text-[#fff1bd] shadow-lg"><Smartphone size={27} /></div>
          </div>
          <div className="max-w-[560px]">
            <p className="mb-3 text-[11px] font-bold uppercase tracking-[.18em] text-primary">Good food travels with you</p>
            <h2 className="serif text-4xl font-bold leading-[1.04] tracking-[-.05em] text-secondary sm:text-6xl">Your cravings,<br /><em className="font-normal">in your pocket.</em></h2>
            <p className="mt-6 max-w-[440px] text-[15px] leading-7 text-muted-foreground">Save your favourites, follow every delivery, and get the first look at the newest spots in town. Foodie is made for the way Coimbatore eats.</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button data-testid="button-app-store" onClick={() => showToast('App Store link coming soon')} className="flex items-center gap-3 rounded-xl bg-secondary px-4 py-3 text-left text-[#f8f3e8] transition-transform hover:-translate-y-1"><span className="text-xl"><Smartphone size={21} /></span><span><small className="block text-[9px] uppercase tracking-wider text-[#f8f3e8]/60">Download on the</small><strong className="text-sm">App Store</strong></span></button>
              <button data-testid="button-play-store" onClick={() => showToast('Google Play link coming soon')} className="flex items-center gap-3 rounded-xl border border-secondary bg-transparent px-4 py-3 text-left text-secondary transition-transform hover:-translate-y-1"><span className="text-xl"><PackageCheck size={21} /></span><span><small className="block text-[9px] uppercase tracking-wider text-muted-foreground">Get it on</small><strong className="text-sm">Google Play</strong></span></button>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-secondary px-5 pb-8 pt-16 text-[#f8f3e8] lg:px-8">
        <div className="mx-auto max-w-[1240px]">
          <div className="grid gap-12 border-b border-[#f8f3e8]/15 pb-14 md:grid-cols-[1.4fr_.7fr_.7fr_.8fr]">
            <div><div className="mb-5 flex items-center gap-2.5"><span className="grid h-10 w-10 rotate-[-7deg] place-items-center rounded-[13px] bg-primary text-primary-foreground"><Utensils size={21} /></span><span className="serif text-[25px] font-bold tracking-[-.04em]">foodie<span className="text-accent">.</span></span></div><p className="max-w-[280px] text-sm leading-6 text-[#f8f3e8]/65">Good food from good places, for good people. Proudly delivering around Coimbatore.</p></div>
            <FooterColumn title="Explore" links={[['Discover', 'discover'], ['Restaurants', 'restaurants'], ['Popular food', 'dishes'], ['Offers', 'offers']]} jumpTo={jumpTo} />
            <FooterColumn title="Foodie" links={[['About us', 'how-it-works'], ['How it works', 'how-it-works'], ['Careers', 'how-it-works'], ['Partner with us', 'restaurants']]} jumpTo={jumpTo} />
            <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-accent">Need a hand?</h3><button data-testid="button-help" onClick={() => showToast('Our support team is on it')} className="flex items-center gap-2 text-sm text-[#f8f3e8]/80 hover:text-accent"><Headphones size={16} /> Talk to support <ArrowRight size={14} /></button><div className="mt-8 flex gap-2"><button data-testid="button-footer-location" onClick={() => showToast('Currently serving Coimbatore')} className="flex items-center gap-2 rounded-full border border-[#f8f3e8]/20 px-3 py-2 text-xs text-[#f8f3e8]/70"><MapPin size={13} /> Coimbatore</button></div></div>
          </div>
          <div className="flex flex-col justify-between gap-3 pt-6 text-[11px] text-[#f8f3e8]/45 sm:flex-row"><span>© 2024 Foodie. Made with appetite.</span><span>Privacy · Terms · Accessibility</span></div>
        </div>
      </footer>

      {menuRestaurant && <MenuDialog restaurant={menuRestaurant} onClose={() => setMenuRestaurant(null)} onAdd={addToCart} />}
      {cartOpen && <CartDialog cart={cart} total={cartTotal} onClose={() => setCartOpen(false)} onUpdate={updateQuantity} onCheckout={() => { setCartOpen(false); showToast('Checkout is ready when you are'); }} />}
      {toast && <div data-testid="status-toast" role="status" className="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 items-center gap-2 rounded-full bg-secondary px-4 py-3 text-xs font-bold text-[#f8f3e8] shadow-[0_12px_30px_hsl(188_42%_16%/.2)]"><Check size={15} className="text-accent" /> {toast}</div>}
    </div>
  );
}

function EmptyResults({ query }: { query: string }) {
  return <div data-testid="empty-search-results" className="rounded-[25px] border border-dashed border-border bg-card px-6 py-14 text-center"><Search className="mx-auto mb-4 text-primary" size={30} /><h3 className="serif text-2xl font-bold text-secondary">No bites found{query ? ` for “${query}”` : ''}</h3><p className="mt-2 text-sm text-muted-foreground">Try a different craving or clear your filters.</p></div>;
}

function Step({ number, icon: Icon, title, text }: { number: string; icon: LucideIcon; title: string; text: string }) {
  return <div data-testid={`step-${number}`} className="relative max-w-[310px]"><div className="mb-7 flex items-center justify-between"><span className="serif text-5xl font-bold text-secondary/20">{number}</span><span className="grid h-12 w-12 place-items-center rounded-2xl bg-[#f8f3e8] text-primary shadow-sm"><Icon size={22} /></span></div><h3 className="serif text-2xl font-bold tracking-[-.03em] text-secondary">{title}</h3><p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p></div>;
}

function FooterColumn({ title, links, jumpTo }: { title: string; links: [string, string][]; jumpTo: (id: string) => void }) {
  return <div><h3 className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-accent">{title}</h3><div className="space-y-3">{links.map(([label, id]) => <button data-testid={`footer-link-${label.replaceAll(' ', '-').toLowerCase()}`} key={label} onClick={() => jumpTo(id)} className="block text-left text-sm text-[#f8f3e8]/65 transition-colors hover:text-accent">{label}</button>)}</div></div>;
}

function MenuDialog({ restaurant, onClose, onAdd }: { restaurant: Restaurant; onClose: () => void; onAdd: (dish: Dish) => void }) {
  const menu = dishes.filter((dish) => dish.restaurant === restaurant.name);
  return <div className="fixed inset-0 z-50 flex items-end justify-center bg-secondary/60 p-0 backdrop-blur-sm sm:items-center sm:p-5" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="menu-title" className="max-h-[90dvh] w-full max-w-[570px] overflow-y-auto rounded-t-[30px] bg-card shadow-2xl sm:rounded-[30px]">
      <div className="relative h-44 overflow-hidden"><img src={restaurant.image} alt="" className="h-full w-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-secondary/70 to-transparent"></div><button data-testid="button-close-menu" onClick={onClose} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-[#f8f3e8]/90 text-secondary"><X size={18} /></button><div className="absolute bottom-5 left-6"><p className="text-[11px] font-bold uppercase tracking-widest text-accent">{restaurant.cuisine}</p><h2 id="menu-title" className="serif mt-1 text-3xl font-bold text-[#f8f3e8]">{restaurant.name}</h2></div></div>
      <div className="p-6"><div className="mb-5 flex items-center gap-4 text-xs text-muted-foreground"><span className="flex items-center gap-1"><Star size={13} fill="#e1a51c" className="text-[#c88b18]" /> {restaurant.rating} rating</span><span className="flex items-center gap-1"><Clock3 size={13} /> {restaurant.time}</span></div><div className="space-y-4">{(menu.length ? menu : dishes.slice(0, 2)).map((dish) => <div data-testid={`menu-item-${dish.id}`} key={dish.id} className="flex items-center gap-3 border-b border-border pb-4 last:border-0 last:pb-0"><img src={dish.image} alt={dish.name} className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-secondary">{dish.name}</h3><p className="mt-1 text-xs text-muted-foreground">{money(dish.price)}</p></div><button data-testid={`button-menu-add-${dish.id}`} onClick={() => onAdd(dish)} className="rounded-xl border border-primary px-3 py-2 text-xs font-bold text-primary hover:bg-primary hover:text-primary-foreground">Add <Plus size={13} className="ml-1 inline" /></button></div>)}</div></div>
    </div>
  </div>;
}

function CartDialog({ cart, total, onClose, onUpdate, onCheckout }: { cart: CartItem[]; total: number; onClose: () => void; onUpdate: (id: number, amount: number) => void; onCheckout: () => void }) {
  return <div className="fixed inset-0 z-50 flex justify-end bg-secondary/50 backdrop-blur-sm" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}>
    <div role="dialog" aria-modal="true" aria-labelledby="cart-title" className="flex h-full w-full max-w-[430px] flex-col bg-card shadow-2xl">
      <div className="flex items-center justify-between border-b border-border px-6 py-5"><div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-primary">Your order</p><h2 id="cart-title" className="serif mt-1 text-3xl font-bold text-secondary">The goodie bag</h2></div><button data-testid="button-close-cart" onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full border border-border hover:text-primary"><X size={18} /></button></div>
      {cart.length === 0 ? <div data-testid="empty-cart" className="flex flex-1 flex-col items-center justify-center px-8 text-center"><span className="mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-[#f9e3d5] text-primary"><ShoppingBag size={27} /></span><h3 className="serif text-2xl font-bold text-secondary">Your bag is taking a nap</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">Add something delicious and we’ll take it from here.</p><button data-testid="button-empty-cart-close" onClick={onClose} className="mt-6 rounded-xl bg-primary px-5 py-3 text-sm font-bold text-primary-foreground">Find a bite</button></div> : <><div className="flex-1 space-y-4 overflow-y-auto p-6">{cart.map((item) => <div data-testid={`cart-item-${item.id}`} key={item.id} className="flex gap-3"><img src={item.image} alt={item.name} className="h-16 w-16 rounded-2xl object-cover" /><div className="min-w-0 flex-1"><h3 className="text-sm font-bold text-secondary">{item.name}</h3><p className="mt-1 text-xs text-muted-foreground">{money(item.price)} · {item.restaurant}</p><div className="mt-2 flex w-fit items-center gap-3 rounded-lg border border-border px-2 py-1"><button data-testid={`button-decrease-${item.id}`} onClick={() => onUpdate(item.id, -1)}><Minus size={13} /></button><span data-testid={`text-quantity-${item.id}`} className="text-xs font-bold">{item.quantity}</span><button data-testid={`button-increase-${item.id}`} onClick={() => onUpdate(item.id, 1)}><Plus size={13} /></button></div></div><span className="text-sm font-bold text-primary">{money(item.price * item.quantity)}</span></div>)}</div><div className="border-t border-border bg-[#f8f3e8] p-6"><div className="mb-3 flex justify-between text-sm text-muted-foreground"><span>Subtotal</span><span>{money(total)}</span></div><div className="mb-5 flex justify-between text-sm text-muted-foreground"><span>Delivery</span><span className="font-semibold text-secondary">Free</span></div><div className="mb-5 flex justify-between text-lg font-bold text-secondary"><span>Total</span><span>{money(total)}</span></div><button data-testid="button-checkout" onClick={onCheckout} className="w-full rounded-xl bg-primary py-3.5 text-sm font-bold text-primary-foreground transition-transform hover:scale-[1.01]">Continue to checkout <ArrowRight size={16} className="ml-2 inline" /></button></div></>}
    </div>
  </div>;
}

function Router() {
  return <Switch><Route path="/" component={AppShell} /><Route component={NotFound} /></Switch>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><ErrorBoundary><Router /></ErrorBoundary></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;