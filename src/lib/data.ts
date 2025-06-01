export interface Service {
  id: string;
  name: string;
  description: string;
  price: string;
  icon: string;
  duration: string;
}

export interface Product {
  id: string;
  name: string;
  brand: string;
  condition: 'new' | 'used' | 'refurbished';
  price: number;
  image: string;
  description: string;
  specifications: string[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
}

export const services: Service[] = [
  {
    id: '1',
    name: 'Screen Repair',
    description: 'Professional screen replacement for all phone models',
    price: '$50 - $200',
    icon: '📱',
    duration: '30-60 mins'
  },
  {
    id: '2',
    name: 'Battery Replacement',
    description: 'Replace old batteries with genuine parts',
    price: '$30 - $80',
    icon: '🔋',
    duration: '20-30 mins'
  },
  {
    id: '3',
    name: 'Water Damage Repair',
    description: 'Complete water damage assessment and repair',
    price: '$80 - $150',
    icon: '💧',
    duration: '2-4 hours'
  },
  {
    id: '4',
    name: 'Software Flashing',
    description: 'Firmware updates and software troubleshooting',
    price: '$40 - $100',
    icon: '💻',
    duration: '1-2 hours'
  },
  {
    id: '5',
    name: 'IMEI Unlocking',
    description: 'Network unlocking services for all carriers',
    price: '$25 - $60',
    icon: '🔓',
    duration: '15-30 mins'
  },
  {
    id: '6',
    name: 'Charging Port Repair',
    description: 'Fix charging issues and port replacements',
    price: '$35 - $90',
    icon: '🔌',
    duration: '45-90 mins'
  }
];

export const products: Product[] = [
  {
    id: "1",
    name: "iPhone 14 Pro",
    brand: "Apple",
    condition: "new",
    price: 999,
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=400",
    description: "Latest iPhone with Pro camera system",
    specifications: [
      '6.1" Display',
      "128GB Storage",
      "A16 Bionic Chip",
      "48MP Camera",
    ],
  },
  {
    id: "2",
    name: "Samsung Galaxy S23",
    brand: "Samsung",
    condition: "new",
    price: 799,
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400",
    description: "Flagship Samsung phone with excellent camera",
    specifications: [
      '6.1" Dynamic AMOLED',
      "256GB Storage",
      "Snapdragon 8 Gen 2",
      "50MP Camera",
    ],
  },
  {
    id: "3",
    name: "iPhone 13",
    brand: "Apple",
    condition: "refurbished",
    price: 649,
    image: "https://images.unsplash.com/photo-1632633173522-05b1ce0be2b1?w=400",
    description: "Refurbished iPhone 13 in excellent condition",
    specifications: [
      '6.1" Display',
      "128GB Storage",
      "A15 Bionic",
      "12MP Dual Camera",
    ],
  },
  {
    id: "4",
    name: "Google Pixel 7",
    brand: "Google",
    condition: "used",
    price: 449,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400",
    description: "Google Pixel with pure Android experience",
    specifications: [
      '6.3" OLED',
      "128GB Storage",
      "Google Tensor G2",
      "50MP Camera",
    ],
  },
  {
    id: "5",
    name: "iPad Air",
    brand: "Apple",
    condition: "new",
    price: 599,
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400",
    description: "Powerful iPad Air for work and creativity",
    specifications: [
      '10.9" Liquid Retina',
      "64GB Storage",
      "M1 Chip",
      "Touch ID",
    ],
  },
  {
    id: "6",
    name: "AirPods Pro",
    brand: "Apple",
    condition: "new",
    price: 249,
    image: "https://images.unsplash.com/photo-1606220945770-b5b6c2c55bf1?w=400",
    description: "Premium wireless earbuds with noise cancellation",
    specifications: [
      "Active Noise Cancellation",
      "Spatial Audio",
      "6 Hours Battery",
      "MagSafe Case",
    ],
  },
];

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "How to Extend Your Phone Battery Life",
    excerpt:
      "Simple tips and tricks to make your phone battery last longer throughout the day.",
    content: `Your phone's battery is one of its most important components, and taking care of it properly can significantly extend both its daily life and overall lifespan. Here are some proven strategies to help you get the most out of your device's battery.

## Optimize Your Settings

One of the easiest ways to extend battery life is by adjusting your phone's settings. Start by reducing your screen brightness or enabling auto-brightness, as the display is typically the biggest battery drain. You should also consider shortening your screen timeout period.

## Manage Background Apps

Many apps continue running in the background even when you're not actively using them. Go through your app settings and disable background refresh for apps that don't need it. This can make a significant difference in battery consumption.

## Use Power Saving Modes

Most modern smartphones come with built-in power saving modes. These modes automatically adjust various settings to extend battery life when you need it most. Don't hesitate to use them when your battery is running low.

## Keep Your Software Updated

Software updates often include battery optimization improvements. Make sure your phone's operating system and apps are always up to date to benefit from these enhancements.

## Temperature Matters

Extreme temperatures can damage your battery. Avoid leaving your phone in hot cars or cold environments for extended periods. If your phone gets hot while charging, remove it from the charger and let it cool down.

By following these simple tips, you can significantly extend your phone's battery life and avoid the frustration of a dead battery when you need your device most.`,
    date: "2024-01-15",
    author: "Tech Repair Pro",
    image: "https://images.unsplash.com/photo-1609592806596-4fa9e8e5b2e0?w=600",
  },
  {
    id: "2",
    title: "Signs Your Phone Screen Needs Replacement",
    excerpt:
      "Learn to identify when your cracked screen has gone beyond cosmetic damage.",
    content: `A cracked phone screen is more than just an eyesore – it can affect your device's functionality and even pose safety risks. Here's how to determine when it's time for a professional screen replacement.

## Visible Cracks and Damage

The most obvious sign is visible damage to the screen. However, not all cracks require immediate replacement. Small surface scratches might be purely cosmetic, but deep cracks that you can feel with your finger or that interfere with touch sensitivity need attention.

## Touch Responsiveness Issues

If your screen isn't responding to touch in certain areas, or if it's registering touches you didn't make (ghost touches), this indicates internal damage to the digitizer. This type of damage will only get worse over time.

## Display Problems

Look out for discolored areas, dead pixels, or sections of the screen that appear darker or lighter than others. These issues suggest damage to the LCD or OLED panel underneath the glass.

## Safety Concerns

Sharp glass fragments can cut your fingers, and continued use of a severely cracked screen can push glass particles into the device's internals, causing more extensive damage.

## When to Act Fast

If you notice any liquid crystal leakage (usually appearing as dark spots or rainbow patterns), you should stop using the device immediately and seek professional repair. This type of damage can worsen rapidly and may affect other components.

Don't wait until a small crack becomes a major problem. Professional screen replacement is often more affordable than you might think, and it can save you from more expensive repairs down the road.`,
    date: "2024-01-10",
    author: "Tech Repair Pro",
    image: "https://images.unsplash.com/photo-1520923642038-b4259acecbd7?w=600",
  },
  {
    id: "3",
    title: "Water Damage: What to Do in the First 24 Hours",
    excerpt:
      "Quick action steps that could save your water-damaged device from permanent failure.",
    content: `Water damage is one of the most common phone emergencies, but quick action in the first 24 hours can often save your device. Here's exactly what you should do.

## Immediate Actions (First 5 Minutes)

1. **Turn off your device immediately** - Don't try to test if it still works
2. **Remove the battery if possible** - This prevents short circuits
3. **Remove SIM card and memory card** - These often survive even when the phone doesn't
4. **Remove the case and any accessories**

## Do NOT Do These Things

- Don't use a hair dryer or heat gun
- Don't put it in the microwave
- Don't shake the device vigorously
- Don't press buttons repeatedly to test functionality

## The Rice Myth

Contrary to popular belief, rice is not the most effective drying agent. If you must use something at home, silica gel packets (like those found in shoe boxes) are more effective.

## Professional Help

The best course of action is to bring your device to a professional repair service as soon as possible. We have specialized equipment and techniques that can often recover devices that seem completely dead.

## Prevention Tips

- Use a waterproof case if you're frequently around water
- Be extra careful around pools, beaches, and bathrooms
- Consider phone insurance if you're prone to accidents

Remember, time is critical with water damage. The longer you wait, the more likely corrosion will set in and cause permanent damage.`,
    date: "2024-01-05",
    author: "Tech Repair Pro",
    image: "https://images.unsplash.com/photo-1563203369-26f2e4a5ccf7?w=600",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    rating: 5,
    comment:
      "Amazing service! Fixed my iPhone screen in just 30 minutes. Professional and affordable.",
    date: "2024-01-20",
  },
  {
    id: "2",
    name: "Mike Chen",
    rating: 5,
    comment:
      "Best repair shop in town. They recovered all my data from a water-damaged phone!",
    date: "2024-01-18",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    rating: 4,
    comment:
      "Quick battery replacement service. Fair pricing and excellent customer service.",
    date: "2024-01-15",
  },
  {
    id: "4",
    name: "David Thompson",
    rating: 5,
    comment:
      "Unlocked my phone quickly and explained the process. Highly recommend!",
    date: "2024-01-12",
  },
];

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "How long does a typical screen repair take?",
    answer:
      "Most screen repairs take between 30-60 minutes, depending on the device model. We can often complete the repair while you wait.",
  },
  {
    id: "2",
    question: "Do you offer warranty on repairs?",
    answer:
      "Yes, we provide a 90-day warranty on all parts and labor for our repair services.",
  },
  {
    id: "3",
    question: "Can you recover data from a completely dead phone?",
    answer:
      "In many cases, yes. We have specialized tools and techniques for data recovery, even from severely damaged devices.",
  },
  {
    id: "4",
    question: "Do you buy used phones?",
    answer:
      "Yes, we purchase used phones in various conditions. Contact us for a quote based on your device's model and condition.",
  },
  {
    id: "5",
    question: "What payment methods do you accept?",
    answer:
      "We accept cash, credit cards, debit cards, and mobile payments like Apple Pay and Google Pay.",
  },
  {
    id: "6",
    question: "Is it worth repairing an older phone?",
    answer:
      "It depends on the repair cost versus the phone's value. We'll provide an honest assessment and help you make the best decision.",
  },
];
