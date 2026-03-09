import { toast } from "sonner";
import { useState } from "react";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent successfully!");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <div className="container mx-auto max-w-xl px-4 py-16">
      <h1 className="text-center font-display text-3xl font-bold">Contact Us</h1>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <input
          type="text" placeholder="Your Name" value={name}
          onChange={(e) => setName(e.target.value)} required
          className="w-full rounded border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <input
          type="email" placeholder="Your Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required
          className="w-full rounded border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <textarea
          placeholder="Your Message" value={message}
          onChange={(e) => setMessage(e.target.value)} rows={6} required
          className="w-full rounded border border-input bg-card px-4 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        />
        <button type="submit" className="rounded bg-accent px-6 py-2.5 text-sm font-semibold text-accent-foreground hover:opacity-90">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
