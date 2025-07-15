// NOTE: This hook is intended for use in Next.js client components only.
import { useState } from "react";
import { toast } from "sonner";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  code?: string;
}

export function useChat() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content: "Hi! I'm your Landing Page Generator. Describe the landing page you want to create, and I'll generate complete HTML and CSS code for you. Try something like:\n\n• 'Create a modern tech startup landing page with a hero section and pricing table'\n• 'Build a restaurant website with a menu section'\n• 'Design a portfolio landing page for a photographer'",
      isUser: false,
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const generateHTMLCSS = async (prompt: string): Promise<string> => {
    // This is a mock implementation. In a real app, you'd call your AI API
    // For now, we'll generate a simple responsive landing page based on the prompt
    
    const isRestaurant = prompt.toLowerCase().includes("restaurant") || prompt.toLowerCase().includes("food");
    const isTech = prompt.toLowerCase().includes("tech") || prompt.toLowerCase().includes("startup") || prompt.toLowerCase().includes("saas");
    const isPortfolio = prompt.toLowerCase().includes("portfolio") || prompt.toLowerCase().includes("photographer");
    
    let template = "";
    
    if (isRestaurant) {
      template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Delicious Restaurant</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f4f4f4"/><text x="50%" y="50%" font-size="18" text-anchor="middle" dy=".3em" fill="%23999">Restaurant</text></svg>'); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { background: #e74c3c; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; transition: background 0.3s; }
        .btn:hover { background: #c0392b; }
        .menu { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        .menu h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .menu-item { background: #f8f9fa; padding: 2rem; border-radius: 10px; text-align: center; }
        .menu-item h3 { color: #e74c3c; margin-bottom: 1rem; }
        .price { font-size: 1.5rem; font-weight: bold; color: #2c3e50; }
        footer { background: #2c3e50; color: white; text-align: center; padding: 40px 20px; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .menu-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <section class="hero">
        <div>
            <h1>Delicious Restaurant</h1>
            <p>Experience the finest cuisine in town</p>
            <a href="#menu" class="btn">View Menu</a>
        </div>
    </section>
    
    <section id="menu" class="menu">
        <h2>Our Menu</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <h3>Grilled Salmon</h3>
                <p>Fresh salmon with herbs and lemon</p>
                <div class="price">$24.99</div>
            </div>
            <div class="menu-item">
                <h3>Pasta Carbonara</h3>
                <p>Classic Italian pasta with bacon and eggs</p>
                <div class="price">$18.99</div>
            </div>
            <div class="menu-item">
                <h3>Beef Steak</h3>
                <p>Premium cut with seasonal vegetables</p>
                <div class="price">$32.99</div>
            </div>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2024 Delicious Restaurant. All rights reserved.</p>
    </footer>
</body>
</html>`;
    } else if (isTech) {
      template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TechFlow - Modern Solutions</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; font-weight: 300; }
        .hero p { font-size: 1.3rem; margin-bottom: 2rem; opacity: 0.9; }
        .btn { background: white; color: #667eea; padding: 15px 30px; text-decoration: none; border-radius: 50px; display: inline-block; transition: transform 0.3s, box-shadow 0.3s; font-weight: 600; }
        .btn:hover { transform: translateY(-2px); box-shadow: 0 10px 20px rgba(0,0,0,0.2); }
        .features { padding: 100px 20px; max-width: 1200px; margin: 0 auto; }
        .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; color: #2c3e50; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 3rem; }
        .feature { text-align: center; padding: 2rem; }
        .feature-icon { width: 80px; height: 80px; background: linear-gradient(135deg, #667eea, #764ba2); border-radius: 50%; margin: 0 auto 1.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 2rem; }
        .pricing { background: #f8f9fa; padding: 100px 20px; }
        .pricing h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1000px; margin: 0 auto; }
        .pricing-card { background: white; padding: 3rem 2rem; border-radius: 15px; text-align: center; box-shadow: 0 5px 15px rgba(0,0,0,0.1); transition: transform 0.3s; }
        .pricing-card:hover { transform: translateY(-5px); }
        .pricing-card.featured { border: 3px solid #667eea; }
        .price { font-size: 3rem; color: #667eea; font-weight: bold; }
        footer { background: #2c3e50; color: white; text-align: center; padding: 50px 20px; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .features-grid, .pricing-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <section class="hero">
        <div>
            <h1>TechFlow</h1>
            <p>Modern solutions for tomorrow's challenges</p>
            <a href="#features" class="btn">Get Started</a>
        </div>
    </section>
    
    <section id="features" class="features">
        <h2>Why Choose Us</h2>
        <div class="features-grid">
            <div class="feature">
                <div class="feature-icon">⚡</div>
                <h3>Lightning Fast</h3>
                <p>Optimized performance that scales with your business needs</p>
            </div>
            <div class="feature">
                <div class="feature-icon">🔒</div>
                <h3>Secure</h3>
                <p>Enterprise-grade security to protect your valuable data</p>
            </div>
            <div class="feature">
                <div class="feature-icon">📊</div>
                <h3>Analytics</h3>
                <p>Powerful insights to drive your business forward</p>
            </div>
        </div>
    </section>
    
    <section class="pricing">
        <h2>Simple Pricing</h2>
        <div class="pricing-grid">
            <div class="pricing-card">
                <h3>Starter</h3>
                <div class="price">$29</div>
                <p>Perfect for small teams</p>
                <a href="#" class="btn" style="margin-top: 1rem;">Choose Plan</a>
            </div>
            <div class="pricing-card featured">
                <h3>Pro</h3>
                <div class="price">$99</div>
                <p>For growing businesses</p>
                <a href="#" class="btn" style="margin-top: 1rem;">Choose Plan</a>
            </div>
            <div class="pricing-card">
                <h3>Enterprise</h3>
                <div class="price">$299</div>
                <p>For large organizations</p>
                <a href="#" class="btn" style="margin-top: 1rem;">Choose Plan</a>
            </div>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2024 TechFlow. All rights reserved.</p>
    </footer>
</body>
</html>`;
    } else if (isPortfolio) {
      template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Alex Johnson - Photographer</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)), url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%23f0f0f0"/><text x="50%" y="50%" font-size="14" text-anchor="middle" dy=".3em" fill="%23999">Photography</text></svg>'); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: white; background-size: cover; }
        .hero h1 { font-size: 4rem; margin-bottom: 1rem; font-weight: 300; letter-spacing: 2px; }
        .hero p { font-size: 1.5rem; margin-bottom: 2rem; font-style: italic; }
        .btn { background: transparent; color: white; border: 2px solid white; padding: 12px 24px; text-decoration: none; display: inline-block; transition: all 0.3s; text-transform: uppercase; letter-spacing: 1px; }
        .btn:hover { background: white; color: #333; }
        .portfolio { padding: 100px 20px; max-width: 1200px; margin: 0 auto; }
        .portfolio h2 { text-align: center; font-size: 3rem; margin-bottom: 3rem; font-weight: 300; }
        .gallery { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1rem; }
        .gallery-item { aspect-ratio: 1; background: linear-gradient(45deg, #f0f0f0, #e0e0e0); display: flex; align-items: center; justify-content: center; color: #999; font-size: 1.2rem; transition: transform 0.3s; }
        .gallery-item:hover { transform: scale(1.05); }
        .about { background: #f8f9fa; padding: 100px 20px; text-align: center; }
        .about h2 { font-size: 2.5rem; margin-bottom: 2rem; }
        .about p { max-width: 600px; margin: 0 auto; font-size: 1.1rem; }
        footer { background: #2c3e50; color: white; text-align: center; padding: 50px 20px; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .gallery { grid-template-columns: repeat(2, 1fr); } }
    </style>
</head>
<body>
    <section class="hero">
        <div>
            <h1>Alex Johnson</h1>
            <p>Capturing life's beautiful moments</p>
            <a href="#portfolio" class="btn">View Portfolio</a>
        </div>
    </section>
    
    <section id="portfolio" class="portfolio">
        <h2>Portfolio</h2>
        <div class="gallery">
            <div class="gallery-item">Wedding Photography</div>
            <div class="gallery-item">Portrait Sessions</div>
            <div class="gallery-item">Nature & Landscape</div>
            <div class="gallery-item">Street Photography</div>
            <div class="gallery-item">Event Coverage</div>
            <div class="gallery-item">Commercial Work</div>
        </div>
    </section>
    
    <section class="about">
        <h2>About Me</h2>
        <p>With over 10 years of experience in photography, I specialize in capturing authentic moments that tell your unique story. From intimate weddings to corporate events, I bring passion and creativity to every shoot.</p>
    </section>
    
    <footer>
        <p>&copy; 2024 Alex Johnson Photography. All rights reserved.</p>
    </footer>
</body>
</html>`;
    } else {
      // Generic modern landing page
      template = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Modern Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        .hero { background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); height: 100vh; display: flex; align-items: center; justify-content: center; text-align: center; color: white; }
        .hero h1 { font-size: 3.5rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { background: white; color: #0984e3; padding: 15px 30px; text-decoration: none; border-radius: 25px; display: inline-block; transition: transform 0.3s; font-weight: 600; }
        .btn:hover { transform: translateY(-2px); }
        .features { padding: 80px 20px; max-width: 1200px; margin: 0 auto; }
        .features h2 { text-align: center; font-size: 2.5rem; margin-bottom: 3rem; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .feature { text-align: center; padding: 2rem; background: #f8f9fa; border-radius: 10px; }
        footer { background: #2d3436; color: white; text-align: center; padding: 40px 20px; }
        @media (max-width: 768px) { .hero h1 { font-size: 2.5rem; } .features-grid { grid-template-columns: 1fr; } }
    </style>
</head>
<body>
    <section class="hero">
        <div>
            <h1>Welcome to Our Platform</h1>
            <p>Build something amazing with our modern solution</p>
            <a href="#features" class="btn">Get Started</a>
        </div>
    </section>
    
    <section id="features" class="features">
        <h2>Our Features</h2>
        <div class="features-grid">
            <div class="feature">
                <h3>Fast & Reliable</h3>
                <p>Lightning-fast performance you can count on</p>
            </div>
            <div class="feature">
                <h3>Easy to Use</h3>
                <p>Intuitive interface designed for everyone</p>
            </div>
            <div class="feature">
                <h3>24/7 Support</h3>
                <p>We're here to help whenever you need us</p>
            </div>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2024 Modern Platform. All rights reserved.</p>
    </footer>
</body>
</html>`;
    }
    
    return template;
  };

  const sendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Simulate AI processing time
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const generatedCode = await generateHTMLCSS(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've generated a beautiful landing page based on your request! You can preview it on the right, copy the code, or download it as an HTML file.",
        isUser: false,
        code: generatedCode,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      toast.error("Failed to generate code. Please try again.");
      console.error("Error generating code:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    messages,
    sendMessage,
    isLoading,
  };
}