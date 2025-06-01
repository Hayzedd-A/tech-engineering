import { BlogPost, PaginatedResponse } from '@/lib/types';

// Mock blog posts data
const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'How to Fix a Cracked iPhone Screen',
    excerpt: 'Learn the step-by-step process to replace your iPhone screen safely and effectively.',
    content: `A cracked iPhone screen is one of the most common issues smartphone users face. While it might seem daunting, replacing an iPhone screen can be done with the right tools and patience.

## What You'll Need

- Replacement screen assembly
- Pentalobe screwdriver
- Phillips screwdriver
- Plastic opening tools
- Suction cup
- Heat gun or hair dryer

## Step-by-Step Process

### 1. Power Down Your Device
Before starting any repair, make sure your iPhone is completely powered off to avoid any electrical damage.

### 2. Remove the Pentalobe Screws
Use the pentalobe screwdriver to remove the two screws at the bottom of your iPhone, next to the charging port.

### 3. Heat the Edges
Apply gentle heat around the edges of the screen to soften the adhesive. Be careful not to overheat.

### 4. Create an Opening
Use the suction cup and plastic opening tools to carefully separate the screen from the frame.

### 5. Disconnect the Cables
Carefully disconnect the display cables and remove the old screen assembly.

### 6. Install the New Screen
Connect the new screen assembly and carefully place it back into the frame.

### 7. Reassemble
Replace all screws and test your device before fully closing it up.

## Important Tips

- Take your time - rushing can lead to mistakes
- Keep track of all screws in a organized manner
- Test the new screen before final assembly
- Consider professional help if you're not confident

## Conclusion

While screen replacement requires patience and the right tools, it's definitely achievable for most people. If you're not comfortable doing it yourself, our professional repair service offers same-day screen replacements with a 90-day warranty.`,
    category: 'repair-tips',
    author: 'Tech Repair Expert',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600',
    tags: ['iphone', 'screen-repair', 'diy', 'tutorial'],
    published: true,
    featured: true,
    publishedAt: '2024-01-15T10:00:00Z',
    createdAt: '2024-01-15T09:00:00Z',
    updatedAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'Signs Your Phone Battery Needs Replacement',
    excerpt: 'Discover the warning signs that indicate your smartphone battery is failing and needs to be replaced.',
    content: `Smartphone batteries don't last forever. Over time, they degrade and lose their ability to hold a charge effectively. Here are the key signs that indicate it's time for a battery replacement.

## Common Warning Signs

### 1. Rapid Battery Drain
If your phone's battery percentage drops quickly even with minimal usage, this is often the first sign of battery degradation.

### 2. Unexpected Shutdowns
When your phone shuts down unexpectedly, especially when the battery shows 20% or more charge remaining, the battery likely needs replacement.

### 3. Slow Charging
If your phone takes much longer to charge than it used to, or stops charging at a certain percentage, the battery may be failing.

### 4. Overheating
Excessive heat during charging or normal use can indicate battery problems and potential safety concerns.

### 5. Physical Swelling
A swollen battery is a serious safety issue. If your phone's back cover is bulging or the screen is separating, stop using the device immediately.

## Battery Health Check

### iPhone Users
Go to Settings > Battery > Battery Health & Charging to see your battery's maximum capacity.

### Android Users
Use built-in battery settings or download apps like AccuBattery to monitor battery health.

## When to Replace

- Battery health below 80%
- Phone is more than 2-3 years old
- Multiple warning signs present
- Safety concerns (swelling, overheating)

## Professional vs DIY

While some users attempt DIY battery replacement, we recommend professional service for:
- Safety reasons (lithium batteries can be dangerous)
- Proper disposal of old batteries
- Warranty protection
- Quality assurance

## Conclusion

Don't wait until your battery completely fails. Early replacement can prevent data loss and potential safety issues. Our battery replacement service includes genuine parts and comes with a 1-year warranty.`,
    category: 'maintenance',
    author: 'Battery Specialist',
    image: 'https://images.unsplash.com/photo-1609592806596-4d1b5e1c8b8e?w=600',
    tags: ['battery', 'maintenance', 'smartphone', 'replacement'],
    published: true,
    featured: false,
    publishedAt: '2024-01-10T14:30:00Z',
    createdAt: '2024-01-10T13:30:00Z',
    updatedAt: '2024-01-10T14:30:00Z',
  },
  {
    id: '3',
    title: 'Water Damage: What to Do Immediately',
    excerpt: 'Quick action steps to take when your device gets water damaged to maximize recovery chances.',
    content: `Water damage is every smartphone owner's nightmare. However, quick and proper action can often save your device. Here's what you need to do immediately.

## Immediate Actions (First 5 Minutes)

### 1. Power Off Immediately
Turn off your device right away. Don't try to test if it still works - this can cause short circuits.

### 2. Remove External Components
- Take out the SIM card and SD card
- Remove the case and screen protector
- If possible, remove the battery (older phones)

### 3. Dry External Surfaces
Gently pat dry the outside of your device with a clean, dry cloth.

## What NOT to Do

- Don't use a hair dryer or heat gun
- Don't put it in the microwave
- Don't shake the device vigorously
- Don't press buttons repeatedly
- Don't charge the device

## Drying Methods

### Rice Method (Myth Busted)
Contrary to popular belief, rice is not the most effective drying agent. It can even leave residue in ports.

### Better Alternatives
- Silica gel packets (if available)
- Professional desiccants
- Dry, warm environment with good airflow

### Professional Drying
For best results, bring your device to a professional repair service within 24-48 hours.

## Recovery Process

### Assessment
Professional technicians will:
- Disassemble the device completely
- Clean all components with specialized solutions
- Check for corrosion and damage
- Test all functions

### Cleaning Process
- Ultrasonic cleaning baths
- Isopropyl alcohol treatment
- Corrosion removal
- Component replacement if needed

## Prevention Tips

- Use waterproof cases near water
- Avoid using phones in humid environments
- Consider water-resistant devices
- Regular maintenance checks

## Success Rates

Recovery success depends on:
- Type of liquid (fresh water vs salt water vs other liquids)
- Duration of exposure
- How quickly proper action was taken
- Device age and condition

## When to Seek Professional Help

Immediately if:
- Device was submerged for more than a few seconds
- Liquid was salt water or contained chemicals
- Device shows signs of corrosion
- You're not comfortable with DIY methods

## Conclusion

Water damage doesn't always mean the end of your device. Quick action and professional treatment can often restore full functionality. Our water damage recovery service has a high success rate and includes thorough cleaning and testing.`,
    category: 'troubleshooting',
    author: 'Repair Technician',
    image: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=600',
    tags: ['water-damage', 'emergency', 'recovery', 'troubleshooting'],
    published: true,
    featured: true,
    publishedAt: '2024-01-05T16:00:00Z',
    createdAt: '2024-01-05T15:00:00Z',
    updatedAt: '2024-01-05T16:00:00Z',
  },
  {
    id: '4',
    title: 'Latest Smartphone Trends 2024',
    excerpt: 'Explore the cutting-edge features and innovations shaping the smartphone industry this year.',
    content: `The smartphone industry continues to evolve rapidly. Here are the key trends defining 2024.

## Major Trends

### 1. AI Integration
- Advanced camera AI
- Personal assistants
- Predictive text and behavior
- Real-time translation

### 2. Foldable Displays
- Improved durability
- Better software optimization
- More affordable options
- New form factors

### 3. Camera Innovations
- Periscope zoom lenses
- Computational photography
- Night mode improvements
- Professional video features

### 4. Battery Technology
- Faster charging speeds
- Wireless charging improvements
- Better battery longevity
- Reverse wireless charging

### 5. 5G Expansion
- Better coverage
- Improved speeds
- Lower latency
- New applications

## Sustainability Focus

- Recycled materials
- Longer software support
- Repairability improvements
- Trade-in programs

## What This Means for Repairs

As devices become more complex, professional repair services become increasingly important for:
- Specialized tools and knowledge
- Genuine parts availability
- Software calibration
- Warranty preservation

## Conclusion

While new features are exciting, proper maintenance and professional repair services ensure your investment lasts longer and performs better.`,
    category: 'industry-news',
    author: 'Tech Analyst',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600',
    tags: ['trends', '2024', 'technology', 'innovation'],
    published: false,
    featured: false,
    publishedAt: null,
    createdAt: '2024-01-20T12:00:00Z',
    updatedAt: '2024-01-20T12:00:00Z',
  },
];

export async function getBlogPosts(params: {
  page: number;
  limit: number;
  search?: string;
}): Promise<PaginatedResponse<BlogPost>> {
  const { page, limit, search } = params;
  
  let filteredPosts = blogPosts;
  
  if (search) {
    const searchLower = search.toLowerCase();
    filteredPosts = blogPosts.filter(post =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower) ||
      post.category.toLowerCase().includes(searchLower) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchLower))
    );
  }

  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  
  const data = filteredPosts
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(startIndex, endIndex);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  return blogPosts.find(post => post.id === id) || null;
}

export async function createBlogPost(data: Partial<BlogPost>): Promise<BlogPost> {
  const newPost: BlogPost = {
    id: Date.now().toString(),
    title: data.title || '',
    excerpt: data.excerpt || '',
    content: data.content || '',
    category: data.category || '',
    author: data.author || 'Admin',
    image: data.image || '',
    tags: data.tags || [],
    published: data.published || false,
    featured: data.featured || false,
    publishedAt: data.published ? new Date().toISOString() : null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  blogPosts.unshift(newPost);
  return newPost;
}

export async function updateBlogPost(id: string, data: Partial<BlogPost>): Promise<BlogPost | null> {
  const index = blogPosts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return null;
  }

  blogPosts[index] = {
    ...blogPosts[index],
    ...data,
    updatedAt: new Date().toISOString(),
  };

  return blogPosts[index];
}

export async function deleteBlogPost(id: string): Promise<boolean> {
  const index = blogPosts.findIndex(post => post.id === id);
  
  if (index === -1) {
    return false;
  }

  blogPosts.splice(index, 1);
  return true;
}

export async function getPublishedBlogPosts(params: {
  page: number;
  limit: number;
  category?: string;
}): Promise<PaginatedResponse<BlogPost>> {
  const { page, limit, category } = params;

  let filteredPosts = blogPosts.filter((post) => post.published);

  if (category) {
    filteredPosts = filteredPosts.filter((post) => post.category === category);
  }

  const total = filteredPosts.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;

  const data = filteredPosts
    .sort(
      (a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
    )
    .slice(startIndex, endIndex);

  return {
    data,
    pagination: {
      page,
      limit,
      total,
      totalPages,
    },
  };
}

export async function getFeaturedBlogPosts(
  limit: number = 3
): Promise<BlogPost[]> {
  return blogPosts
    .filter((post) => post.published && post.featured)
    .sort(
      (a, b) =>
        new Date(b.publishedAt || 0).getTime() -
        new Date(a.publishedAt || 0).getTime()
    )
    .slice(0, limit);
}

export async function getBlogCategories(): Promise<string[]> {
  const categories = [...new Set(blogPosts.map((post) => post.category))];
  return categories.filter((category) => category);
}
export async function getBlogPostCount(): Promise<number> {
  return blogPosts.length;
}